export const types = {
  USER_UNAUTHORIZED: 'USER_UNAUTHORIZED',
  VERIFICATION_CODE_SENT: 'VERIFICATION_CODE_SENT',
  USER_AUTHORIZED: 'USER_AUTHORIZED',
  SIGN_IN_STARTED: 'SIGN_IN_STARTED',
  SIGN_IN_ERROR: 'SIGN_IN_ERROR',
  CODE_CONFIRMATION_STARTED: 'CODE_CONFIRMATION_STARTED',
  CODE_CONFIRMATION_ERROR: 'CODE_CONFIRMATION_ERROR',
  SIGN_OUT_STARTED: 'SIGN_OUT_STARTED',
}

function userUnauthorized() {
  return {
    type: types.USER_UNAUTHORIZED,
  }
}

function userAuthorized() {
  return {
    type: types.USER_AUTHORIZED,
  }
}

function signInStarted(phone) {
  return {
    type: types.SIGN_IN_STARTED,
    payload: { phone },
  }
}

function verificationCodeSent(confirmResult) {
  return {
    type: types.VERIFICATION_CODE_SENT,
    payload: { confirmResult },
  }
}

function signInError(error) {
  return {
    type: types.SIGN_IN_ERROR,
    payload: error,
  }
}

function codeConfirmationStarted(code) {
  return {
    type: types.CODE_CONFIRMATION_STARTED,
    payload: { code },
  }
}

function codeConfirmationError(error) {
  return {
    type: types.CODE_CONFIRMATION_ERROR,
    payload: error,
  }
}

function signOutStarted() {
  return {
    type: types.SIGN_OUT_STARTED,
  }
}

export default {
  userUnauthorized,
  verificationCodeSent,
  userAuthorized,
  signInStarted,
  signInError,
  codeConfirmationStarted,
  codeConfirmationError,
  signOutStarted,
}
