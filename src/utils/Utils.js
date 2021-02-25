//Custom User Utils

import { Platform } from "react-native";

export function capitalize(str) {
    if (str == null || str.length == 0) {
        return '-'
    }

    return str.charAt(0).toUpperCase() + str.slice(1)
}

export const createFormData = (photo, body) => {
    const data = new FormData();
    data.append('file', {
        name: photo.filename,
        uri: Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
    });

    Object.keys(body).forEach(key => {
        data.append(key, body[key]);
    });

    return data;
};

export const contentUritoFiles = async (uri) => {
    let RNFS = require('react-native-fs')

    console.log('urs : ' + uri)

    if (uri?.startsWith('content://')) {
        const destPath = `${RNFS.TemporaryDirectoryPath}/zipay/test`
        console.log('py : ' + JSON.stringify(destPath))
    } else {
        console.log('ga pas')
    }
}