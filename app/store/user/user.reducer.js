import { types } from './user.actions'

const INITIAL_STATE = {
  currentUser: null,
}

export default function userReducer(state = INITIAL_STATE, action = { type: '' }) {
  switch (action.type) {
    case types.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      }
    default:
      return state
  }
}
