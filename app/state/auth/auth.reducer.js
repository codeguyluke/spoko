import { types } from './auth.actions'

export const AUTH_STATUSES = {
  unauthorized: 'unauthorized',
  code_sent: 'code_sent',
  authorized: 'authorized',
}

const INITIAL_STATE = {
  status: '',
  loading: false,
  error: '',
  confirmResult: null,
}

export default function authReducer(state = INITIAL_STATE, action = { type: '' }) {
  switch (action.type) {
    case types.USER_UNAUTHORIZED:
      return {
        ...state,
        status: AUTH_STATUSES.unauthorized,
        loading: false,
        error: '',
      }
    case types.USER_AUTHORIZED:
      return {
        ...state,
        status: AUTH_STATUSES.authorized,
        loading: false,
        error: '',
      }
    case types.SIGN_IN_STARTED:
      return {
        ...state,
        loading: true,
        error: '',
      }
    case types.VERIFICATION_CODE_SENT:
      return {
        ...state,
        status: AUTH_STATUSES.code_sent,
        loading: false,
        confirmResult: action.payload.confirmResult,
      }
    case types.SIGN_IN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case types.CODE_CONFIRMATION_STARTED:
      return {
        ...state,
        loading: true,
        error: '',
      }
    case types.CODE_CONFIRMATION_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case types.SIGN_OUT_STARTED:
      return {
        ...state,
        loading: true,
        error: '',
      }
    default:
      return state
  }
}
