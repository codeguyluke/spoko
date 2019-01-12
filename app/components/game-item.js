import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Surface, Colors, withTheme } from 'react-native-paper'
import { Icon } from 'react-native-elements'
import PropTypes from 'prop-types'
import { InfoRow } from '.'

const styles = StyleSheet.create({
  column: {
    flex: 1,
  },
  surface: {
    width: '100%',
    marginVertical: 16,
    paddingHorizontal: 16,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
})

function GameItem({ sport, place, datetime, theme, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} underlayColor={Colors.grey200}>
      <Surface style={styles.surface}>
        <View style={styles.column}>
          <InfoRow type="sport" value={sport} />
          <InfoRow type="place" value={place} />
          <InfoRow type="datetime" value={datetime} />
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
