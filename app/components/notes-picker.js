import React, { Component } from 'react'
import {
  View,
  Modal,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import { Portal, withTheme, Button, TextInput } from 'react-native-paper'
import PropTypes from 'prop-types'
import truncate from 'lodash/truncate'
import { Container, EditRow, ModalHeader } from '.'
import noteIcon from '../assets/images/note.png'

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    marginVertical: 16,
  },
  inputContainer: {
    flex: 1,
  },
  textInput: {
    minHeight: 160,
    backgroundColor: '#FFF',
    borderRadius: 4,
  },
  dismissArea: {
    flex: 1,
  },
})

class NotesPicker extends Component {
  static propTypes = {
    onAddNotes: PropTypes.func.isRequired,
    theme: PropTypes.shape({
      colors: PropTypes.shape({
        accent: PropTypes.string.isRequired,
        error: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    notes: PropTypes.string,
  }

  static defaultProps = {
    notes: '',
  }

  state = {
    showNotesModal: false,
    notes: this.props.notes,
  }

  handleCloseModal = () => {
    this.setState({ showNotesModal: false })
  }

  handleSubmit = () => {
    const { notes } = this.state

    this.props.onAddNotes(notes)
    this.setState({ showNotesModal: false })
  }

  render() {
    const { notes: propsNotes, theme } = this.props
    const { showNotesModal, notes } = this.state

    return (
      <React.Fragment>
        <EditRow
          optional
          labelIcon="edit"
          placeholder="Add extra notes"
          image={propsNotes && noteIcon}
          value={truncate(propsNotes)}
          onPress={() => this.setState({ showNotesModal: true })}
          label="notes"
        />
        <Portal>
          <Modal
            visible={showNotesModal}
            onRequestClose={this.handleCloseModal}
            animationType="slide"
          >
            <Container>
              <ModalHeader title="Add extra notes" onClose={this.handleCloseModal} />
              <KeyboardAvoidingView style={styles.inputContainer} behavior="padding">
                <TextInput
                  multiline
                  numberOfLines={5}
                  value={notes}
                  onChangeText={newNotes => this.setState({ notes: newNotes })}
                  style={styles.textInput}
                  onSubmitEditing={Keyboard.dismiss}
                />
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <View style={styles.dismissArea} />
                </TouchableWithoutFeedback>
              </KeyboardAvoidingView>
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

export default withTheme(NotesPicker)
