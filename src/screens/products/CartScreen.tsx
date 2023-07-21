import { FC } from 'react';
import { Text, View } from 'react-native';
import global from '../../styles/global';
import { IScreenProps } from '../../models/NavigationModel';

const CartScreen: FC<IScreenProps> = () => {
  return (
    <View style={global.container}>
      <Text>CartScreen</Text>
    </View>
  );
};

export default CartScreen;
