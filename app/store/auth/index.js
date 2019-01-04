import reducer from './auth.reducer'
import actions from './auth.actions'
import saga from './auth.saga'

export default {
  STORE_NAME: 'auth',
  reducer,
  actions,
  saga,
}
