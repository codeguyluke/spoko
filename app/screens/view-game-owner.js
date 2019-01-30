import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { withTheme, Button, Colors } from 'react-native-paper'
import PropTypes from 'prop-types'
import { InfoRow, Loader } from '../components'

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  stack: {
    marginTop: 16,
  },
})

function ViewGameOwner({ game, theme, onEditGame, onCancelGame, loading }) {
  const { sport, place, datetime, price } = game
  return (
    <React.Fragment>
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <ScrollView style={styles.scrollViewContainer}>
          <InfoRow type="sport" value={sport} />
          <InfoRow type="place" value={place} />
          <InfoRow type="datetime" value={datetime} />
          <InfoRow type="price" value={price} />
        </ScrollView>
        <View style={styles.buttonsContainer}>
          <Button
            mode="contained"
            style={styles.button}
            onPress={onEditGame}
            color={Colors.blue500}
            icon="edit"
          >
            Edit game
          </Button>
          <Button
            mode="contained"
            style={[styles.button, styles.stack]}
            onPress={onCancelGame}
            color={theme.colors.error}
            icon="delete"
          >
            Cancel game
          </Button>
        </View>
      </View>
      {loading && <Loader />}
    </React.Fragment>
  )
}

ViewGameOwner.propTypes = {
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
    price: PropTypes.shape({
      value: PropTypes.string.isRequired,
      currency: PropTypes.string.isRequired,
    }).isRequired,
    players: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string })).isRequired,
  }).isRequired,
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      background: PropTypes.string.isRequired,
      error: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onEditGame: PropTypes.func.isRequired,
  onCancelGame: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default withTheme(ViewGameOwner)
