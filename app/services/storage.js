import firebase from 'react-native-firebase'
import axios from 'axios'

const avatarsRef = firebase.storage().ref('avatars')

export const uploadAvatar = async uri => {
  const avatarRef = avatarsRef.child(`${firebase.auth().currentUser.uid}.jpg`)
  await avatarRef.put(uri)
  return avatarRef.getDownloadURL()
}

export const downloadAvatar = async url => axios.get(url, { responseType: 'blob' })
