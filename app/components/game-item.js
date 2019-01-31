import React from 'react'
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Surface, Colors, Subheading, Caption } from 'react-native-paper'
import { Icon } from 'react-native-elements'
import PropTypes from 'prop-types'
import sports from '../assets/sports'

function getDateString(dateString) {
  const currentDate = new Date()
  const currentDateString = currentDate.toDateString()
  const nextDate = new Date(currentDate)
  nextDate.setDate(currentDate.getDate() + 1)
  const nextDateString = nextDate.toDateString()

  if (dateString === currentDateString) return 'Today'
  if (dateString === nextDateString) return 'Tomorrow'

  const datetime = new Date(dateString)
  return `${datetime.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })}`
}

function getDatetimeString(datetime) {
  const dateString = datetime.toDateString()
  return datetime
    ? `${getDateString(dateString)}, ${datetime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })}`
    : ''
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  column: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  surface: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 32,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
  },
  iconContainer: {
    marginRight: 8,
  },
  dateText: {
    flex: 1,
    fontWeight: '500',
    color: '#FFF',
  },
  placeText: {
    flex: 1,
    color: '#FFF',
  },
  image: {
    width: 64,
    height: 64,
    marginRight: 16,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#FFF',
  },
})

export default function GameItem({ sport, place, datetime, owned, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} underlayColor={Colors.grey200}>
      <Surface style={[styles.surface, { backgroundColor: sports[sport].color }]}>
        <Image source={sports[sport].icon} style={styles.image} />
        <View style={styles.column}>
          <View style={styles.row}>
            {owned && (
              <Icon containerStyle={styles.iconContainer} name="star" color="#FFF" size={16} />
            )}
            <Subheading style={styles.dateText}>{getDatetimeString(datetime)}</Subheading>
          </View>
          <Caption style={styles.placeText}>{place.description}</Caption>
        </View>
      </Surface>
    </TouchableOpacity>
  )
}

GameItem.propTypes = {
  sport: PropTypes.string.isRequired,
  place: PropTypes.shape({
    description: PropTypes.string.isRequired,
  }).isRequired,
  datetime: PropTypes.instanceOf(Date).isRequired,
  owned: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
}
