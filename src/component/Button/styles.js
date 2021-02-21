import { StyleSheet } from 'react-native'
import { Colors, Scaler } from '../../styles'

const styles = StyleSheet.create({
    baseSize: {
        backgroundColor: Colors.SUCCESS,
        height: Scaler.scaleSize(42),
        width: Scaler.scaleSize(256)
    },

    labelStyle: {
        color: Colors.WHITE
    }
})

export default styles