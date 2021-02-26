import * as React from 'react'
import { View, Text, Image, TouchableOpacity, PermissionsAndroid } from 'react-native'
import styles from './styles'
import { TextInput, Button, Caption, ProgressBar, Colors, Title } from 'react-native-paper'
import FaceLandmark from '../../assets/images/face.png'
import { RNCamera } from 'react-native-camera'
import { Scaler } from '../../styles';
import CameraRoll from "@react-native-community/cameraroll"
import PopUp from '../../component/Modal/component'
import { fetchUploadImage } from '../../api/ApiCall'
import { BASE_URL } from '../../api/Api'

const FaceLoginScreen = ({ navigation, route }) => {
    const [name, setName] = React.useState('')
    const [faceResult, setFaceResult] = React.useState(null)
    const cameraRef = React.useRef(null)
    const subject = route?.params?.subject
    const [ready, setReady] = React.useState(0)
    const [isLoading, setIsLoading] = React.useState(false)
    const [faceStatus, setFaceStatus] = React.useState('Posisikan wajah sesuai dengan petunjuk!')

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

        const maxReady = 600

        if (faceResult) {
            if (faceResult?.origin?.x >= minX && faceResult?.origin?.x <= maxX && faceResult?.origin?.y >= minY && faceResult?.origin?.y <= maxY && faceResult?.size?.height >= minHeight && faceResult?.size?.height <= maxHeight && faceResult?.size?.width >= minWidth && faceResult?.size?.width <= maxWidth) {
                //console.log('Good Position')
                setFaceStatus('Tahan posisi ini selama 2 detik untuk mengambil gambar secara otomatis!')
                if (!isLoading) {
                    ready <= maxReady ? setReady(ready + 200) : (takePicture(), setIsLoading(true))
                }
            } else {
                setFaceStatus('Posisikan wajah sesuai dengan petunjuk!')
                setReady(ready - 200)
            }
        }

    }, [faceResult])

    const takePicture = async () => {
        if (cameraRef) {
            const options = { quality: 0.5, base64: false, mirrorImage: true, width: 480, height: 320 };
            const data = await cameraRef.current.takePictureAsync(options);
            //await setImageUri(data.uri)
            await CameraRoll.save(data?.uri, { type: 'photo', album: 'zipay' }).then((res) => uploadImage(res))
        }
    };

    async function uploadImage(dir) {
        const url = `${BASE_URL}api/v1/faces/recognize?limit=0&prediction_count=1&det_prob_threshold=0.8`
        const uploadStatus = await fetchUploadImage(url, dir)
        const minAcc = 0.60

        if (uploadStatus) {
            if (uploadStatus.result[0].faces[0].similarity >= minAcc && uploadStatus.result[0].faces[0].face_name == subject) {
                console.log('Login Sukses sebagai ' + subject)
                navigation.navigate('Profile', { name: subject })
                setIsLoading(false)
            } else {
                setIsLoading(false)
                alert('Wajah tidak sesuai. Mohon coba lagi!. Pastikan wajah terlihat jelas di kamera!')
                console.log('Wajah tidak sesuai!')
            }
        } else {
            setIsLoading(false)
            console.log('FaceId tidak ditemukan')
        }
    }

    function renderLoading() {
        return <PopUp visible={isLoading} dismissable={false} />
    }

    return (
        <View style={styles.container}>
            <RNCamera
                ref={cameraRef}
                style={styles.preview}
                type={'front'}
                flashMode={'off'}
                captureAudio={false}
                onFacesDetected={(res) => res ? setFaceResult(res?.faces[0]?.bounds) : setFaceResult(null)}
                faceDetectionMode={'accurate'}
                faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}>
                {/*renderFaceLandmark()*/}
                <View style={{ position: 'absolute', top: 1, marginTop: Scaler.scaleSize(60), alignItems: 'center' }}>
                    <Image source={FaceLandmark} />
                    <Caption style={{ color: 'yellow', marginTop: 12, textAlign: 'center', fontSize: 14, paddingHorizontal: 14 }}>{isLoading ? 'Sedang memproses...' : faceStatus}</Caption>
                </View>
                {
                    renderLoading()
                    /**
                     * 
                     * 
                <View style={styles.panel}>
                    <StepView step={stepCaption.length} progress={step} />
                    <Caption style={{ color: 'blue', marginVertical: 8 }}>{stepCaption[step]}</Caption>
                    <Button disabled={!button} mode={'contained'} style={{ marginTop: 8 }} contentStyle={{ width: 250 }} uppercase={false} onPress={() => takePicture()}>
                        <Text>{'Ambil Gambar'}</Text>
                    </Button>
                </View>
                     * 
                     */
                }
            </RNCamera>
        </View>
    )
}

export default FaceLoginScreen