import { createStore, combineReducers /* applyMiddleware */ } from 'redux'
// import createSagaMiddleware from 'redux-saga'
// import { all, fork } from 'redux-saga/effects'
import regionState from './region'
import userState from './user'

// const sagas = [authState.saga]
// function* rootSaga() {
//   yield all(sagas.map(fork))
// }

// const sagaMiddleware = createSagaMiddleware()
const rootReducer = combineReducers({
  [regionState.STORE_NAME]: regionState.reducer,
  [userState.STORE_NAME]: userState.reducer,
})
// const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
// sagaMiddleware.run(rootSaga)

export default createStore(rootReducer)
