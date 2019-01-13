export const types = {
  SET_SPORT_FILTER: 'SET_SPORTS_FILTER',
}

function setSportFilter(filter) {
  return {
    type: types.SET_SPORT_FILTER,
    payload: filter,
  }
}

export default {
  setSportFilter,
}
