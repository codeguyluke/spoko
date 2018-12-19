import PropTypes from 'prop-types'

export const LocationPropType = PropTypes.shape({
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
})

export const PlacePropType = PropTypes.shape({
  description: PropTypes.string.isRequired,
  location: LocationPropType.isRequired,
})

export const GamePropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  sport: PropTypes.string.isRequired,
  place: PlacePropType.isRequired,
  time: PropTypes.instanceOf(Date).isRequired,
  spots: PropTypes.number.isRequired,
  ownerId: PropTypes.string.isRequired,
  players: PropTypes.arrayOf(PropTypes.string).isRequired,
})

export const UserPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  createdGames: PropTypes.arrayOf(PropTypes.string).isRequired,
  playedGames: PropTypes.arrayOf(PropTypes.string).isRequired,
})

export const RegionPropType = PropTypes.shape({
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  latitudeDelta: PropTypes.number.isRequired,
  longitudeDelta: PropTypes.number.isRequired,
})

export const ToastPropType = PropTypes.shape({
  type: PropTypes.oneOf(['success', 'error']).isRequired,
  message: PropTypes.string.isRequired,
})
