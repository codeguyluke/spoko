import axios from 'axios'
import keys from '../config/keys'

const DEFAULT_REGION = {
  latitude: 51.507242,
  longitude: -0.127614,
  latitudeDelta: 0.2,
  longitudeDelta: 0.2,
}
const GEOLOCATION_DISTANCE_FILTER = 10
const GEOLOCATION_TIMEOUT = 2000
const GOOGLE_GEOCODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json?'

const getCurrentRegion = () =>
  new Promise(resolve => {
    navigator.geolocation.getCurrentPosition(
      position =>
        resolve({
          ...DEFAULT_REGION,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      () => resolve(DEFAULT_REGION),
      {
        timeout: GEOLOCATION_TIMEOUT,
        distanceFilter: GEOLOCATION_DISTANCE_FILTER,
      }
    )
  })

const getCurrentCountry = async region => {
  try {
    const { latitude, longitude } = region
    const latlng = `${latitude},${longitude}`
    const response = await axios.get(GOOGLE_GEOCODE_URL, {
      params: { latlng, sensor: true, result_type: 'country', key: keys.GOOGLE_MAPS_API_KEY },
    })
    const {
      data: { results },
    } = response
    return results[0].address_components[0].short_name
  } catch (error) {
    console.error(error)
    return 'GB'
  }
}

export { getCurrentRegion, getCurrentCountry, DEFAULT_REGION }
