import React, { Component } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PropTypes from 'prop-types'
import authState from '../../state/auth'
import PhoneInput from './phone-input'
import CodeInput from './code-input'
import { Loader } from '../../components'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'rgb(255, 255, 255)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

class Login extends Component {
  static propTypes = {
    status: PropTypes.oneOf(Object.values(authState.AUTH_STATUSES)).isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    onSignIn: PropTypes.func.isRequired,
    onCodeConfirm: PropTypes.func.isRequired,
  }

  state = {
    phone: '',
    code: '',
  }

  render() {
    const { status, loading, error, onSignIn, onCodeConfirm } = this.props

    if (loading) return <Loader />
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView contentContainerStyle={styles.contentContainer}>
          {status === authState.AUTH_STATUSES.code_sent ? (
            <CodeInput
              code={this.state.code}
              onCodeChange={code => this.setState({ code })}
              onSubmit={() => onCodeConfirm(this.state.code)}
              errorMessage={error}
            />
          ) : (
            <PhoneInput
              phone={this.state.phone}
              onPhoneChange={phone => this.setState({ phone })}
              onSubmit={() => onSignIn(this.state.phone)}
              errorMessage={error}
            />
          )}
        </KeyboardAwareScrollView>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => {
  const { status, loading, error } = state[authState.STORE_NAME]
  return {
    status,
    loading,
    error,
  }
}

const mapDispatchToProps = {
  onSignIn: authState.actions.signInStarted,
  onCodeConfirm: authState.actions.codeConfirmationStarted,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
