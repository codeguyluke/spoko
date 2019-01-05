import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Colors, FAB } from 'react-native-paper'
import PropTypes from 'prop-types'
import { Container, Message } from '../components'

const FIRST_MESSAGE =
  "Welcome to Spoko App! I'm Jo, your Spoko Assistant. Let's get to know each other!"
const SECOND_MESSAGE = "First of all, can you tell me where you're from?"
const FAB_LABEL = 'Sure!'
const NEGATIVE_BUTTON_LABEL = 'Nah... Ask me later!'

const styles = StyleSheet.create({
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  fabStyle: {
    marginBottom: 24,
  },
})

export default function LocationPermissionUndetermined({ onPositive, onNegative }) {
  return (
    <Container>
      <Message>{FIRST_MESSAGE}</Message>
      <Message>{SECOND_MESSAGE}</Message>
      <View style={styles.buttonsContainer}>
        <FAB label={FAB_LABEL} onPress={onPositive} style={styles.fabStyle} />
        <Button onPress={onNegative} mode="outlined" color={Colors.red500}>
          {NEGATIVE_BUTTON_LABEL}
        </Button>
      </View>
    </Container>
  )
}

LocationPermissionUndetermined.propTypes = {
  onPositive: PropTypes.func.isRequired,
  onNegative: PropTypes.func.isRequired,
}
