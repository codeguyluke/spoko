import { types } from './games.actions'

const INITIAL_STATE = {
  games: [],
  userGames: [],
  loading: false,
  initialized: false,
  error: '',
}

export default function gamesReducer(state = INITIAL_STATE, action = { type: '' }) {
  switch (action.type) {
    case types.CREATE_GAME_STARTED:
      return {
        ...state,
        loading: true,
        error: '',
      }
    case types.EDIT_GAME_STARTED:
      return {
        ...state,
        loading: true,
        error: '',
      }
    case types.DELETE_GAME_STARTED:
      return {
        ...state,
        loading: true,
        error: '',
      }
    case types.GAMES_UPDATED:
      return {
        ...state,
        games: action.payload.openGames,
        userGames: action.payload.userGames,
        initialized: true,
        error: '',
      }
    case types.GAME_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
      }
    case types.GAME_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
