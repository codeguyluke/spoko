export const types = {
  AUTH_STATE_CHANGED: 'AUTH_STATE_CHANGED',
  APP_INITIALIZED: 'APP_INITIALIZED',
  APP_UNINITIALIZED: 'APP_UNINITIALIZED',
}

function authStateChanged(user) {
  return {
    type: types.AUTH_STATE_CHANGED,
    payload: { user },
  }
}

function appInitialized() {
  return {
    type: types.APP_INITIALIZED,
  }
}

function appUinitialized() {
  return {
    type: types.APP_UNINITIALIZED,
  }
}

export default {
  authStateChanged,
  appInitialized,
  appUinitialized,
}
