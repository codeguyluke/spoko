import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Avatar } from 'react-native-elements'
import { Surface, Subheading, Colors, withTheme } from 'react-native-paper'
import PropTypes from 'prop-types'
import joAvatar from '../assets/images/jo-avatar.png'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 8,
  },
  surface: {
    flex: 1,
    padding: 8,
    elevation: 4,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  text: {
    fontWeight: '500',
  },
})

function ChatMessage({ children, author, type, theme }) {
  return (
    <View style={styles.container}>
      {author === 'jo' && <Avatar rounded source={joAvatar} />}
      <Surface
        style={[
          styles.surface,
          author === 'jo' && { marginLeft: 16 },
          author === 'me' && { marginRight: 16, backgroundColor: Colors.orange50 },
        ]}
      >
        <Subheading style={[styles.text, type === 'error' && { color: theme.colors.error }]}>
          {children}
        </Subheading>
      </Surface>
      {author === 'me' && <Avatar rounded icon={{ name: 'person' }} />}
    </View>
  )
}

ChatMessage.propTypes = {
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      error: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  children: PropTypes.string.isRequired,
  author: PropTypes.oneOf(['me', 'jo']),
  type: PropTypes.string,
}

ChatMessage.defaultProps = {
  author: 'jo',
  type: 'info',
}

export default withTheme(ChatMessage)
