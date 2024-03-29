import React, { Component } from 'react'
import { StyleSheet, Image, FlatList } from 'react-native'
import { List, Subheading, IconButton } from 'react-native-paper'
import firebase from 'react-native-firebase'
import PropTypes from 'prop-types'
import { downloadAvatar } from '../services/storage'
import { callPhone } from '../services/communications'
import { Loader } from '.'
import peopleIcon from '../assets/images/people.png'
import avatarIcon from '../assets/images/avatar.png'

async function retrievePhotoForPlayer(player) {
  return new Promise(async resolve => {
    if (!player.photoURL) return resolve({ ...player, photo: avatarIcon })

    try {
      const response = await downloadAvatar(player.photoURL)
      const fileReaderInstance = new FileReader()
      fileReaderInstance.readAsDataURL(response.data)
      fileReaderInstance.onload = () => {
        const base64data = fileReaderInstance.result
        resolve({ ...player, photo: { uri: base64data } })
      }
      return true
    } catch (error) {
      return resolve({ ...player, photo: avatarIcon })
    }
  })
}

function getPlayersString(players) {
  const signedPlayers = players.filter(player => player.id !== 'player')
  return `${signedPlayers.length} of ${players.length} players signed`
}

const styles = StyleSheet.create({
  titleIcon: {
    width: 48,
    height: 48,
    marginRight: 8,
  },
  titleContainer: {
    padding: 0,
    paddingVertical: 16,
  },
  title: {
    flex: 1,
    fontWeight: '500',
  },
  itemContainer: {
    padding: 0,
  },
  itemIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    alignSelf: 'center',
  },
  itemTitle: {
    fontWeight: '500',
  },
})

export default class PlayersList extends Component {
  static propTypes = {
    players: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        phoneNumber: PropTypes.string,
        photoURL: PropTypes.string,
      })
    ).isRequired,
  }

  state = {
    loading: false,
    players: [],
  }

  async componentDidMount() {
    const { players } = this.props
    this.setState({ loading: true })
    const playersWithPhotos = await Promise.all(players.map(retrievePhotoForPlayer))
    this.setState({ loading: false, players: playersWithPhotos })
  }

  renderPlayer = ({ item }) => {
    const isCurrent = firebase.auth().currentUser.uid === item.id
    const titlePlaceholder = isCurrent ? 'Me' : 'Anonymous'
    const titleText = item.displayName || titlePlaceholder
    const Right = isCurrent
      ? undefined
      : () => <IconButton icon="phone" onPress={() => callPhone(item.phoneNumber)} />
    const Title = isCurrent ? (
      <Subheading style={styles.itemTitle}>{titleText}</Subheading>
    ) : (
      titleText
    )
    return (
      <List.Item
        key={item.id}
        style={styles.itemContainer}
        left={() => <Image style={styles.itemIcon} source={item.photo} />}
        right={Right}
        title={Title}
      />
    )
  }

  render() {
    const { players: propsPlayers } = this.props
    const { players, loading } = this.state

    const signedPlayers = players.filter(player => player.id !== 'player')

    return (
      <List.Accordion
        style={styles.titleContainer}
        title={<Subheading style={styles.title}>{getPlayersString(propsPlayers)}</Subheading>}
        left={() => <Image source={peopleIcon} style={styles.titleIcon} />}
      >
        {loading ? (
          <Loader contained size="small" />
        ) : (
          <FlatList
            data={signedPlayers}
            renderItem={this.renderPlayer}
            keyExtractor={item => item.id}
          />
        )}
      </List.Accordion>
    )
  }
}
