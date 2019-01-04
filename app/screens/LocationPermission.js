import React from 'react'
import { Title } from 'react-native-paper'
import { Header } from 'react-native-elements'
import { Container } from '../components'

const MESSAGE =
  "Welcome to Spoko App! I'm Jo, your Spoko Assistant. Let's get to know each other! First of all, can you tell me where you're from?"

export default function LocationPermission() {
  return (
    <Container>
      <Header backgroundColor="transparent" centerComponent={<Title>Hello!</Title>} />
    </Container>
  )
}
