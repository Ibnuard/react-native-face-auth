import * as React from 'react'
import { Text, TouchableOpacity, View, Image, Dimensions, SafeAreaView } from 'react-native';
import ImageEditor from "@react-native-community/image-editor"
import styles from './styles'
import { RNCamera } from 'react-native-camera'
import { TextInput, Button } from 'react-native-paper'
import FaceLandmark from '../../assets/images/face.png'
import { Scaler } from '../../styles';
import { Caption } from 'react-native-paper'
import StepView from '../../component/StepView/component';

const FaceRegistrationScreen = ({ navigation }) => {
    const cameraRef = React.useRef(null)
    const [flash, setFlash] = React.useState('off')
    const [zoom, setZoom] = React.useState(0)
    const [autoFocus, setAutoFocus] = React.useState('on')
    const [depth, setDepth] = React.useState(0)
    const [type, setType] = React.useState('front')

    const [step, setStep] = React.useState(0)

    const stepCaption = ['Step 1. Daftarkan wajah', 'Step 2. Ambil gambar muka dengan tengok ke kanan', 'Step 3. Ambil gambar muka dengan tengok ke kiri', 'Step 2. Ambil gambar muka dengan tengok ke atas', 'Step 2. Ambil gambar muka dengan tengok ke bawah']

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
        if (cameraRef) {
            const options = { quality: 0.5, base64: false };
            const data = await cameraRef.current.takePictureAsync(options);
            console.log(data.uri)
        }
    };

    return (
        <View style={styles.container}>
            <RNCamera
                ref={cameraRef}
                style={styles.preview}
                type={type}
                flashMode={flash}
                captureAudio={false}>
                <View style={{ position: 'absolute', top: 1, marginTop: Scaler.scaleSize(60), alignItems: 'center' }}>
                    <Image source={FaceLandmark} />
                    <Caption style={{ color: 'blue', marginTop: 12 }}>Posisikan wajah sesuai tanda yang tersedia.</Caption>
                </View>
                <View style={styles.panel}>
                    <StepView step={5} progress={step} />
                    <Caption style={{ color: 'blue', marginVertical: 8 }}>{stepCaption[step]}</Caption>
                    <Button mode={'contained'} style={{ marginTop: 8 }} contentStyle={{ width: 250 }} uppercase={false} onPress={() => setStep(step + 1)}>
                        <Text>Snap</Text>
                    </Button>
                </View>
            </RNCamera>
        </View>
    )
}

export default FaceRegistrationScreen