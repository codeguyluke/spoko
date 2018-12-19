import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all, fork } from 'redux-saga/effects'
import appState from './app'
import authState from './auth'
import gamesState from './games'
import regionState from './region'
import toastState from './toast'
import userState from './user'

const rootReducer = combineReducers({
  [appState.STORE_NAME]: appState.reducer,
  [authState.STORE_NAME]: authState.reducer,
  [gamesState.STORE_NAME]: gamesState.reducer,
  [regionState.STORE_NAME]: regionState.reducer,
  [toastState.STORE_NAME]: toastState.reducer,
  [userState.STORE_NAME]: userState.reducer,
})

const sagas = [gamesState.saga, appState.saga, authState.saga, regionState.saga, userState.saga]
function* rootSaga() {
  yield all(sagas.map(fork))
}

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

export default store
