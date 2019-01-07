import React from 'react'
import { View, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { TextInput, Button, FAB } from 'react-native-paper'
import PropTypes from 'prop-types'
import { CountryPicker, Loader } from '.'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distance: {
    marginVertical: 16,
  },
})

export default function ActionPanel({
  loading,
  phoneNumber,
  verificationCode,
  selectedCountry,
  onCountryChange,
  showPhoneInput,
  onPhoneChange,
  FABLabel,
  FABAction,
  negativeLabel,
  negativeAction,
}) {
  return loading ? (
    <Loader contained />
  ) : (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {showPhoneInput && (
        <View style={[styles.row, styles.distance]}>
          <CountryPicker onSelectCountry={onCountryChange} selectedCountry={selectedCountry} />
          <TextInput
            label="Mobile"
            mode="outlined"
            value={phoneNumber}
            onChangeText={onPhoneChange}
            keyboardType="phone-pad"
            style={styles.input}
          />
        </View>
      )}
      {!!FABLabel && <FAB label={FABLabel} onPress={FABAction} style={styles.distance} />}
      {!!negativeLabel && (
        <Button onPress={negativeAction} mode="outlined" style={styles.distance}>
          {negativeLabel}
        </Button>
      )}
    </KeyboardAvoidingView>
  )
}

ActionPanel.propTypes = {
  loading: PropTypes.bool.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  verificationCode: PropTypes.string.isRequired,
  selectedCountry: PropTypes.string.isRequired,
  onCountryChange: PropTypes.func,
  showPhoneInput: PropTypes.bool,
  onPhoneChange: PropTypes.func,
  FABLabel: PropTypes.string,
  FABAction: PropTypes.func,
  negativeLabel: PropTypes.string,
  negativeAction: PropTypes.func,
}

ActionPanel.defaultProps = {
  onCountryChange: () => {},
  showPhoneInput: false,
  onPhoneChange: () => {},
  FABLabel: '',
  FABAction: () => {},
  negativeLabel: '',
  negativeAction: () => {},
}
