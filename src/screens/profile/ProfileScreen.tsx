import { FC } from 'react';
import { Text, View } from 'react-native';
import global from '../../styles/global';
import { IScreenProps } from '../../models/NavigationModel';

const ProfileScreen: FC<IScreenProps> = () => {
  return (
    <View style={global.container}>
      <Text>ProfileScreen</Text>
    </View>
  );
};

export default ProfileScreen;
