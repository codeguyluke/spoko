import React from 'react'
import { StyleSheet } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { Avatar } from 'react-native-elements'
import { Caption } from 'react-native-paper'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 16,
  },
  caption: {
    flex: 1,
    textAlign: 'right',
    marginRight: 16,
  },
})

export default function ActionMessage({ children }) {
  return (
    <Animatable.View animation="fadeIn" duration={100} style={styles.container}>
      <Caption style={styles.caption}>{children}</Caption>
      <Avatar rounded icon={{ name: 'person' }} />
    </Animatable.View>
  )
}

ActionMessage.propTypes = {
  children: PropTypes.string.isRequired,
}
