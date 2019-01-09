import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { withTheme } from 'react-native-paper'
import PropTypes from 'prop-types'

const CONTAINER_STYLE = {
  ...StyleSheet.absoluteFillObject,
  ...ifIphoneX({
    paddingTop: 32,
    paddingBottom: 56,
  }),
  paddingHorizontal: 16,
}

function Container({ children, backgroundColor, theme }) {
  return (
    <View
      style={[CONTAINER_STYLE, { backgroundColor: backgroundColor || theme.colors.background }]}
    >
      {children}
    </View>
  )
}

Container.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
    .isRequired,
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      background: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  backgroundColor: PropTypes.string,
}

Container.defaultProps = {
  backgroundColor: '',
}

export default withTheme(Container)
