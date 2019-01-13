import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import { connect } from 'react-redux'
import Permissions from 'react-native-permissions'
import { createAppContainer, createStackNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import PropTypes from 'prop-types'
import MapScreen from './map'
import ScheduledScreen from './scheduled'
import EditGameScreen from './edit-game'
import ViewGameScreen from './view-game'
import ProfileScreen from './profile'
import gamesState from '../store/games'
import regionState from '../store/region'
import { subscribeToGames } from '../services/firestore'
import { getCurrentRegion } from '../services/geolocation'
import { Loader, Toast, SportFilter, DateFilter, PriceFilter } from '../components'

const HomeStackNavigator = createStackNavigator(
  {
    Map: {
      screen: MapScreen,
      navigationOptions: () => ({
        headerLeft: <SportFilter />,
        headerTitle: <DateFilter />,
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
        headerBackTitle: null,
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

const ScheduledStackNavigator = createStackNavigator(
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
        headerBackTitle: null,
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

const AppNavigator = createAppContainer(
  createMaterialBottomTabNavigator(
    {
      Home: {
        screen: HomeStackNavigator,
        navigationOptions: {
          // eslint-disable-next-line react/prop-types
          tabBarIcon: ({ tintColor }) => <Icon size={24} name="home" color={tintColor} />,
        },
      },
      Scheduled: {
        screen: ScheduledStackNavigator,
        navigationOptions: {
          // eslint-disable-next-line react/prop-types
          tabBarIcon: ({ tintColor }) => <Icon size={24} name="event" color={tintColor} />,
        },
      },
      Profile: {
        screen: ProfileScreen,
        navigationOptions: {
          // eslint-disable-next-line react/prop-types
          tabBarIcon: ({ tintColor }) => <Icon size={24} name="person" color={tintColor} />,
        },
      },
    },
    {
      initialRouteName: 'Home',
      activeTintColor: '#FFF',
      inactiveTintColor: 'rgba(255, 255, 255, 0.7)',
    }
  )
)

class Router extends Component {
  static propTypes = {
    onSetInitialRegion: PropTypes.func.isRequired,
    onSetGames: PropTypes.func.isRequired,
  }

  state = {
    initialized: false,
  }

  async componentDidMount() {
    const { onSetGames } = this.props
    this.unsubscribeFromGames = await subscribeToGames(gamesSnapshot => {
      const games = gamesSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      onSetGames(games)
    })

    await Permissions.request('location')
    await this.setInitialRegion()

    return this.setState({ initialized: true })
  }

  componentWillUnmount() {
    this.unsubscribeFromGames()
  }

  setInitialRegion = async () => {
    try {
      const currentRegion = await getCurrentRegion()
      this.props.onSetInitialRegion(currentRegion)
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    return (
      <React.Fragment>
        <StatusBar barStyle="light-content" />
        {this.state.initialized ? <AppNavigator /> : <Loader />}
        <Toast />
      </React.Fragment>
    )
  }
}

export default connect(
  null,
  {
    onSetInitialRegion: regionState.actions.setInitialRegion,
    onSetGames: gamesState.actions.setGames,
  }
)(Router)
