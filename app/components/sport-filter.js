import React, { Component } from 'react'
import { AsyncStorage, FlatList, StyleSheet, Image } from 'react-native'
import { connect } from 'react-redux'
import { Portal, Dialog, Button, List, Checkbox } from 'react-native-paper'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import PropTypes from 'prop-types'
import filtersState from '../store/filters'
import { FilterButton, Loader } from '.'
import sports from '../assets/sports'

const getLabel = selected => {
  if (selected.length === Object.keys(sports).length) return 'All'
  if (selected.length === 0) return 'None'

  return 'Some'
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
  image: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
})

class SportFilter extends Component {
  static propTypes = {
    onSetFilter: PropTypes.func.isRequired,
    stateFilter: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  state = {
    showDialog: false,
    loading: false,
    initialized: false,
    selectedSports: [],
  }

  async componentDidMount() {
    const { onSetFilter } = this.props

    const savedFilter = await AsyncStorage.getItem('sport_filter')
    const selectedSports = (savedFilter && JSON.parse(savedFilter)) || [...Object.keys(sports)]
    onSetFilter(selectedSports)
    this.setState({ initialized: true, selectedSports })
  }

  handleApply = async () => {
    const { selectedSports } = this.state
    const { onSetFilter } = this.props

    this.setState({ loading: true })
    await AsyncStorage.setItem('sport_filter', JSON.stringify(selectedSports))
    onSetFilter(selectedSports)
    this.setState({ loading: false, showDialog: false })
  }

  handleAll = () => this.setState({ selectedSports: [...Object.keys(sports)] })

  handleDismissDialog = () => {
    const { stateFilter } = this.props
    this.setState({ showDialog: false, selectedSports: stateFilter })
  }

  handleNone = () => this.setState({ selectedSports: [] })

  handlePress = sport => () => {
    this.setState(prevState => {
      if (prevState.selectedSports.includes(sport)) {
        const sportIndex = prevState.selectedSports.findIndex(
          selectedSport => selectedSport === sport
        )
        const newSelectedSports = [...prevState.selectedSports]
        newSelectedSports.splice(sportIndex, 1)
        return { selectedSports: newSelectedSports }
      }

      return { selectedSports: [...prevState.selectedSports, sport] }
    })
  }

  render() {
    const { showDialog, loading, initialized, selectedSports } = this.state
    const { stateFilter } = this.props

    if (!initialized) return null

    return (
      <React.Fragment>
        <FilterButton
          icon="directions-run"
          label={getLabel(stateFilter)}
          onPress={() => this.setState({ showDialog: true })}
        />
        <Portal>
          <Dialog visible={showDialog} onDismiss={this.handleDismissDialog} style={styles.dialog}>
            <Dialog.Title>Sports</Dialog.Title>
            <Dialog.ScrollArea style={styles.scrollArea}>
              <React.Fragment>
                {loading && <Loader />}
                <FlatList
                  data={Object.keys(sports)}
                  keyExtractor={item => item}
                  renderItem={({ item }) => (
                    <List.Item
                      key={item}
                      title={sports[item].name}
                      onPress={this.handlePress(item)}
                      left={() => <Image style={styles.image} source={sports[item].icon} />}
                      right={() => (
                        <Checkbox
                          status={selectedSports.includes(item) ? 'checked' : 'unchecked'}
                        />
                      )}
                    />
                  )}
                />
              </React.Fragment>
            </Dialog.ScrollArea>
            <Dialog.Actions style={styles.dialogActions}>
              <Button disabled={loading} onPress={this.handleDismissDialog}>
                Cancel
              </Button>
              <Button disabled={loading} onPress={this.handleNone}>
                None
              </Button>
              <Button disabled={loading} onPress={this.handleAll}>
                All
              </Button>
              <Button disabled={loading} onPress={this.handleApply}>
                Apply
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </React.Fragment>
    )
  }
}

export default connect(
  state => ({ stateFilter: state[filtersState.STORE_NAME].sports }),
  { onSetFilter: filtersState.actions.setSportFilter }
)(SportFilter)
