import React from 'react'
import { View, StyleSheet, Image, FlatList } from 'react-native'
import { withTheme, Caption, Surface } from 'react-native-paper'
import { Icon } from 'react-native-elements'
import PropTypes from 'prop-types'
import { NumberPicker } from '.'
import peopleIcon from '../assets/images/people.png'
import userIcon from '../assets/images/user.png'

const MAX_PLAYERS = 5

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  labelContainer: {
    marginBottom: 4,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginLeft: 4,
    fontWeight: '500',
  },
  surface: {
    width: '100%',
    padding: 16,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 48,
    height: 48,
    marginRight: 16,
  },
  list: {
    flex: 1,
    paddingRight: 8,
  },
  playerPhoto: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
})

const addPlayer = (players, callback) => () => {
  if (players.length >= MAX_PLAYERS) return

  const newPlayers = [...players, { id: 'player', phoneNumber: '', photoURL: '' }]
  callback(newPlayers)
}

const removePlayer = (players, min, callback) => () => {
  if (players.length <= min) return

  const emptyPlayerIndex = players.findIndex(player => player.id === 'player')
  if (emptyPlayerIndex > -1) {
    const newPlayers = [...players]
    newPlayers.splice(emptyPlayerIndex, 1)
    callback(newPlayers)
  }
}

function PlayersPicker({ players, theme, onSelectPlayers }) {
  const signedPlayers = players.filter(player => player.id !== 'player')
  const minPlayers = signedPlayers.length || 1

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Icon name="group" size={24} color={theme.colors.accent} />
        <Caption style={styles.label}>PLAYERS</Caption>
      </View>
      <Surface style={styles.surface}>
        <Image source={peopleIcon} style={styles.image} />
        <FlatList
          horizontal
          style={styles.list}
          data={players}
          renderItem={({ item }) => (
            <Image style={styles.playerPhoto} source={item.photoURL || userIcon} />
          )}
          keyExtractor={(item, index) => (item.id !== 'player' ? item.id : `${item.id}${index}`)}
        />
        <NumberPicker
          value={players.length}
          min={minPlayers}
          max={MAX_PLAYERS}
          onUp={addPlayer(players, onSelectPlayers)}
          onDown={removePlayer(players, minPlayers, onSelectPlayers)}
        />
      </Surface>
    </View>
  )
}

PlayersPicker.propTypes = {
  onSelectPlayers: PropTypes.func.isRequired,
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      accent: PropTypes.string.isRequired,
      error: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  players: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      photoURL: PropTypes.string,
    })
  ).isRequired,
}

export default withTheme(PlayersPicker)
