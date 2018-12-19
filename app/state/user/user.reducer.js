import { types } from './user.actions'

const INITIAL_STATE = {
  currentUser: null,
  loading: false,
  error: '',
}

export default function userReducer(state = INITIAL_STATE, action = { type: '' }) {
  switch (action.type) {
    case types.EDIT_CURRENT_USER_STARTED:
      return {
        ...state,
        loading: true,
        error: '',
      }
    case types.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
        loading: false,
        error: '',
      }
    case types.CURRENT_USER_UPDATE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case types.CURRENT_USER_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
      }
    default:
      return state
  }
}
