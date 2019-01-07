import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { withTheme } from 'react-native-paper'
import PropTypes from 'prop-types'

const LOADER_CONTAINER_STYLE = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
}

function Loader({ theme, contained }) {
  return (
    <View
      style={[
        LOADER_CONTAINER_STYLE,
        contained ? { backgroundColor: 'transparent' } : { ...StyleSheet.absoluteFillObject },
      ]}
    >
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  )
}

Loader.propTypes = {
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      primary: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  contained: PropTypes.bool,
}

Loader.defaultProps = {
  contained: false,
}

export default withTheme(Loader)
