import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import userState from '../../state/user'
import { Loader } from '../../components'
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
    loading: PropTypes.bool.isRequired,
    onGetUpcomingGames: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      addListener: PropTypes.func.isRequired,
    }).isRequired,
  }

  static getDerivedStateFromProps(props, state) {
    if (props.loading && state.stage === 'uninitialized') {
      return { stage: 'initializing' }
    }

    if (!props.loading && state.stage === 'initializing') {
      return { stage: 'initialized' }
    }

    return null
  }

  state = {
    stage: 'uninitialized',
  }

  componentDidMount() {
    let focusCounter = 0
    this.props.onGetUpcomingGames()
    this.willFocusSubscription = this.props.navigation.addListener('willFocus', () =>
      this.setState(state => {
        if (['uninitialized', 'initializing'].includes(state.stage)) return null
        focusCounter += 1
        return { stage: `focused${focusCounter}` }
      })
    )
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove()
  }

  handleGamePress = game => () => {
    this.props.navigation.navigate('GameDetails', { game })
  }

  render() {
    const { loading, games, onGetUpcomingGames } = this.props

    if (['uninitialized', 'initializing'].includes(this.state.stage)) return <Loader />

    return (
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            progressBackgroundColor="rgb(255, 255, 255)"
            tintColor={colors.green}
            refreshing={loading}
            onRefresh={onGetUpcomingGames}
          />
        }
      >
        {games && games.length > 0 ? (
          <FlatList
            data={games}
            renderItem={({ item }) => <GameRow game={item} onPress={this.handleGamePress(item)} />}
            keyExtractor={item => item.id}
            extraData={this.state.stage}
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
  games: state[userState.STORE_NAME].currentUser.jointGames,
  loading: state[userState.STORE_NAME].loading,
})
const mapDispatchToProps = {
  onGetUpcomingGames: userState.actions.getUpcomingGamesStarted,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpcomingGamesList)
