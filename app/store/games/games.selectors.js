import firebase from 'react-native-firebase'

export const STORE_NAME = 'games'

const selectScheduledGames = state =>
  state[STORE_NAME].games.filter(
    game =>
      game.ownerId === firebase.auth().currentUser.uid ||
      game.players.some(player => player.id === firebase.auth().currentUser.uid)
  )

const selectGameById = (state, id) => state[STORE_NAME].games.find(game => game.id === id)

export default { selectScheduledGames, selectGameById }
