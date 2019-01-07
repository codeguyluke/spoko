import React, { Component } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { Colors } from 'react-native-paper'
import PropTypes from 'prop-types'
import { ChatMessage } from '.'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: Colors.grey200,
  },
})

export default class WelcomeChat extends Component {
  static propTypes = {
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
        author: PropTypes.oneOf(['me', 'jo']),
        type: PropTypes.string,
      })
    ).isRequired,
  }

  listRef = React.createRef()

  componentDidUpdate({ messages }) {
    if (!(this.listRef && this.listRef.current)) return

    if (messages.length < this.props.messages.length) {
      this.listRef.current.scrollToEnd()
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          ref={this.listRef}
          data={this.props.messages}
          renderItem={({ item: { text, author, type } }) => (
            <ChatMessage author={author} type={type}>
              {text}
            </ChatMessage>
          )}
          keyExtractor={(item, index) => `${item.text}${index}`}
        />
      </View>
    )
  }
}
