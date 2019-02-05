import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { withTheme, FAB, Button, Chip, Text, HelperText } from 'react-native-paper'
import MapView, { Marker } from 'react-native-maps'
import { Avatar } from 'react-native-elements'
import PropTypes from 'prop-types'
import { InfoRow, Loader } from '../components'
import sports from '../assets/sports'

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
  scrollViewContainer: {
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
  chip: {
    borderRadius: 25,
    backgroundColor: '#FFF',
    elevation: 4,
  },
  chipLabel: {
    fontWeight: '700',
    fontSize: 14,
  },
  gameFullText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 4,
  },
})

function ViewGameUser({ game, theme, onJoinGame, onLeaveGame, played, loading }) {
  const { sport, place, datetime, price, players, notes } = game
  const {
    location: { latitude, longitude },
  } = place
  const areFreeSpots = players.some(player => player.id === 'player')

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
            {played ? (
              <Chip
                avatar={
                  <Avatar rounded small source={sports[sport].icon} avatarStyle={styles.avatar} />
                }
                onPress={() => {}}
                style={styles.chip}
              >
                <Text style={[styles.chipLabel, { color: theme.colors.accent }]}>Navigate</Text>
              </Chip>
            ) : (
              <Avatar rounded medium source={sports[sport].icon} avatarStyle={styles.avatar} />
            )}
          </Marker>
        </MapView>
        <ScrollView style={styles.scrollViewContainer}>
          <InfoRow type="sport" value={sport} />
          <InfoRow type="place" value={place} />
          <InfoRow type="datetime" value={datetime} />
          <InfoRow type="price" value={price} />
          {notes && <InfoRow type="notes" value={notes} />}
        </ScrollView>
        <View style={styles.buttonsContainer}>
          {played && (
            <Button
              mode="contained"
              onPress={onLeaveGame}
              style={styles.button}
              color={theme.colors.error}
            >
              Leave game
            </Button>
          )}
          {!played && (
            <React.Fragment>
              {areFreeSpots ? (
                <FAB label="Join" onPress={onJoinGame} />
              ) : (
                <HelperText style={[styles.gameFullText, { color: theme.colors.error }]}>
                  This game is full.
                </HelperText>
              )}
            </React.Fragment>
          )}
        </View>
      </View>
      {loading && <Loader />}
    </React.Fragment>
  )
}

ViewGameUser.propTypes = {
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
    price: PropTypes.shape({
      value: PropTypes.string.isRequired,
      currency: PropTypes.string.isRequired,
    }).isRequired,
    notes: PropTypes.string,
  }).isRequired,
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      accent: PropTypes.string.isRequired,
      background: PropTypes.string.isRequired,
      error: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onJoinGame: PropTypes.func.isRequired,
  onLeaveGame: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  played: PropTypes.bool.isRequired,
}

export default withTheme(ViewGameUser)
