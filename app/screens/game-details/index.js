import React from 'react'
import { ScrollView, View, Text } from 'react-native'
import PropTypes from 'prop-types'
import GameMap from './components/game-map'
import { getTimeStringLong } from '../../helpers/time'
import { SpotsPicker } from '../../components'
import styles from './styles'

export default function GameDetails({ navigation }) {
  const game = navigation.getParam('game')
  const { place, sport, spots, time } = game

  return (
    <View style={styles.container}>
      <GameMap location={place.location} sport={sport} time={time} />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="always"
      >
        <Text style={styles.value}>{sport}</Text>
        <Text style={styles.placeDescription}>{place.description}</Text>
        <Text style={styles.value}>{getTimeStringLong(time)}</Text>
        <SpotsPicker spots={spots} onSpotsChange={() => {}} label="Spots" />
      </ScrollView>
    </View>
  )
}

GameDetails.propTypes = {
  navigation: PropTypes.shape({ getParam: PropTypes.func.isRequired }).isRequired,
}
