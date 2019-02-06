import { Linking, Platform, Alert } from 'react-native'

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

export const showInMap = async (latitude, longitude) => {
  try {
    const coords = `${latitude},${longitude}`
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' })
    const url = Platform.select({
      ios: `${scheme}${coords}`,
      android: `${scheme}${coords}`,
    })

    const supported = await Linking.canOpenURL(url)
    if (!supported) {
      return Alert.alert('Failed to open map application. Please try again.')
    }

    return Linking.openURL(url)
  } catch (error) {
    return Alert.alert(`Failed to open map application. Please try again.`)
  }
}
