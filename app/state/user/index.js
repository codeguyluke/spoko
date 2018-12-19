import reducer from './user.reducer'
import actions from './user.actions'
import selectors from './user.selectors'
import saga, { STORE_NAME } from './user.saga'

export default {
  STORE_NAME,
  reducer,
  actions,
  selectors,
  saga,
}
