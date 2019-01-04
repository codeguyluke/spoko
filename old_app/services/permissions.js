import Permissions from 'react-native-permissions'

export const requestLocationPermission = async () => Permissions.request('location')
