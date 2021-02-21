import * as React from 'react'
import { Button, useTheme } from 'react-native-paper'
import { Colors } from '../../styles'
import styles from './styles'

const CustomButton = ({
    title = 'Click',
    mode = 'contained', // 'contained', 'text', 'outlined'
    invers = false,
    disabled = false,
    flat = false,
    color,
    showLoading = false,
    icon = null,
    onPress = null,
    style = styles.baseSize,
    labelStyle = styles.labelStyle,
    uppercase = false
}) => {

    const theme = useTheme()

    return (
        <Button
            theme={theme}
            mode={mode}
            dark={invers}
            disabled={disabled}
            compact={flat}
            color={color}
            loading={showLoading}
            icon={icon}
            onPress={onPress}
            contentStyle={[styles.baseSize, style]}
            uppercase={uppercase}
            labelStyle={[styles.labelStyle, labelStyle]}>
            {title}
        </Button>
    )
}

export default CustomButton