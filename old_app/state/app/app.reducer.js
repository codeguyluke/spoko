import { types } from './app.actions'

const INITIAL_STATE = {
  initialized: false,
}

export default function appReducer(state = INITIAL_STATE, action = { type: '' }) {
  switch (action.type) {
    case types.APP_INITIALIZED:
      return {
        ...state,
        initialized: true,
      }
    case types.APP_UNINITIALIZED:
      return {
        ...state,
        initialized: false,
      }
    default:
      return state
  }
}
