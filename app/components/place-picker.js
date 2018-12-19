import React, { Component } from 'react'
import { StyleSheet, LayoutAnimation } from 'react-native'
import { connect } from 'react-redux'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'
import { EditModal } from './edit-modal'
import regionState from '../state/region'
import toastState from '../state/toast'
import { RegionPropType } from '../helpers/prop-types'
import { getGooglePlaceDetails } from '../services/network'
import config from '../config/keys'
import colors from '../style/colors'

const LAYOUT_SPRING = {
  duration: 200,
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 0.7,
  },
}

const googleAutocompleteStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  textInputContainer: {
    backgroundColor: 'rgb(255, 255, 255)',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingLeft: 0,
    paddingRight: 0,
    justifyContent: 'center',
  },
  textInput: {
    width: '100%',
    maxWidth: 560,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
    borderRadius: 0,
    fontSize: 16,
    color: colors.navy,
  },
  row: {
    paddingLeft: 8,
    alignItems: 'center',
  },
  description: {
    color: colors.navy,
    fontSize: 14,
  },
  listView: {
    marginBottom: 16,
  },
})

const QUERY = {
  key: config.GOOGLE_PLACES_API_KEY,
  language: 'en',
  radius: 10000,
}

class PlacePickerContent extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    region: RegionPropType.isRequired,
    onShowToast: PropTypes.func.isRequired,
  }

  state = {
    place: {},
    showListView: 'auto',
    loading: false,
  }

  handleTextInputEndEditing = () => {
    LayoutAnimation.configureNext(LAYOUT_SPRING)
    this.setState({ showListView: false })
  }

  handleTextInputFocus = () => {
    LayoutAnimation.configureNext(LAYOUT_SPRING)
    this.setState({ showListView: 'auto' })
  }

  handleTextInputSearchChange = () => LayoutAnimation.configureNext(LAYOUT_SPRING)

  handleSubmit = async () => {
    const { place } = this.state
    const { onSubmit, onClose } = this.props

    if (isEmpty(place)) return onClose()

    this.setState({ loading: true })
    try {
      const { data } = await getGooglePlaceDetails({ id: place.id })
      const { location } = data.result.geometry
      const newPlace = {
        ...place,
        location,
      }
      return this.setState({ loading: false, place: newPlace }, () => onSubmit(newPlace))
    } catch (error) {
      console.error(error)
      return this.setState({ loading: false }, () =>
        this.props.onShowToast('error', "Failed to find place's location")
      )
    }
  }

  render() {
    const {
      show,
      onClose,
      region: { latitude, longitude },
    } = this.props

    const queryWithLocation = {
      ...QUERY,
      location: `${latitude},${longitude}`,
    }

    return (
      <EditModal
        show={show}
        onClose={onClose}
        onSubmit={this.handleSubmit}
        title="Pick game's place"
        loading={this.state.loading}
      >
        <GooglePlacesAutocomplete
          enablePoweredByContainer={false}
          placeholder="Pick place"
          minLength={2}
          query={queryWithLocation}
          listViewDisplayed={this.state.showListView}
          renderDescription={row => row.description}
          onPress={(
            { place_id, description } // eslint-disable-line
          ) => this.setState({ place: { id: place_id, description } })}
          styles={googleAutocompleteStyles}
          textInputProps={{
            onChange: this.handleTextInputSearchChange,
            onEndEditing: this.handleTextInputEndEditing,
            onFocus: this.handleTextInputFocus,
            autoCorrect: false,
          }}
        />
      </EditModal>
    )
  }
}

export const PlacePicker = connect(
  state => ({ region: state[regionState.STORE_NAME].region }),
  {
    onShowToast: toastState.actions.addToast,
  }
)(PlacePickerContent)
