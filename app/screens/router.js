import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import { connect } from 'react-redux'
import Permissions from 'react-native-permissions'
import { createAppContainer } from 'react-navigation'
import { Icon } from 'react-native-elements'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import PropTypes from 'prop-types'
import HomeScreen from './home'
import ScheduledScreen from './scheduled'
import ProfileScreen from './profile'
import gamesState from '../store/games'
import regionState from '../store/region'
import { subscribeToGames } from '../services/firestore'
import { getCurrentRegion } from '../services/geolocation'
import { Loader, Toast } from '../components'

const Navigator = createAppContainer(
  createMaterialBottomTabNavigator(
    {
      Home: {
        screen: HomeScreen,
        navigationOptions: {
          // eslint-disable-next-line react/prop-types
          tabBarIcon: ({ tintColor }) => <Icon size={24} name="home" color={tintColor} />,
        },
      },
      Scheduled: {
        screen: ScheduledScreen,
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
        {this.state.initialized ? <Navigator /> : <Loader />}
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
