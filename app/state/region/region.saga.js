import { all, takeEvery, takeLatest, put, call } from 'redux-saga/effects'
import { requestLocationPermission } from '../../services/permissions'
import actions, { types } from './region.actions'

const DEFAULT_REGION = {
  latitude: 51.507242,
  longitude: -0.127614,
  latitudeDelta: 0.2,
  longitudeDelta: 0.2,
}
const GEOLOCATION_DISTANCE_FILTER = 10
const GEOLOCATION_TIMEOUT = 2000

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

function* getInitialRegionSaga() {
  try {
    yield call(requestLocationPermission)
    const initialRegion = yield call(getCurrentRegion)
    yield put(actions.getInitialRegionSuccess(initialRegion))
  } catch (error) {
    yield put(actions.getInitialRegionSuccess(DEFAULT_REGION))
  }
}

function* regionUpdateSaga({ payload: { region } }) {
  try {
    const { latitude, longitude, latitudeDelta, longitudeDelta } = region
    if (!latitude || !longitude || !latitudeDelta || !longitudeDelta) return
    yield put(actions.regionUpdated(region))
  } catch (error) {
    console.error(error)
  }
}

export default function* regionSaga() {
  yield all([
    yield takeEvery(types.GET_INITIAL_REGION_STARTED, getInitialRegionSaga),
    yield takeLatest(types.REGION_UPDATE_REQUESTED, regionUpdateSaga),
  ])
}
