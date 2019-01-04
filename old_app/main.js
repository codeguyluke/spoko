import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'react-native-firebase'
import PropTypes from 'prop-types'
import appState from './state/app'
import authState from './state/auth'
import { Loader } from './components'
import Router from './screens/router'
import LoginScreen from './screens/login'
import Toast from './components/toast'

class Main extends Component {
  static propTypes = {
    appInitialized: PropTypes.bool.isRequired,
    userAuthorized: PropTypes.bool.isRequired,
    onAuthStateChanged: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(this.props.onAuthStateChanged)
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe()
  }

  render() {
    if (!this.props.appInitialized) return <Loader />
    return (
      <React.Fragment>
        <Toast />
        {this.props.userAuthorized ? <Router /> : <LoginScreen />}
      </React.Fragment>
    )
  }
}

export default connect(
  state => ({
    appInitialized: state[appState.STORE_NAME].initialized,
    userAuthorized: state[authState.STORE_NAME].status === authState.AUTH_STATUSES.authorized,
  }),
  { onAuthStateChanged: appState.actions.authStateChanged }
)(Main)
