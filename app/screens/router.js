import React, { Component } from 'react'
import { connect } from 'react-redux'
import Permissions from 'react-native-permissions'
import { createAppContainer } from 'react-navigation'
import { Icon } from 'react-native-elements'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import PropTypes from 'prop-types'
import HomeScreen from './home'
import OtherScreen from './Authenticated'
import userState from '../store/user'
import regionState from '../store/region'
import { getUserById, subscribeToUser, createUser } from '../services/firestore'
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
    user: PropTypes.shape({
      uid: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string.isRequired,
    }).isRequired,
    onSetCurrentUser: PropTypes.func.isRequired,
    onSetInitialRegion: PropTypes.func.isRequired,
  }

  state = {
    initialized: false,
  }

  async componentDidMount() {
    const { user, onSetCurrentUser } = this.props
    const userDocument = await getUserById(user.uid)

    if (!userDocument.exists) {
      await createUser(user.uid, {
        uid: user.uid,
        phone: user.phoneNumber,
        username: '',
        avatar: '',
      })
    }
    this.unsubscribe = await subscribeToUser(user.uid, userSnapshot =>
      onSetCurrentUser(userSnapshot.data())
    )

    await Permissions.request('location')
    await this.setInitialRegion()

    return this.setState({ initialized: true })
  }

  componentWillUnmount() {
    this.unsubscribe()
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
    return this.state.initialized ? <Navigator /> : <Loader />
  }
}

export default connect(
  null,
  {
    onSetInitialRegion: regionState.actions.setInitialRegion,
    onSetCurrentUser: userState.actions.setCurrentUser,
  }
)(Router)
