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

const FaceRegistrationScreen = ({ navigation, route }) => {
    const cameraRef = React.useRef(null)
    const [flash, setFlash] = React.useState('off')
    const [type, setType] = React.useState('front')
    const [imageUri, setImageUri] = React.useState('')

    const [step, setStep] = React.useState(0)
    const [faceResult, setFaceResult] = React.useState(null)
    const [faceStatus, setFaceStatus] = React.useState('Belum Ada')
    const [ready, setReady] = React.useState(0)

    const stepCaption = ['Step 1. Daftarkan wajah', 'Step 2. Verifikasi wajah', 'Step 3. Verifikasi wajah untuk mengkonfirmasi']

    const subject = route?.params?.subject
    const sheetRef = React.useRef(null)

    React.useEffect(() => {
        console.log(JSON.stringify(faceResult))
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
                console.log('Good Position')
                setFaceStatus('Tahan posisi ini selama 3 detik untuk mengambil gambar')
                ready < maxReady ? setReady(ready + 200) : !closeCamera ? takePicture() : null
            } else {
                setFaceStatus('Posisikan wajah sesuai tanda yang tersedia untuk mengambil gambar otomatis.')
                setReady(0)
            }
        } else {
            setFaceStatus('Belum Ada')
        }

    }, [faceResult])

    React.useEffect(() => {
        hasAndroidPermission()
    }, [])

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
            const options = { quality: 1, base64: false, mirrorImage: true, width: 250, height: 250 };
            const data = await cameraRef.current.takePictureAsync(options);
            setImageUri(data)
            CameraRoll.save(data?.uri, { type: 'photo', album: 'zipay' }).then((res) => uploadModel(res))
            sheetRef.current.snapTo(0)
        }
    };

    async function uploadModel(dir) {
        await fetchUploadImage('https://f2f60ef9a16d.ngrok.io/api/v1/faces?subject=Tester&det_prob_threshold=0.8', dir)
        /*
        const fileToUpload = dir;
        const data = new FormData();
        data.append('file', fileToUpload);
        let res = await fetch(
            'https://f2f60ef9a16d.ngrok.io/api/v1/faces?subject=Tester&det_prob_threshold=0.8',
            {
                method: 'post',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'multipart/form-data; ',
                    'x-api-key': '1a1ca103-8df6-4543-b082-5cdd71c461f4'
                },
            }
        );
        let responseJson = await res.json();
        if (responseJson.status == 1) {
            alert('Upload Successful');
        }
        */
    }

    function retryPhoto() {
        sheetRef.current.snapTo(1)
    }

    async function savePhoto() {
        let name = encodeURIComponent(subject);
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
            <Image source={{ uri: imageUri.uri ? imageUri.uri : null }} style={{ height: '50%', width: '80%', marginVertical: 14 }} resizeMode={'contain'} />
            <Button mode={'text'} style={{ marginTop: 14 }} contentStyle={{ width: 250 }} uppercase={false} onPress={() => retryPhoto()}>
                <Text>Ulangi</Text>
            </Button>
            <Button mode={'contained'} style={{ marginTop: 14 }} contentStyle={{ width: 250 }} uppercase={false} onPress={() => savePhoto()}>
                <Text>Konfirmasi</Text>
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
                enabledGestureInteraction={true}
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
                    faceDetectionLandmarks={0}>
                    {/*renderFaceLandmark()*/}
                    <View style={{ position: 'absolute', top: 1, marginTop: Scaler.scaleSize(60), alignItems: 'center' }}>
                        <Image source={FaceLandmark} />
                        <ProgressBar style={{ width: 100, height: 5, marginTop: 20 }} progress={ready / 900} color={Colors.blueA200} />
                        <Caption style={{ color: 'yellow', marginTop: 12, textAlign: 'center', fontSize: 14, paddingHorizontal: 14 }}>{faceStatus}</Caption>
                    </View>
                    <View style={styles.panel}>
                        <StepView step={stepCaption.length} progress={step} />
                        <Caption style={{ color: 'blue', marginVertical: 8 }}>{stepCaption[step]}</Caption>
                        <Button mode={'contained'} style={{ marginTop: 8 }} contentStyle={{ width: 250 }} uppercase={false} onPress={() => takePicture()}>
                            <Text>Snap</Text>
                        </Button>
                    </View>
                </RNCamera>
            }
        </View>
    )
}

export default FaceRegistrationScreen