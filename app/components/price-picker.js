import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Modal, StyleSheet } from 'react-native'
import { Portal, withTheme, Button } from 'react-native-paper'
import { Slider } from 'react-native-elements'
import PropTypes from 'prop-types'
import regionState from '../store/region'
import { Container, EditRow, ModalHeader, CurrencyPicker } from '.'
import moneyIcon from '../assets/images/money.png'
import currencies from '../assets/currencies.json'

const getCurrencyFromCountrySymbol = country => {
  const currency = Object.keys(currencies).find(key => currencies[key].countries.includes(country))
  return currency || 'USD'
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
  },
  pickerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
})

class PricePicker extends Component {
  static propTypes = {
    onSelectPrice: PropTypes.func.isRequired,
    theme: PropTypes.shape({
      colors: PropTypes.shape({
        accent: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    country: PropTypes.string.isRequired,
    price: PropTypes.number,
  }

  static defaultProps = {
    price: -1,
  }

  state = {
    showPriceModal: false,
    currency: getCurrencyFromCountrySymbol(this.props.country),
  }

  handleCloseModal = () => {
    this.setState({ showPriceModal: false })
  }

  handleSubmit = () => {
    this.props.onSelectPrice(this.state.datetime)
    this.setState({ showPriceModal: false })
  }

  render() {
    const { price, theme } = this.props
    const { showPriceModal, currency } = this.state

    return (
      <React.Fragment>
        <EditRow
          labelIcon="attach-money"
          placeholder="Set the price"
          image={price >= 0 ? moneyIcon : null}
          value={`${price >= 0 ? price : ''}`}
          onPress={() => this.setState({ showPriceModal: true })}
          label="price"
        />
        <Portal>
          <Modal
            visible={showPriceModal}
            onRequestClose={this.handleCloseModal}
            animationType="slide"
          >
            <Container>
              <ModalHeader title="Set the price" onClose={this.handleCloseModal} />
              <View style={styles.pickerContainer}>
                <Slider />
                <CurrencyPicker
                  currency={currency}
                  onSelectCurrency={newCurrency => this.setState({ currency: newCurrency })}
                />
              </View>
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

export default connect(state => ({ country: state[regionState.STORE_NAME].country }))(
  withTheme(PricePicker)
)
