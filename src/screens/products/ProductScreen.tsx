import { FC } from 'react';
import { Text, View } from 'react-native';
import global from '../../styles/global';
import { IScreenProps } from '../../models/NavigationModel';

const ProductScreen: FC<IScreenProps> = () => {
  return (
    <View style={global.container}>
      <Text>ProductScreen</Text>
    </View>
  );
};

export default ProductScreen;
