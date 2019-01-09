import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import { connect } from 'react-redux'
import Permissions from 'react-native-permissions'
import { createAppContainer } from 'react-navigation'
import { Icon } from 'react-native-elements'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import firebase from 'react-native-firebase'
import PropTypes from 'prop-types'
import HomeScreen from './home'
import OtherScreen from './Authenticated'
import gamesState from '../store/games'
import regionState from '../store/region'
import { subscribeToGames } from '../services/firestore'
import { getCurrentRegion } from '../services/geolocation'
import { Loader } from '../components'

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
      Other: {
        screen: OtherScreen,
        navigationOptions: {
          // eslint-disable-next-line react/prop-types
          tabBarIcon: ({ tintColor }) => <Icon size={24} name="event" color={tintColor} />,
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
      console.log(gamesSnapshot)
      onSetGames(gamesSnapshot)
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
