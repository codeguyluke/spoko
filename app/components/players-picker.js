import React, { Component } from 'react'
import { View, Modal, StyleSheet } from 'react-native'
import { Portal, withTheme, Button } from 'react-native-paper'
import PropTypes from 'prop-types'
import { Container, EditRow, ModalHeader, NumberPicker } from '.'
import peopleIcon from '../assets/images/people.png'

const getPlayersString = players => (players.length < 1 ? '' : `${players.length} open spots`)

const MAX_PLAYERS = 5

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
  },
  pickerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
})

class PlayersPicker extends Component {
  static propTypes = {
    onSelectPlayers: PropTypes.func.isRequired,
    theme: PropTypes.shape({
      colors: PropTypes.shape({
        accent: PropTypes.string.isRequired,
        error: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    players: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        photoURL: PropTypes.string,
      })
    ).isRequired,
  }

  state = {
    showPlayersModal: false,
    players: this.props.players.length > 0 ? this.props.players : [{ id: 'player', photoURL: '' }],
  }

  handleCloseModal = () => {
    this.setState({ showPlayersModal: false })
  }

  handleAddPlayer = () =>
    this.setState(prevState => {
      const newPlayers = [...prevState.players, { id: 'player', photoURL: '' }]
      return { players: newPlayers }
    })

  handleSubmit = () => {
    const { players } = this.state

    this.props.onSelectPlayers(players)
    return this.setState({ showPlayersModal: false })
  }

  render() {
    const { players: propsPlayers, theme } = this.props
    const { showPlayersModal, players } = this.state

    return (
      <React.Fragment>
        <EditRow
          labelIcon="group"
          placeholder="Pick number of players"
          image={propsPlayers.length > 0 ? peopleIcon : ''}
          value={getPlayersString(propsPlayers)}
          onPress={() => this.setState({ showPlayersModal: true })}
          label="players"
        />
        <Portal>
          <Modal
            visible={showPlayersModal}
            onRequestClose={this.handleCloseModal}
            animationType="slide"
          >
            <Container>
              <ModalHeader title="Pick number of players" onClose={this.handleCloseModal} />
              <View style={styles.pickerContainer}>
                <NumberPicker
                  value={players.length}
                  min={propsPlayers.length || 1}
                  max={MAX_PLAYERS}
                  onUp={this.handleAddPlayer}
                  onDown={() => {}}
                />
              </View>
              <Button
                mode="contained"
                onPress={this.handleSubmit}
                color={theme.colors.accent}
                style={styles.button}
              >
                Save
              </Button>
            </Container>
          </Modal>
        </Portal>
      </React.Fragment>
    )
  }
}

export default withTheme(PlayersPicker)
