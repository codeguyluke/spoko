import reducer from './games.reducer'
import actions from './games.actions'
import selectors, { STORE_NAME } from './games.selectors'

export default {
  STORE_NAME,
  reducer,
  actions,
  selectors,
}
