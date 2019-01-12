import firebase from 'react-native-firebase'

const gamesRef = firebase.firestore().collection('games')

export const subscribeToGames = async callback => {
  const currentDate = new Date()
  return gamesRef.where('datetime', '>', currentDate).onSnapshot(callback)
}

export const createGame = async game => {
  const currentUserId = firebase.auth().currentUser.uid
  return gamesRef.add({ ...game, ownerId: currentUserId, players: [] })
}

export const cancelGame = async id => gamesRef.doc(id).delete()

export const editGame = async (id, game) => gamesRef.doc(id).set({ ...game }, { merge: true })

export const joinGame = async game => {
  const { uid, phoneNumber, photoURL } = firebase.auth().currentUser
  const newPlayers = [...game.players, { id: uid, phoneNumber, photoURL }]
  return gamesRef.doc(game.id).set({ players: newPlayers }, { merge: true })
}
