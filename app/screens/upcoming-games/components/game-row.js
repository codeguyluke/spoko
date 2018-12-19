import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { Icon, Badge } from 'react-native-elements'
import PropTypes from 'prop-types'
import { getTimeStringLong } from '../../../helpers/time'
import { getIconForSportName } from '../../../helpers/sports'
import { GamePropType } from '../../../helpers/prop-types'
import colors from '../../../style/colors'

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
    paddingVertical: 32,
    paddingHorizontal: 16,
    flexDirection: 'row',
    backgroundColor: 'rgb(255, 255, 255)',
  },
  detailsContainer: {
    flex: 1,
  },
  sportRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sportIconContainer: {
    width: 40,
    height: 32,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  sportNameContainer: {
    flexDirection: 'row',
  },
  sportName: {
    paddingBottom: 2,
    color: colors.navy,
    fontWeight: '300',
    fontSize: 18,
  },
  ownedBadgeContainer: {
    marginLeft: 8,
    borderWidth: 1,
    borderColor: colors.grey,
    backgroundColor: 'rgb(255, 255, 255)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ownedBadgeText: {
    color: colors.grey,
    fontSize: 12,
    fontWeight: '700',
  },
  timeText: {
    paddingVertical: 8,
    color: colors.navy,
    fontWeight: '500',
    fontSize: 14,
  },
  placeName: {
    color: colors.navy,
    fontWeight: '300',
    fontSize: 14,
  },
  iconContainer: {
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default function GameRow({ game: { sport, place, time, owned }, onPress }) {
  const icon = getIconForSportName(sport)
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.detailsContainer}>
        <View style={styles.sportRow}>
          <View style={styles.sportIconContainer}>
            <Icon type={icon.type} name={icon.name} size={32} color={icon.color} />
          </View>
          <View style={styles.sportNameContainer}>
            <Text style={styles.sportName}>{sport}</Text>
            {owned && (
              <Badge containerStyle={styles.ownedBadgeContainer}>
                <Text style={styles.ownedBadgeText}>Owner</Text>
              </Badge>
            )}
          </View>
        </View>
        <Text style={styles.timeText}>{getTimeStringLong(time)}</Text>
        <Text style={styles.placeName}>{place.description}</Text>
      </View>
      <View style={styles.iconContainer}>
        <Icon size={40} type="ionicon" name="ios-arrow-forward" color={colors.grey} />
      </View>
    </TouchableOpacity>
  )
}

GameRow.propTypes = {
  game: GamePropType.isRequired,
  onPress: PropTypes.func.isRequired,
}
