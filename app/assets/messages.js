export const MESSAGES = {
  greeting: 'greeting',
  location_explanation: 'location_explanation',
  location_request: 'location_request',
}

export const getMessage = (name, param) => {
  switch (name) {
    case MESSAGES.greeting:
      return { text: "Hi, welcome to SpontApp! I'm Jo, your SpontApp Assistant." }
    case MESSAGES.location_explanation:
      return {
        text: 'In order to find and navigate you to games around, we need to know your location.',
      }
    case MESSAGES.location_request:
      return { text: 'Would you like to allow SpontApp to use your location?' }
    default:
      return { text: 'Oops, looks like we have problem. Please try again.', type: 'error' }
  }
}
