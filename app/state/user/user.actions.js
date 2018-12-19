export const types = {
  EDIT_CURRENT_USER_STARTED: 'EDIT_CURRENT_USER_STARTED',
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

function editCurrentUserStarted({ id, ...props }, onSuccess) {
  return {
    type: types.EDIT_CURRENT_USER_STARTED,
    payload: { id, onSuccess, ...props },
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
  editCurrentUserStarted,
  currentUserUpdated,
  currentUserUpdateError,
  currentUserUpdateSuccess,
}
