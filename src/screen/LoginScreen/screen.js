import * as React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './styles'
import { TextInput, Button } from 'react-native-paper'

const LoginScreen = ({ navigation }) => {
    const [name, setName] = React.useState('')
    return (
        <View style={styles.container}>
            <Text>Login Screen</Text>

            <TextInput
                style={{ marginTop: 20 }}
                label="Masukan nomor hp + nama"
                value={name}
                mode={'outlined'}
                onChangeText={name => setName(name)}
            />

            <Button disabled={name.length < 5} mode={'contained'} onPress={() => navigation.navigate('FaceLogin', { subject: name.toLowerCase() })} style={{ marginTop: 20 }}>
                <Text>Masuk</Text>
            </Button>
        </View>
    )
}

export default LoginScreen