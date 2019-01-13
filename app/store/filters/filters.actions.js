export const types = {
  SET_SPORT_FILTER: 'SET_SPORTS_FILTER',
  SET_DATE_FILTER: 'SET_DATE_FILTER',
}

function setSportFilter(filter) {
  return {
    type: types.SET_SPORT_FILTER,
    payload: filter,
  }
}

function setDateFilter(filter) {
  return {
    type: types.SET_DATE_FILTER,
    payload: filter,
  }
}

export default {
  setSportFilter,
  setDateFilter,
}
