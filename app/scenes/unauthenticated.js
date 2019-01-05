import React, { Component } from 'react'
import Permissions from 'react-native-permissions'
import { Loader as InitialScreen } from '../components'
import LocationPermissionUndeterminedScreen from '../screens/LocationPermissionUndetermined'
import LocationPermissionGrantedScreen from '../screens/LocationPermissionGranted'
import PhoneInputScreen from '../screens/PhoneInput'

export default class Unauthenticated extends Component {
  state = {
    currentRoute: 'initial',
  }

  async componentDidMount() {
    const permission = await Permissions.check('location')
    if (permission === 'undetermined') {
      return this.setState({ currentRoute: 'locationPermissionUndetermined' })
    }
    return this.setState({ currentRoute: 'phoneInput' })
  }

  handleLocationPermissionRequest = async () => {
    const permission = await Permissions.request('location')
    if (permission === 'undetermined') return null
    if (permission === 'authorized')
      return this.setState({ currentRoute: 'locationPermissionGranted' })
    return this.setState({ currentRoute: '' })
  }

  handleMoveToPhoneInput = () => {
    this.setState({ currentRoute: 'phoneInput' })
  }

  render() {
    switch (this.state.currentRoute) {
      case 'locationPermissionUndetermined':
        return (
          <LocationPermissionUndeterminedScreen
            onPositive={this.handleLocationPermissionRequest}
            onNegative={() => {}}
          />
        )
      case 'locationPermissionGranted':
        return <LocationPermissionGrantedScreen onNext={this.handleMoveToPhoneInput} />
      case 'phoneInput':
        return <PhoneInputScreen />
      default:
        return <InitialScreen />
    }
  }
}
