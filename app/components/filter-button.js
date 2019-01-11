import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { Icon } from 'react-native-elements'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 16,
    marginHorizontal: 4,
    fontWeight: '700',
    color: '#FFF',
  },
})

export default function FilterButton({ icon, onPress, label }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container} activeOpacity={0.8}>
      <Icon color="#FFF" size={24} name={icon} />
      <Text style={styles.text}>{label}</Text>
      <Icon color="#FFF" size={24} name="arrow-drop-down" />
    </TouchableOpacity>
  )
}

FilterButton.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
}
