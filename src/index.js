import React from 'react'
import { AppNavigator } from './navigators/AppNavigator'
//theme
import {
    DarkTheme as PaperDarkTheme,
    DefaultTheme as PaperDefaultTheme,
    Provider as PaperProvider,
} from 'react-native-paper'

import {
    NavigationContainer,
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native'
import { PreferencesContext } from './utils/Contexts';


//import * as FirebaseService from '../src/services/FirebaseService'

const CombinedDefaultTheme = {
    ...PaperDefaultTheme,
    ...NavigationDefaultTheme,
    colors: {
        ...PaperDefaultTheme.colors,
        ...NavigationDefaultTheme.colors,
    },
};
const CombinedDarkTheme = {
    ...PaperDarkTheme,
    ...NavigationDarkTheme,
    colors: {
        ...PaperDarkTheme.colors,
        ...NavigationDarkTheme.colors,
    },
};

const AppStack = () => {
    const [isThemeDark, setIsThemeDark] = React.useState(false);

    let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

    const toggleTheme = React.useCallback(() => {
        return setIsThemeDark(!isThemeDark);
    }, [isThemeDark]);

    const preferences = React.useMemo(
        () => ({
            toggleTheme,
            isThemeDark,
        }),
        [toggleTheme, isThemeDark]
    );
    //FirebaseService.useCallPermission()

    return (
        <PreferencesContext.Provider value={preferences}>
            <PaperProvider theme={theme}>
                <NavigationContainer theme={theme}>
                    <AppNavigator />
                </NavigationContainer>
            </PaperProvider>
        </PreferencesContext.Provider>
    )
}

export default AppStack