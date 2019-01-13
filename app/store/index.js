import { createStore, combineReducers } from 'redux'
import regionState from './region'
import gamesState from './games'
import toastState from './toast'
import filtersState from './filters'

const rootReducer = combineReducers({
  [regionState.STORE_NAME]: regionState.reducer,
  [gamesState.STORE_NAME]: gamesState.reducer,
  [toastState.STORE_NAME]: toastState.reducer,
  [filtersState.STORE_NAME]: filtersState.reducer,
})

export default createStore(rootReducer)
