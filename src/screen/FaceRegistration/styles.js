import { Dimensions, StyleSheet } from 'react-native'
import { Scaler, TextStyle, Colors } from '../../styles'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },

    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    panel: {
        backgroundColor: 'white',
        width: '100%',
        height: (Dimensions.get('window').height * 25) / 100,
        alignItems: 'center',
        padding: 24
    }
})

export default styles