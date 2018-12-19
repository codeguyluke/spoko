import { all, take, takeEvery, put, call } from 'redux-saga/effects'
import { getUser, createUser } from '../../services/firebase/firestore'
import authState from '../auth'
import regionState from '../region'
import userState from '../user'
import actions, { types } from './app.actions'

function* authStateChangedSaga({ payload: { user } }) {
  try {
    if (!user) {
      yield put(authState.actions.userUnauthorized())
      yield put(userState.actions.setCurrentUser(null))
      yield put(actions.appInitialized())
      return
    }

    yield put(actions.appUinitialized())
    yield put(authState.actions.userAuthorized())
    yield put(regionState.actions.getInitialRegionStarted())
    yield take(regionState.types.GET_INITIAL_REGION_SUCCESS)

    const userDoc = yield call(getUser, { id: user.uid })
    if (userDoc.exists) {
      yield put(userState.actions.setCurrentUser({ ...userDoc.data(), id: userDoc.id }))
    } else {
      const INITIAL_USER = {
        id: user.uid,
        displayName: 'Anonymous',
        phoneNumber: user.phoneNumber,
        createdGames: [],
        playedGames: [],
      }
      yield call(createUser, INITIAL_USER)
      yield put(userState.actions.setCurrentUser(INITIAL_USER))
    }

    yield put(actions.appInitialized())
  } catch (error) {
    console.error(error)
  }
}

export default function* appSaga() {
  yield all([yield takeEvery(types.AUTH_STATE_CHANGED, authStateChangedSaga)])
}
