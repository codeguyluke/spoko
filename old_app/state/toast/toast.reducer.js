import { types } from './toast.actions'

const INITIAL_STATE = {
  toast: null,
}

export default function toastReducer(state = INITIAL_STATE, action = { type: '' }) {
  switch (action.type) {
    case types.ADD_TOAST:
      return {
        ...state,
        toast: action.payload,
      }
    case types.REMOVE_TOAST:
      return {
        ...state,
        toast: null,
      }
    default:
      return state
  }
}
