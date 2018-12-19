import React from 'react'
import { Icon } from 'react-native-elements'
import PropTypes from 'prop-types'
import colors from '../style/colors'

const CONTAINER_STYLE = {
  paddingHorizontal: 16,
}

export function NavigationIcon({ name, onPress, ...props }) {
  return (
    <Icon
      name={name}
      containerStyle={CONTAINER_STYLE}
      size={32}
      color={colors.navy}
      onPress={onPress}
      {...props}
    />
  )
}

NavigationIcon.propTypes = {
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
}
