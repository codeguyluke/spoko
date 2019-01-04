import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import { Provider as StoreProvider } from 'react-redux'
import Main from './app/main'
import store from './app/store'
import theme from './app/theme'

export default function App() {
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <Main />
      </PaperProvider>
    </StoreProvider>
  )
}
