import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import MapView, { Marker } from 'react-native-maps'
import { Icon } from 'react-native-elements'
import PropTypes from 'prop-types'
import { Loader, GamePin } from '../../components'
import { subscribeToFutureGames, subscribeToCurrentUser } from '../../services/firebase/firestore'
import gamesState from '../../state/games'
import userState from '../../state/user'
import regionState from '../../state/region'
import colors from '../../style/colors'
import { GamePropType, RegionPropType } from '../../helpers/prop-types'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  iconContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 40,
    height: 40,
    marginVertical: 4,
    paddingTop: 3,
    paddingLeft: 3,
    borderWidth: 1,
    borderColor: colors.navy,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
})

class Map extends Component {
  static propTypes = {
    region: RegionPropType.isRequired,
    onResetRegion: PropTypes.func.isRequired,
    onUpdateRegion: PropTypes.func.isRequired,
    initialized: PropTypes.bool.isRequired,
    games: PropTypes.arrayOf(GamePropType).isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    onGamesUpdated: PropTypes.func.isRequired,
    onCurrentUserUpdated: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.unsubscribeFromGames = subscribeToFutureGames(this.props.onGamesUpdated)
    this.unsubscribeFromUser = subscribeToCurrentUser(this.props.onCurrentUserUpdated)
  }

  componentWillUnmount() {
    this.unsubscribeFromGames()
    this.unsubscribeFromUser()
  }

  handleGamePress = game => () => {
    this.props.navigation.navigate('Details', { game })
  }

  render() {
    const { region, onResetRegion, onUpdateRegion, initialized, games } = this.props

    return (
      <React.Fragment>
        <View style={styles.container}>
          <MapView region={region} onRegionChangeComplete={onUpdateRegion} style={styles.map}>
            {games.map(game => {
              const {
                id,
                sport,
                time,
                place: {
                  location: { latitude, longitude },
                },
              } = game
              return (
                <Marker key={id} coordinate={{ latitude, longitude }}>
                  <TouchableOpacity onPress={this.handleGamePress(game)}>
                    <GamePin sport={sport} time={time} />
                  </TouchableOpacity>
                </Marker>
              )
            })}
          </MapView>
          <Icon
            containerStyle={styles.iconContainer}
            type="material-community"
            name="restart"
            size={24}
            color={colors.navy}
            onPress={onResetRegion}
          />
        </View>
        {!initialized && <Loader />}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  games: state[gamesState.STORE_NAME].games,
  initialized: state[gamesState.STORE_NAME].initialized,
  region: state[regionState.STORE_NAME].region,
})
const mapDispatchToProps = {
  onResetRegion: regionState.actions.regionReset,
  onUpdateRegion: regionState.actions.regionUpdateRequested,
  onGamesUpdated: gamesState.actions.gamesSnapshotUpdated,
  onCurrentUserUpdated: userState.actions.currentUserUpdated,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)
