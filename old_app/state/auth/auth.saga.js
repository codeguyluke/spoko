import { all, takeEvery, put, call, select } from 'redux-saga/effects'
import { signInWithPhoneNumber, confirmCode, signOut } from '../../services/firebase/auth'
import actions, { types } from './auth.actions'

export const STORE_NAME = 'auth'

function* signInSaga({ payload: { phone } }) {
  try {
    const confirmResult = yield call(signInWithPhoneNumber, phone)
    yield put(actions.verificationCodeSent(confirmResult))
  } catch (error) {
    yield put(actions.signInError(error.message))
  }
}

function* confirmCodeSaga({ payload: { code } }) {
  try {
    const confirmResult = yield select(state => state[STORE_NAME].confirmResult)
    yield call(confirmCode, confirmResult, code)
  } catch (error) {
    yield put(actions.codeConfirmationError(error.message))
  }
}

function* signOutSaga() {
  try {
    yield call(signOut)
  } catch (error) {
    console.error(error)
  }
}

export default function* authSaga() {
  yield all([
    yield takeEvery(types.SIGN_IN_STARTED, signInSaga),
    yield takeEvery(types.CODE_CONFIRMATION_STARTED, confirmCodeSaga),
    yield takeEvery(types.SIGN_OUT_STARTED, signOutSaga),
  ])
}
