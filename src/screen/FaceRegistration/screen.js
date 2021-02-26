import * as React from 'react'
import { Text, TouchableOpacity, View, Image, Dimensions, PermissionsAndroid } from 'react-native';
import ImageEditor from "@react-native-community/image-editor"
import { RNCamera } from 'react-native-camera'
import { TextInput, Button, Caption, ProgressBar, Colors, Title } from 'react-native-paper'
import FaceLandmark from '../../assets/images/face.png'
import { Scaler } from '../../styles';
import StepView from '../../component/StepView/component'
import BottomSheet from 'reanimated-bottom-sheet'
import RNFetchBlob from 'rn-fetch-blob'
import CameraRoll from "@react-native-community/cameraroll"
import axios from 'axios';
import styles from './styles'
import { contentUritoFiles } from '../../utils/Utils';
import { fetchUploadImage } from '../../api/ApiCall';
import { BASE_URL } from '../../api/Api';

const FaceRegistrationScreen = ({ navigation, route }) => {
    const cameraRef = React.useRef(null)
    const [flash, setFlash] = React.useState('off')
    const [type, setType] = React.useState('front')
    const [imageUri, setImageUri] = React.useState('')

    const [step, setStep] = React.useState(0)
    const [faceResult, setFaceResult] = React.useState(null)
    const [faceStatus, setFaceStatus] = React.useState('Posisikan wajah sesuai tanda yang tersedia.')
    const [ready, setReady] = React.useState(0)
    const [button, setButton] = React.useState(false)
    const [confirmButton, setConfirmButton] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)

    const [faceID, setFaceID] = React.useState('')

    const stepCaption = ['Step 1. Daftarkan wajah', 'Step 2. Verifikasi wajah', 'Step 3. Verifikasi wajah untuk mengkonfirmasi']

    const subject = route?.params?.subject
    const sheetRef = React.useRef(null)

    React.useEffect(() => {
        //console.log(JSON.stringify(faceResult))
        const minX = 90
        const maxX = 145
        const minY = 30
        const maxY = 160

        const minHeight = 124
        const maxHeight = 356
        const minWidth = 86
        const maxWidth = 280

        const maxReady = 900

        if (faceResult) {
            if (faceResult?.origin?.x >= minX && faceResult?.origin?.x <= maxX && faceResult?.origin?.y >= minY && faceResult?.origin?.y <= maxY && faceResult?.size?.height >= minHeight && faceResult?.size?.height <= maxHeight && faceResult?.size?.width >= minWidth && faceResult?.size?.width <= maxWidth) {
                //console.log('Good Position')
                setFaceStatus('Tahan posisi ini wajah sampai tombol aktif.')
                //ready <= maxReady ? setReady(ready + 200) : setReady(maxReady)
                setButton(true)
            } else {
                setFaceStatus('Posisikan wajah sesuai tanda yang tersedia.')
                setButton(false)
                //setReady(ready - 200)
            }
        } else {
            setFaceStatus('Belum Ada wajah terdeteksi')
        }

    }, [faceResult])

    React.useEffect(() => {
        hasAndroidPermission()
    }, [])

    /*
    React.useEffect(() => {
        if (ready == 900) {
            setButton(true)
        } else {
            setButton(false)
        }
    }, [ready])
    */

    async function hasAndroidPermission() {
        const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

        const hasPermission = await PermissionsAndroid.check(permission);
        if (hasPermission) {
            return true;
        }

        const status = await PermissionsAndroid.request(permission);
        return status === 'granted';
    }

    const takePicture = async () => {
        if (cameraRef) {
            const options = { quality: .6, base64: false, mirrorImage: true, width: 720, height: 480 };
            const data = await cameraRef.current.takePictureAsync(options);
            await setImageUri(data.uri)
            sheetRef.current.snapTo(0)
        }
    };

    async function checkFace(dir) {
        setIsLoading(true)
        setConfirmButton(true)
        //recognize first
        const url = `${BASE_URL}api/v1/faces/recognize?limit=0&prediction_count=1&det_prob_threshold=0.8`
        const uploadStatus = await fetchUploadImage(url, dir)
        const minAcc = 0.75

        if (uploadStatus.result[0].faces[0].similarity >= minAcc) {
            setIsLoading(false)
            setConfirmButton(false)
            alert(`Wajah kemungkinan sudah terdaftar sebagai ${uploadStatus.result[0].faces[0].face_name}. Jika anda yakin belum terdaftar silahkan ulangi lagi!`)
        } else {
            uploadModel(dir)
        }

        console.log(JSON.stringify(uploadStatus))
    }

    async function uploadModel(dir) {

        setIsLoading(true)
        setConfirmButton(true)

        function getUrl() {
            if (step == 0) {
                return `${BASE_URL}api/v1/faces?subject=${subject}&det_prob_threshold=0.8`
            } else {
                return `${BASE_URL}api/v1/faces/${faceID}/verify?limit=0&det_prob_threshold=0.8`
            }
        }

        const url = await getUrl()

        const uploadStatus = await fetchUploadImage(url, dir)

        if (step == 0) {
            if (uploadStatus !== {}) {
                alert('Sukses Mendaftarkan Wajah. Lakukan verifikasi untuk menyelesaikan!')
                setFaceID(uploadStatus.image_id)
                setStep(step + 1)
                setIsLoading(false)
                setConfirmButton(false)
                sheetRef.current.snapTo(1)
            } else {
                alert('Gagal mendaftarkan wajah mohon coba lagi.')
                setIsLoading(false)
                setConfirmButton(false)
                sheetRef.current.snapTo(1)
            }
        } else {
            if (uploadStatus !== {} && uploadStatus?.result[0]?.similarity >= 0.80) {
                if (step == 1) {
                    alert('Sukses menverifikasi wajah. Lakukan verifikasi terakhir untuk menyelesaikan.')
                    setStep(step + 1)
                    setIsLoading(false)
                    setConfirmButton(false)
                    sheetRef.current.snapTo(1)
                } else if (step == 2) {
                    alert('Verifikasi selesai. Anda akan diarahkan ke halaman login')
                    navigation.navigate('Auth')
                }
            } else {
                alert('Wajah gagal diverifikasi mohon ulangi!')
                setIsLoading(false)
                setConfirmButton(false)
                sheetRef.current.snapTo(1)
            }
        }
    }

    function retryPhoto() {
        sheetRef.current.snapTo(1)
    }

    async function savePhoto() {
        CameraRoll.save(imageUri, { type: 'photo', album: 'zipay' }).then((res) => step == 0 ? checkFace(res) : uploadModel(res))
    }

    const WINDOW_HEIGHT = Dimensions.get('window').height - 100

    const renderContent = () => (
        <View
            style={{
                backgroundColor: 'white',
                padding: 16,
                height: WINDOW_HEIGHT,
                alignItems: 'center'
            }}
        >
            <Title>Konfirmasi Wajah</Title>
            <Image source={{ uri: imageUri ? imageUri : null }} style={{ height: '50%', width: '80%', marginVertical: 14 }} resizeMode={'contain'} />
            <Button disabled={confirmButton} mode={'text'} style={{ marginTop: 14 }} contentStyle={{ width: 250 }} uppercase={false} onPress={() => retryPhoto()}>
                <Text>Ulangi</Text>
            </Button>
            <Button disabled={confirmButton} loading={isLoading} mode={'contained'} style={{ marginTop: 14 }} contentStyle={{ width: 250 }} uppercase={false} onPress={() => savePhoto()}>
                <Text>{isLoading ? 'Sedang mengunggah...' : 'Konfirmasi'}</Text>
            </Button>
        </View>
    )

    const renderFaceLandmark = () => {
        let xPos = faceResult?.origin?.x
        let yPos = faceResult?.origin?.y

        const facePos = {
            transform: [{ translateX: xPos ? (xPos - 32) : 0 }, { translateY: yPos ? yPos : 0 }]
        }
        return faceResult ? (
            <View style={[facePos, { position: 'absolute', top: 1, left: 1, backgroundColor: 'transparent', borderWidth: 1.5, borderColor: 'yellow', height: faceResult?.size?.height, width: faceResult?.size?.width }]} />
        ) : null
    }

    return (
        <View style={styles.container}>
            <BottomSheet
                ref={sheetRef}
                initialSnap={2}
                snapPoints={[WINDOW_HEIGHT - (WINDOW_HEIGHT * 5 / 100), 0, 0]}
                borderRadius={10}
                enabledGestureInteraction={false}
                renderContent={renderContent}
            />
            {
                <RNCamera
                    ref={cameraRef}
                    style={styles.preview}
                    type={type}
                    flashMode={flash}
                    captureAudio={false}
                    onFacesDetected={(res) => res ? setFaceResult(res?.faces[0]?.bounds) : setFaceResult(null)}
                    faceDetectionMode={'accurate'}
                    faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}>
                    {/*renderFaceLandmark()*/}
                    <View style={{ position: 'absolute', top: 1, marginTop: Scaler.scaleSize(60), alignItems: 'center' }}>
                        <Image source={FaceLandmark} />
                        <Caption style={{ color: 'yellow', marginTop: 12, textAlign: 'center', fontSize: 14, paddingHorizontal: 14 }}>{faceStatus}</Caption>
                    </View>
                    <View style={styles.panel}>
                        <StepView step={stepCaption.length} progress={step} />
                        <Caption style={{ color: 'blue', marginVertical: 8 }}>{stepCaption[step]}</Caption>
                        <Button disabled={!button} mode={'contained'} style={{ marginTop: 8 }} contentStyle={{ width: 250 }} uppercase={false} onPress={() => takePicture()}>
                            <Text>{'Ambil Gambar'}</Text>
                        </Button>
                    </View>
                </RNCamera>
            }
        </View>
    )
}

export default FaceRegistrationScreen