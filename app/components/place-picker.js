import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, StyleSheet, LayoutAnimation } from 'react-native'
import { Portal, Button, withTheme, DefaultTheme } from 'react-native-paper'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import firebase from 'react-native-firebase'
import PropTypes from 'prop-types'
import config from '../config/keys'
import { getGooglePlaceDetails } from '../services/network'
import regionState from '../store/region'
import globeIcon from '../assets/images/globe.png'
import { Container, EditRow, ModalHeader } from '.'

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
  },
})

const googleAutocompleteStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  textInputContainer: {
    height: 48,
    backgroundColor: '#FFF',
    borderRadius: 4,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingLeft: 0,
    paddingRight: 0,
    alignItems: 'center',
    elevation: 2,
  },
  textInput: {
    height: 40,
    paddingLeft: 16,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    marginTop: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderRadius: 4,
    fontSize: 18,
    color: '#212121',
  },
  row: {
    backgroundColor: '#FFF',
    marginTop: 4,
    marginBottom: 0,
    borderBottomWidth: 0,
    paddingLeft: 16,
    alignItems: 'center',
  },
  description: {
    color: DefaultTheme.colors.placeholder,
    fontSize: 14,
    borderBottomWidth: 0,
  },
  listView: {
    marginBottom: 16,
  },
})

const LAYOUT_SPRING = {
  duration: 200,
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 0.7,
  },
}

const QUERY = {
  key: config.GOOGLE_MAPS_API_KEY,
  language: 'en',
  radius: 10000,
}

class PlacePicker extends Component {
  static propTypes = {
    onSelectPlace: PropTypes.func.isRequired,
    region: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }).isRequired,
    theme: PropTypes.shape({
      colors: PropTypes.shape({
        accent: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    place: PropTypes.shape({
      id: PropTypes.string,
      description: PropTypes.string,
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
      }),
    }),
  }

  static defaultProps = {
    place: null,
  }

  state = {
    place: null,
    showPlaceModal: false,
    showListView: 'auto',
    loading: false,
  }

  handleCloseModal = () => {
    this.setState({ showPlaceModal: false })
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
    const { onSelectPlace } = this.props
    const { place } = this.state

    this.setState({ loading: true })
    try {
      const { data } = await getGooglePlaceDetails({ id: place.id })
      const {
        location: { lat, lng },
      } = data.result.geometry
      const newPlace = {
        ...place,
        location: new firebase.firestore.GeoPoint(lat, lng),
      }
      return this.setState({ loading: false, place: newPlace, showPlaceModal: false }, () =>
        onSelectPlace(newPlace)
      )
    } catch (error) {
      console.error(error)
      return this.setState({ loading: false })
    }
  }

  render() {
    const {
      place: propsPlace,
      region: { latitude, longitude },
      theme,
    } = this.props
    const { showPlaceModal, showListView, loading, place } = this.state

    const queryWithLocation = {
      ...QUERY,
      location: `${latitude},${longitude}`,
    }

    return (
      <React.Fragment>
        <EditRow
          labelIcon="place"
          placeholder="Choose the place"
          image={propsPlace && globeIcon}
          value={propsPlace && propsPlace.description}
          onPress={() => this.setState({ showPlaceModal: true, place: null })}
          label="place"
        />
        <Portal>
          <Modal
            visible={showPlaceModal}
            onRequestClose={this.handleCloseModal}
            animationType="slide"
          >
            <Container>
              <ModalHeader title="Choose the place" onClose={this.handleCloseModal} />
              <GooglePlacesAutocomplete
                enablePoweredByContainer={false}
                placeholder="Search for place"
                minLength={2}
                query={queryWithLocation}
                listViewDisplayed={showListView}
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
              <Button
                mode="contained"
                onPress={this.handleSubmit}
                disabled={!place}
                loading={loading}
                color={theme.colors.accent}
                style={styles.button}
              >
                Submit
              </Button>
            </Container>
          </Modal>
        </Portal>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  region: state[regionState.STORE_NAME].region,
}))(withTheme(PlacePicker))
