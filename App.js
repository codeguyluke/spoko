import React from 'react'
import { Provider } from 'react-redux'
import Main from './app/main'
import store from './app/state/store'

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  )
}
