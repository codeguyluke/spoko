import React, { Component } from 'react'
import { AsyncStorage, StyleSheet, View, Image } from 'react-native'
import { connect } from 'react-redux'
import { Portal, Dialog, Button, List, Checkbox } from 'react-native-paper'
import PropTypes from 'prop-types'
import filtersState from '../store/filters'
import { FilterButton, Loader } from '.'
import walletIcon from '../assets/images/wallet.png'
import freeIcon from '../assets/images/free.png'

const getLabel = maxPrice => (maxPrice === 'Infinity' ? 'All' : 'Free')

const styles = StyleSheet.create({
  dialogActions: {
    justifyContent: 'space-evenly',
  },
  image: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
})

class PriceFilter extends Component {
  static propTypes = {
    onSetFilter: PropTypes.func.isRequired,
    stateFilter: PropTypes.string.isRequired,
  }

  state = {
    showDialog: false,
    loading: false,
    initialized: false,
    maxPrice: 'Infinity',
  }

  async componentDidMount() {
    const { onSetFilter } = this.props

    const savedFilter = await AsyncStorage.getItem('price_filter')
    const maxPrice = savedFilter || 'Infinity'
    onSetFilter(maxPrice)
    this.setState({ initialized: true, maxPrice })
  }

  handleApply = async () => {
    const { maxPrice } = this.state
    const { onSetFilter } = this.props

    this.setState({ loading: true })
    await AsyncStorage.setItem('price_filter', maxPrice)
    onSetFilter(maxPrice)
    this.setState({ loading: false, showDialog: false })
  }

  handleDismissDialog = () => {
    const { stateFilter } = this.props
    this.setState({ showDialog: false, maxPrice: stateFilter })
  }

  render() {
    const { showDialog, loading, initialized, maxPrice } = this.state
    const { stateFilter } = this.props

    if (!initialized) return null

    return (
      <React.Fragment>
        <FilterButton
          icon="attach-money"
          label={getLabel(stateFilter)}
          onPress={() => this.setState({ showDialog: true })}
        />
        <Portal>
          <Dialog visible={showDialog} onDismiss={this.handleDismissDialog}>
            <Dialog.Title>Price</Dialog.Title>
            <Dialog.Content>
              <React.Fragment>
                {loading && <Loader />}
                <View>
                  <List.Item
                    key="All"
                    title="All games"
                    onPress={() => this.setState({ maxPrice: 'Infinity' })}
                    left={() => <Image style={styles.image} source={walletIcon} />}
                    right={() => (
                      <Checkbox status={maxPrice === 'Infinity' ? 'checked' : 'unchecked'} />
                    )}
                  />
                  <List.Item
                    key="Free"
                    title="Free games only"
                    onPress={() => this.setState({ maxPrice: '0' })}
                    left={() => <Image style={styles.image} source={freeIcon} />}
                    right={() => <Checkbox status={maxPrice === '0' ? 'checked' : 'unchecked'} />}
                  />
                </View>
              </React.Fragment>
            </Dialog.Content>
            <Dialog.Actions style={styles.dialogActions}>
              <Button disabled={loading} onPress={this.handleDismissDialog}>
                Cancel
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
  state => ({ stateFilter: state[filtersState.STORE_NAME].price }),
  { onSetFilter: filtersState.actions.setPriceFilter }
)(PriceFilter)
