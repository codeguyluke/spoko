import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { withTheme } from 'react-native-paper'
import PropTypes from 'prop-types'

const LOADER_CONTAINER_STYLE = {
  ...StyleSheet.absoluteFillObject,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
}

function Loader({ theme }) {
  return (
    <View style={LOADER_CONTAINER_STYLE}>
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
}

export default withTheme(Loader)
