import { Text, View } from 'react-native';
import { FC } from 'react';
import { IScreenProps } from '../../models/NavigationModel';
import global from '../../styles/global';

const SignInScreen: FC<IScreenProps> = () => {
  return (
    <View style={global.container}>
      <Text>SignInScreen</Text>
    </View>
  );
};

export default SignInScreen;
