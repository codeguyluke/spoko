import React from 'react'
import MapView, { Marker } from 'react-native-maps'
import PropTypes from 'prop-types'
import { GamePin } from '../../../components'
import { LocationPropType } from '../../../helpers/prop-types'

const INITIAL_LATITUDE_DELTA = 0.01
const INITIAL_LONGITUDE_DELTA = 0.005

const MAP_CONTAINER_STYLE = {
  width: '100%',
  height: 200,
}

export default function GameMap({ location, sport, time }) {
  const { latitude, longitude } = location
  return (
    <MapView
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: INITIAL_LATITUDE_DELTA,
        longitudeDelta: INITIAL_LONGITUDE_DELTA,
      }}
      style={MAP_CONTAINER_STYLE}
    >
      <Marker coordinate={{ latitude, longitude }}>
        <GamePin sport={sport} time={time} />
      </Marker>
    </MapView>
  )
}

GameMap.propTypes = {
  location: LocationPropType.isRequired,
  sport: PropTypes.string.isRequired,
  time: PropTypes.instanceOf(Date).isRequired,
}
