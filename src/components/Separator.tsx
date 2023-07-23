import { FC } from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import { spacing } from '../styles/spacing';

interface ISeparatorProps extends ViewProps {
  h?: ViewStyle['height'];
  w?: ViewStyle['width'];
  background?: ViewStyle['backgroundColor'];
}

const Separator: FC<ISeparatorProps> = props => {
  const { h = spacing[5], w = 'auto', background = 'transparent' } = props;
  return <View style={{ height: h, width: w, backgroundColor: background }} />;
};

export default Separator;
