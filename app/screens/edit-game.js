import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { withTheme } from 'react-native-paper'
import PropTypes from 'prop-types'
import { SportPicker } from '../components'

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
      place: (this.game && this.game.place) || {},
      datetime: (this.game && this.game.time) || null,
      spots: (this.game && this.game.spots) || 1,
      edited: false,
    }
  }

  render() {
    const { theme } = this.props
    const { sport } = this.state

    return (
      <ScrollView style={{ backgroundColor: theme.colors.background }}>
        <SportPicker
          sport={sport}
          onSelectSport={selectedSport => this.setState({ sport: selectedSport })}
        />
      </ScrollView>
    )
  }
}

export default withTheme(EditGame)
