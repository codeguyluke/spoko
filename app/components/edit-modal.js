import React from 'react'
import { Modal, View, StyleSheet } from 'react-native'
import { Header } from 'react-native-elements'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import PropTypes from 'prop-types'
import { StyledButton } from './styled-button'
import colors from '../style/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255, 255, 255)',
    paddingHorizontal: 16,
    paddingBottom: 56,
    ...ifIphoneX({
      paddingTop: 24,
    }),
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.navy,
    marginBottom: 4,
  },
})

export function EditModal({ show, onClose, onSubmit, title, children, loading }) {
  return (
    <Modal visible={show} transparent={false} onRequestClose={onClose} animationType="slide">
      <View style={styles.container}>
        <Header
          backgroundColor="rgb(255, 255, 255)"
          centerComponent={{ text: title, style: styles.headerTitle }}
          rightComponent={{
            icon: 'close',
            size: 32,
            color: colors.yellow,
            onPress: onClose,
          }}
        />
        {children}
        <StyledButton
          title="Submit"
          color={StyledButton.COLORS.navy}
          onPress={onSubmit}
          loading={loading}
        />
      </View>
    </Modal>
  )
}

EditModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool,
}

EditModal.defaultProps = {
  loading: false,
}
