import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Title } from 'react-native-paper'
import PropTypes from 'prop-types'
import userState from '../store/user'
import { getUserById, subscribeToUser, createUser } from '../services/firestore'
import { Loader } from '../components'

class Router extends Component {
  static propTypes = {
    user: PropTypes.shape({
      uid: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string.isRequired,
    }).isRequired,
    onSetCurrentUser: PropTypes.func.isRequired,
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
    return this.setState({ initialized: true })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    return this.state.initialized ? (
      <Card>
        <Title>AUTHENTICATED</Title>
      </Card>
    ) : (
      <Loader />
    )
  }
}

export default connect(
  null,
  { onSetCurrentUser: userState.actions.setCurrentUser }
)(Router)
