import { types } from './filters.actions'

const INITIAL_STATE = {
  sports: [],
  dates: [],
  price: 'Infinity',
}

export default function filtersReducer(state = INITIAL_STATE, action = { type: '' }) {
  switch (action.type) {
    case types.SET_SPORT_FILTER:
      return {
        ...state,
        sports: action.payload,
      }
    case types.SET_DATE_FILTER:
      return {
        ...state,
        dates: action.payload,
      }
    case types.SET_PRICE_FILTER:
      return {
        ...state,
        price: action.payload,
      }
    default:
      return state
  }
}
