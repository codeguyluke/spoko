import { types } from './region.actions'

const INITIAL_STATE = {
  region: null,
  country: '',
  initialRegion: null,
}

export default function regionReducer(state = INITIAL_STATE, action = { type: '' }) {
  switch (action.type) {
    case types.SET_INITIAL_REGION: {
      return {
        ...state,
        region: action.payload,
        initialRegion: action.payload,
      }
    }
    case types.SET_REGION: {
      return {
        ...state,
        region: action.payload,
      }
    }
    case types.RESET_REGION: {
      return {
        ...state,
        region: state.initialRegion,
      }
    }
    case types.SET_COUNTRY: {
      return {
        ...state,
        country: action.payload,
      }
    }
    default:
      return state
  }
}
