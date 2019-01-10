import React from 'react'
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Snackbar } from 'react-native-paper'
import PropTypes from 'prop-types'
import toastState from '../store/toast'

const styles = StyleSheet.create({
  snackbar: {
    position: 'absolute',
    bottom: 48,
    left: 0,
    right: 0,
  },
})

function Toast({ message, onRemove }) {
  return (
    <Snackbar
      visible={!!message}
      duration={Snackbar.DURATION_SHORT}
      onDismiss={onRemove}
      style={styles.snackbar}
    >
      {message}
    </Snackbar>
  )
}

Toast.propTypes = {
  onRemove: PropTypes.func.isRequired,
  message: PropTypes.string,
}

Toast.defaultProps = {
  message: '',
}

export default connect(
  state => ({ message: state[toastState.STORE_NAME].toast }),
  { onRemove: toastState.actions.removeToast }
)(Toast)
