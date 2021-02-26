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
    const destPath = `${RNFS.TemporaryDirectoryPath}/zipay/test`
    await RNFS.copyFile(uri, destPath)

    return `files:///${destPath}`
}