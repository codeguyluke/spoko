import firebase from 'react-native-firebase'

const gamesRef = firebase.firestore().collection('games')
const usersRef = firebase.firestore().collection('users')

export const getUser = async ({ id }) => usersRef.doc(id).get()

export const createUser = async ({ id, displayName, phoneNumber, createdGames, playedGames }) =>
  usersRef.doc(id).set({
    displayName,
    phoneNumber,
    createdGames,
    playedGames,
  })

export const editUser = async ({ id, displayName, createdGames, playedGames }) =>
  usersRef.doc(id).set({ displayName, createdGames, playedGames }, { merge: true })

export const subscribeToCurrentUser = async callback => {
  const currentUserId = firebase.auth().currentUser && firebase.auth().currentUser.uid
  return usersRef.doc(currentUserId).onSnapshot(callback)
}

export const getGame = async ({ id }) => gamesRef.doc(id).get()

export const createGame = async ({ sport, place, time, spots }) => {
  const userId = firebase.auth().currentUser.uid
  return gamesRef.add({ sport, place, time, spots, ownerId: userId, players: [] })
}

export const deleteGame = async ({ id }) => gamesRef.doc(id).delete()

export const editGame = async ({ sport, place, time, spots, id }) =>
  gamesRef.doc(id).set({ sport, place, time, spots }, { merge: true })

export const subscribeToFutureGames = async callback => {
  const currentDate = new Date()
  return gamesRef.where('time', '>', currentDate).onSnapshot(callback)
}
