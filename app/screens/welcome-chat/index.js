import React, { Component } from 'react'
import { connect } from 'react-redux'
import Permissions from 'react-native-permissions'
import PropTypes from 'prop-types'
import regionState from '../../store/region'
import { getCurrentRegion, getCurrentCountry } from '../../services/geolocation'
import { Loader, Container, JoChat, ActionPanel } from '../../components'
import chatMessages from './chat-messages.json'

class WelcomeChat extends Component {
  static propTypes = {
    onSetInitialRegion: PropTypes.func.isRequired,
  }

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
        onCountryChange: this.handleCountryChange,
        FABLabel: 'Verify',
        FABAction: () => {},
      },
    }

    this.state = {
      currentStage: 'greeting',
      messages: [...chatMessages.greeting],
      selectedCountry: 'GB',
      phoneNumber: '',
      verificationCode: '',
      loading: false,
    }
  }

  async componentDidMount() {
    const permission = await Permissions.check('location')
    if (permission === 'undetermined') {
      this.setStage('locationPermissionRequest')
      return
    }
    await this.setRegionAndCountry()
    this.setStage('phoneInput')
  }

  setRegionAndCountry = async () => {
    this.setState({ loading: true })
    try {
      const currentRegion = await getCurrentRegion()
      const currentCountry = await getCurrentCountry(currentRegion)
      this.props.onSetInitialRegion(currentRegion)
      await this.setState({ selectedCountry: currentCountry, loading: false })
    } catch (error) {
      console.error(error)
      this.setState({ loading: false })
    }
  }

  handleLocationPermissionRequest = async () => {
    await Permissions.request('location')
    await this.setRegionAndCountry()
    await this.setStage('locationPermissionGranted')
    this.setStage('phoneInput')
  }

  handleLocationPermissionPostponed = async () => {
    this.setState({ selectedCountry: 'US' })
    await this.setStage('locationPermissionPostponed')
    this.setStage('phoneInput')
  }

  handleCountryChange = country => {
    this.setState({ selectedCountry: country })
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
    const {
      currentStage,
      messages,
      phoneNumber,
      verificationCode,
      selectedCountry,
      loading,
    } = this.state

    if (currentStage === 'greeting') return <Loader />
    return (
      <Container>
        <JoChat messages={messages} />
        <ActionPanel
          loading={loading}
          phoneNumber={phoneNumber}
          verificationCode={verificationCode}
          selectedCountry={selectedCountry}
          {...this.actions[currentStage]}
        />
      </Container>
    )
  }
}

export default connect(
  null,
  { onSetInitialRegion: regionState.actions.setInitialRegion }
)(WelcomeChat)
