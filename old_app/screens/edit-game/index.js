import React, { Component } from 'react'
import { ScrollView, View, StyleSheet, Alert, InteractionManager } from 'react-native'
import { connect } from 'react-redux'
import firebase from 'react-native-firebase'
import isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'
import gamesState from '../../state/games'
import {
  EditRow,
  Label,
  PlacePicker,
  TimePicker,
  SportPicker,
  SpotsPicker,
  StyledButton,
  NavigationIcon,
} from '../../components'
import { getTimeStringLong } from '../../helpers/time'
import colors from '../../style/colors'

const showDeleteConfirmation = ({ onSuccess }) => () =>
  InteractionManager.runAfterInteractions(() => {
    Alert.alert('Delete game?', 'Are you sure you want to delete this game?', [
      { text: 'Yes', onPress: onSuccess },
      { text: 'No', style: 'cancel' },
    ])
  })

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255, 255, 255)',
    padding: 16,
  },
  pickersContainer: {
    flex: 1,
    paddingBottom: 16,
    justifyContent: 'space-around',
  },
  buttonContainer: {
    paddingTop: 16,
  },
})

class EditGame extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
      getParam: PropTypes.func.isRequired,
      setParams: PropTypes.func.isRequired,
      popToTop: PropTypes.func.isRequired,
    }).isRequired,
    onCreateGame: PropTypes.func.isRequired,
    onEditGame: PropTypes.func.isRequired,
    onDeleteGame: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {
      title: params.doGameExist ? 'Edit game' : 'Create new game',
      headerTintColor: colors.navy,
      headerLeft: (
        <NavigationIcon name="ios-arrow-back" type="ionicon" onPress={() => navigation.goBack()} />
      ),
      headerRight: params.doGameExist && (
        <NavigationIcon
          name="ios-trash"
          type="ionicon"
          color={colors.red}
          onPress={showDeleteConfirmation({
            onSuccess: params.onDeletePress,
          })}
        />
      ),
    }
  }

  constructor(props) {
    super(props)

    this.game = props.navigation.getParam('game')

    this.state = {
      sport: (this.game && this.game.sport) || '',
      showSportModal: false,
      place: (this.game && this.game.place) || {},
      showPlaceModal: false,
      time: (this.game && this.game.time) || null,
      showTimeModal: false,
      spots: (this.game && this.game.spots) || 1,
      edited: false,
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({
      doGameExist: Boolean(this.game),
      onDeletePress: this.handleDelete,
    })
  }

  handleDelete = () => {
    this.props.onDeleteGame(this.game.id, () => this.props.navigation.popToTop())
  }

  handlePlaceSelected = selectedPlace => {
    const {
      location: { lat, lng },
    } = selectedPlace
    const newPlace = {
      ...selectedPlace,
      location: new firebase.firestore.GeoPoint(lat, lng),
    }
    this.setState({ place: newPlace, showPlaceModal: false, edited: true })
  }

  handleSavePress = () => {
    const { sport, place, time, spots } = this.state
    const {
      onEditGame,
      onCreateGame,
      navigation: { goBack },
    } = this.props

    if (!sport) {
      Alert.alert('Select sport', 'You need to select the type of sport.', [{ text: 'OK' }])
      return
    }

    if (isEmpty(place)) {
      Alert.alert('Choose place', 'You need to provide the place of the game.', [{ text: 'OK' }])
      return
    }

    if (!time) {
      Alert.alert('Choose time', 'You need to provide the time of the game.', [{ text: 'OK' }])
      return
    }

    if (this.game) {
      onEditGame({ sport, place, time, spots, id: this.game.id }, () => goBack())
    } else {
      onCreateGame({ sport, place, time, spots }, () => goBack())
    }
  }

  renderSportRow = (sport, showSportModal) => (
    <View>
      <Label left>Sport</Label>
      <EditRow
        onPress={() => this.setState({ showSportModal: true })}
        placeholder="Select sport"
        text={sport}
      />
      <SportPicker
        show={showSportModal}
        onClose={() => this.setState({ showSportModal: false })}
        onSubmit={selectedSport =>
          this.setState({ sport: selectedSport, showSportModal: false, edited: true })
        }
        initialValue={(this.game && this.game.sport) || undefined}
      />
    </View>
  )

  renderPlaceRow = (place, showPlaceModal) => (
    <View>
      <Label left>Place</Label>
      <EditRow
        onPress={() => this.setState({ showPlaceModal: true })}
        placeholder="Choose place"
        text={place.description}
      />
      <PlacePicker
        show={showPlaceModal}
        onClose={() => this.setState({ showPlaceModal: false })}
        onSubmit={this.handlePlaceSelected}
      />
    </View>
  )

  renderTimeRow = (time, showTimeModal) => (
    <View>
      <Label left>Time</Label>
      <EditRow
        onPress={() => this.setState({ showTimeModal: true })}
        placeholder="Pick time"
        text={getTimeStringLong(time)}
      />
      <TimePicker
        show={showTimeModal}
        onClose={() => this.setState({ showTimeModal: false })}
        onSubmit={selectedTime =>
          this.setState({ time: selectedTime, showTimeModal: false, edited: true })
        }
        initialValue={(this.game && this.game.time) || undefined}
      />
    </View>
  )

  renderSpotsRow = spots => (
    <View>
      <Label left>Spots</Label>
      <SpotsPicker
        spots={spots}
        onSpotsChange={selectedSpots => this.setState({ spots: selectedSpots, edited: true })}
      />
    </View>
  )

  render() {
    const {
      sport,
      showSportModal,
      time,
      showTimeModal,
      place,
      showPlaceModal,
      spots,
      edited,
    } = this.state

    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.pickersContainer}
          keyboardShouldPersistTaps="always"
        >
          {this.renderSportRow(sport, showSportModal)}
          {this.renderPlaceRow(place, showPlaceModal)}
          {this.renderTimeRow(time, showTimeModal)}
          {this.renderSpotsRow(spots)}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <StyledButton
            title="Save"
            loading={this.props.loading}
            color={StyledButton.COLORS.green}
            onPress={this.handleSavePress}
            disabled={!edited}
          />
        </View>
      </View>
    )
  }
}

export default connect(
  state => ({
    loading: state[gamesState.STORE_NAME].loading,
  }),
  {
    onCreateGame: gamesState.actions.createGameStarted,
    onEditGame: gamesState.actions.editGameStarted,
    onDeleteGame: gamesState.actions.deleteGameStarted,
  }
)(EditGame)
