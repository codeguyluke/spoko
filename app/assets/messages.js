export const MESSAGES = {
  greeting: 'greeting',
  locationExplanation: 'locationExplanation',
  locationRequest: 'locationRequest',
  postponeLocationPermission: 'postponeLocationPermission',
  locationPermissionPostponed: 'locationPermissionPostponed',
  grantLocationPermission: 'grantLocationPermission',
  locationPermissionGranted: 'locationPermissionGranted',
  phoneInput: 'phoneInput',
  phoneInputChange: 'phoneInputChange',
  changePhoneNumber: 'changePhoneNumber',
  sendVerificationCode: 'sendVerificationCode',
  verificationCodeSent: 'verificationCodeSent',
  phoneInputError: 'phoneInputError',
  codeInput: 'codeInput',
  confirmCode: 'confirmCode',
  codeInputError: 'codeInputError',
}

export const getMessage = (name, param) => {
  switch (name) {
    case MESSAGES.greeting:
      return { text: "Hi, welcome to SpontApp! I'm Jo, your SpontApp Assistant." }
    case MESSAGES.locationExplanation:
      return {
        text:
          'In order to let you find and navigate you to games around, we need to know where you are.',
      }
    case MESSAGES.locationRequest:
      return { text: 'Would you like to allow SpontApp to use your location?' }
    case MESSAGES.postponeLocationPermission:
      return { author: 'me', text: "I don't want to do it yet." }
    case MESSAGES.locationPermissionPostponed:
      return { text: 'Of course, no problem!' }
    case MESSAGES.grantLocationPermission:
      return { author: 'me', text: 'Sure, I can do that.' }
    case MESSAGES.locationPermissionGranted:
      return { text: 'Thank you!' }
    case MESSAGES.phoneInput:
      return { text: 'In order to log in, please verify your phone number.' }
    case MESSAGES.changePhoneNumber:
      return { author: 'me', text: "I'd like to change phone number." }
    case MESSAGES.phoneInputChange:
      return { text: 'Your wish is my demand!' }
    case MESSAGES.sendVerificationCode:
      return { author: 'me', text: `Please send verification code to ${param}.` }
    case MESSAGES.verificationCodeSent:
      return { type: 'success', text: `Verification code has been sent to ${param}` }
    case MESSAGES.phoneVerificationError:
      return {
        type: 'error',
        text: 'Uh oh! Looks like something went wrong with the number! Please try again.',
      }
    case MESSAGES.codeInput:
      return { text: 'Please enter the code below.' }
    case MESSAGES.confirmCode:
      return { author: 'me', text: 'Let me in!' }
    case MESSAGES.codeInputError:
      return {
        text: 'Uh oh, looks like the code is not correct. Could you try again?',
        type: 'error',
      }
    default:
      return { text: 'Oops, looks like we have problem. Please try again.', type: 'error' }
  }
}
