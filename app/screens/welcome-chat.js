import React, { Component } from 'react'
import { connect } from 'react-redux'
import Permissions from 'react-native-permissions'
import firebase from 'react-native-firebase'
import PropTypes from 'prop-types'
import regionState from '../store/region'
import { MESSAGES, getMessage } from '../assets/messages'
import countries from '../assets/countries.json'
import { getCurrentRegion, getCurrentCountry, DEFAULT_REGION } from '../services/geolocation'
import { Loader, Container, JoChat, ChatActions } from '../components'

class WelcomeChat extends Component {
  static propTypes = {
    onSetInitialRegion: PropTypes.func.isRequired,
    onSetCountry: PropTypes.func.isRequired,
    country: PropTypes.string.isRequired,
  }

  state = {
    messages: [getMessage(MESSAGES.greeting)],
    loading: true,
    screen: '',
    phoneNumber: '',
    verificationCode: '',
    verificationId: '',
  }

  async componentDidMount() {
    const { onSetCountry, onSetInitialRegion } = this.props
    const locationPermission = await Permissions.check('location')
    if (locationPermission === 'undetermined') {
      this.setState(prevState => ({
        messages: [
          ...prevState.messages,
          getMessage(MESSAGES.locationExplanation),
          getMessage(MESSAGES.locationRequest),
        ],
        screen: ChatActions.SCREENS.locationRequest,
        loading: false,
      }))
      return
    }

    const currentRegion = await getCurrentRegion()
    onSetInitialRegion(currentRegion)
    const currentCountry = await getCurrentCountry(currentRegion)
    onSetCountry(currentCountry)
    this.setState(prevState => ({
      messages: [...prevState.messages, getMessage(MESSAGES.phoneInput)],
      screen: ChatActions.SCREENS.phoneInput,
      loading: false,
    }))
  }

  handleCancelLocationPermission = async () => {
    const { onSetInitialRegion, onSetCountry } = this.props
    this.setState({ loading: true })
    this.setState(prevState => ({
      messages: [
        ...prevState.messages,
        getMessage(MESSAGES.postponeLocationPermission),
        getMessage(MESSAGES.locationPermissionPostponed),
      ],
      loading: true,
    }))
    onSetInitialRegion(DEFAULT_REGION)
    const currentCountry = await getCurrentCountry(DEFAULT_REGION)
    onSetCountry(currentCountry)
    this.setState(prevState => ({
      messages: [...prevState.messages, getMessage(MESSAGES.phoneInput)],
      screen: ChatActions.SCREENS.phoneInput,
      loading: false,
    }))
  }

  handleAllowLocationPermission = async () => {
    const { onSetInitialRegion, onSetCountry } = this.props
    this.setState({ loading: true })
    await Permissions.request('location')
    const currentRegion = await getCurrentRegion()
    onSetInitialRegion(currentRegion)
    const currentCountry = await getCurrentCountry(currentRegion)
    onSetCountry(currentCountry)
    this.setState(prevState => ({
      messages: [
        ...prevState.messages,
        getMessage(MESSAGES.grantLocationPermission),
        getMessage(MESSAGES.locationPermissionGranted),
        getMessage(MESSAGES.phoneInput),
      ],
      screen: ChatActions.SCREENS.phoneInput,
      loading: false,
    }))
  }

  handleVerifyPhoneNumber = () => {
    const { phoneNumber } = this.state
    const { country } = this.props
    const phone = `${countries[country].callingCode}${phoneNumber}`
    this.setState(prevState => ({
      messages: [...prevState.messages, getMessage(MESSAGES.sendVerificationCode, phone)],
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
              messages: [
                ...prevState.messages,
                getMessage(MESSAGES.verificationCodeSent, phone),
                getMessage(MESSAGES.codeInput),
              ],
              screen: ChatActions.SCREENS.codeInput,
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
              messages: [...prevState.messages, getMessage(MESSAGES.phoneInputError)],
              loading: false,
            }))
        }
      })
  }

  handleConfirmCode = async () => {
    this.setState(prevState => ({
      loading: true,
      messages: [...prevState.messages, getMessage(MESSAGES.confirmCode)],
    }))
    try {
      const { verificationId, verificationCode } = this.state
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      )
      await firebase.auth().signInWithCredential(credential)
    } catch (error) {
      this.setState(prevState => ({
        loading: false,
        messages: [...prevState.messages, getMessage(MESSAGES.codeInputError)],
      }))
    }
  }

  handleChangeNumber = () => {
    this.setState(prevState => ({
      messages: [
        ...prevState.messages,
        getMessage(MESSAGES.changePhoneNumber),
        getMessage(MESSAGES.phoneInputChange),
      ],
      screen: ChatActions.SCREENS.phoneInput,
    }))
  }

  render() {
    const { country, onSetCountry } = this.props
    const { messages, loading, screen, phoneNumber, verificationCode } = this.state

    return (
      <Container>
        <JoChat messages={messages} />
        {loading ? (
          <Loader contained />
        ) : (
          <ChatActions
            screen={screen}
            onAllowLocationPermission={this.handleAllowLocationPermission}
            onCancelLocationPermission={this.handleCancelLocationPermission}
            onSelectCountry={onSetCountry}
            country={country}
            phoneNumber={phoneNumber}
            onChangePhoneNumber={newPhoneNumber => this.setState({ phoneNumber: newPhoneNumber })}
            onVerifyPhoneNumber={this.handleVerifyPhoneNumber}
            verificationCode={verificationCode}
            onChangeVerificationCode={newCode => this.setState({ verificationCode: newCode })}
            onConfirmCode={this.handleConfirmCode}
            onChangePhone={this.handleChangeNumber}
          />
        )}
      </Container>
    )
  }
}

export default connect(
  state => ({ country: state[regionState.STORE_NAME].country }),
  {
    onSetInitialRegion: regionState.actions.setInitialRegion,
    onSetCountry: regionState.actions.setCountry,
  }
)(WelcomeChat)
