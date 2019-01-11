import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Surface, Colors, withTheme, Subheading, Divider } from 'react-native-paper'
import { Icon } from 'react-native-elements'
import PropTypes from 'prop-types'
import sports from '../assets/sports'
import calendarIcon from '../assets/images/calendar.png'
import globeIcon from '../assets/images/globe.png'

function getDatetimeString(datetime) {
  return datetime
    ? `${datetime.toLocaleDateString(undefined, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      })}, ${datetime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    : ''
}

const styles = StyleSheet.create({
  column: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  text: {
    flex: 1,
    justifyContent: 'center',
    fontWeight: '500',
  },
  surface: {
    width: '100%',
    marginVertical: 16,
    paddingHorizontal: 16,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 48,
    height: 48,
    marginRight: 16,
  },
})

function GameItem({ sport, place, datetime, theme, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} underlayColor={Colors.grey200}>
      <Surface style={styles.surface}>
        <View style={styles.column}>
          <View style={styles.row}>
            <Image source={sports[sport].icon} style={styles.image} />
            <Subheading style={styles.text}>{sports[sport].name}</Subheading>
          </View>
          <Divider />
          <View style={styles.row}>
            <Image source={globeIcon} style={styles.image} />
            <Subheading style={styles.text}>{place.description}</Subheading>
          </View>
          <Divider />
          <View style={styles.row}>
            <Image source={calendarIcon} style={styles.image} />
            <Subheading style={styles.text}>{getDatetimeString(datetime)}</Subheading>
          </View>
        </View>
        <Icon name="chevron-right" size={32} color={theme.colors.accent} />
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
  onPress: PropTypes.func.isRequired,
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      accent: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default withTheme(GameItem)
