import { StyleSheet } from 'react-native';
import { spacing } from './spacing';

const global = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing[5],
  },
  spacing: {
    padding: spacing[5],
  },
  fill: {
    flex: 1,
  },
  fillCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  spaceAround: {
    justifyContent: 'space-around',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  lineThrough: {
    textDecorationLine: 'line-through',
  },
});

export default global;
