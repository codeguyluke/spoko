import axios from 'axios'
import keys from '../config/keys'

const GOOGLE_PLACE_DETAILS_URL = 'https://maps.googleapis.com/maps/api/place/details/json?'

export function getGooglePlaceDetails({ id }) {
  return axios.get(GOOGLE_PLACE_DETAILS_URL, {
    params: { placeid: id, key: keys.GOOGLE_PLACES_API_KEY },
  })
}
