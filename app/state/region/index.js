import reducer from './region.reducer'
import actions, { types } from './region.actions'
import saga from './region.saga'

export default {
  STORE_NAME: 'region',
  reducer,
  actions,
  types,
  saga,
}
