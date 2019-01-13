import { types } from './filters.actions'

const INITIAL_STATE = {
  sports: [],
}

export default function filtersReducer(state = INITIAL_STATE, action = { type: '' }) {
  switch (action.type) {
    case types.SET_SPORT_FILTER:
      return {
        ...state,
        sports: action.payload,
      }
    default:
      return state
  }
}
