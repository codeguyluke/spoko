import React, { Component } from 'react'
import { Modal, FlatList, Image, StyleSheet } from 'react-native'
import { Portal, List } from 'react-native-paper'
import PropTypes from 'prop-types'
import sports from '../assets/sports'
import { Container, EditRow, ModalHeader } from '.'

const styles = StyleSheet.create({
  image: {
    width: 64,
    height: 64,
    marginRight: 16,
  },
})

export default class SportPicker extends Component {
  static propTypes = {
    sport: PropTypes.string.isRequired,
    onSelectSport: PropTypes.func.isRequired,
  }

  state = {
    showSportsModal: false,
  }

  handleCloseModal = () => {
    this.setState({ showSportsModal: false })
  }

  handleSelectSport = sport => () => {
    this.props.onSelectSport(sport)
    this.setState({ showSportsModal: false })
  }

  render() {
    const { sport } = this.props
    const { showSportsModal } = this.state

    return (
      <React.Fragment>
        <EditRow
          labelIcon="directions-run"
          image={sports[sport] && sports[sport].icon}
          value={sports[sport] && sports[sport].name}
          onPress={() => this.setState({ showSportsModal: true })}
          label="sport"
        />
        <Portal>
          <Modal
            visible={showSportsModal}
            onRequestClose={this.handleCloseModal}
            animationType="slide"
          >
            <Container>
              <ModalHeader title="Select sport" onClose={this.handleCloseModal} />
              <FlatList
                data={Object.keys(sports)}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                  <List.Item
                    key={item}
                    title={sports[item].name}
                    onPress={this.handleSelectSport(item)}
                    left={() => <Image style={styles.image} source={sports[item].icon} />}
                  />
                )}
              />
            </Container>
          </Modal>
        </Portal>
      </React.Fragment>
    )
  }
}
