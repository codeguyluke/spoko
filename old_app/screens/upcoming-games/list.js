import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import gamesState from '../../state/games'
import { GamePropType } from '../../helpers/prop-types'
import GameRow from './components/game-row'
import colors from '../../style/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noUpcomingGamesContainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: 'rgb(255, 255, 255)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noUpcomingGamesText: {
    color: colors.navy,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    alignSelf: 'center',
  },
})

class UpcomingGamesList extends Component {
  static propTypes = {
    games: PropTypes.arrayOf(GamePropType).isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      addListener: PropTypes.func.isRequired,
    }).isRequired,
  }

  handleGamePress = game => () => {
    this.props.navigation.navigate('Details', { game })
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {this.props.games && this.props.games.length > 0 ? (
          <FlatList
            data={this.props.games}
            renderItem={({ item }) => <GameRow game={item} onPress={this.handleGamePress(item)} />}
            keyExtractor={item => item.id}
          />
        ) : (
          <View style={styles.noUpcomingGamesContainer}>
            <Text style={styles.noUpcomingGamesText}>
              You have no upcoming games! Please sign up to one from the Home tab or create a new
              one!
            </Text>
          </View>
        )}
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({
  games: state[gamesState.STORE_NAME].userGames,
})

export default connect(mapStateToProps)(UpcomingGamesList)
