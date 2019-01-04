import firebase from 'react-native-firebase'

export const signInWithPhoneNumber = async phone => firebase.auth().signInWithPhoneNumber(phone)

export const confirmCode = async (confirmResult, code) => confirmResult.confirm(code)

export const signOut = async () => firebase.auth().signOut()
