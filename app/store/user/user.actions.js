export const types = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
}

function setCurrentUser(user) {
  return {
    type: types.SET_CURRENT_USER,
    payload: user,
  }
}

export default {
  setCurrentUser,
}
