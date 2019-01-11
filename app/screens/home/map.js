import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { IconButton, withTheme, Colors, Button } from 'react-native-paper'
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
    width: 64,
    height: 64,
    borderRadius: 28,
  },
  resetButton: {
    position: 'absolute',
    right: 16,
    top: 32,
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
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  }

  render() {
    const {
      region,
      onResetRegion,
      onUpdateRegion,
      theme,
      navigation: { navigate },
    } = this.props

    return (
      <View style={styles.fill}>
        <MapView region={region} onRegionChangeComplete={onUpdateRegion} style={styles.fill} />
        <Button
          mode="contained"
          icon="replay"
          onPress={onResetRegion}
          style={styles.resetButton}
          color={Colors.orange50}
        >
          Reset
        </Button>
        <IconButton
          icon="add-circle"
          size={64}
          color={theme.colors.accent}
          onPress={() => navigate('CreateGame')}
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
