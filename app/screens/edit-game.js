import React, { Component } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { withTheme, FAB } from 'react-native-paper'
import PropTypes from 'prop-types'
import { SportPicker, PlacePicker, DatetimePicker } from '../components'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    margin: 16,
  },
})

class EditGame extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func.isRequired,
    }).isRequired,
    theme: PropTypes.shape({
      colors: PropTypes.shape({
        background: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props)

    this.game = props.navigation.getParam('game')
    this.state = {
      sport: (this.game && this.game.sport) || '',
      place: (this.game && this.game.place) || null,
      datetime: (this.game && this.game.datetime) || null,
    }
  }

  render() {
    const { theme } = this.props
    const { sport, place, datetime } = this.state

    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <ScrollView>
          <SportPicker
            sport={sport}
            onSelectSport={selectedSport => this.setState({ sport: selectedSport })}
          />
          <PlacePicker
            place={place}
            onSelectPlace={selectedPlace => this.setState({ place: selectedPlace })}
          />
          <DatetimePicker
            datetime={datetime}
            onSelectDatetime={selectedDatetime => this.setState({ datetime: selectedDatetime })}
          />
        </ScrollView>
        <FAB label={this.game ? 'Save' : 'Create'} onPress={() => {}} style={styles.fab} />
      </View>
    )
  }
}

export default withTheme(EditGame)
