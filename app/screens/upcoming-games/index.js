import React from 'react'
import { createStackNavigator } from 'react-navigation'
import DetailsScreen from '../game-details'
import ListScreen from './list'
import { NavigationIcon } from '../../components'
import colors from '../../style/colors'

export default createStackNavigator(
  {
    List: {
      screen: ListScreen,
      navigationOptions: () => ({
        title: 'Your upcoming games',
        headerTintColor: colors.navy,
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
  },
  {
    initialRouteName: 'List',
    navigationOptions: () => ({
      headerBackTitle: null,
    }),
  }
)
