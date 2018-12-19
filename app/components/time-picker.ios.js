import React, { Component } from 'react'
import { View, DatePickerIOS } from 'react-native'
import PropTypes from 'prop-types'
import { EditModal } from './edit-modal'

const PICKER_CONTAINER_STYLE = {
  flex: 1,
  justifyContent: 'center',
}

export class TimePicker extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initialValue: PropTypes.instanceOf(Date),
  }

  static defaultProps = {
    initialValue: new Date(),
  }

  state = {
    time: this.props.initialValue,
  }

  render() {
    const { show, onClose, onSubmit } = this.props

    return (
      <EditModal
        show={show}
        onClose={onClose}
        onSubmit={() => onSubmit(this.state.time)}
        title="Pick game's time"
      >
        <View style={PICKER_CONTAINER_STYLE}>
          <DatePickerIOS
            date={this.state.time}
            onDateChange={time => this.setState({ time })}
            minimumDate={new Date()}
            minuteInterval={5}
          />
        </View>
      </EditModal>
    )
  }
}
