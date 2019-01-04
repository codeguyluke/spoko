import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import PropTypes from 'prop-types'
import colors from '../style/colors'

const TEXT_STYLE = {
  flex: 1,
  fontSize: 16,
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.grey,
  },
  placeholder: {
    ...TEXT_STYLE,
    color: colors.grey,
    fontWeight: '300',
  },
  text: {
    ...TEXT_STYLE,
    color: colors.navy,
    fontWeight: '500',
  },
  iconContainer: {
    paddingHorizontal: 16,
  },
})

export function EditRow({ onPress, text, placeholder }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {text ? (
        <Text style={styles.text}>{text}</Text>
      ) : (
        <Text style={styles.placeholder}>{placeholder}</Text>
      )}
      <Icon
        name="edit"
        type="font-awesome"
        containerStyle={styles.iconContainer}
        size={24}
        color={colors.grey}
      />
    </TouchableOpacity>
  )
}

EditRow.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string,
  placeholder: PropTypes.string,
}

EditRow.defaultProps = {
  text: '',
  placeholder: '',
}
