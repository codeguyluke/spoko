export const types = {
  CREATE_GAME_STARTED: 'CREATE_GAME_STARTED',
  EDIT_GAME_STARTED: 'EDIT_GAME_STARTED',
  DELETE_GAME_STARTED: 'DELETE_GAME_STARTED',
  GAMES_SNAPSHOT_UPDATED: 'GAMES_SNAPSHOT_UPDATED',
  OPEN_GAMES_UPDATED: 'OPEN_GAMES_UPDATED',
  GAME_REQUEST_SUCCESS: 'GAME_REQUEST_SUCCESS',
  GAME_REQUEST_ERROR: 'GAME_REQUEST_ERROR',
}

function createGameStarted(game, onSuccess) {
  return {
    type: types.CREATE_GAME_STARTED,
    payload: { game, onSuccess },
  }
}

function editGameStarted(game, onSuccess) {
  return {
    type: types.EDIT_GAME_STARTED,
    payload: { game, onSuccess },
  }
}

function deleteGameStarted(id, onSuccess) {
  return {
    type: types.DELETE_GAME_STARTED,
    payload: { id, onSuccess },
  }
}

function gamesSnapshotUpdated(gamesSnapshot) {
  return {
    type: types.GAMES_SNAPSHOT_UPDATED,
    payload: { gamesSnapshot },
  }
}

function openGamesUpdated(games) {
  return {
    type: types.OPEN_GAMES_UPDATED,
    payload: games,
  }
}

function gameRequestSuccess() {
  return {
    type: types.GAME_REQUEST_SUCCESS,
  }
}

function gameRequestError(error) {
  return {
    type: types.GAME_REQUEST_ERROR,
    payload: error,
  }
}

export default {
  createGameStarted,
  editGameStarted,
  deleteGameStarted,
  gamesSnapshotUpdated,
  openGamesUpdated,
  gameRequestSuccess,
  gameRequestError,
}
