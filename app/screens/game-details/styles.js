import { StyleSheet } from 'react-native'
import colors from '../../style/colors'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255, 255, 255)',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-around',
  },
  buttonContainer: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    flex: 1,
    fontSize: 16,
    color: colors.navy,
    fontWeight: '400',
  },
  placeholder: {
    flex: 1,
    fontSize: 16,
    color: colors.grey,
    fontWeight: '300',
  },
  placeDescription: {
    flex: 1,
    fontSize: 14,
    color: colors.navy,
    fontWeight: '500',
  },
})
