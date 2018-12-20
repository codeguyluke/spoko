import React, { Component } from 'react'
import { View, StyleSheet, InteractionManager, Alert } from 'react-native'
import { connect } from 'react-redux'
import { Header } from 'react-native-elements'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import PropTypes from 'prop-types'
import { UserPropType } from '../../helpers/prop-types'
import authState from '../../state/auth'
import userState from '../../state/user'
import { Label, EditRow, StyledButton } from '../../components'
import NameModal from './components/name-modal'
import colors from '../../style/colors'

const showLogoutConfirmation = ({ onSuccess }) => () =>
  InteractionManager.runAfterInteractions(() => {
    Alert.alert('Sign out?', 'Are you sure you want to sign out?', [
      { text: 'Yes', onPress: onSuccess },
      { text: 'No', style: 'cancel' },
    ])
  })

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255, 255, 255)',
    padding: 16,
    justifyContent: 'space-around',
  },
  headerContainer: {
    ...ifIphoneX({
      paddingTop: 40,
      height: 88,
    }),
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.navy,
  },
  buttonContainer: {
    paddingVertical: 16,
  },
})

class Profile extends Component {
  static propTypes = {
    onLogout: PropTypes.func.isRequired,
    currentUser: UserPropType.isRequired,
    loading: PropTypes.bool.isRequired,
    onEditUser: PropTypes.func.isRequired,
  }

  state = {
    showNameModal: false,
  }

  render() {
    const { currentUser, onLogout, loading, onEditUser } = this.props
    const { showNameModal } = this.state

    return (
      <React.Fragment>
        <Header
          backgroundColor="rgb(255, 255, 255)"
          centerComponent={{ text: 'Profile', style: styles.headerTitle }}
          outerContainerStyles={styles.headerContainer}
        />
        <View style={styles.container}>
          <View>
            <Label left>Display name</Label>
            <EditRow
              onPress={() => this.setState({ showNameModal: true })}
              placeholder="Display name"
              text={currentUser.displayName}
            />
            <NameModal
              show={showNameModal}
              onClose={() => this.setState({ showNameModal: false })}
              userId={currentUser.id}
              initialValue={currentUser.displayName}
              onSubmit={newDisplayName =>
                onEditUser(
                  {
                    id: currentUser.id,
                    displayName: newDisplayName,
                  },
                  () => this.setState({ showNameModal: false })
                )
              }
              loading={loading}
            />
          </View>
          <View style={styles.buttonContainer}>
            <StyledButton
              title="Logout"
              onPress={showLogoutConfirmation({ onSuccess: onLogout })}
              color={StyledButton.COLORS.red}
            />
          </View>
        </View>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state[userState.STORE_NAME].currentUser,
  loading: state[userState.STORE_NAME].loading,
})

const mapDispatchToProps = {
  onLogout: authState.actions.signOutStarted,
  onEditUser: userState.actions.editCurrentUserStarted,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
