import React from 'react'
import { Portal, Dialog, List, Paragraph, Button, withTheme } from 'react-native-paper'
import PropTypes from 'prop-types'

function LocationDialog({ show, onCancel, onYes, theme }) {
  return (
    <Portal>
      <Dialog visible={show} onDismiss={onCancel}>
        <Dialog.Title>Allow location?</Dialog.Title>
        <Dialog.Content>
          <Paragraph>We only use your location to allow features like:</Paragraph>
          <List.Section>
            <List.Item
              title="Finding games around"
              left={() => <List.Icon icon="check-box" color={theme.colors.accent} />}
            />
            <List.Item
              title="Navigating to games"
              left={() => <List.Icon icon="check-box" color={theme.colors.accent} />}
            />
            <List.Item
              title="Finding venues around"
              left={() => <List.Icon icon="check-box" color={theme.colors.accent} />}
            />
          </List.Section>
          <Paragraph>Do you agree to allow SpontApp to use your location?</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onCancel}>Not now</Button>
          <Button onPress={onYes}>Yes</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

LocationDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onYes: PropTypes.func.isRequired,
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      accent: PropTypes.string.isRequired,
    }),
  }).isRequired,
}

export default withTheme(LocationDialog)
