import React from 'react'
import { View, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { TextInput, Button, FAB } from 'react-native-paper'
import PropTypes from 'prop-types'
import { CountryPicker } from '.'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  fill: {
    flex: 1,
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
  phoneNumber,
  verificationCode,
  showPhoneInput,
  onPhoneChange,
  FABLabel,
  FABAction,
  negativeLabel,
  negativeAction,
}) {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {showPhoneInput && (
        <View style={[styles.row, styles.distance]}>
          <CountryPicker onSelectCountry={() => {}} selectedCountry="PL" />
          <TextInput
            label="Mobile"
            mode="outlined"
            value={phoneNumber}
            onChangeText={onPhoneChange}
            keyboardType="phone-pad"
            style={styles.fill}
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
  phoneNumber: PropTypes.string,
  verificationCode: PropTypes.string,
  showPhoneInput: PropTypes.bool,
  onPhoneChange: PropTypes.func,
  FABLabel: PropTypes.string,
  FABAction: PropTypes.func,
  negativeLabel: PropTypes.string,
  negativeAction: PropTypes.func,
}

ActionPanel.defaultProps = {
  phoneNumber: '',
  verificationCode: '',
  showPhoneInput: false,
  onPhoneChange: () => {},
  FABLabel: '',
  FABAction: () => {},
  negativeLabel: '',
  negativeAction: () => {},
}
