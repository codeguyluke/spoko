import { STORE_NAME } from './user.saga'

const selectUpcomingGames = state => {
  const currentDate = new Date()
  const { currentUser } = state[STORE_NAME]
  const createdGames = currentUser.createdGames
    .filter(game => game.time > currentDate)
    .map(game => ({ ...game, owned: true }))
  const playedGames = currentUser.playedGames
    .filter(game => game.time > currentDate)
    .map(game => ({ ...game, played: true }))
  return [...createdGames, ...playedGames]
}

export default { selectUpcomingGames }
