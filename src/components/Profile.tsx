import { StyleSheet, View, Alert } from 'react-native';
import { FC } from 'react';
import { useTypedDispatch, useTypedSelector } from '../hooks/useStore';
import { spacing } from '../styles/spacing';
import Text from './Text';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { SCREENS } from '../models/NavigationModel';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import global from '../styles/global';
import { signOut } from '../store/authSlice';
import { Avatar } from '@rneui/themed';
import { Button } from '@rneui/base';

const Profile: FC = () => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { isAuth, profile } = useTypedSelector(state => state.auth);
  const dispatch = useTypedDispatch();

  const handleSignOut = () => {
    dispatch(signOut())
      .unwrap()
      .catch(error => {
        Alert.alert('Something went wrong!', error);
      });
  };

  return (
    <View style={global.fillCenter}>
      {isAuth && (
        <>
          <Avatar
            rounded
            size={150}
            avatarStyle={styles.avatar}
            source={
              profile?.avatar_url
                ? {
                    uri: profile.avatar_url,
                  }
                : require('../../assets/avatar_placeholder.jpg')
            }
          />
          <Text tg="text-xl">{`${profile?.name || 'Name'} ${
            profile?.surname || 'Surname'
          }`}</Text>
          <View style={styles.buttons}>
            <Button
              title="Edit profile"
              onPress={() => navigate(SCREENS.ProfileEdit)}
            />
            <Button title="Sign out" onPress={() => handleSignOut()} />
          </View>
        </>
      )}
      {!isAuth && (
        <>
          <Text tg="text-xl">Don&apos;t have an account? Sign in!</Text>
          <Button
            buttonStyle={styles.buttons}
            title="Sign In!"
            onPress={() => navigate(SCREENS.SignIn)}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    marginBottom: spacing[4],
  },
  buttons: {
    flexDirection: 'row',
    marginTop: spacing[5],
    gap: spacing[4],
  },
});

export default Profile;
