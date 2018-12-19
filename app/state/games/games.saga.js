import { all, takeEvery, put, call, select } from 'redux-saga/effects'
import {
  createGame,
  editGame,
  deleteGame,
  editUser,
  getGame,
} from '../../services/firebase/firestore'
import toastState from '../toast'
import userState from '../user'
import actions, { types } from './games.actions'

function* createGameSaga({ payload: { game, onSuccess } }) {
  try {
    const { sport, place, time, spots } = game
    const currentUser = yield select(state => state[userState.STORE_NAME].currentUser)
    const { id } = yield call(createGame, { sport, place, time, spots })
    const createdGame = yield call(getGame, { id })
    yield call(editUser, {
      ...currentUser,
      createdGames: [...currentUser.createdGames, { id, ...createdGame.data() }],
    })
    yield put(actions.gameRequestSuccess())
    yield call(onSuccess)
    yield put(toastState.actions.addToast('success', 'Game created.'))
  } catch (error) {
    yield put(actions.gameRequestError(error.message))
    yield put(toastState.actions.addToast('error', 'Failed to create a game.'))
  }
}

function* editGameSaga({ payload: { game, onSuccess } }) {
  try {
    const { id, sport, place, time, spots } = game
    const currentUser = yield select(state => state[userState.STORE_NAME].currentUser)
    const currentUserCreatedGames = currentUser.createdGames
    yield call(editGame, { id, sport, place, time, spots })
    const editedGameIndex = currentUserCreatedGames.findIndex(createdGame => createdGame.id === id)
    const newCreatedGames = [
      ...currentUserCreatedGames.splice(editedGameIndex, 1, {
        ...currentUserCreatedGames[editedGameIndex],
        ...game,
      }),
    ]
    yield call(editUser, {
      ...currentUser,
      createdGames: newCreatedGames,
    })
    yield put(actions.gameRequestSuccess())
    yield call(onSuccess)
    yield put(toastState.actions.addToast('success', 'Game updated.'))
  } catch (error) {
    yield put(actions.gameRequestError(error.message))
    yield put(toastState.actions.addToast('error', 'Failed to edit the game.'))
  }
}

function* deleteGameSaga({ payload: { id, onSuccess } }) {
  try {
    const currentUser = yield select(state => state[userState.STORE_NAME].currentUser)
    const currentUserCreatedGames = currentUser.createdGames
    yield call(deleteGame, { id })
    const deletedGameIndex = currentUserCreatedGames.findIndex(game => game.id === id)
    const newCreatedGames = [...currentUserCreatedGames.splice(deletedGameIndex, 1)]
    yield call(editUser, {
      ...currentUser,
      createdGames: newCreatedGames,
    })
    yield put(actions.gameRequestSuccess())
    yield call(onSuccess)
    yield put(toastState.actions.addToast('success', 'Game deleted.'))
  } catch (error) {
    yield put(actions.gameRequestError(error.message))
    yield put(toastState.actions.addToast('error', 'Failed to delete the game.'))
  }
}

function* gamesUpdatedSaga({ payload: { gamesSnapshot } }) {
  try {
    const currentUserId = yield select(state => state[userState.STORE_NAME].currentUser.id)
    const openGames = gamesSnapshot.docs
      .map(doc => ({
        ...doc.data(),
        id: doc.id,
        owned: doc.data().ownerId === currentUserId,
        played: doc.data().players.includes(currentUserId),
      }))
      .filter(game => game.spots > 0)
    yield put(actions.openGamesUpdated(openGames))
  } catch (error) {
    yield put(actions.gameRequestError(error.message))
    yield put(toastState.actions.addToast('error', "Couldn't fetch open games."))
  }
}

export default function* gamesSaga() {
  yield all([
    yield takeEvery(types.CREATE_GAME_STARTED, createGameSaga),
    yield takeEvery(types.EDIT_GAME_STARTED, editGameSaga),
    yield takeEvery(types.DELETE_GAME_STARTED, deleteGameSaga),
    yield takeEvery(types.GAMES_SNAPSHOT_UPDATED, gamesUpdatedSaga),
  ])
}
