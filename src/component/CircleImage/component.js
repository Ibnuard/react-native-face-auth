import * as React from 'react';
import { Avatar } from 'react-native-paper';

const CircleImage = ({ size, source }) => (
    <Avatar.Image size={size} source={source} />
);
export default CircleImage