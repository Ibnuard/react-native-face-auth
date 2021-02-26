import * as React from 'react'
import { View, Text } from 'react-native'
import { useTheme, Button } from 'react-native-paper'
import { PreferencesContext } from '../../utils/Contexts'
import styles from './styles'

const ProfileScreen = ({ navigation, route }) => {
    const name = route.params.name
    return (
        <View style={styles.container}>
            <Text>Selamat Datang {name}!</Text>
            <Button onPress={() => navigation.popToTop()}>
                <Text>Logout</Text>
            </Button>
        </View>
    )
}

export default ProfileScreen