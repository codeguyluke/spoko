import React from 'react'
import { createStackNavigator } from 'react-navigation'
import MapScreen from './map'
import EditGameScreen from '../edit-game'
import { FilterButton } from '../../components'

export default createStackNavigator(
  {
    Map: {
      screen: MapScreen,
      navigationOptions: () => ({
        headerLeft: <FilterButton filter="sport" />,
        headerTitle: <FilterButton filter="datetime" />,
        headerRight: <FilterButton filter="price" />,
        headerBackTitle: null,
        headerStyle: {
          backgroundColor: '#FF9800',
        },
      }),
    },
    CreateGame: {
      screen: EditGameScreen,
      navigationOptions: () => ({
        headerTitle: 'Create new game',
        headerTintColor: '#FFF',
        headerStyle: {
          backgroundColor: '#FF9800',
        },
      }),
    },
  },
  {
    initialRouteName: 'Map',
  }
)