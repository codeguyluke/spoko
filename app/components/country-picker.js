import React, { Component } from 'react'
import { TouchableHighlight, StyleSheet } from 'react-native'
import { Portal, Modal, Text, Colors, List } from 'react-native-paper'
import PropTypes from 'prop-types'
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
  }

  handleSelectCountry = country => {
    this.props.onSelectCountry(country)
    this.setState({ showCountryModal: false })
  }

  render() {
    const { selectedCountry } = this.props
    const { showCountryModal } = this.state

    return (
      <React.Fragment>
        <TouchableHighlight
          onPress={() => this.setState({ showCountryModal: true })}
          underlayColor={Colors.grey300}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonLabel}>{`${countries[selectedCountry].flag} ${
            countries[selectedCountry].callingCode
          }`}</Text>
        </TouchableHighlight>
        <Portal>
          <Modal
            visible={showCountryModal}
            onDismiss={() => this.setState({ showCountryModal: false })}
          >
            <List.Section title="Country">
              {Object.keys(countries).map(key => (
                <List.Item key={key} title={countries[key].name} />
              ))}
            </List.Section>
          </Modal>
        </Portal>
      </React.Fragment>
    )
  }
}
