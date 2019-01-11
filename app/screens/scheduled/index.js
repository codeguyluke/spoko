import { createStackNavigator } from 'react-navigation'
import ScheduledScreen from './scheduled'
import EditGameScreen from '../edit-game'

export default createStackNavigator(
  {
    Scheduled: {
      screen: ScheduledScreen,
      navigationOptions: () => ({
        headerTitle: 'Your scheduled games',
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
