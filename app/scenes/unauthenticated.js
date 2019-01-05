import React, { Component } from 'react'
import Permissions from 'react-native-permissions'
import { Loader as InitialScreen } from '../components'
import LocationPermissionScreen from '../screens/LocationPermission'
import PhoneInputScreen from '../screens/PhoneInput'

export default class Unauthenticated extends Component {
  state = {
    currentRoute: 'initial',
  }

  async componentDidMount() {
    const permission = await Permissions.check('location')
    if (permission === 'undetermined') {
      return this.setState({ currentRoute: 'locationPermission' })
    }
    return this.setState({ currentRoute: 'phoneInput' })
  }

  handleLocationPermissionRequest = async () => {
    await Permissions.request('location')
  }

  render() {
    switch (this.state.currentRoute) {
      case 'locationPermission':
        return <LocationPermissionScreen onPositive={() => {}} onNegative={() => {}} />
      case 'phoneInput':
        return <PhoneInputScreen />
      default:
        return <InitialScreen />
    }
  }
}
