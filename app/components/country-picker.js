import React, { Component } from 'react'
import { TouchableHighlight, StyleSheet } from 'react-native'
import { Portal, Modal, Text, Colors, List, Searchbar } from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PropTypes from 'prop-types'
import { Container } from '.'
import countries from '../assets/countries.json'

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
    marginVertical: 16,
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
    selectedCountry: PropTypes.oneOf(Object.keys(countries)).isRequired,
    onSelectCountry: PropTypes.func.isRequired,
  }

  state = {
    showCountryModal: false,
    countryTerm: '',
  }

  handleSelectCountry = country => () => {
    this.props.onSelectCountry(country)
    this.setState({ showCountryModal: false })
  }

  filterCountries = () =>
    Object.keys(countries).filter(key =>
      countries[key].name.toLowerCase().includes(this.state.countryTerm.toLowerCase())
    )

  render() {
    const { selectedCountry } = this.props
    const { showCountryModal, countryTerm } = this.state

    return (
      <React.Fragment>
        <TouchableHighlight
          onPress={() => this.setState({ showCountryModal: true })}
          underlayColor={Colors.grey300}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonLabel}>
            {`${countries[selectedCountry].flag} ${countries[selectedCountry].callingCode}`}
          </Text>
        </TouchableHighlight>
        <Portal>
          <Modal
            visible={showCountryModal}
            onDismiss={() => this.setState({ showCountryModal: false })}
          >
            <Container>
              <Searchbar
                placeholder="Country"
                value={countryTerm}
                onChangeText={term => this.setState({ countryTerm: term })}
                style={styles.searchbar}
              />
              <KeyboardAwareScrollView>
                {this.filterCountries().map(key => (
                  <List.Item
                    key={key}
                    title={countries[key].name}
                    right={() => (
                      <Text style={styles.callingCode}>{countries[key].callingCode}</Text>
                    )}
                    left={() => <Text style={styles.flag}>{countries[key].flag}</Text>}
                    onPress={this.handleSelectCountry(key)}
                  />
                ))}
              </KeyboardAwareScrollView>
            </Container>
          </Modal>
        </Portal>
      </React.Fragment>
    )
  }
}
