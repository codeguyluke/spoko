import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Modal, StyleSheet, KeyboardAvoidingView, TextInput } from 'react-native'
import { Portal, withTheme, Button, Colors, HelperText } from 'react-native-paper'
import PropTypes from 'prop-types'
import regionState from '../store/region'
import { Container, EditRow, ModalHeader, CurrencyPicker } from '.'
import moneyIcon from '../assets/images/money.png'
import currencies from '../assets/currencies.json'

const getCurrencyFromCountrySymbol = country => {
  const currency = Object.keys(currencies).find(key => currencies[key].countries.includes(country))
  return currency || 'USD'
}

const getPriceString = price => {
  if (!price || !price.value || !price.currency) return ''
  if (Number(price.value) === 0) return 'FREE'

  return `${price.value} ${price.currency.toUpperCase()}`
}

const AMOUNT_REGEX = /^\d+(.\d{1,2})?$/

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    marginBottom: 16,
  },
  pickerContainer: {
    flex: 1,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
    alignItems: 'flex-end',
    textAlign: 'right',
    marginRight: 16,
    paddingHorizontal: 16,
    fontSize: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    borderColor: Colors.grey300,
    borderWidth: 1,
  },
})

class PricePicker extends Component {
  static propTypes = {
    onSelectPrice: PropTypes.func.isRequired,
    theme: PropTypes.shape({
      colors: PropTypes.shape({
        accent: PropTypes.string.isRequired,
        error: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    country: PropTypes.string.isRequired,
    price: PropTypes.shape({
      value: PropTypes.string,
      currency: PropTypes.string,
    }),
  }

  static defaultProps = {
    price: null,
  }

  state = {
    showPriceModal: false,
    priceCurrency:
      (this.props.price && this.props.price.currency) ||
      getCurrencyFromCountrySymbol(this.props.country),
    priceValue: (this.props.price && this.props.price.value) || null,
    textInputFocused: false,
    invalidAmount: false,
  }

  handleCloseModal = () => {
    this.setState({ showPriceModal: false })
  }

  handleSubmit = () => {
    const { priceValue, priceCurrency } = this.state
    const amountCorrect = priceValue.match(AMOUNT_REGEX)

    if (!amountCorrect) return this.setState({ invalidAmount: true })

    this.props.onSelectPrice({ value: priceValue, currency: priceCurrency })
    return this.setState({ showPriceModal: false })
  }

  handlePriceValueChange = newPriceValue => {
    this.setState({ invalidAmount: false, priceValue: newPriceValue.replace(',', '.') })
  }

  render() {
    const { price, theme } = this.props
    const {
      showPriceModal,
      priceCurrency,
      priceValue,
      textInputFocused,
      invalidAmount,
    } = this.state

    return (
      <React.Fragment>
        <EditRow
          labelIcon="attach-money"
          placeholder="Set the price"
          image={price && price.value && moneyIcon}
          value={getPriceString(price)}
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
              <KeyboardAvoidingView style={styles.pickerContainer} behavior="padding">
                <View style={styles.inputContainer}>
                  <View style={styles.row}>
                    <TextInput
                      placeholder="00.00"
                      keyboardType="numeric"
                      value={priceValue}
                      onChangeText={this.handlePriceValueChange}
                      style={[styles.textInput, textInputFocused && { backgroundColor: '#FFF' }]}
                      onFocus={() => this.setState({ textInputFocused: true })}
                      onBlur={() => this.setState({ textInputFocused: false })}
                    />
                    <CurrencyPicker
                      currency={priceCurrency}
                      onSelectCurrency={newPriceCurrency =>
                        this.setState({ priceCurrency: newPriceCurrency })
                      }
                    />
                  </View>
                  {invalidAmount && (
                    <HelperText style={{ color: theme.colors.error }}>
                      This price is invalid!
                    </HelperText>
                  )}
                </View>
                <Button
                  mode="contained"
                  onPress={this.handleSubmit}
                  color={theme.colors.accent}
                  style={styles.button}
                  disabled={!priceValue || !priceCurrency}
                >
                  Save
                </Button>
              </KeyboardAvoidingView>
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
