export const types = {
  ADD_TOAST: 'ADD_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
}

function addToast(message) {
  return {
    type: types.ADD_TOAST,
    payload: message,
  }
}

function removeToast() {
  return {
    type: types.REMOVE_TOAST,
  }
}

export default {
  addToast,
  removeToast,
}
