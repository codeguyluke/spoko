import React, { Component } from 'react'
import Permissions from 'react-native-permissions'
import { Loader } from '../components'
import WelcomeChatScreen from '../screens/WelcomeChat'

export default class Unauthenticated extends Component {
  STAGES = {
    greeting: {
      messages: [
        {
          type: 'jo',
          text: "Welcome to Spoko App! I'm Jo, your Spoko Assistant. Let's get to know each other!",
        },
      ],
    },
    locationPermissionRequest: {
      messages: [
        {
          type: 'jo',
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
          type: 'action',
          text: 'You granted location permission.',
        },
        {
          type: 'jo',
          text: "Great, that's REALLY cool! Now, let's get to know each other even better!",
        },
      ],
    },
    locationPermissionPostponed: {
      messages: [
        {
          type: 'jo',
          text: "Oh, that's OK! We have a lot of time for this :)",
        },
      ],
    },
    phoneInput: {
      messages: [
        {
          type: 'jo',
          text: 'Soo, can I get your mobile number?',
        },
      ],
    },
  }

  state = {
    currentStage: 'greeting',
    messages: [...this.STAGES.greeting.messages],
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
    console.log('lolololol')
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
      <WelcomeChatScreen
        messages={this.state.messages}
        panelProps={this.STAGES[this.state.currentStage].actionPanel}
      />
    )
  }
}
