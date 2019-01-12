import { createStackNavigator } from 'react-navigation'
import ScheduledScreen from './scheduled'
import ViewGameScreen from '../view-game'
import EditGameScreen from '../edit-game'

export default createStackNavigator(
  {
    Scheduled: {
      screen: ScheduledScreen,
      navigationOptions: () => ({
        headerBackTitle: null,
        headerTitle: 'Your scheduled games',
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
    initialRouteName: 'Scheduled',
  }
)
