import { types } from './region.actions'

let initialRegion = null

const INITIAL_STATE = {
  region: null,
}

export default function regionReducer(state = INITIAL_STATE, action = { type: '' }) {
  switch (action.type) {
    case types.GET_INITIAL_REGION_SUCCESS: {
      initialRegion = action.payload
      return {
        ...state,
        region: initialRegion,
      }
    }
    case types.REGION_UPDATED: {
      return {
        ...state,
        region: action.payload,
      }
    }
    case types.REGION_RESET: {
      return {
        ...state,
        region: initialRegion,
      }
    }
    default:
      return state
  }
}
