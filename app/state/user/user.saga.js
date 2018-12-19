import { all, takeEvery, put, select, call } from 'redux-saga/effects'
import { editUser } from '../../services/firebase/firestore'
import actions, { types } from './user.actions'
import toastState from '../toast'

export const STORE_NAME = 'user'

function* editCurrentUserSaga({ payload: { id, onSuccess, ...props } }) {
  try {
    const currentUser = yield select(state => state[STORE_NAME].currentUser)
    yield call(editUser, { id, ...currentUser, ...props })
    yield put(actions.currentUserUpdateSuccess())
    yield call(onSuccess)
    yield put(toastState.actions.addToast('success', 'User edited.'))
  } catch (error) {
    yield put(actions.currentUserUpdateError(error.message))
    yield put(toastState.actions.addToast('error', 'Failed to edit user.'))
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
    yield takeEvery(types.EDIT_CURRENT_USER_STARTED, editCurrentUserSaga),
    yield takeEvery(types.CURRENT_USER_UPDATED, userUpdatedSaga),
  ])
}
