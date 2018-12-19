import React, { Component } from 'react'
import { View, Picker } from 'react-native'
import PropTypes from 'prop-types'
import { EditModal } from './edit-modal'
import { getSportsNames } from '../helpers/sports'

const PICKER_CONTAINER_STYLE = {
  flex: 1,
  justifyContent: 'center',
}

export class SportPicker extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initialValue: PropTypes.string,
  }

  static defaultProps = {
    initialValue: '',
  }

  state = {
    sport: this.props.initialValue,
  }

  render() {
    const { show, onClose, onSubmit } = this.props

    return (
      <EditModal
        show={show}
        onClose={onClose}
        onSubmit={() => onSubmit(this.state.sport)}
        title="Select sport"
      >
        <View style={PICKER_CONTAINER_STYLE}>
          <Picker
            selectedValue={this.state.sport}
            onValueChange={sport => this.setState({ sport })}
          >
            <Picker.Item label="Please select the sport" value="" key="empty" />
            {getSportsNames().map(sport => (
              <Picker.Item label={sport} value={sport} key={sport} />
            ))}
          </Picker>
        </View>
      </EditModal>
    )
  }
}
