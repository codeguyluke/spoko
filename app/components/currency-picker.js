import React, { Component } from 'react'
import { TouchableHighlight, StyleSheet, Modal, FlatList } from 'react-native'
import { Text, Colors, List, Searchbar } from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PropTypes from 'prop-types'
import { Container, ModalHeader } from '.'
import currencies from '../assets/currencies.json'

const styles = StyleSheet.create({
  buttonContainer: {
    borderColor: Colors.grey300,
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  searchbar: {
    marginBottom: 16,
  },
  flag: {
    fontSize: 22,
    paddingHorizontal: 12,
    alignSelf: 'center',
    textAlign: 'center',
  },
  callingCode: {
    textAlign: 'center',
    alignSelf: 'center',
    color: Colors.grey500,
  },
  buttonLabel: {
    fontSize: 16,
    color: Colors.grey500,
  },
})

export default class CountryPicker extends Component {
  static propTypes = {
    currency: PropTypes.oneOf(Object.keys(currencies)).isRequired,
    onSelectCurrency: PropTypes.func.isRequired,
  }

  state = {
    showCurrencyModal: false,
    currencyTerm: '',
  }

  handleCloseModal = () => {
    this.setState({ showCurrencyModal: false })
  }

  handleSelectCurrency = currency => () => {
    this.props.onSelectCurrency(currency)
    this.setState({ showCurrencyModal: false })
  }

  filterCurrencies = () =>
    Object.keys(currencies).filter(
      key =>
        currencies[key].name.toLowerCase().includes(this.state.currencyTerm.toLowerCase()) ||
        key.toLowerCase().includes(this.state.currencyTerm.toLowerCase())
    )

  render() {
    const { currency } = this.props
    const { showCurrencyModal, currencyTerm } = this.state

    return (
      <React.Fragment>
        <TouchableHighlight
          onPress={() => this.setState({ showCurrencyModal: true })}
          underlayColor={Colors.grey300}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonLabel}>{`${currencies[currency].flag} ${currency}`}</Text>
        </TouchableHighlight>
        <Modal
          visible={showCurrencyModal}
          onRequestClose={this.handleCloseModal}
          animationType="slide"
        >
          <Container>
            <ModalHeader title="Select currency" onClose={this.handleCloseModal} />
            <Searchbar
              placeholder="Currency"
              value={currencyTerm}
              onChangeText={term => this.setState({ currencyTerm: term })}
              style={styles.searchbar}
            />
            <KeyboardAwareScrollView>
              <FlatList
                data={this.filterCurrencies()}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                  <List.Item
                    key={item}
                    title={currencies[item].name}
                    right={() => <Text style={styles.callingCode}>{item}</Text>}
                    left={() => <Text style={styles.flag}>{currencies[item].flag}</Text>}
                    onPress={this.handleSelectCurrency(item)}
                  />
                )}
              />
            </KeyboardAwareScrollView>
          </Container>
        </Modal>
      </React.Fragment>
    )
  }
}
