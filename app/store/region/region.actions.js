export const types = {
  SET_INITIAL_REGION: 'SET_INITIAL_REGION',
  SET_REGION: 'SET_REGION',
  RESET_REGION: 'RESET_REGION',
  SET_COUNTRY: 'SET_COUNTRY',
}

function setInitialRegion(region) {
  return {
    type: types.SET_INITIAL_REGION,
    payload: region,
  }
}

function setRegion(region) {
  return {
    type: types.SET_REGION,
    payload: region,
  }
}

function resetRegion() {
  return {
    type: types.RESET_REGION,
  }
}

function setCountry(country) {
  return {
    type: types.SET_COUNTRY,
    payload: country,
  }
}

export default {
  setInitialRegion,
  setRegion,
  resetRegion,
  setCountry,
}
