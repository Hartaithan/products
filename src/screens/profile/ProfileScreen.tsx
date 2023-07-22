import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import global from '../../styles/global';
import { IScreenProps } from '../../models/NavigationModel';
import Profile from '../../components/Profile';

const ProfileScreen: FC<IScreenProps> = () => {
  return (
    <View style={global.container}>
      <View style={styles.content}>
        <Profile />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
