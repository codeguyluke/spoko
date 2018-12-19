import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { StyledButton, Label } from '../../components'
import colors, { rgbToRgba } from '../../style/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    position: 'absolute',
    top: 32,
    left: 16,
    right: 16,
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

export default function CodeInput({ onCodeChange, code, onSubmit, errorMessage }) {
  return (
    <React.Fragment>
      <Text style={styles.title}>Please enter verification code we have sent to you below:</Text>
      <View style={styles.container}>
        <Label>Verification code</Label>
        <TextInput
          value={code}
          onChangeText={onCodeChange}
          keyboardType="number-pad"
          style={styles.input}
        />
        <Text style={styles.errorText}>{errorMessage}</Text>
        <StyledButton title="Confirm code" color={StyledButton.COLORS.green} onPress={onSubmit} />
      </View>
    </React.Fragment>
  )
}

CodeInput.propTypes = {
  onCodeChange: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
}
