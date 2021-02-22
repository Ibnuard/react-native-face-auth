import * as React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './styles'
import { TextInput, Button } from 'react-native-paper'

const FacePreviewModal = ({ navigation }) => {
    const [name, setName] = React.useState('')
    return (
        <View style={styles.container}>
            <Text>Test</Text>
        </View>
    )
}

export default FacePreviewModal