import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Headline, IconButton, withTheme } from 'react-native-paper'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  closeButtonContainer: {
    position: 'absolute',
    right: 0,
    top: 2,
    bottom: 0,
  },
})

function ModalHeader({ onClose, title, theme: { colors } }) {
  return (
    <View style={styles.container}>
      <Headline>{title}</Headline>
      <IconButton
        style={styles.closeButtonContainer}
        onPress={onClose}
        icon="close"
        color={colors.primary}
        size={32}
      />
    </View>
  )
}

ModalHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      primary: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default withTheme(ModalHeader)
