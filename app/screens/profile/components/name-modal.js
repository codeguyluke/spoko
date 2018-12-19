import React, { Component } from 'react'
import { Alert, View, TextInput, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { EditModal } from '../../../components'
import colors, { rgbToRgba } from '../../../style/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    width: '100%',
    maxWidth: 560,
    borderBottomWidth: 1,
    borderColor: rgbToRgba(colors.navy, 0.2),
    paddingVertical: 8,
    fontSize: 18,
    fontWeight: '400',
    color: colors.navy,
    textAlign: 'center',
  },
})

export default class NameModal extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initialValue: PropTypes.string,
    loading: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    initialValue: '',
  }

  state = {
    name: this.props.initialValue,
  }

  textInputRef = React.createRef()

  handleSubmit = () => {
    if (!this.state.name) {
      Alert.alert('Choose name', 'Display name cannot be empty.', [{ text: 'OK' }])
      return
    }

    if (this.textInputRef.current) {
      this.textInputRef.current.blur()
    }
    this.props.onSubmit(this.state.name)
  }

  render() {
    const { show, onClose, loading } = this.props
    return (
      <EditModal
        show={show}
        onClose={onClose}
        onSubmit={this.handleSubmit}
        title="Change display name"
        loading={loading}
      >
        <View style={styles.container}>
          <TextInput
            ref={this.textInputRef}
            placeholder="Your display name"
            value={this.state.name}
            onChangeText={name => this.setState({ name })}
            style={styles.input}
          />
        </View>
      </EditModal>
    )
  }
}
