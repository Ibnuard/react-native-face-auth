import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { TextStyle } from '../styles'
import HomeScreen from '../screen/HomeScreen/screen'
import ProfileScreen from '../screen/ProfileScreen/screen'
import CustomAppBar from '../component/AppBar/component'
import AuthScreen from '../screen/AuthScreen/screen'
import RegisterScreen from '../screen/RegisterScreen/screen'
import FaceRegistrationScreen from '../screen/FaceRegistration/screen'

const Stack = createStackNavigator()

export const AppNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            header: () => null
        }}>
            <Stack.Screen
                name='Auth'
                component={AuthScreen}
                options={(opt) => ({
                    animationEnabled: true,
                    animationTypeForReplace: 'push',
                    title: 'Auth screen',
                    header: (props) => <CustomAppBar {...props} title={opt?.route?.name} />,
                    headerTitleStyle: {
                        fontWeight: TextStyle.FONT_WEIGHT_BOLD,
                    },
                    headerTitleAlign: 'center',
                })}
            />
            <Stack.Screen
                name='Register'
                component={RegisterScreen}
                options={(opt) => ({
                    animationEnabled: true,
                    animationTypeForReplace: 'push',
                    title: 'Register Screen',
                    header: (props) => <CustomAppBar {...props} title={opt?.route?.name} />,
                    headerTitleStyle: {
                        fontWeight: TextStyle.FONT_WEIGHT_BOLD,
                    },
                    headerTitleAlign: 'center',
                })}
            />
            <Stack.Screen
                name='FaceRegister'
                component={FaceRegistrationScreen}
                options={(opt) => ({
                    animationEnabled: true,
                    animationTypeForReplace: 'push',
                    title: 'Face Register Screen',
                    header: (props) => <CustomAppBar {...props} title={opt?.route?.name} />,
                    headerTitleStyle: {
                        fontWeight: TextStyle.FONT_WEIGHT_BOLD,
                    },
                    headerTitleAlign: 'center',
                })}
            />
            <Stack.Screen
                name='Home'
                component={HomeScreen}
                options={(opt) => ({
                    animationEnabled: true,
                    animationTypeForReplace: 'push',
                    title: 'Home Screen',
                    header: (props) => <CustomAppBar {...props} title={opt?.route?.name} />,
                    headerTitleStyle: {
                        fontWeight: TextStyle.FONT_WEIGHT_BOLD,
                    },
                    headerTitleAlign: 'center',
                })}
            />
            <Stack.Screen
                name='Profile'
                component={ProfileScreen}
                options={(opt) => ({
                    animationEnabled: true,
                    animationTypeForReplace: 'push',
                    title: 'Profile Screen',
                    header: (props) => <CustomAppBar {...props} title={opt?.route?.name} />,
                    headerTitleStyle: {
                        fontWeight: TextStyle.FONT_WEIGHT_REGULAR,
                    },
                    headerTitleAlign: 'center',
                })}
            />
        </Stack.Navigator>
    )
}