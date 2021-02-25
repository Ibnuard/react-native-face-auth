import * as React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { fetchAPI, fetchDataGet } from '../../api/ApiCall'
import { API_METHOD } from '../../utils/Common'
import styles from './styles'
import axios from 'axios'
import CustomButton from '../../component/Button/component'

const AuthScreen = ({ navigation }) => {
    React.useEffect(() => {
        test()
    }, [])

    async function test() {
        const res = await fetchDataGet('https://2199f6ca2270.ngrok.io/api/v1/faces', {}, { 'x-api-key': '79c02014-8ad9-45b7-8a91-5a399386f737' })
        console.log(JSON.stringify(res))
    }

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
                    onPress={() => console.log('Masuk Clicked!')} />
            </View>

        </View>
    )
}

export default AuthScreen