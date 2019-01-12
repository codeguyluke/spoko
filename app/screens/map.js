import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { connect } from 'react-redux'
import { IconButton, withTheme, Colors, Button } from 'react-native-paper'
import MapView, { Marker } from 'react-native-maps'
import PropTypes from 'prop-types'
import regionState from '../store/region'
import gamesState from '../store/games'
import sports from '../assets/sports'

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  addIcon: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 64,
    height: 64,
    borderRadius: 28,
  },
  resetButton: {
    position: 'absolute',
    right: 16,
    top: 32,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 4,
    borderColor: '#FFF',
  },
})

const navigateToViewGame = (game, navigateCallback) => () => {
  navigateCallback(game)
}

function Map({ games, region, onResetRegion, onUpdateRegion, theme, navigation: { navigate } }) {
  return (
    <View style={styles.fill}>
      <MapView region={region} onRegionChangeComplete={onUpdateRegion} style={styles.fill}>
        {games.map(game => {
          const {
            id,
            sport,
            place: {
              location: { latitude, longitude },
            },
          } = game
          return (
            <Marker
              key={id}
              coordinate={{ latitude, longitude }}
              onPress={navigateToViewGame(game, currentGame =>
                navigate('ViewGame', { gameId: currentGame.id })
              )}
            >
              <Image source={sports[sport].icon} style={styles.image} />
            </Marker>
          )
        })}
      </MapView>
      <Button
        mode="contained"
        icon="replay"
        onPress={onResetRegion}
        style={styles.resetButton}
        color={Colors.orange50}
      >
        Reset
      </Button>
      <IconButton
        icon="add-circle"
        size={64}
        color={theme.colors.accent}
        onPress={() => navigate('CreateGame')}
        style={styles.addIcon}
      />
    </View>
  )
}

const mapStateToProps = state => ({
  region: state[regionState.STORE_NAME].region,
  games: state[gamesState.STORE_NAME].games,
})
const mapDispatchToProps = {
  onResetRegion: regionState.actions.resetRegion,
  onUpdateRegion: regionState.actions.setRegion,
}

Map.propTypes = {
  region: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    latitudeDelta: PropTypes.number.isRequired,
    longitudeDelta: PropTypes.number.isRequired,
  }).isRequired,
  games: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      sport: PropTypes.string,
      place: PropTypes.object,
      datetime: PropTypes.instanceOf(Date),
    })
  ).isRequired,
  onResetRegion: PropTypes.func.isRequired,
  onUpdateRegion: PropTypes.func.isRequired,
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      accent: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(Map))
