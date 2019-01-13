import firebase from 'react-native-firebase'
import filtersState from '../filters'

export const STORE_NAME = 'games'

const selectScheduledGames = state =>
  state[STORE_NAME].games.filter(
    game =>
      game.ownerId === firebase.auth().currentUser.uid ||
      game.players.some(player => player.id === firebase.auth().currentUser.uid)
  )

const selectGameById = (state, id) => state[STORE_NAME].games.find(game => game.id === id)

const selectFilteredGames = state => {
  const allowedSports = state[filtersState.STORE_NAME].sports
  return state[STORE_NAME].games.filter(game => allowedSports.includes(game.sport))
}

export default { selectScheduledGames, selectGameById, selectFilteredGames }
