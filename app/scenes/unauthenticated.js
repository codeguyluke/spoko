import React, { Component } from 'react'
import Permissions from 'react-native-permissions'
import { Loader as InitialScreen } from '../components'
import LocationPermissionScreen from '../screens/LocationPermission'
import PhoneInputScreen from '../screens/PhoneInput'

const ROUTES = {
  initial: InitialScreen,
  locationPermission: LocationPermissionScreen,
  phoneInput: PhoneInputScreen,
}

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

  render() {
    const Screen = ROUTES[this.state.currentRoute]
    return <Screen />
  }
}
