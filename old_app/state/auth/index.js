import reducer, { AUTH_STATUSES } from './auth.reducer'
import actions from './auth.actions'
import saga, { STORE_NAME } from './auth.saga'

export default {
  STORE_NAME,
  AUTH_STATUSES,
  reducer,
  actions,
  saga,
}
