import React, { Component } from 'react'
import { TouchableHighlight, StyleSheet, Modal, FlatList } from 'react-native'
import { Portal, Text, Colors, List, Searchbar } from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PropTypes from 'prop-types'
import { Container, ModalHeader } from '.'
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
    selectedCountry: PropTypes.oneOf(Object.keys(countries)).isRequired,
    onSelectCountry: PropTypes.func.isRequired,
  }

  state = {
    showCountryModal: false,
    countryTerm: '',
  }

  handleCloseModal = () => {
    this.setState({ showCountryModal: false })
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
            onRequestClose={this.handleCloseModal}
            animationType="slide"
          >
            <Container>
              <ModalHeader title="Select country" onClose={this.handleCloseModal} />
              <Searchbar
                placeholder="Country"
                value={countryTerm}
                onChangeText={term => this.setState({ countryTerm: term })}
                style={styles.searchbar}
              />
              <KeyboardAwareScrollView>
                <FlatList
                  data={this.filterCountries()}
                  keyExtractor={item => item}
                  renderItem={({ item }) => (
                    <List.Item
                      key={item}
                      title={countries[item].name}
                      right={() => (
                        <Text style={styles.callingCode}>{countries[item].callingCode}</Text>
                      )}
                      left={() => <Text style={styles.flag}>{countries[item].flag}</Text>}
                      onPress={this.handleSelectCountry(item)}
                    />
                  )}
                />
              </KeyboardAwareScrollView>
            </Container>
          </Modal>
        </Portal>
      </React.Fragment>
    )
  }
}
