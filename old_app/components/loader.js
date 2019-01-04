import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import colors from '../style/colors'

const LOADER_CONTAINER_STYLE = {
  ...StyleSheet.absoluteFillObject,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
}

export function Loader() {
  return (
    <View style={LOADER_CONTAINER_STYLE}>
      <ActivityIndicator size="large" color={colors.green} />
    </View>
  )
}
