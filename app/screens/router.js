import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import { connect } from 'react-redux'
import Permissions from 'react-native-permissions'
import { createAppContainer, createStackNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements'
import { Portal, Dialog, List, Button, Paragraph, withTheme } from 'react-native-paper'
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
import { Loader, Toast, SportFilter, DateFilter, PriceFilter } from '../components'

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
    theme: PropTypes.shape({
      colors: PropTypes.shape({
        accent: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
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
    const { theme } = this.props
    const { initialized, showDialog } = this.state

    return (
      <React.Fragment>
        <StatusBar barStyle="light-content" />
        {initialized ? <AppNavigator /> : <Loader />}
        <Toast />
        <Portal>
          <Dialog visible={showDialog} onDismiss={this.handleCancelPermissionRequest}>
            <Dialog.Title>Allow location?</Dialog.Title>
            <Dialog.Content>
              <Paragraph>We only use your location to allow features like:</Paragraph>
              <List.Section>
                <List.Item
                  title="Finding games around"
                  left={() => <List.Icon icon="check-box" color={theme.colors.accent} />}
                />
                <List.Item
                  title="Navigating to games"
                  left={() => <List.Icon icon="check-box" color={theme.colors.accent} />}
                />
                <List.Item
                  title="Finding venues around"
                  left={() => <List.Icon icon="check-box" color={theme.colors.accent} />}
                />
              </List.Section>
              <Paragraph>Do you want to allow SpontApp to use your location?</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={this.handleCancelPermissionRequest}>Not now</Button>
              <Button onPress={this.handleAllowPermissionRequest}>Yes</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
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
)(withTheme(Router))
