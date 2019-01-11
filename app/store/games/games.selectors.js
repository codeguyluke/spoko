import firebase from 'react-native-firebase'

export const STORE_NAME = 'games'

const currentUserId = firebase.auth().currentUser.uid
const selectScheduledGames = state =>
  state[STORE_NAME].games.filter(game => game.ownerId === currentUserId)

export default { selectScheduledGames }
