import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Portal, Dialog, Paragraph, Button, Checkbox } from 'react-native-paper'
import PropTypes from 'prop-types'
import { FilterButton } from '.'

class SportFilter extends Component {
  state = {
    showDialog: false,
  }

  handleDismissDialog = () => this.setState({ showDialog: false })

  render() {
    const { showDialog } = this.state

    return (
      <React.Fragment>
        <FilterButton
          icon="directions-run"
          label="All"
          onPress={() => this.setState({ showDialog: true })}
        />
        <Portal>
          <Dialog visible={showDialog} onDismiss={this.handleDismissDialog}>
            <Dialog.Title>Sports</Dialog.Title>
            <Dialog.Content>
              <Paragraph>This is simple dialog</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={this.handleDismissDialog}>Cancel</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </React.Fragment>
    )
  }
}

export default connect()(SportFilter)
