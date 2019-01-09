import React from 'react'
import { View, StyleSheet, TouchableHighlight, Image } from 'react-native'
import { Surface, Colors, withTheme, Subheading, Caption } from 'react-native-paper'
import { Icon } from 'react-native-elements'
import PropTypes from 'prop-types'
import capitalize from 'lodash/capitalize'

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  value: {
    flex: 1,
    justifyContent: 'center',
  },
  surface: {
    width: '100%',
    padding: 16,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelContainer: {
    marginBottom: 4,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginLeft: 4,
    fontWeight: '500',
  },
  image: {
    width: 48,
    height: 48,
    marginRight: 16,
  },
})

function EditRow({ label, labelIcon, image, value, onPress, placeholder, theme, optional }) {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Icon name={labelIcon} size={24} color={theme.colors.accent} />
        <Caption style={styles.label}>
          {`${label}${optional ? ' (Optional)' : ''}`.toUpperCase()}
        </Caption>
      </View>
      <TouchableHighlight onPress={onPress} underlayColor={Colors.grey300}>
        <Surface style={styles.surface}>
          {!!image && <Image source={image} style={styles.image} />}
          <Subheading
            style={[
              styles.value,
              value ? { fontWeight: '500' } : { color: theme.colors.placeholder },
            ]}
          >
            {value || capitalize(placeholder)}
          </Subheading>
          <Icon name="chevron-right" size={32} color={theme.colors.accent} />
        </Surface>
      </TouchableHighlight>
    </View>
  )
}

EditRow.propTypes = {
  label: PropTypes.string.isRequired,
  labelIcon: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      placeholder: PropTypes.string.isRequired,
      accent: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  placeholder: PropTypes.string.isRequired,
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.string,
  optional: PropTypes.bool,
}

EditRow.defaultProps = {
  value: '',
  optional: false,
  image: '',
}

export default withTheme(EditRow)
