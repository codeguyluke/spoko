import reducer from './app.reducer'
import actions from './app.actions'
import saga from './app.saga'

export default {
  STORE_NAME: 'app',
  reducer,
  actions,
  saga,
}
