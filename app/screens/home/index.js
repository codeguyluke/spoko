import React from 'react'
import { createStackNavigator } from 'react-navigation'
import MapScreen from './map'
import EditScreen from '../edit-game'
import DetailsScreen from '../game-details'
import { NavigationIcon } from '../../components'
import colors from '../../style/colors'

export default createStackNavigator(
  {
    OpenGames: {
      screen: MapScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Open games',
        headerTintColor: colors.navy,
        headerRight: (
          <NavigationIcon
            name="add-box"
            color={colors.green}
            onPress={() => navigation.navigate('Edit')}
          />
        ),
      }),
    },
    Details: {
      screen: DetailsScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Game details',
        headerTintColor: colors.navy,
        headerLeft: (
          <NavigationIcon
            name="ios-arrow-back"
            type="ionicon"
            onPress={() => navigation.goBack()}
          />
        ),
        headerRight: navigation.getParam('game').owned && (
          <NavigationIcon
            name="square-edit-outline"
            type="material-community"
            color={colors.grey}
            onPress={() => navigation.navigate('Edit', { game: navigation.getParam('game') })}
            size={28}
          />
        ),
      }),
    },
    Edit: EditScreen,
  },
  {
    initialRouteName: 'OpenGames',
    navigationOptions: () => ({
      headerBackTitle: null,
    }),
  }
)
