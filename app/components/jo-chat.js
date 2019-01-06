import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { Colors } from 'react-native-paper'
import PropTypes from 'prop-types'
import { ChatMessage } from '.'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: Colors.grey200,
  },
})

export default function WelcomeChat({ messages }) {
  return (
    <FlatList
      style={styles.container}
      data={messages}
      renderItem={({ item: { text, author } }) => <ChatMessage author={author}>{text}</ChatMessage>}
      keyExtractor={item => item.text}
    />
  )
}

WelcomeChat.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({ text: PropTypes.string, author: PropTypes.oneOf(['me', 'jo']) })
  ).isRequired,
}
