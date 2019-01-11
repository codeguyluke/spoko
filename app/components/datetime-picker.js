import React, { Component } from 'react'
import { View, Text, Modal, StyleSheet, DatePickerIOS, Platform } from 'react-native'
import { Portal, withTheme, Button } from 'react-native-paper'
import PropTypes from 'prop-types'
import { Container, EditRow, ModalHeader } from '.'
import calendarIcon from '../assets/images/calendar.png'

const IS_IOS = Platform.OS === 'ios'

function getDatetimeString(datetime) {
  return datetime
    ? `${datetime.toLocaleDateString(undefined, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      })}, ${datetime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    : ''
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
  },
  pickersContainer: {
    flex: 1,
    justifyContent: 'center',
  },
})

class DatetimePicker extends Component {
  static propTypes = {
    onSelectDatetime: PropTypes.func.isRequired,
    theme: PropTypes.shape({
      colors: PropTypes.shape({
        accent: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    datetime: PropTypes.instanceOf(Date),
  }

  static defaultProps = {
    datetime: null,
  }

  constructor(props) {
    super(props)

    this.initialDate = new Date()
    this.maximumDate = new Date()
    this.maximumDate.setDate(this.maximumDate.getDate() + 7)

    this.state = {
      showDatetimeModal: false,
      datetime: this.initialDate,
    }
  }

  handleCloseModal = () => {
    this.setState({ showDatetimeModal: false })
  }

  handleSubmit = () => {
    this.props.onSelectDatetime(this.state.datetime)
    this.setState({ showDatetimeModal: false })
  }

  render() {
    const { datetime: propsDatetime, theme } = this.props
    const { showDatetimeModal, datetime } = this.state

    return (
      <React.Fragment>
        <EditRow
          labelIcon="schedule"
          placeholder="Set the time"
          image={propsDatetime && calendarIcon}
          value={propsDatetime && getDatetimeString(propsDatetime)}
          onPress={() => this.setState({ showDatetimeModal: true })}
          label="time"
        />
        <Portal>
          <Modal
            visible={showDatetimeModal}
            onRequestClose={this.handleCloseModal}
            animationType="slide"
          >
            <Container>
              <ModalHeader title="Set the time" onClose={this.handleCloseModal} />
              {IS_IOS ? (
                <View style={styles.pickersContainer}>
                  <DatePickerIOS
                    mode="datetime"
                    minuteInterval={5}
                    date={datetime}
                    onDateChange={selectedDatetime => this.setState({ datetime: selectedDatetime })}
                    minimumDate={this.initialDate}
                    maximumDate={this.maximumDate}
                  />
                </View>
              ) : (
                <View style={styles.pickersContainer}>
                  <Text>Android</Text>
                </View>
              )}
              <Button
                mode="contained"
                onPress={this.handleSubmit}
                color={theme.colors.accent}
                style={styles.button}
              >
                Save
              </Button>
            </Container>
          </Modal>
        </Portal>
      </React.Fragment>
    )
  }
}

export default withTheme(DatetimePicker)
