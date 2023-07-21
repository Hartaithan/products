import { FC } from 'react';
import { Text, View } from 'react-native';
import global from '../../styles/global';
import { IScreenProps } from '../../models/NavigationModel';

const ProfileEditScreen: FC<IScreenProps> = () => {
  return (
    <View style={global.container}>
      <Text>ProfileEditScreen</Text>
    </View>
  );
};

export default ProfileEditScreen;
