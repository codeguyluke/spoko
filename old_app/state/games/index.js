import reducer from './games.reducer'
import actions from './games.actions'
import saga from './games.saga'

export default {
  STORE_NAME: 'games',
  reducer,
  actions,
  saga,
}
