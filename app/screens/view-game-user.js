import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { withTheme, FAB, Button, Surface, Text, HelperText, Colors } from 'react-native-paper'
import MapView, { Marker } from 'react-native-maps'
import { Icon } from 'react-native-elements'
import PropTypes from 'prop-types'
import { showInMap } from '../services/communications'
import { InfoRow, Loader } from '../components'

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
  buttonsContainer: {
    padding: 16,
  },
  button: {
    paddingVertical: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    backgroundColor: '#FFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    elevation: 4,
  },
  chipLabel: {
    fontWeight: '700',
    fontSize: 14,
    marginLeft: 8,
  },
  gameFullText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 4,
  },
  pinContainer: {
    alignItems: 'center',
    marginTop: -24,
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FFF',
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
          <Marker
            coordinate={{ latitude, longitude }}
            onPress={() => showInMap(latitude, longitude)}
          >
            <View style={styles.pinContainer}>
              <Surface style={styles.chip}>
                <Icon size={20} name="place" color={Colors.blueGrey700} />
                <Text style={[styles.chipLabel, { color: theme.colors.accent }]}>Show in map</Text>
              </Surface>
              <View style={styles.triangle} />
            </View>
          </Marker>
        </MapView>
        <ScrollView style={styles.scrollViewContainer}>
          <InfoRow type="sport" value={sport} />
          <InfoRow type="place" value={place} />
          <InfoRow type="datetime" value={datetime} />
          <InfoRow type="price" value={price} />
          {notes ? <InfoRow type="notes" value={notes} /> : null}
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
