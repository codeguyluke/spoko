export const types = {
  SET_GAMES: 'SET_GAMES',
}

function setGames(games) {
  return {
    type: types.SET_GAMES,
    payload: games,
  }
}

export default {
  setGames,
}
