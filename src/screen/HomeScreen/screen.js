import * as React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { fetchAPI, fetchDataGet } from '../../api/ApiCall'
import { API_METHOD } from '../../utils/Common'
import styles from './styles'
import axios from 'axios'

const HomeScreen = ({ navigation }) => {

    React.useEffect(() => {
        getApi()
    }, [])

    async function getApi() {
        const datas = await fetchDataGet('https://jsonplaceholder.typicode.com/posts/1', {}, null, 3000)
        console.log('cc: ' + JSON.stringify(datas))
    }

    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Text>Go to profile</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomeScreen