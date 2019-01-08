import firebase from 'react-native-firebase'

const gamesRef = firebase.firestore().collection('games')
const usersRef = firebase.firestore().collection('users')

export const getUserById = async id => usersRef.doc(id).get()

export const subscribeToUser = async (id, callback) => usersRef.doc(id).onSnapshot(callback)

export const createUser = async (id, user) => usersRef.doc(id).set({ ...user })
