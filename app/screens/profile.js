import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'react-native-firebase'
import { View, ScrollView, StyleSheet, InteractionManager, Alert } from 'react-native'
import ImageResizer from 'react-native-image-resizer'
import { createStackNavigator } from 'react-navigation'
import ImagePicker from 'react-native-image-picker'
import { withTheme, Button, TextInput } from 'react-native-paper'
import { Avatar } from 'react-native-elements'
import PropTypes from 'prop-types'
import throttle from 'lodash/throttle'
import { Loader } from '../components'
import { uploadAvatar, downloadAvatar } from '../services/storage'
import toastState from '../store/toast'
import avatarIcon from '../assets/images/avatar.png'

const RESIZED_IMAGE_SIZE = 240

const showSignoutConfirmation = ({ onSuccess }) => () =>
  InteractionManager.runAfterInteractions(() => {
    Alert.alert('Sign out?', 'Are you sure you want to sign out?', [
      { text: 'Yes', onPress: onSuccess },
      { text: 'No', style: 'cancel' },
    ])
  })

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  avatarContainer: {
    alignSelf: 'center',
  },
  avatar: {
    borderWidth: 4,
  },
  button: {
    paddingVertical: 8,
    marginTop: 16,
  },
  textInput: {
    marginTop: 32,
    backgroundColor: 'transparent',
  },
})

class Profile extends Component {
  static propTypes = {
    theme: PropTypes.shape({
      colors: PropTypes.shape({
        background: PropTypes.string.isRequired,
        accent: PropTypes.string.isRequired,
        error: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    onAddToast: PropTypes.func.isRequired,
  }

  state = {
    nameEdited: false,
    photoEdited: false,
    loadingSave: false,
    loadingSignout: false,
    loadingPhoto: false,
    photo: null,
    displayName: firebase.auth().currentUser.displayName,
    textInputFocused: false,
  }

  textInputRef = React.createRef()

  async componentDidMount() {
    const { onAddToast } = this.props
    const url = firebase.auth().currentUser.photoURL
    if (!url) return this.setState({ photo: avatarIcon })

    this.setState({ loadingPhoto: true })
    try {
      const response = await downloadAvatar(url)
      const fileReaderInstance = new FileReader()
      fileReaderInstance.readAsDataURL(response.data)
      fileReaderInstance.onload = () => {
        const base64data = fileReaderInstance.result
        this.setState({ photo: { uri: base64data }, loadingPhoto: false })
      }
      return true
    } catch (error) {
      onAddToast("Couln't fetch your avatar.")
      return this.setState({ loadingPhoto: false })
    }
  }

  handleSave = async () => {
    const { onAddToast } = this.props
    const { displayName, photo, photoEdited } = this.state

    this.setState({ loadingSave: true })
    try {
      let newPhotoURL = firebase.auth().currentUser.photoURL
      if (photoEdited) {
        const resizedPhoto = await ImageResizer.createResizedImage(
          photo.uri,
          RESIZED_IMAGE_SIZE,
          RESIZED_IMAGE_SIZE,
          'JPEG',
          100
        )
        newPhotoURL = await uploadAvatar(resizedPhoto.uri)
      }
      await firebase.auth().currentUser.updateProfile({ displayName, photoURL: newPhotoURL })
      onAddToast('Profile updated!')
      this.setState({ loadingSave: false, photoEdited: false, nameEdited: false })
      if (this.textInputRef && this.textInputRef.current) {
        this.textInputRef.current.blur()
      }
    } catch (error) {
      onAddToast("Couln't update your profile")
      this.setState({ loadingSave: false, photoEdited: false, nameEdited: false })
    }
  }

  handleSignOut = async () => {
    const { onAddToast } = this.props
    this.setState({ loadingSignout: true })
    try {
      await firebase.auth().signOut()
    } catch (error) {
      onAddToast('Error during signout. Please try again.')
      this.setState({ loadingSignout: false })
    }
  }

  handleAvatarPress = () => {
    const { onAddToast } = this.props
    this.setState({ loadingPhoto: true })
    ImagePicker.showImagePicker(
      {
        title: 'Select Avatar',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      },
      response => {
        if (response.didCancel) return this.setState({ loadingPhoto: false })
        if (response.error) {
          onAddToast(response.error)
          return this.setState({ loadingPhoto: false })
        }
        const source = { uri: response.uri }
        return this.setState({ photo: source, photoEdited: true, loadingPhoto: false })
      }
    )
  }

  render() {
    const { theme } = this.props
    const {
      nameEdited,
      photoEdited,
      loadingSave,
      loadingSignout,
      displayName,
      photo,
      textInputFocused,
      loadingPhoto,
    } = this.state

    const edited = nameEdited || photoEdited
    const buttonsLoading = loadingSave || loadingSignout
    return (
      <React.Fragment>
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
          <ScrollView>
            <Avatar
              rounded
              xlarge
              disabled={loadingPhoto || buttonsLoading}
              avatarStyle={[styles.avatar, { borderColor: '#FFF' }]}
              source={photo}
              containerStyle={styles.avatarContainer}
              onPress={throttle(this.handleAvatarPress)}
            />
            <TextInput
              ref={this.textInputRef}
              mode="flat"
              placeholder="Anonymous"
              value={displayName}
              onFocus={() => this.setState({ textInputFocused: true })}
              onBlur={() => this.setState({ textInputFocused: false })}
              onChangeText={newDisplayName =>
                this.setState({ displayName: newDisplayName, nameEdited: true })
              }
              style={[styles.textInput, textInputFocused && { backgroundColor: '#FFF' }]}
              editable={!loadingSave && !loadingSignout}
            />
          </ScrollView>
          <Button
            mode="contained"
            loading={loadingSave}
            onPress={this.handleSave}
            disabled={!edited || buttonsLoading}
            style={styles.button}
            color={theme.colors.accent}
            icon="save"
          >
            Save
          </Button>
          <Button
            mode="outlined"
            loading={loadingSignout}
            disabled={buttonsLoading}
            icon="power-settings-new"
            onPress={showSignoutConfirmation({ onSuccess: this.handleSignOut })}
            style={styles.button}
            color={theme.colors.error}
          >
            Sign out
          </Button>
        </View>
        {loadingPhoto && <Loader />}
      </React.Fragment>
    )
  }
}

const ProfileContainer = connect(
  null,
  { onAddToast: toastState.actions.addToast }
)(withTheme(Profile))

export default createStackNavigator({
  Profile: {
    screen: ProfileContainer,
    navigationOptions: () => ({
      headerTitle: 'Your profile',
      headerTintColor: '#FFF',
      headerStyle: {
        backgroundColor: '#FF9800',
      },
    }),
  },
})
