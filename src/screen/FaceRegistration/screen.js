import * as React from 'react'
import { Text, TouchableOpacity, View, Image, Dimensions, SafeAreaView } from 'react-native';
import ImageEditor from "@react-native-community/image-editor"
import styles from './styles'
import { RNCamera } from 'react-native-camera'
import { TextInput, Button, Caption, ProgressBar, Colors } from 'react-native-paper'
import FaceLandmark from '../../assets/images/face.png'
import { Scaler } from '../../styles';
import StepView from '../../component/StepView/component'
import BottomSheet from 'reanimated-bottom-sheet'

const FaceRegistrationScreen = ({ navigation }) => {
    const cameraRef = React.useRef(null)
    const [flash, setFlash] = React.useState('off')
    const [zoom, setZoom] = React.useState(0)
    const [autoFocus, setAutoFocus] = React.useState('on')
    const [depth, setDepth] = React.useState(0)
    const [type, setType] = React.useState('front')
    const [imageUri, setImageUri] = React.useState('')

    const [step, setStep] = React.useState(0)
    const [faceResult, setFaceResult] = React.useState(null)
    const [faceStatus, setFaceStatus] = React.useState('Belum Ada')
    const [ready, setReady] = React.useState(0)
    const [taked, setTaked] = React.useState(false)

    const stepCaption = ['Step 1. Daftarkan wajah', 'Step 2. Ambil gambar muka dengan tengok ke kanan', 'Step 3. Ambil gambar muka dengan tengok ke kiri', 'Step 2. Ambil gambar muka dengan tengok ke atas', 'Step 2. Ambil gambar muka dengan tengok ke bawah']

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

        const maxReady = 600

        if (faceResult) {
            if (faceResult?.origin?.x >= minX && faceResult?.origin?.x <= maxX && faceResult?.origin?.y >= minY && faceResult?.origin?.y <= maxY && faceResult?.size?.height >= minHeight && faceResult?.size?.height <= maxHeight && faceResult?.size?.width >= minWidth && faceResult?.size?.width <= maxWidth) {
                console.log('Good Position')
                setFaceStatus('Tahan posisi ini selama 3 detik untuk mengambil gambar')
                ready < maxReady ? setReady(ready + 200) : takePicture()
            } else {
                setFaceStatus('Posisikan wajah sesuai tanda yang tersedia untuk mengambil gambar otomatis.')
                setReady(0)
            }
        } else {
            setFaceStatus('Belum Ada')
        }

    }, [faceResult])

    console.log('ready : ' + ready)

    function toggleFlash() {
        setFlash(flashModeOrder[flash])
    }
    function zoomOut() {
        setZoom(zoom - 0.1 < 0 ? 0 : zoom - 0.1)
    }
    function zoomIn() {
        setZoom(zoom + 0.1 > 1 ? 1 : zoom + 0.1);
    }

    const takePicture = async () => {
        if (cameraRef && !taked) {
            const options = { quality: 1, base64: false, mirrorImage: true, width: 250, height: 250 };
            const data = await cameraRef.current.takePictureAsync(options);
            setTaked(true)
            setImageUri(data?.uri)
            sheetRef.current.snapTo(0)
        }
    };

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
            <Text>Swipe down to close</Text>
            <Image source={{ uri: imageUri ? imageUri : null }} style={{ height: '50%', width: '50%' }} />
            <Button mode={'contained'} style={{ marginTop: 8 }} contentStyle={{ width: 250 }} uppercase={false} onPress={() => sheetRef.current.snapTo(1)}>
                <Text>Snap</Text>
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
                snapPoints={['90%', 0, 0]}
                borderRadius={10}
                enabledGestureInteraction={true}
                onCloseStart={() => setTaked(!taked)}
                renderContent={renderContent}
            />
            <RNCamera
                ref={cameraRef}
                style={styles.preview}
                type={type}
                flashMode={flash}
                captureAudio={false}
                onFacesDetected={(res) => res ? setFaceResult(res?.faces[0]?.bounds) : setFaceResult(null)}
                faceDetectionMode={'accurate'}
                faceDetectionLandmarks={'all'}>
                {/*renderFaceLandmark()*/}
                <View style={{ position: 'absolute', top: 1, marginTop: Scaler.scaleSize(60), alignItems: 'center' }}>
                    <Image source={FaceLandmark} />
                    <ProgressBar style={{ width: 100, height: 5, marginTop: 20 }} progress={ready / 600} color={Colors.blueA200} />
                    <Caption style={{ color: 'yellow', marginTop: 12, textAlign: 'center', fontSize: 14, paddingHorizontal: 14 }}>{faceStatus}</Caption>
                </View>
                <View style={styles.panel}>
                    <StepView step={5} progress={step} />
                    <Caption style={{ color: 'blue', marginVertical: 8 }}>{stepCaption[step]}</Caption>
                    <Button mode={'contained'} style={{ marginTop: 8 }} contentStyle={{ width: 250 }} uppercase={false} onPress={() => takePicture()}>
                        <Text>Snap</Text>
                    </Button>
                </View>
            </RNCamera>
        </View>
    )
}

export default FaceRegistrationScreen