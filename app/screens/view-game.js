import React from 'react'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { withTheme } from 'react-native-paper'
import MapView, { Marker } from 'react-native-maps'
import { Avatar } from 'react-native-elements'
import PropTypes from 'prop-types'
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
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  avatar: {
    borderWidth: 4,
    borderColor: '#FFF',
  },
})

function ViewGame({ navigation, theme }) {
  const game = navigation.getParam('game')
  const {
    sport,
    place: {
      location: { latitude, longitude },
    },
  } = game
  return (
    <View style={styles.container}>
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
      <ScrollView
        contentContainerStyle={[styles.contentContainer, { backgroundColor: theme.colors.background }]}
      >
        <Text>{JSON.stringify(game)}</Text>
      </ScrollView>
    </View>
  )
}

ViewGame.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
  }).isRequired,
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      background: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default withTheme(ViewGame)
