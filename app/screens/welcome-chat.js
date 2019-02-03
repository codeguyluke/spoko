import React, { Component } from 'react'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import { FAB, TextInput } from 'react-native-paper'
import { MESSAGES, getMessage } from '../assets/messages'
import { Loader, Container, JoChat } from '../components'

const styles = StyleSheet.create({
  actionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  distance: {
    marginVertical: 16,
  },
})

export default class WelcomeChat extends Component {
  state = {
    messages: [getMessage(MESSAGES.greeting)],
    loading: false,
  }

  render() {
    const { messages, loading, email } = this.state

    return (
      <Container>
        <JoChat messages={messages} />
        {loading ? (
          <Loader contained />
        ) : (
          <KeyboardAvoidingView style={styles.actionContainer} behavior="padding">
            <TextInput
              label="Email"
              mode="outlined"
              value={email}
              onChangeText={newEmail => this.setState({ email: newEmail.toLowerCase() })}
              keyboardType="email-address"
              style={styles.distance}
            />
            <FAB label="Send me login link" onPress={() => {}} style={styles.distance} />
          </KeyboardAvoidingView>
        )}
      </Container>
    )
  }
}
