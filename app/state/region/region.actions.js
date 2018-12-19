export const types = {
  GET_INITIAL_REGION_STARTED: 'GET_INITIAL_REGION_STARTED',
  GET_INITIAL_REGION_SUCCESS: 'GET_INITIAL_REGION_SUCCESS',
  REGION_UPDATE_REQUESTED: 'REGION_UPDATE_REQUESTED',
  REGION_UPDATED: 'REGION_UPDATED',
  REGION_RESET: 'REGION_RESET',
}

function getInitialRegionStarted() {
  return {
    type: types.GET_INITIAL_REGION_STARTED,
  }
}

function getInitialRegionSuccess(region) {
  return {
    type: types.GET_INITIAL_REGION_SUCCESS,
    payload: region,
  }
}

function regionUpdateRequested(region) {
  return {
    type: types.REGION_UPDATE_REQUESTED,
    payload: { region },
  }
}

function regionUpdated(region) {
  return {
    type: types.REGION_UPDATED,
    payload: region,
  }
}

function regionReset() {
  return {
    type: types.REGION_RESET,
  }
}

export default {
  getInitialRegionStarted,
  getInitialRegionSuccess,
  regionUpdateRequested,
  regionUpdated,
  regionReset,
}
