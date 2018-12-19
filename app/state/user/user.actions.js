export const types = {
  UPDATE_CURRENT_USER_DISPLAY_NAME_STARTED: 'UPDATE_CURRENT_USER_DISPLAY_NAME_STARTED',
  SET_CURRENT_USER: 'SET_CURRENT_USER',
  CURRENT_USER_UPDATED: 'CURRENT_USER_UPDATED',
  CURRENT_USER_UPDATE_ERROR: 'CURRENT_USER_UPDATE_ERROR',
  CURRENT_USER_UPDATE_SUCCESS: 'CURRENT_USER_UPDATE_SUCCESS',
}

function setCurrentUser(user) {
  return {
    type: types.SET_CURRENT_USER,
    payload: user,
  }
}

function updateCurrentUserDisplayNameStarted({ id, name }, onSuccess) {
  return {
    type: types.UPDATE_CURRENT_USER_DISPLAY_NAME_STARTED,
    payload: { id, name, onSuccess },
  }
}

function currentUserUpdated(userDoc) {
  return {
    type: types.CURRENT_USER_UPDATED,
    payload: { userDoc },
  }
}

function currentUserUpdateError(error) {
  return {
    type: types.CURRENT_USER_UPDATE_ERROR,
    payload: error,
  }
}

function currentUserUpdateSuccess() {
  return {
    type: types.CURRENT_USER_UPDATE_SUCCESS,
  }
}

export default {
  setCurrentUser,
  updateCurrentUserDisplayNameStarted,
  currentUserUpdated,
  currentUserUpdateError,
  currentUserUpdateSuccess,
}
