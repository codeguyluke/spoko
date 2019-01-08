import React, { Component } from 'react'
import { Card, Title } from 'react-native-paper'
import PropTypes from 'prop-types'

export default class Router extends Component {
  static propTypes = {
    user: PropTypes.shape({
      uid: PropTypes.string.isRequired,
    }).isRequired,
  }
  render() {
    return (
      <Card>
        <Title>AUTHENTICATED</Title>
      </Card>
    )
  }
}
