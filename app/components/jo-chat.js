import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { JoMessage, ActionMessage } from '.'

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingBottom: 16,
  },
})

export default function WelcomeChat({ messages }) {
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      {messages.map(message =>
        message.type === 'jo' ? (
          <JoMessage key={message.text}>{message.text}</JoMessage>
        ) : (
          <ActionMessage key={message.text}>{message.text}</ActionMessage>
        )
      )}
    </ScrollView>
  )
}

WelcomeChat.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({ text: PropTypes.string, type: PropTypes.oneOf(['action', 'jo']) })
  ).isRequired,
}
