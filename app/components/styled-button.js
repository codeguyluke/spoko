import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import PropTypes from 'prop-types'
import colors from '../style/colors'

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '100%',
    backgroundColor: 'rgb(255, 255, 255)',
  },
  disabled: {
    opacity: 0.4,
    backgroundColor: 'rgb(255, 255, 255)',
  },
})

const COLORS = {
  green: colors.green,
  red: colors.red,
  navy: colors.navy,
  yellow: colors.yellow,
  violet: colors.violet,
}

export class StyledButton extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    color: PropTypes.oneOf(Object.values(COLORS)),
  }

  static defaultProps = {
    color: COLORS.NAVY,
  }

  static COLORS = COLORS

  render() {
    const { title, onPress, color } = this.props
    return (
      <Button
        outline
        title={title}
        onPress={onPress}
        borderRadius={8}
        containerViewStyle={styles.container}
        disabledStyle={styles.disabled}
        color={color}
        {...this.props}
      />
    )
  }
}
