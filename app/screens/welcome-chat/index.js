import React, { Component } from 'react'
import Permissions from 'react-native-permissions'
import { Loader, Container, JoChat, ActionPanel } from '../../components'
import chatMessages from './chat-messages.json'

export default class WelcomeChat extends Component {
  constructor(props) {
    super(props)

    this.actions = {
      locationPermissionRequest: {
        FABLabel: 'Sure!',
        FABAction: this.handleLocationPermissionRequest,
        negativeLabel: 'Nah... Ask me later!',
        negativeAction: this.handleLocationPermissionPostponed,
      },
      phoneInput: {
        showPhoneInput: true,
        onPhoneChange: this.handlePhoneChange,
        FABLabel: 'Verify',
        FABAction: () => {},
      },
    }

    this.state = {
      currentStage: 'greeting',
      messages: [...chatMessages.greeting],
      phoneNumber: '',
      verificationCode: '',
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

  handlePhoneChange = phone => {
    this.setState({ phoneNumber: phone })
  }

  setStage = async stage =>
    this.setState(prevState => ({
      messages: [...prevState.messages, ...chatMessages[stage]],
      currentStage: stage,
    }))

  render() {
    const { currentStage, messages, phoneNumber, verificationCode } = this.state

    if (currentStage === 'greeting') return <Loader />
    return (
      <Container>
        <JoChat messages={messages} />
        <ActionPanel
          phoneNumber={phoneNumber}
          verificationCode={verificationCode}
          {...this.actions[currentStage]}
        />
      </Container>
    )
  }
}
