import { all, takeEvery, put, select, call } from 'redux-saga/effects'
import { updateUserDisplayName } from '../../services/firebase/firestore'
import actions, { types } from './user.actions'
import toastState from '../toast'

export const STORE_NAME = 'user'

function* updateCurrentUserDisplayNameSaga({ payload: { id, name, onSuccess } }) {
  try {
    yield call(updateUserDisplayName, { id, name })
    yield put(actions.currentUserUpdateSuccess())
    yield call(onSuccess)
    yield put(toastState.actions.addToast('success', "User's display name updated."))
  } catch (error) {
    yield put(actions.currentUserUpdateError(error.message))
    yield put(toastState.actions.addToast('error', 'Failed to update display name.'))
  }
}

function* userUpdatedSaga({ payload: { userDoc } }) {
  try {
    const currentUser = yield select(state => state[STORE_NAME].currentUser)
    const user = { ...currentUser, id: userDoc.id, ...userDoc.data() }
    yield put(actions.setCurrentUser(user))
  } catch (error) {
    yield put(actions.currentUserUpdateError(error.message))
    yield put(toastState.actions.addToast('error', "Couldn't fetch user."))
  }
}

export default function* userSaga() {
  yield all([
    yield takeEvery(
      types.UPDATE_CURRENT_USER_DISPLAY_NAME_STARTED,
      updateCurrentUserDisplayNameSaga
    ),
    yield takeEvery(types.CURRENT_USER_UPDATED, userUpdatedSaga),
  ])
}
