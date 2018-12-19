import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements'
import HomeScreen from './home'
import UpcomingGamesScreen from './upcoming-games'
import ProfileScreen from './profile'
import colors, { rgbToRgba } from '../style/colors'

const ICONS = {
  Home: {
    type: 'material-community',
    name: 'home-outline',
  },
  UpcomingGames: {
    type: 'material-community',
    name: 'clock-outline',
  },
  Profile: {
    type: 'material-community',
    name: 'account-outline',
  },
}

export default createBottomTabNavigator(
  {
    Home: HomeScreen,
    UpcomingGames: UpcomingGamesScreen,
    Profile: ProfileScreen,
  },
  {
    navigationOptions: ({ navigation }) => ({
      // eslint-disable-next-line
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state
        return (
          <Icon
            name={ICONS[routeName].name}
            type={ICONS[routeName].type}
            size={32}
            color={tintColor}
          />
        )
      },
    }),
    tabBarOptions: {
      activeTintColor: colors.navy,
      inactiveTintColor: rgbToRgba(colors.navy, 0.3),
      showLabel: false,
      style: {
        borderTopWidth: 1,
        borderTopColor: colors.navy,
        paddingTop: 8,
      },
    },
  }
)
