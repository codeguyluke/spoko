import React, { Component } from 'react'
import { View, Text, TextInput, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import PropTypes from 'prop-types'
import { StyledButton, Label } from '../../components'
import CountryPicker, { countries } from './components/country-picker'
import colors, { rgbToRgba } from '../../style/colors'

const styles = StyleSheet.create({
  titleContainer: {
    position: 'absolute',
    top: 16,
    left: 0,
    right: 0,
  },
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '500',
    textAlign: 'center',
    color: colors.navy,
  },
  subtitle: {
    marginTop: 16,
    fontSize: 22,
    fontWeight: '300',
    textAlign: 'center',
    color: colors.navy,
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
  input: {
    width: '100%',
    maxWidth: 560,
    borderBottomWidth: 1,
    borderColor: rgbToRgba(colors.navy, 0.2),
    marginVertical: 8,
    marginHorizontal: 16,
    paddingVertical: 8,
    fontSize: 28,
    fontWeight: '500',
    color: colors.navy,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
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
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Welcome!</Text>
          <Text style={styles.subtitle}>Please log in to the app using your phone number.</Text>
        </View>
        <View style={styles.container}>
          <Label>Phone number</Label>
          <View style={styles.row}>
            <TouchableWithoutFeedback onPress={() => this.setState({ showCountryModal: true })}>
              <View style={styles.row}>
                <Text style={styles.input}>{countries[country].flag}</Text>
                <Icon type="ionicon" name="md-arrow-dropdown" color={colors.navy} size={24} />
              </View>
            </TouchableWithoutFeedback>
            <TextInput
              placeholder="+1 1111111111"
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
