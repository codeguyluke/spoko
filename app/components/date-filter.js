import React, { Component } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Portal, Dialog, Button, List, Checkbox } from 'react-native-paper'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import PropTypes from 'prop-types'
import filtersState from '../store/filters'
import { FilterButton } from '.'

function getDateString(dateString) {
  const currentDate = new Date()
  const currentDateString = currentDate.toDateString()
  const nextDate = new Date(currentDate)
  nextDate.setDate(currentDate.getDate() + 1)
  const nextDateString = nextDate.toDateString()

  if (dateString === currentDateString) return 'Today'
  if (dateString === nextDateString) return 'Tomorrow'

  const datetime = new Date(dateString)
  return `${datetime.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })}`
}

const styles = StyleSheet.create({
  dialog: {
    flex: 1,
    marginVertical: 32,
    ...ifIphoneX({
      marginTop: 80,
      marginBottom: 88,
    }),
  },
  scrollArea: {
    flex: 1,
  },
  dialogActions: {
    justifyContent: 'space-evenly',
  },
})

class DateFilter extends Component {
  static propTypes = {
    onSetFilter: PropTypes.func.isRequired,
    stateFilter: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  constructor(props) {
    super(props)

    this.dates = this.buildDatesArray()

    this.state = {
      showDialog: false,
      selectedDates: [...this.dates],
    }
  }

  componentDidMount() {
    const { onSetFilter } = this.props
    const { selectedDates } = this.state

    onSetFilter(selectedDates)
  }

  buildDatesArray = () => {
    const currentDate = new Date()
    return new Array(7).fill(0).map((_value, index) => {
      const newDate = new Date(currentDate)
      newDate.setDate(currentDate.getDate() + index)
      return newDate.toDateString()
    })
  }

  getLabel = selected => {
    if (selected.length === this.dates.length) return 'All'
    if (selected.length === 0) return 'None'

    return 'Some'
  }

  handleApply = () => {
    const { onSetFilter } = this.props
    const { selectedDates } = this.state

    onSetFilter(selectedDates)
    this.setState({ showDialog: false })
  }

  handleAll = () => this.setState({ selectedDates: [...this.dates] })

  handleDismissDialog = () => {
    const { stateFilter } = this.props
    this.setState({ showDialog: false, selectedDates: stateFilter })
  }

  handleNone = () => this.setState({ selectedDates: [] })

  handlePress = date => () => {
    this.setState(prevState => {
      if (prevState.selectedDates.includes(date)) {
        const dateIndex = prevState.selectedDates.findIndex(selectedDate => selectedDate === date)
        const newSelectedDates = [...prevState.selectedDates]
        newSelectedDates.splice(dateIndex, 1)
        return { selectedDates: newSelectedDates }
      }

      return { selectedDates: [...prevState.selectedDates, date] }
    })
  }

  render() {
    const { showDialog, selectedDates } = this.state
    const { stateFilter } = this.props

    return (
      <React.Fragment>
        <FilterButton
          icon="schedule"
          label={this.getLabel(stateFilter)}
          onPress={() => this.setState({ showDialog: true })}
        />
        <Portal>
          <Dialog visible={showDialog} onDismiss={this.handleDismissDialog} style={styles.dialog}>
            <Dialog.Title>Date</Dialog.Title>
            <Dialog.ScrollArea style={styles.scrollArea}>
              <FlatList
                data={this.dates}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                  <List.Item
                    key={item}
                    title={getDateString(item)}
                    onPress={this.handlePress(item)}
                    right={() => (
                      <Checkbox status={selectedDates.includes(item) ? 'checked' : 'unchecked'} />
                    )}
                  />
                )}
                extraData={selectedDates}
              />
            </Dialog.ScrollArea>
            <Dialog.Actions style={styles.dialogActions}>
              <Button onPress={this.handleDismissDialog}>Cancel</Button>
              <Button onPress={this.handleNone}>None</Button>
              <Button onPress={this.handleAll}>All</Button>
              <Button onPress={this.handleApply}>Apply</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </React.Fragment>
    )
  }
}

export default connect(
  state => ({ stateFilter: state[filtersState.STORE_NAME].dates }),
  { onSetFilter: filtersState.actions.setDateFilter }
)(DateFilter)
