import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { connect } from 'react-redux'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import PropTypes from 'prop-types'
import toastState from '../state/toast'
import { ToastPropType } from '../helpers/prop-types'
import colors from '../style/colors'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 16,
    ...ifIphoneX(
      {
        paddingTop: 48,
      },
      {
        paddingTop: 24,
      }
    ),
    backgroundColor: 'rgb(255, 255, 255)',
    borderBottomWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
})

const getColor = type => {
  switch (type) {
    case 'error':
      return colors.red
    case 'success':
    default:
      return colors.green
  }
}

class Toast extends Component {
  static propTypes = {
    onToastRemove: PropTypes.func.isRequired,
    toast: ToastPropType,
  }

  static defaultProps = {
    toast: null,
  }

  viewRef = React.createRef()

  handleAnimationEnd = () => {
    setTimeout(this.handleToastClose, 1500)
  }

  handleToastClose = async () => {
    if (this.viewRef.current) {
      await this.viewRef.current.slideOutUp()
      this.props.onToastRemove()
    }
  }

  render() {
    const { toast } = this.props
    if (!toast) return null

    const color = getColor(toast.type)
    return (
      <Animatable.View
        ref={this.viewRef}
        animation="slideInDown"
        onAnimationEnd={this.handleAnimationEnd}
        style={[styles.container, { borderBottomColor: color }]}
      >
        <Text style={[styles.text, { color }]}>{toast.message}</Text>
      </Animatable.View>
    )
  }
}

export default connect(
  state => ({ toast: state[toastState.STORE_NAME].toast }),
  { onToastRemove: toastState.actions.removeToast }
)(Toast)
