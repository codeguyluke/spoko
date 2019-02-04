import React, { Component } from 'react'
import { View, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { FAB, Button, TextInput } from 'react-native-paper'
import Permissions from 'react-native-permissions'
import firebase from 'react-native-firebase'
import PropTypes from 'prop-types'
import regionState from '../store/region'
import { MESSAGES, getMessage } from '../assets/messages'
import countries from '../assets/countries.json'
import { getCurrentRegion, getCurrentCountry, DEFAULT_REGION } from '../services/geolocation'
import { Loader, Container, JoChat, CountryPicker } from '../components'

const SCREENS = {
  locationRequest: 'locationRequest',
  phoneInput: 'phoneInput',
  codeInput: 'codeInput',
}

const styles = StyleSheet.create({
  actionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  distance: {
    marginVertical: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneInput: {
    flex: 1,
    marginBottom: 6,
  },
})

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
      return this.setState(prevState => ({
        messages: [
          ...prevState.messages,
          getMessage(MESSAGES.locationExplanation),
          getMessage(MESSAGES.locationRequest),
        ],
        screen: SCREENS.locationRequest,
        loading: false,
      }))
    }

    const currentRegion = await getCurrentRegion()
    onSetInitialRegion(currentRegion)
    const currentCountry = await getCurrentCountry(currentRegion)
    onSetCountry(currentCountry)
    return this.setState(prevState => ({
      messages: [...prevState.messages, getMessage(MESSAGES.phoneInput)],
      screen: SCREENS.phoneInput,
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
      screen: SCREENS.phoneInput,
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
      screen: SCREENS.phoneInput,
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
              screen: SCREENS.codeInput,
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
      screen: SCREENS.phoneInput,
    }))
  }

  renderScreen = () => {
    const { country, onSetCountry } = this.props
    const { screen, phoneNumber, verificationCode } = this.state

    switch (screen) {
      case SCREENS.locationRequest:
        return (
          <View style={styles.actionContainer} behavior="padding">
            <FAB
              label="Sure"
              onPress={this.handleAllowLocationPermission}
              style={styles.distance}
            />
            <Button
              onPress={this.handleCancelLocationPermission}
              mode="outlined"
              style={styles.distance}
            >
              {`I don't want to do it yet`}
            </Button>
          </View>
        )
      case SCREENS.phoneInput:
        return (
          <KeyboardAvoidingView style={styles.actionContainer} behavior="padding">
            <View style={[styles.row, styles.distance]}>
              <CountryPicker onSelectCountry={onSetCountry} selectedCountry={country} />
              <TextInput
                label="Mobile"
                mode="outlined"
                value={phoneNumber}
                onChangeText={newPhoneNumber => this.setState({ phoneNumber: newPhoneNumber })}
                keyboardType="phone-pad"
                style={styles.phoneInput}
              />
            </View>
            <FAB
              label="Verify this number"
              onPress={this.handleVerifyPhoneNumber}
              style={styles.distance}
            />
          </KeyboardAvoidingView>
        )
      case SCREENS.codeInput:
        return (
          <KeyboardAvoidingView style={styles.actionContainer} behavior="padding">
            <TextInput
              label="Verification code"
              mode="outlined"
              value={verificationCode}
              onChangeText={newCode => this.setState({ verificationCode: newCode })}
              keyboardType="number-pad"
              style={styles.distance}
            />
            <FAB label="Let me in" onPress={this.handleConfirmCode} style={styles.distance} />
            <Button onPress={this.handleChangeNumber} mode="outlined" style={styles.distance}>
              Change phone number
            </Button>
          </KeyboardAvoidingView>
        )
      default:
        return <Loader contained />
    }
  }

  render() {
    const { messages, loading } = this.state

    return (
      <Container>
        <JoChat messages={messages} />
        {loading ? <Loader contained /> : this.renderScreen()}
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
