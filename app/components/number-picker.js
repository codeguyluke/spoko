import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, IconButton, withTheme } from 'react-native-paper'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    fontSize: 28,
    marginHorizontal: 16,
  },
})

function NumberPicker({ value, onUp, onDown, theme, min, max }) {
  return (
    <View style={styles.container}>
      <IconButton
        onPress={onDown}
        icon="remove-circle-outline"
        size={24}
        color={theme.colors.error}
        disabled={value === min}
      />
      <Text style={styles.value}>{`${value}`}</Text>
      <IconButton
        onPress={onUp}
        icon="add-circle-outline"
        size={24}
        color={theme.colors.accent}
        disabled={value === max}
      />
    </View>
  )
}

NumberPicker.propTypes = {
  value: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onUp: PropTypes.func.isRequired,
  onDown: PropTypes.func.isRequired,
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      accent: PropTypes.string.isRequired,
      error: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default withTheme(NumberPicker)
