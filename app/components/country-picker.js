import React, { Component } from 'react'
import { Portal, Modal, Button, Colors, List } from 'react-native-paper'
import PropTypes from 'prop-types'
import countries from '../assets/countries.json'

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
        <Button onPress={() => this.setState({ showCountryModal: true })} color={Colors.grey500}>
          {`${countries[selectedCountry].flag} ${countries[selectedCountry].callingCode}`}
        </Button>
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
