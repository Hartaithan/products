import { FC } from 'react';
import { View } from 'react-native';
import global from '../../styles/global';
import { IScreenProps } from '../../models/NavigationModel';
import Profile from '../../components/Profile';

const ProfileScreen: FC<IScreenProps> = () => {
  return (
    <View style={[global.container, global.fillCenter]}>
      <Profile />
    </View>
  );
};

export default ProfileScreen;
