import React from 'react'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import { Button, Colors, FAB } from 'react-native-paper'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  negative: {
    marginTop: 24,
  },
})

export default function ActionPanel({ FABLabel, FABAction, negativeLabel, negativeAction }) {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {!!FABLabel && <FAB label={FABLabel} onPress={FABAction} />}
      {!!negativeLabel && (
        <Button
          onPress={negativeAction}
          mode="outlined"
          color={Colors.red500}
          style={styles.negative}
        >
          {negativeLabel}
        </Button>
      )}
    </KeyboardAvoidingView>
  )
}

ActionPanel.propTypes = {
  FABLabel: PropTypes.string,
  FABAction: PropTypes.func,
  negativeLabel: PropTypes.string,
  negativeAction: PropTypes.func,
}

ActionPanel.defaultProps = {
  FABLabel: '',
  FABAction: null,
  negativeLabel: '',
  negativeAction: null,
}
