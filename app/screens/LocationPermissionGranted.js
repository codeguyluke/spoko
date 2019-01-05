import React from 'react'
import { View, StyleSheet } from 'react-native'
import { FAB, Caption } from 'react-native-paper'
import PropTypes from 'prop-types'
import { Container, Message } from '../components'

const FIRST_MESSAGE =
  "Welcome to Spoko App! I'm Jo, your Spoko Assistant. Let's get to know each other!"
const SECOND_MESSAGE = "First of all, can you tell me where you're from?"
const THIRD_MESSAGE = "Great, that's REALLY cool! Now, let's get to know each other even better!"
const CAPTION = 'You granted location permission.'
const FAB_LABEL = 'Take me there!'

const styles = StyleSheet.create({
  fabContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  caption: {
    marginTop: 16,
  },
})

export default function LocationPermissionGranted({ onNext }) {
  return (
    <Container>
      <Message>{FIRST_MESSAGE}</Message>
      <Message>{SECOND_MESSAGE}</Message>
      <Caption style={styles.caption}>{CAPTION}</Caption>
      <Message>{THIRD_MESSAGE}</Message>
      <View style={styles.fabContainer}>
        <FAB label={FAB_LABEL} onPress={onNext} />
      </View>
    </Container>
  )
}

LocationPermissionGranted.propTypes = {
  onNext: PropTypes.func.isRequired,
}
