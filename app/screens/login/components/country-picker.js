import React, { Component } from 'react'
import { View, Picker, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { EditModal } from '../../../components'
import countries from './countries.json'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  pickerItem: {
    marginLeft: 32,
    textAlign: 'left',
  },
})

export { countries }

export default class CountryPicker extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initialValue: PropTypes.string,
  }

  static defaultProps = {
    initialValue: '',
  }

  state = {
    country: this.props.initialValue,
  }

  render() {
    const { show, onClose, onSubmit } = this.props

    return (
      <EditModal
        show={show}
        onClose={onClose}
        onSubmit={() => onSubmit(this.state.country)}
        title="Select your country"
      >
        <View style={styles.container}>
          <Picker
            selectedValue={this.state.country}
            onValueChange={country => this.setState({ country })}
            itemStyle={styles.pickerItem}
          >
            {Object.keys(countries).map(key => (
              <Picker.Item
                label={`${countries[key].flag} ${countries[key].name.common}`}
                value={key}
                key={key}
              />
            ))}
          </Picker>
        </View>
      </EditModal>
    )
  }
}
