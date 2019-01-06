import React from 'react'
import PropTypes from 'prop-types'
import { Container, JoChat, ActionPanel } from '../components'

export default function WelcomeChat({ messages, panelProps }) {
  return (
    <Container>
      <JoChat messages={messages} />
      <ActionPanel {...panelProps} />
    </Container>
  )
}

WelcomeChat.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({ text: PropTypes.string, type: PropTypes.oneOf(['action', 'jo']) })
  ).isRequired,
  panelProps: PropTypes.shape({
    FABLabel: PropTypes.string,
    FABAction: PropTypes.func,
    negativeLabel: PropTypes.string,
    negativeAction: PropTypes.func,
  }).isRequired,
}
