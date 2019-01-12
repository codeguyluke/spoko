import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'react-native-firebase'
import { View, ScrollView, StyleSheet, InteractionManager, Alert } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import { withTheme, Button, TextInput } from 'react-native-paper'
import { Avatar } from 'react-native-elements'
import PropTypes from 'prop-types'
import toastState from '../store/toast'
import avatarIcon from '../assets/images/avatar.png'

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
    edited: false,
    loadingSave: false,
    loadingSignout: false,
    photo: firebase.auth().currentUser.photoURL,
    displayName: firebase.auth().currentUser.displayName,
    textInputFocused: false,
  }

  textInputRef = React.createRef()

  handleSave = async () => {
    const { onAddToast } = this.props
    const { displayName, photo } = this.state

    this.setState({ loadingSave: true })
    try {
      await firebase.auth().currentUser.updateProfile({ displayName, photoURL: photo })
      onAddToast('Profile updated!')
      this.setState({ loadingSave: false, edited: false })
      if (this.textInputRef && this.textInputRef.current) {
        this.textInputRef.current.blur()
      }
    } catch (error) {
      onAddToast("Couln't update your profile")
      this.setState({ loadingSave: false, edited: false })
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

  render() {
    const { theme } = this.props
    const { edited, loadingSave, loadingSignout, displayName, photo, textInputFocused } = this.state

    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <ScrollView>
          <Avatar
            rounded
            xlarge
            avatarStyle={[styles.avatar, { borderColor: '#FFF' }]}
            source={photo || avatarIcon}
            containerStyle={styles.avatarContainer}
            onPress={() => {}}
          />
          <TextInput
            ref={this.textInputRef}
            mode="flat"
            placeholder="Anonymous"
            value={displayName}
            onFocus={() => this.setState({ textInputFocused: true })}
            onBlur={() => this.setState({ textInputFocused: false })}
            onChangeText={newDisplayName =>
              this.setState({ displayName: newDisplayName, edited: true })
            }
            style={[styles.textInput, textInputFocused && { backgroundColor: '#FFF' }]}
          />
        </ScrollView>
        <Button
          mode="contained"
          loading={loadingSave}
          onPress={this.handleSave}
          disabled={!edited || loadingSave || loadingSignout}
          style={styles.button}
          color={theme.colors.accent}
          icon="save"
        >
          Save
        </Button>
        <Button
          mode="outlined"
          loading={loadingSignout}
          disabled={loadingSave || loadingSignout}
          icon="power-settings-new"
          onPress={showSignoutConfirmation({ onSuccess: this.handleSignOut })}
          style={styles.button}
          color={theme.colors.error}
        >
          Sign out
        </Button>
      </View>
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
