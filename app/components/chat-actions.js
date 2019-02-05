import React, { Component } from 'react'
import { View, KeyboardAvoidingView, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { FAB, Button, TextInput } from 'react-native-paper'
import { Loader, CountryPicker } from '.'

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

export default class ChatActions extends Component {
  static SCREENS = SCREENS

  render() {
    const {
      screen,
      onAllowLocationPermission,
      onCancelLocationPermission,
      onSelectCountry,
      country,
      phoneNumber,
      onChangePhoneNumber,
      onVerifyPhoneNumber,
      verificationCode,
      onChangeVerificationCode,
      onConfirmCode,
      onChangePhone,
    } = this.props

    switch (screen) {
      case SCREENS.locationRequest:
        return (
          <View style={styles.actionContainer} behavior="padding">
            <FAB label="Sure" onPress={onAllowLocationPermission} style={styles.distance} />
            <Button onPress={onCancelLocationPermission} mode="outlined" style={styles.distance}>
              {`I don't want to do it yet`}
            </Button>
          </View>
        )
      case SCREENS.phoneInput:
        return (
          <KeyboardAvoidingView style={styles.actionContainer} behavior="padding">
            <View style={[styles.row, styles.distance]}>
              <CountryPicker onSelectCountry={onSelectCountry} selectedCountry={country} />
              <TextInput
                label="Mobile"
                mode="outlined"
                value={phoneNumber}
                onChangeText={onChangePhoneNumber}
                keyboardType="phone-pad"
                style={styles.phoneInput}
              />
            </View>
            <FAB label="Verify this number" onPress={onVerifyPhoneNumber} style={styles.distance} />
          </KeyboardAvoidingView>
        )
      case SCREENS.codeInput:
        return (
          <KeyboardAvoidingView style={styles.actionContainer} behavior="padding">
            <TextInput
              label="Verification code"
              mode="outlined"
              value={verificationCode}
              onChangeText={onChangeVerificationCode}
              keyboardType="number-pad"
              style={styles.distance}
            />
            <FAB label="Let me in" onPress={onConfirmCode} style={styles.distance} />
            <Button onPress={onChangePhone} mode="outlined" style={styles.distance}>
              Change phone number
            </Button>
          </KeyboardAvoidingView>
        )
      default:
        return <Loader contained />
    }
  }
}

ChatActions.propTypes = {
  screen: PropTypes.oneOf(Object.keys(SCREENS)).isRequired,
  onAllowLocationPermission: PropTypes.func.isRequired,
  onCancelLocationPermission: PropTypes.func.isRequired,
  onSelectCountry: PropTypes.func.isRequired,
  country: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  onChangePhoneNumber: PropTypes.func.isRequired,
  onVerifyPhoneNumber: PropTypes.func.isRequired,
  verificationCode: PropTypes.string.isRequired,
  onChangeVerificationCode: PropTypes.func.isRequired,
  onConfirmCode: PropTypes.func.isRequired,
  onChangePhone: PropTypes.func.isRequired,
}
