import * as React from 'react'
import 'react-native-gesture-handler'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import Main from './src'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
}

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <Main />
    </PaperProvider>
  )
}

export default App