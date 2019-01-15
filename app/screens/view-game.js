import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, ScrollView, Alert, InteractionManager } from 'react-native'
import { withTheme, FAB, Button, Colors } from 'react-native-paper'
import MapView, { Marker } from 'react-native-maps'
import { Avatar } from 'react-native-elements'
import firebase from 'react-native-firebase'
import PropTypes from 'prop-types'
import toastState from '../store/toast'
import gamesState from '../store/games'
import { cancelGame, joinGame, leaveGame } from '../services/firestore'
import { InfoRow, Loader } from '../components'
import sports from '../assets/sports'

const showConfirmation = ({ title, message, onSuccess }) => () =>
  InteractionManager.runAfterInteractions(() => {
    Alert.alert(title, message, [
      { text: 'Yes', onPress: onSuccess },
      { text: 'No', style: 'cancel' },
    ])
  })

const INITIAL_LATITUDE_DELTA = 0.01
const INITIAL_LONGITUDE_DELTA = 0.005

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: 200,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  avatar: {
    borderWidth: 4,
    borderColor: '#FFF',
  },
  buttonsContainer: {
    padding: 16,
  },
  button: {
    paddingVertical: 8,
  },
  stack: {
    marginTop: 16,
  },
})

class ViewGame extends Component {
  static propTypes = {
    game: PropTypes.shape({
      ownerId: PropTypes.string.isRequired,
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
    theme: PropTypes.shape({
      colors: PropTypes.shape({
        background: PropTypes.string.isRequired,
        error: PropTypes.string.isRequired,
      }).isRequired,
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
    const { theme, game } = this.props
    const { loading } = this.state

    if (!game) return <Loader />

    const { ownerId, sport, place, datetime, players } = game
    const {
      location: { latitude, longitude },
    } = place
    const owned = ownerId === firebase.auth().currentUser.uid
    const played = players.some(player => player.id === firebase.auth().currentUser.uid)

    return (
      <React.Fragment>
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
          <MapView
            initialRegion={{
              latitude,
              longitude,
              latitudeDelta: INITIAL_LATITUDE_DELTA,
              longitudeDelta: INITIAL_LONGITUDE_DELTA,
            }}
            style={styles.map}
          >
            <Marker coordinate={{ latitude, longitude }}>
              <Avatar rounded medium source={sports[sport].icon} avatarStyle={styles.avatar} />
            </Marker>
          </MapView>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <InfoRow large type="sport" value={sport} />
            <InfoRow large type="place" value={place} />
            <InfoRow large type="datetime" value={datetime} />
          </ScrollView>
          <View style={styles.buttonsContainer}>
            {!(owned || played) && <FAB label="Join" onPress={this.handleJoinGame} />}
            {played && (
              <Button
                mode="contained"
                onPress={showConfirmation({
                  title: 'Leave game?',
                  message: 'Are you sure you want to leave this game?',
                  onSuccess: this.handleLeaveGame,
                })}
                style={styles.button}
                color={theme.colors.error}
              >
                Leave game
              </Button>
            )}
            {owned && (
              <View>
                <Button
                  mode="contained"
                  style={styles.button}
                  onPress={this.handleEditGame}
                  color={Colors.blue500}
                  icon="edit"
                >
                  Edit game
                </Button>
                <Button
                  mode="contained"
                  style={[styles.button, styles.stack]}
                  onPress={showConfirmation({
                    title: 'Cancel game?',
                    message: 'Are you sure you want to cancel this game?',
                    onSuccess: this.handleCancelGame,
                  })}
                  color={theme.colors.error}
                  icon="delete"
                >
                  Cancel game
                </Button>
              </View>
            )}
          </View>
        </View>
        {loading && <Loader />}
      </React.Fragment>
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
)(withTheme(ViewGame))
