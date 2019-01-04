import colors from '../style/colors'

// icons from react-native-vector-icons
const SPORTS = {
  football: {
    name: 'Football',
    icon: {
      type: 'ionicon',
      name: 'ios-football',
      color: 'rgb(0, 0, 0)',
    },
  },
  basketball: {
    name: 'Basketball',
    icon: {
      type: 'ionicon',
      name: 'ios-basketball',
      color: 'rgb(204, 85, 0)',
    },
  },
  volleyball: {
    name: 'Volleyball',
    icon: {
      type: 'material-community',
      name: 'volleyball',
      color: 'rgb(33, 171, 205)',
    },
  },
  tennis: {
    name: 'Tennis',
    icon: {
      type: 'ionicon',
      name: 'ios-tennisball',
      color: 'rgb(204, 255, 0)',
    },
  },
  default: {
    name: 'Other',
    icon: {
      type: 'material-community',
      name: 'human-handsup',
      color: colors.green,
    },
  },
}

export function getSportsNames() {
  return Object.keys(SPORTS).map(key => SPORTS[key].name)
}

export function getIconForSportName(name) {
  const key = Object.keys(SPORTS).find(objectKey => SPORTS[objectKey].name === name)
  return key ? SPORTS[key].icon : SPORTS.default.icon
}
