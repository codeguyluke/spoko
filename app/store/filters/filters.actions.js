export const types = {
  SET_SPORT_FILTER: 'SET_SPORTS_FILTER',
  SET_DATE_FILTER: 'SET_DATE_FILTER',
  SET_PRICE_FILTER: 'SET_PRICE_FILTER',
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

function setPriceFilter(filter) {
  return {
    type: types.SET_PRICE_FILTER,
    payload: filter,
  }
}

export default {
  setSportFilter,
  setDateFilter,
  setPriceFilter,
}
