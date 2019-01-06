import React, { Component } from 'react'
import Permissions from 'react-native-permissions'
import { Loader, Container, JoChat, ActionPanel } from '../components'

export default class WelcomeChat extends Component {
  constructor(props) {
    super(props)

    this.STAGES = {
      greeting: {
        messages: [
          {
            author: 'jo',
            text:
              "Welcome to Spoko App! I'm Jo, your Spoko Assistant. Let's get to know each other!",
          },
        ],
      },
      locationPermissionRequest: {
        messages: [
          {
            author: 'jo',
            text: "First of all, can you tell me where you're from?",
          },
        ],
        actionPanel: {
          FABLabel: 'Sure!',
          FABAction: this.handleLocationPermissionRequest,
          negativeLabel: 'Nah... Ask me later!',
          negativeAction: this.handleLocationPermissionPostponed,
        },
      },

      locationPermissionGranted: {
        messages: [
          {
            author: 'me',
            text: 'Sure!',
          },
          {
            author: 'jo',
            text: "Great, that's REALLY cool! Now, let's get to know each other even better!",
          },
        ],
      },
      locationPermissionPostponed: {
        messages: [
          {
            author: 'me',
            text: 'Nah... Ask me later!',
          },
          {
            author: 'jo',
            text: "Oh, that's OK! We have a lot of time for this :)",
          },
        ],
      },
      phoneInput: {
        messages: [
          {
            author: 'jo',
            text: 'Soo, can I get your mobile number?',
          },
        ],
      },
    }

    this.state = {
      currentStage: 'greeting',
      messages: [...this.STAGES.greeting.messages],
    }
  }

  async componentDidMount() {
    const permission = await Permissions.check('location')
    if (permission === 'undetermined') {
      this.setStage('locationPermissionRequest')
      return
    }
    this.setStage({ currentStage: 'phoneInput' })
  }

  handleLocationPermissionRequest = async () => {
    await Permissions.request('location')
    await this.setStage('locationPermissionGranted')
    this.setStage('phoneInput')
  }

  handleLocationPermissionPostponed = async () => {
    await this.setStage('locationPermissionPostponed')
    this.setStage('phoneInput')
  }

  setStage = async stage =>
    this.setState(prevState => ({
      messages: [...prevState.messages, ...this.STAGES[stage].messages],
      currentStage: stage,
    }))

  render() {
    if (this.state.currentStage === 'greeting') return <Loader />
    return (
      <Container>
        <JoChat messages={this.state.messages} />
        <ActionPanel {...this.STAGES[this.state.currentStage].actionPanel} />
      </Container>
    )
  }
}
