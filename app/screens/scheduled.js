import React from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, FlatList } from 'react-native'
import { withTheme, Paragraph } from 'react-native-paper'
import PropTypes from 'prop-types'
import gamesState from '../store/games'
import { GameItem } from '../components'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    padding: 16,
  },
})

function Scheduled({ scheduledGames, theme, navigation }) {
  return scheduledGames.length > 0 ? (
    <FlatList
      data={scheduledGames}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      renderItem={({ item }) => (
        <GameItem {...item} onPress={() => navigation.navigate('ViewGame', { gameId: item.id })} />
      )}
      keyExtractor={item => item.id}
    />
  ) : (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Paragraph style={styles.text}>You have no scheduled games at the moment!</Paragraph>
    </View>
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
