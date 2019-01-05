import React, { Component } from 'react'
import { View, Text, TextInput, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { StyledButton } from '../../components'
import CountryPicker, { countries } from './components/country-picker'
import colors, { rgbToRgba } from '../../style/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  phoneRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {
    width: '100%',
    maxWidth: 560,
    fontSize: 12,
    marginTop: 4,
    marginBottom: 16,
    color: colors.red,
    alignSelf: 'center',
  },
  flag: {
    fontSize: 24,
  },
  phoneSuffix: {
    marginHorizontal: 8,
    fontSize: 22,
    fontWeight: '500',
    color: colors.grey,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: rgbToRgba(colors.navy, 0.2),
    marginVertical: 8,
    paddingVertical: 8,
    fontSize: 28,
    fontWeight: '500',
    color: colors.navy,
    textAlign: 'center',
  },
})

export default class PhoneInput extends Component {
  static propTypes = {
    onPhoneChange: PropTypes.func.isRequired,
    phone: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
  }

  state = {
    country: 'AW',
    showCountryModal: false,
  }

  render() {
    const { onPhoneChange, phone, onSubmit, errorMessage } = this.props
    const { country, showCountryModal } = this.state

    return (
      <React.Fragment>
        <View style={styles.container}>
          <View style={styles.phoneRow}>
            <TouchableWithoutFeedback onPress={() => this.setState({ showCountryModal: true })}>
              <View style={styles.dropdownRow}>
                <Text style={styles.flag}>{countries[country].flag}</Text>
                <Text style={styles.phoneSuffix}>{`+${countries[country].callingCode}`}</Text>
              </View>
            </TouchableWithoutFeedback>
            <TextInput
              value={phone}
              onChangeText={onPhoneChange}
              keyboardType="phone-pad"
              style={styles.input}
            />
          </View>
          <Text style={styles.errorText}>{errorMessage}</Text>
          <StyledButton title="Verify phone" color={StyledButton.COLORS.green} onPress={onSubmit} />
        </View>
        <CountryPicker
          show={showCountryModal}
          onClose={() => this.setState({ showCountryModal: false })}
          onSubmit={selectedCountry =>
            this.setState({ country: selectedCountry, showCountryModal: false })
          }
          initialValue="AW"
        />
      </React.Fragment>
    )
  }
}
