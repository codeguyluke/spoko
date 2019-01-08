import React, { Component } from 'react'
import firebase from 'react-native-firebase'
import WelcomeChatScreen from './screens/welcome-chat'
import AppRouter from './screens/router'
import { Loader } from './components'

const AUTHENTICATION_STATUSES = {
  undetermined: 'undetermined',
  authenticated: 'authenticated',
  unauthenticated: 'unauthenticated',
}

export default class Main extends Component {
  state = {
    authenticationStatus: AUTHENTICATION_STATUSES.undetermined,
    currentUser: null,
  }

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user =>
      this.setState({
        authenticationStatus: !user
          ? AUTHENTICATION_STATUSES.unauthenticated
          : AUTHENTICATION_STATUSES.authenticated,
        currentUser: user,
      })
    )
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe()
  }

  render() {
    const { authenticationStatus, currentUser } = this.state
    switch (authenticationStatus) {
      case AUTHENTICATION_STATUSES.authenticated:
        return <AppRouter user={currentUser} />
      case AUTHENTICATION_STATUSES.unauthenticated:
        return <WelcomeChatScreen />
      default:
        return <Loader />
    }
  }
}
