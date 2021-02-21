import * as React from 'react'
import { View, Text } from 'react-native'
import { useTheme } from 'react-native-paper'
import Button from '../../component/Button/component'
import { PreferencesContext } from '../../utils/Contexts'
import styles from './styles'

const ProfileScreen = () => {
    const theme = useTheme()
    const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext)

    return (
        <View style={styles.container}>
            <Text>Profile Screen</Text>
            <Button title={'Test'} mode={'outlined'} onPress={() => toggleTheme()} />
        </View>
    )
}

export default ProfileScreen