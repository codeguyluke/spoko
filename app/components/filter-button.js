import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { Icon } from 'react-native-elements'
import PropTypes from 'prop-types'

const FILTERS = {
  sport: {
    icon: 'directions-run',
  },
  datetime: {
    icon: 'schedule',
  },
  price: {
    icon: 'attach-money',
  },
}

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

export default function FilterButton({ filter }) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <Icon color="#FFF" size={24} name={FILTERS[filter].icon} />
      <Text style={styles.text}>All</Text>
      <Icon color="#FFF" size={24} name="arrow-drop-down" />
    </TouchableOpacity>
  )
}

FilterButton.propTypes = {
  filter: PropTypes.oneOf(Object.keys(FILTERS)).isRequired,
}
