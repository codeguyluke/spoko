import React from 'react'
import { createStackNavigator } from 'react-navigation'
import MapScreen from './map'

export default createStackNavigator(
  {
    Map: {
      screen: MapScreen,
      navigationOptions: () => ({
        header: null,
      }),
    },
  },
  {
    initialRouteName: 'Map',
  }
)
