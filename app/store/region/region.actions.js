export const types = {
  SET_INITIAL_REGION: 'SET_INITIAL_REGION',
  SET_REGION: 'SET_REGION',
  RESET_REGION: 'RESET_REGION',
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

export default {
  setInitialRegion,
  setRegion,
  resetRegion,
}
