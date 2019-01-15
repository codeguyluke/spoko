import React, { Component } from 'react'
import { KeyboardAvoidingView, AsyncStorage, StyleSheet } from 'react-native'
import firebase from 'react-native-firebase'
import { FAB, TextInput } from 'react-native-paper'
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
    messages: [
      {
        text: "Hi, welcome to SpontApp! I'm Jo, your SpontApp Assistant.",
      },
      {
        text: 'Please sign in to the app with your email address.',
      },
    ],
    email: '',
    loading: false,
  }

  async componentDidMount() {
    this.unsubscribe = firebase.links().onLink(async url => {
      if (firebase.auth().isSignInWithEmailLink(url)) {
        this.setState({ loading: true })
        const email = await AsyncStorage.getItem('emailForSignIn')
        await firebase.auth().signInWithEmailLink(email, url)
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  handleSendLink = async () => {
    const { email } = this.state
    this.setState(prevState => ({
      loading: true,
      messages: [
        ...prevState.messages,
        { author: 'me', text: `Please send login link to ${email}.` },
      ],
    }))

    try {
      const actionCodeSettings = {
        url: 'https://spoko-dev.firebaseapp.com',
        handleCodeInApp: true,
        iOS: {
          bundleId: 'com.codice.spoko',
        },
        android: {
          packageName: 'com.codice.spoko',
          installApp: true,
          minimumVersion: '12',
        },
      }

      await firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
      await AsyncStorage.setItem('emailForSignIn', email)
      this.setState(prevState => ({
        loading: false,
        messages: [
          ...prevState.messages,
          {
            text: `We sent login link to ${email}!`,
          },
          {
            text: 'Please open the email on your phone and click the link in order to sign in.',
          },
        ],
      }))
    } catch (error) {
      console.error(error)
      this.setState(prevState => ({
        loading: false,
        messages: [
          ...prevState.messages,
          {
            text: 'Whoops! Seems like there was a problem with the email. Please try again.',
            type: 'error',
          },
        ],
      }))
    }
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
            <FAB label="Send me login link" onPress={this.handleSendLink} style={styles.distance} />
          </KeyboardAvoidingView>
        )}
      </Container>
    )
  }
}
