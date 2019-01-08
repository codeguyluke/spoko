import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { IconButton, withTheme, Colors } from 'react-native-paper'
import MapView from 'react-native-maps'
import PropTypes from 'prop-types'
import regionState from '../../store/region'

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  addIcon: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  resetIcon: {
    position: 'absolute',
    right: 16,
    top: 64,
    width: 48,
    height: 48,
    borderColor: Colors.blueGrey900,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
})

class Map extends Component {
  static propTypes = {
    region: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      latitudeDelta: PropTypes.number.isRequired,
      longitudeDelta: PropTypes.number.isRequired,
    }).isRequired,
    onResetRegion: PropTypes.func.isRequired,
    onUpdateRegion: PropTypes.func.isRequired,
    theme: PropTypes.shape({
      colors: PropTypes.shape({
        accent: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }

  render() {
    const { region, onResetRegion, onUpdateRegion, theme } = this.props

    return (
      <View style={styles.fill}>
        <MapView region={region} onRegionChangeComplete={onUpdateRegion} style={styles.fill} />
        <IconButton icon="replay" size={32} onPress={onResetRegion} style={styles.resetIcon} />
        <IconButton
          icon="add-circle"
          size={56}
          color={theme.colors.accent}
          onPress={() => {}}
          style={styles.addIcon}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  region: state[regionState.STORE_NAME].region,
})
const mapDispatchToProps = {
  onResetRegion: regionState.actions.resetRegion,
  onUpdateRegion: regionState.actions.setRegion,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(Map))
