import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { StyledButton, Label } from '../../components'
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
    fontSize: 22,
    fontWeight: '500',
    color: colors.navy,
    textAlign: 'center',
  },
})

export default function PhoneInput({ onPhoneChange, phone, onSubmit, errorMessage }) {
  return (
    <React.Fragment>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>Please log in to the app using your phone number.</Text>
      </View>
      <View style={styles.container}>
        <Label>Phone number (with region code)</Label>
        <TextInput
          placeholder="+1 1111111111"
          value={phone}
          onChangeText={onPhoneChange}
          keyboardType="phone-pad"
          style={styles.input}
        />
        <Text style={styles.errorText}>{errorMessage}</Text>
        <StyledButton title="Log in" color={StyledButton.COLORS.green} onPress={onSubmit} />
      </View>
    </React.Fragment>
  )
}

PhoneInput.propTypes = {
  onPhoneChange: PropTypes.func.isRequired,
  phone: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
}
