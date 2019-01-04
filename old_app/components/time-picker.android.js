import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  DatePickerAndroid,
  TimePickerAndroid,
} from 'react-native'
import { Icon, Divider } from 'react-native-elements'
import PropTypes from 'prop-types'
import { getTimeDateString, getTimeTimeString } from '../helpers/time'
import colors from '../style/colors'
import { EditModal } from './edit-modal'
import { Label } from './label'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    flex: 1,
    fontSize: 16,
    color: colors.navy,
    fontWeight: '400',
  },
  iconContainer: {
    paddingLeft: 32,
    paddingVertical: 16,
  },
  dividerStyle: {
    height: 40,
    backgroundColor: 'transparent',
  },
})

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

  handleSetDate = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: this.state.time,
        minDate: new Date(),
      })
      if (action !== DatePickerAndroid.dismissedAction) {
        this.setState(prevState => {
          const currentDate = new Date(prevState.time)
          currentDate.setFullYear(year)
          currentDate.setMonth(month)
          currentDate.setDate(day)
          return { time: currentDate }
        })
      }
    } catch (error) {
      console.error('Cannot open date picker', error.message)
    }
  }

  handleSetTime = async () => {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: this.state.time.getHours(),
        minute: this.state.time.getMinutes(),
        is24Hour: true,
      })
      if (action !== TimePickerAndroid.dismissedAction) {
        this.setState(prevState => {
          const currentDate = new Date(prevState.time)
          currentDate.setHours(hour)
          currentDate.setMinutes(minute)
          return { time: currentDate }
        })
      }
    } catch (error) {
      console.error('Cannot open time picker', error.message)
    }
  }

  render() {
    const { show, onClose, onSubmit } = this.props
    const dateString = getTimeDateString(this.state.time)
    const timeString = getTimeTimeString(this.state.time)

    return (
      <EditModal
        show={show}
        onClose={onClose}
        onSubmit={() => onSubmit(this.state.time)}
        title="Pick game's time"
      >
        <View style={styles.container}>
          <Label left>Date</Label>
          <TouchableOpacity style={styles.row} onPress={this.handleSetDate}>
            <Text style={styles.value}>{dateString}</Text>
            <Icon
              name="edit"
              type="font-awesome"
              containerStyle={styles.iconContainer}
              size={16}
              color={colors.grey}
            />
          </TouchableOpacity>
          <Divider style={styles.dividerStyle} />
          <Label left>Time</Label>
          <TouchableOpacity style={styles.row} onPress={this.handleSetTime}>
            <Text style={styles.value}>{timeString}</Text>
            <Icon
              name="edit"
              type="font-awesome"
              containerStyle={styles.iconContainer}
              size={16}
              color={colors.grey}
            />
          </TouchableOpacity>
        </View>
      </EditModal>
    )
  }
}
