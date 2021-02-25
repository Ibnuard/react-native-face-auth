import * as React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './styles'
import { TextInput, Button } from 'react-native-paper'

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = React.useState('')
    return (
        <View style={styles.container}>
            <Text>Register Screen</Text>

            <TextInput
                style={{ marginTop: 20 }}
                label="Masukan nomor hp + nama"
                value={name}
                mode={'outlined'}
                onChangeText={name => setName(name)}
            />

            <Button mode={'contained'} onPress={() => navigation.navigate('FaceRegister', { subject: name })} style={{ marginTop: 20 }}>
                <Text>Daftarkan Wajah</Text>
            </Button>
        </View>
    )
}

export default RegisterScreen