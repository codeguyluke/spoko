import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Slider } from 'react-native-elements'
import PropTypes from 'prop-types'
import colors from '../style/colors'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  slider: {
    flex: 1,
  },
  valueText: {
    marginLeft: 8,
    color: colors.navy,
    fontSize: 16,
    fontWeight: '500',
  },
  label: {
    marginRight: 8,
    color: colors.navy,
    fontSize: 16,
    fontWeight: '400',
  },
})

export function SpotsPicker({ spots, onSpotsChange, label }) {
  return (
    <View style={styles.container}>
      {!!label && <Text style={styles.label}>{label}</Text>}
      <Slider
        style={styles.slider}
        step={1}
        onValueChange={onSpotsChange}
        value={spots}
        thumbTintColor={colors.navy}
        minimumValue={1}
        maximumValue={5}
      />
      <Text style={styles.valueText}>{spots}</Text>
    </View>
  )
}

SpotsPicker.propTypes = {
  spots: PropTypes.number.isRequired,
  onSpotsChange: PropTypes.func.isRequired,
  label: PropTypes.string,
}

SpotsPicker.defaultProps = {
  label: '',
}
