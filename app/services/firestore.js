import firebase from 'react-native-firebase'

const gamesRef = firebase.firestore().collection('games')
const usersRef = firebase.firestore().collection('users')

export const getUserByPhone = async phone => usersRef.where('phoneNumber', '==', phone).get()

export const getUserById = async id => usersRef.doc(id).get()

export const createUser = async ({ id, displayName, phoneNumber, createdGames, playedGames }) =>
  usersRef.doc(id).set({
    displayName,
    phoneNumber,
    createdGames,
    playedGames,
  })
