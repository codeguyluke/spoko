import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { Subheading, Paragraph } from 'react-native-paper'
import PropTypes from 'prop-types'
import sports from '../assets/sports'
import calendarIcon from '../assets/images/calendar.png'
import globeIcon from '../assets/images/globe.png'
import moneyIcon from '../assets/images/money.png'

const TYPES = { sport: 'sport', place: 'place', datetime: 'datetime', price: 'price' }

const ICONS = { place: globeIcon, datetime: calendarIcon, price: moneyIcon }

function getDatetimeString(datetime) {
  return datetime
    ? `${datetime.toLocaleDateString(undefined, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      })}, ${datetime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    : ''
}

function getPriceString(price) {
  if (Number(price.value) === 0) return 'FREE'

  return `${price.value} ${price.currency.toUpperCase()}`
}

function getText(type, value) {
  switch (type) {
    case TYPES.sport:
      return sports[value].name
    case TYPES.place:
      return value.description
    case TYPES.price:
      return getPriceString(value)
    case TYPES.datetime:
    default:
      return getDatetimeString(value)
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 16,
  },
  text: {
    flex: 1,
    justifyContent: 'center',
    fontWeight: '500',
  },
})

export default function InfoRow({ type, value, large }) {
  const imageSource = type === 'sport' ? sports[value].icon : ICONS[type]
  const text = getText(type, value)

  return (
    <View style={styles.row}>
      <Image source={imageSource} style={[styles.image, large && { width: 48, height: 48 }]} />
      {large ? (
        <Subheading style={styles.text}>{text}</Subheading>
      ) : (
        <Paragraph style={styles.text}>{text}</Paragraph>
      )}
    </View>
  )
}

InfoRow.propTypes = {
  type: PropTypes.oneOf(Object.keys(TYPES)).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({ description: PropTypes.string }),
    PropTypes.instanceOf(Date),
  ]).isRequired,
  large: PropTypes.bool,
}

InfoRow.defaultProps = {
  large: false,
}
