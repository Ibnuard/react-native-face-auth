import * as React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { fetchAPI, fetchDataGet } from '../../api/ApiCall'
import { API_METHOD } from '../../utils/Common'
import styles from './styles'
import axios from 'axios'
import CustomButton from '../../component/Button/component'

const AuthScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <CustomButton
                title={'Daftar'}
                mode={'contained'}
                flat
                invers
                onPress={() => navigation.navigate('Register')} />

            <View style={{ marginTop: 20 }}>
                <CustomButton
                    title={'Masuk'}
                    mode={'contained'}
                    flat
                    invers
                    onPress={() => navigation.navigate('Login')} />
            </View>

        </View>
    )
}

export default AuthScreen