import React, { Component } from 'react'
import firebase from 'react-native-firebase'
import WelcomeChatScreen from './screens/WelcomeChat'
import AuthenticatedScreen from './screens/Authenticated'
import { Loader } from './components'

const AUTHENTICATION_STATUSES = {
  undetermined: 'undetermined',
  authenticated: 'authenticated',
  unauthenticated: 'unauthenticated',
}

export default class Main extends Component {
  state = {
    authenticationStatus: AUTHENTICATION_STATUSES.undetermined,
  }

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user =>
      this.setState({
        authenticationStatus: !user
          ? AUTHENTICATION_STATUSES.unauthenticated
          : AUTHENTICATION_STATUSES.authenticated,
      })
    )
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe()
  }

  render() {
    const { authenticationStatus } = this.state
    switch (authenticationStatus) {
      case AUTHENTICATION_STATUSES.authenticated:
        return <Authenticated />
      case AUTHENTICATION_STATUSES.unauthenticated:
        return <WelcomeChatScreen />
      default:
        return <Loader />
    }
  }
}
