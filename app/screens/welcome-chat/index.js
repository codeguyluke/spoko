import React, { Component } from 'react'
import { connect } from 'react-redux'
import Permissions from 'react-native-permissions'
import firebase from 'react-native-firebase'
import PropTypes from 'prop-types'
import regionState from '../../store/region'
import { getCurrentRegion, getCurrentCountry } from '../../services/geolocation'
import { Loader, Container, JoChat, ActionPanel } from '../../components'
import chatMessages from './chat-messages.json'
import countries from '../../assets/countries.json'

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
        onPhoneChange: phone => this.setState({ phoneNumber: phone }),
        onCountryChange: country => this.setState({ selectedCountry: country }),
        FABLabel: 'Verify',
        FABAction: this.handleVerifyPhoneNumber,
      },
      verificationCode: {
        showVerificationCodeInput: true,
        onVerificationCodeChange: code => this.setState({ verificationCode: code }),
        FABLabel: 'Confirm code',
        FABAction: this.handleConfirmCode,
        negativeLabel: 'Change phone number',
        negativeAction: () =>
          this.setState(prevState => ({
            messages: [...prevState.messages, ...chatMessages.changePhoneNumber],
            currentStage: 'phoneInput',
          })),
      },
    }

    this.state = {
      currentStage: 'greeting',
      messages: [...chatMessages.greeting],
      selectedCountry: 'GB',
      phoneNumber: '',
      verificationCode: '',
      verificationId: '',
      loading: false,
    }
  }

  async componentDidMount() {
    const permission = await Permissions.check('location')
    if (permission === 'undetermined') {
      return this.setState(prevState => ({
        messages: [...prevState.messages, ...chatMessages.locationPermissionRequest],
        currentStage: 'locationPermissionRequest',
      }))
    }
    await this.setRegionAndCountry()
    return this.setState(prevState => ({
      messages: [...prevState.messages, ...chatMessages.phoneInput],
      currentStage: 'phoneInput',
    }))
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
    return this.setState(prevState => ({
      messages: [
        ...prevState.messages,
        ...chatMessages.locationPermissionGranted,
        ...chatMessages.phoneInput,
      ],
      currentStage: 'phoneInput',
    }))
  }

  handleLocationPermissionPostponed = () =>
    this.setState(prevState => ({
      messages: [
        ...prevState.messages,
        ...chatMessages.locationPermissionPostponed,
        ...chatMessages.phoneInput,
      ],
      currentStage: 'phoneInput',
    }))

  handleConfirmCode = async () => {
    this.setState(prevState => ({
      loading: true,
      messages: [...prevState.messages, ...chatMessages.verificationConfirm],
    }))
    try {
      const { verificationId, verificationCode } = this.state
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      )
      await firebase.auth().signInWithCredential(credential)
    } catch (error) {
      console.error(error)
      this.setState(prevState => ({
        loading: false,
        messages: [...prevState.messages, ...chatMessages.verificationCodeError],
      }))
    }
  }

  handleVerifyPhoneNumber = () => {
    const { selectedCountry, phoneNumber } = this.state
    const phone = `${countries[selectedCountry].callingCode}${phoneNumber}`
    this.setState(prevState => ({
      messages: [...prevState.messages, ...chatMessages.phoneVerification],
      currentStage: 'phoneVerification',
      loading: true,
    }))
    firebase
      .auth()
      .verifyPhoneNumber(phone)
      .on('state_changed', phoneAuthSnapshot => {
        switch (phoneAuthSnapshot.state) {
          case firebase.auth.PhoneAuthState.CODE_SENT:
          case firebase.auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT:
            return this.setState(prevState => ({
              messages: [...prevState.messages, ...chatMessages.verificationCode],
              currentStage: 'verificationCode',
              verificationId: phoneAuthSnapshot.verificationId,
              loading: false,
            }))
          case firebase.auth.PhoneAuthState.AUTO_VERIFIED: {
            const { verificationId, code } = phoneAuthSnapshot
            const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code)
            return firebase.auth().signInWithCredential(credential)
          }
          case firebase.auth.PhoneAuthState.ERROR:
          default:
            return this.setState(prevState => ({
              messages: [...prevState.messages, ...chatMessages.phoneVerificationError],
              loading: false,
              currentStage: 'phoneInput',
            }))
        }
      })
  }

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
