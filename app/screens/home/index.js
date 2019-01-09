import { createStackNavigator } from 'react-navigation'
import MapScreen from './map'
import EditGameScreen from '../edit-game'

export default createStackNavigator(
  {
    Map: {
      screen: MapScreen,
      navigationOptions: () => ({
        header: null,
        headerBackTitle: null,
      }),
    },
    EditGame: {
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
