import reducer from './user.reducer'
import actions from './user.actions'
import saga from './user.saga'

export default {
  STORE_NAME: 'user',
  reducer,
  actions,
  saga,
}
