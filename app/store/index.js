import { createStore, combineReducers /* applyMiddleware */ } from 'redux'
// import createSagaMiddleware from 'redux-saga'
// import { all, fork } from 'redux-saga/effects'
// import authState from './auth'

// const sagas = [authState.saga]
// function* rootSaga() {
//   yield all(sagas.map(fork))
// }

// const sagaMiddleware = createSagaMiddleware()
// const rootReducer = combineReducers({
//   [authState.STORE_NAME]: authState.reducer,
// })
// const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
// sagaMiddleware.run(rootSaga)

export default createStore(combineReducers({ example: (state = {}) => state }))
