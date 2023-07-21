import { FC } from 'react';
import { Text, View } from 'react-native';
import global from '../../styles/global';
import { IScreenProps } from '../../models/NavigationModel';

const SignUpScreen: FC<IScreenProps> = () => {
  return (
    <View style={global.container}>
      <Text>SignUpScreen</Text>
    </View>
  );
};

export default SignUpScreen;
