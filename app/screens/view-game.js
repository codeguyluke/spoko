import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { withTheme, FAB, Button, Colors } from 'react-native-paper'
import MapView, { Marker } from 'react-native-maps'
import { Avatar } from 'react-native-elements'
import firebase from 'react-native-firebase'
import PropTypes from 'prop-types'
import { InfoRow } from '../components'
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
  buttonMargin: {
    margin: 16,
  },
  button: {
    paddingVertical: 8,
  },
  stack: {
    marginTop: 16,
  },
})

function ViewGame({ navigation, theme }) {
  const game = navigation.getParam('game')
  const { ownerId, sport, place, datetime, players } = game
  const {
    location: { latitude, longitude },
  } = place
  const owned = ownerId === firebase.auth().currentUser.uid
  const played = players.some(player => player.id === firebase.auth().currentUser.uid)

  return (
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
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <InfoRow large type="sport" value={sport} />
        <InfoRow large type="place" value={place} />
        <InfoRow large type="datetime" value={datetime} />
      </ScrollView>
      {!(owned || played) && <FAB label="Join" onPress={() => {}} style={styles.buttonMargin} />}
      {played && (
        <Button
          mode="outlined"
          onPress={() => {}}
          style={[styles.buttonMargin, styles.button]}
          color={theme.colors.error}
        >
          Exit game
        </Button>
      )}
      {owned && (
        <View style={styles.buttonMargin}>
          <Button mode="contained" style={styles.button} onPress={() => {}} color={Colors.blue500}>
            Edit game
          </Button>
          <Button
            mode="contained"
            style={[styles.button, styles.stack]}
            onPress={() => {}}
            color={theme.colors.error}
          >
            Cancel game
          </Button>
        </View>
      )}
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
      error: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default withTheme(ViewGame)
