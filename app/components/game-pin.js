import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import PropTypes from 'prop-types'
import { getIconForSportName } from '../helpers/sports'
import { getTimeStringShort } from '../helpers/time'
import colors from '../style/colors'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: -24,
  },
  detailsContainer: {
    borderWidth: 1,
    borderColor: colors.navy,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgb(255, 255, 255)',
    padding: 8,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.navy,
    marginLeft: 8,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: colors.navy,
  },
})

export function GamePin({ sport, time }) {
  const icon = getIconForSportName(sport)
  const timeString = getTimeStringShort(time)
  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Icon type={icon.type} name={icon.name} color={icon.color} size={24} />
        <Text style={styles.timeText}>{timeString}</Text>
      </View>
      <View style={styles.triangle} />
    </View>
  )
}

GamePin.propTypes = {
  sport: PropTypes.string.isRequired,
  time: PropTypes.instanceOf(Date).isRequired,
}
