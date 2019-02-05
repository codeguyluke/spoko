import { Linking, Alert } from 'react-native'

export const callPhone = async number => {
  try {
    const phoneNumber = `tel:${number}`
    const supported = await Linking.canOpenURL(phoneNumber)
    if (!supported) {
      return Alert.alert('Phone number is not available.')
    }
    return Linking.openURL(phoneNumber)
  } catch (error) {
    return Alert.alert(`Failed to call ${number}. Please try again.`)
  }
}
