import React from 'react'
import { createStackNavigator } from 'react-navigation'
import MapScreen from './map'
import EditGameScreen from '../edit-game'
import ViewGameScreen from '../view-game'
import { DatetimeFilter, PriceFilter, SportFilter } from '../../components'

export default createStackNavigator(
  {
    Map: {
      screen: MapScreen,
      navigationOptions: () => ({
        headerLeft: <SportFilter />,
        headerTitle: <DatetimeFilter />,
        headerRight: <PriceFilter />,
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
    ViewGame: {
      screen: ViewGameScreen,
      navigationOptions: () => ({
        headerTitle: 'Game details',
        headerTintColor: '#FFF',
        headerStyle: {
          backgroundColor: '#FF9800',
        },
      }),
    },
    EditGame: {
      screen: EditGameScreen,
      navigationOptions: () => ({
        headerTitle: 'Edit game',
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
