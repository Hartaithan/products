import { StyleSheet, View } from 'react-native';
import { FC } from 'react';
import { useTypedSelector } from '../hooks/useStore';
import { Avatar, Button } from 'react-native-elements';
import { spacing } from '../styles/spacing';
import Text from './Text';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { SCREENS } from '../models/NavigationModel';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import global from '../styles/global';

const Profile: FC = () => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { isAuth, profile } = useTypedSelector(state => state.auth);

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
          <Button
            buttonStyle={styles.button}
            title="Edit profile"
            onPress={() => navigate(SCREENS.ProfileEdit)}
          />
        </>
      )}
      {!isAuth && (
        <>
          <Text tg="text-xl">Don&apos;t have an account? Sign in!</Text>
          <Button
            buttonStyle={styles.button}
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
  button: {
    marginTop: spacing[5],
  },
});

export default Profile;
