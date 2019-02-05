import firebase from 'react-native-firebase'

const gamesRef = firebase.firestore().collection('games')

export const subscribeToGames = async callback => {
  const currentDate = new Date()
  return gamesRef.where('datetime', '>', currentDate).onSnapshot(callback)
}

export const createGame = async game => {
  const { uid, displayName, phoneNumber, photoURL } = firebase.auth().currentUser
  return gamesRef.add({ ...game, owner: { id: uid, displayName, phoneNumber, photoURL } })
}

export const cancelGame = async id => gamesRef.doc(id).delete()

export const editGame = async (id, game) => gamesRef.doc(id).set({ ...game }, { merge: true })

export const joinGame = async game => {
  const { uid, displayName, phoneNumber, photoURL } = firebase.auth().currentUser
  const newPlayers = [...game.players]
  const emptyPlayerIndex = newPlayers.findIndex(player => player.id === 'player')
  if (emptyPlayerIndex < 0) return null

  newPlayers[emptyPlayerIndex] = { id: uid, displayName, phoneNumber, photoURL }
  return gamesRef.doc(game.id).set({ players: newPlayers }, { merge: true })
}

export const leaveGame = async game => {
  const currentUserId = firebase.auth().currentUser.uid
  const newPlayers = [...game.players]
  const playerIndex = newPlayers.findIndex(player => player.id === currentUserId)
  if (playerIndex > -1) {
    newPlayers.splice(playerIndex, 1, { id: 'player', phoneNumber: '', photoURL: '' })
  }
  return gamesRef.doc(game.id).set({ players: newPlayers }, { merge: true })
}
