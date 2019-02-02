import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, ScrollView, Alert } from 'react-native'
import { withTheme, FAB } from 'react-native-paper'
import PropTypes from 'prop-types'
import { createGame, editGame } from '../services/firestore'
import toastState from '../store/toast'
import {
  SportPicker,
  PlacePicker,
  DatetimePicker,
  PricePicker,
  PlayersPicker,
  Loader,
} from '../components'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    margin: 16,
  },
})

class EditGame extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func.isRequired,
      goBack: PropTypes.func.isRequired,
    }).isRequired,
    theme: PropTypes.shape({
      colors: PropTypes.shape({
        background: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    onAddToast: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.game = props.navigation.getParam('game')
    this.state = {
      sport: (this.game && this.game.sport) || '',
      place: (this.game && this.game.place) || null,
      datetime: (this.game && this.game.datetime) || null,
      price: (this.game && this.game.price) || null,
      players: (this.game && this.game.players) || [{ id: 'player', photoURL: '' }],
      description: (this.game && this.game.description) || '',
      loading: false,
    }
  }

  handleCreateGame = async () => {
    const { sport, place, datetime, price, players, description } = this.state
    const { onAddToast, navigation } = this.props

    if (!sport || !place || !datetime || !price || !players) {
      Alert.alert(
        'Set all required info',
        'In order to create the game, you need to set sport, place, time, price and number of players first.',
        [{ text: 'OK' }]
      )
      return
    }

    this.setState({ loading: true })
    try {
      await createGame({ sport, place, datetime, price, players, description })
      onAddToast('Game created!')
      this.setState({ loading: false }, () => navigation.goBack())
    } catch (error) {
      console.error(error)
      onAddToast("Couldn't create the game, please try again.")
      this.setState({ loading: false })
    }
  }

  handleSaveGame = async () => {
    const { sport, place, datetime, price, players, description } = this.state
    const { onAddToast, navigation } = this.props

    this.setState({ loading: true })
    try {
      await editGame(this.game.id, { sport, place, datetime, price, players, description })
      onAddToast('Game edited!')
      this.setState({ loading: false }, () => navigation.goBack())
    } catch (error) {
      console.error(error)
      onAddToast("Couldn't edit the game, please try again.")
      this.setState({ loading: false })
    }
  }

  render() {
    const { theme } = this.props
    const { sport, place, datetime, price, players, loading } = this.state

    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <ScrollView>
          <SportPicker
            sport={sport}
            onSelectSport={selectedSport => this.setState({ sport: selectedSport })}
          />
          <PlacePicker
            place={place}
            onSelectPlace={selectedPlace => this.setState({ place: selectedPlace })}
          />
          <DatetimePicker
            datetime={datetime}
            onSelectDatetime={selectedDatetime => this.setState({ datetime: selectedDatetime })}
          />
          <PricePicker
            price={price}
            onSelectPrice={selectedPrice => this.setState({ price: selectedPrice })}
          />
          <PlayersPicker
            players={players}
            onSelectPlayers={selectedPlayers => this.setState({ players: selectedPlayers })}
          />
        </ScrollView>
        {this.game ? (
          <FAB label="Save" onPress={this.handleSaveGame} style={styles.fab} />
        ) : (
          <FAB label="Create" onPress={this.handleCreateGame} style={styles.fab} />
        )}
        {loading && <Loader />}
      </View>
    )
  }
}

export default connect(
  null,
  { onAddToast: toastState.actions.addToast }
)(withTheme(EditGame))
