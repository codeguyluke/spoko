import React, { Component } from 'react'
import { StatusBar, View, StyleSheet } from 'react-native'
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
import { getCurrentRegion, getCurrentCountry, DEFAULT_REGION } from '../services/geolocation'
import { Loader, Toast, SportFilter, DateFilter, PriceFilter, LocationDialog } from '../components'

const CommonRoutes = {
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
}

const styles = StyleSheet.create({
  dateFilterContainer: {
    flex: 1,
    alignItems: 'center',
  },
})

const HomeStackNavigator = createStackNavigator(
  {
    Map: {
      screen: MapScreen,
      navigationOptions: () => ({
        headerLeft: <SportFilter />,
        headerTitle: (
          <View style={styles.dateFilterContainer}>
            <DateFilter />
          </View>
        ),
        headerRight: <PriceFilter />,
        headerBackTitle: null,
        headerStyle: {
          backgroundColor: '#FF9800',
        },
      }),
    },
    ...CommonRoutes,
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
    ...CommonRoutes,
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
    onSetCountry: PropTypes.func.isRequired,
  }

  state = {
    initialized: false,
    showDialog: false,
  }

  async componentDidMount() {
    const { onSetGames, onSetInitialRegion, onSetCountry } = this.props
    this.unsubscribeFromGames = await subscribeToGames(gamesSnapshot => {
      const games = gamesSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      onSetGames(games)
    })

    const locationPermission = await Permissions.check('location')
    if (locationPermission === 'undetermined') {
      this.setState({ showDialog: true })
    } else {
      const currentRegion = await getCurrentRegion()
      onSetInitialRegion(currentRegion)
      const currentCountry = await getCurrentCountry(currentRegion)
      onSetCountry(currentCountry)
      this.setState({ initialized: true })
    }
  }

  componentWillUnmount() {
    this.unsubscribeFromGames()
  }

  handleCancelPermissionRequest = async () => {
    const { onSetInitialRegion, onSetCountry } = this.props
    onSetInitialRegion(DEFAULT_REGION)
    const currentCountry = await getCurrentCountry(DEFAULT_REGION)
    onSetCountry(currentCountry)
    this.setState({ showDialog: false, initialized: true })
  }

  handleAllowPermissionRequest = async () => {
    const { onSetInitialRegion, onSetCountry } = this.props
    this.setState({ showDialog: false })
    await Permissions.request('location')
    const currentRegion = await getCurrentRegion()
    onSetInitialRegion(currentRegion)
    const currentCountry = await getCurrentCountry(currentRegion)
    onSetCountry(currentCountry)
    this.setState({ initialized: true })
  }

  render() {
    const { initialized, showDialog } = this.state

    return (
      <React.Fragment>
        <StatusBar barStyle="light-content" />
        {initialized ? <AppNavigator /> : <Loader />}
        <Toast />
        <LocationDialog
          show={showDialog}
          onCancel={this.handleCancelPermissionRequest}
          onYes={this.handleAllowPermissionRequest}
        />
      </React.Fragment>
    )
  }
}

export default connect(
  null,
  {
    onSetInitialRegion: regionState.actions.setInitialRegion,
    onSetCountry: regionState.actions.setCountry,
    onSetGames: gamesState.actions.setGames,
  }
)(Router)
