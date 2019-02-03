import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Alert, InteractionManager } from 'react-native'
import firebase from 'react-native-firebase'
import PropTypes from 'prop-types'
import ViewGameOwner from './view-game-owner'
import ViewGameUser from './view-game-user'
import toastState from '../store/toast'
import gamesState from '../store/games'
import { cancelGame, joinGame, leaveGame } from '../services/firestore'
import { Loader } from '../components'

const showConfirmation = ({ title, message, onSuccess }) => () =>
  InteractionManager.runAfterInteractions(() => {
    Alert.alert(title, message, [
      { text: 'Yes', onPress: onSuccess },
      { text: 'No', style: 'cancel' },
    ])
  })

class ViewGame extends Component {
  static propTypes = {
    game: PropTypes.shape({
      owner: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
      sport: PropTypes.string.isRequired,
      place: PropTypes.shape({
        location: PropTypes.shape({
          latitude: PropTypes.number.isRequired,
          longitude: PropTypes.number.isRequired,
        }),
      }),
      datetime: PropTypes.instanceOf(Date).isRequired,
      players: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string })).isRequired,
    }),
    navigation: PropTypes.shape({
      getParam: PropTypes.func.isRequired,
      navigate: PropTypes.func.isRequired,
      goBack: PropTypes.func.isRequired,
    }).isRequired,
    onAddToast: PropTypes.func.isRequired,
  }

  static defaultProps = {
    game: null,
  }

  state = {
    loading: false,
  }

  handleCancelGame = async () => {
    const { onAddToast, navigation, game } = this.props

    this.setState({ loading: true })
    try {
      await cancelGame(game.id)
      onAddToast('Game cancelled!')
      this.setState({ loading: false }, () => navigation.goBack())
    } catch (error) {
      console.error(error)
      onAddToast("Couldn't cancel the game, please try again.")
      this.setState({ loading: false })
    }
  }

  handleEditGame = () => {
    const { navigation, game } = this.props
    navigation.navigate('EditGame', { game, onGoBack: this.handleRefresh })
  }

  handleLeaveGame = async () => {
    const { game, onAddToast } = this.props

    this.setState({ loading: true })
    try {
      await leaveGame(game)
      onAddToast('You left the game!')
      this.setState({ loading: false })
    } catch (error) {
      console.error(error)
      onAddToast("Couldn't leave the game, please try again.")
      this.setState({ loading: false })
    }
  }

  handleJoinGame = async () => {
    const { game, onAddToast } = this.props

    this.setState({ loading: true })
    try {
      await joinGame(game)
      onAddToast('You joined the game!')
      this.setState({ loading: false })
    } catch (error) {
      console.error(error)
      onAddToast("Couldn't join the game, please try again.")
      this.setState({ loading: false })
    }
  }

  render() {
    const { game } = this.props
    const { loading } = this.state

    if (!game) return <Loader />

    const { owner: { id: ownerId }, players } = game
    const owned = ownerId === firebase.auth().currentUser.uid
    const played = players.some(player => player.id === firebase.auth().currentUser.uid)

    return owned ? (
      <ViewGameOwner
        game={game}
        onEditGame={this.handleEditGame}
        onCancelGame={showConfirmation({
          title: 'Cancel game?',
          message: 'Are you sure you want to cancel this game?',
          onSuccess: this.handleCancelGame,
        })}
        loading={loading}
      />
    ) : (
      <ViewGameUser
        game={game}
        onJoinGame={this.handleJoinGame}
        onLeaveGame={showConfirmation({
          title: 'Leave game?',
          message: 'Are you sure you want to leave this game?',
          onSuccess: this.handleLeaveGame,
        })}
        loading={loading}
        played={played}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const gameId = ownProps.navigation.getParam('gameId')
  return {
    game: gamesState.selectors.selectGameById(state, gameId),
  }
}

export default connect(
  mapStateToProps,
  { onAddToast: toastState.actions.addToast }
)(ViewGame)
