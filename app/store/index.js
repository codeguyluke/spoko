import { createStore, combineReducers } from 'redux'

const rootReducer = combineReducers({
  example: (state = {}) => state,
})
const store = createStore(rootReducer)

export default store
