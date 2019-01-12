import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, FlatList } from 'react-native'
import { withTheme } from 'react-native-paper'
import PropTypes from 'prop-types'
import gamesState from '../store/games'
import { GameItem } from '../components'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

function Scheduled({ scheduledGames, theme, navigation }) {
  return (
    <FlatList
      data={scheduledGames}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      renderItem={({ item }) => (
        <GameItem {...item} onPress={() => navigation.navigate('ViewGame', { game: item })} />
      )}
      keyExtractor={item => item.id}
    />
  )
}

Scheduled.propTypes = {
  scheduledGames: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      sport: PropTypes.string,
      place: PropTypes.object,
      datetime: PropTypes.instanceOf(Date),
    })
  ).isRequired,
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      background: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default connect(state => ({
  scheduledGames: gamesState.selectors.selectScheduledGames(state),
}))(withTheme(Scheduled))
