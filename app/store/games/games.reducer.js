import { types } from './games.actions'

const INITIAL_STATE = {
  games: [],
}

export default function gamesReducer(state = INITIAL_STATE, action = { type: '' }) {
  switch (action.type) {
    case types.SET_GAMES:
      return {
        ...state,
        games: action.payload,
      }
    default:
      return state
  }
}
