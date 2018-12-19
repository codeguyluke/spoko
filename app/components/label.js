import React from 'react'
import { Text } from 'react-native'
import PropTypes from 'prop-types'
import colors from '../style/colors'

const LABEL_STYLE = {
  fontSize: 14,
  fontWeight: '500',
  color: colors.grey,
  marginBottom: 8,
  alignSelf: 'center',
  textAlign: 'center',
}

export function Label({ children, left }) {
  return (
    <Text style={[LABEL_STYLE, left && { alignSelf: 'flex-start' }]}>{children.toUpperCase()}</Text>
  )
}

Label.propTypes = {
  children: PropTypes.string.isRequired,
  left: PropTypes.bool,
}

Label.defaultProps = {
  left: false,
}
