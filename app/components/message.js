import React from 'react'
import { StyleSheet } from 'react-native'
import { Avatar } from 'react-native-elements'
import { Surface, Subheading } from 'react-native-paper'
import PropTypes from 'prop-types'
import joAvatar from '../assets/jo-avatar.jpg'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    elevation: 4,
    borderRadius: 8,
    marginTop: 16,
  },
  text: {
    flex: 1,
    marginLeft: 16,
    fontWeight: '500',
  },
})

export default function Message({ children }) {
  return (
    <Surface style={styles.container}>
      <Avatar large rounded source={joAvatar} />
      <Subheading style={styles.text}>{children}</Subheading>
    </Surface>
  )
}

Message.propTypes = {
  children: PropTypes.string.isRequired,
}
