import { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREENS } from '../models/NavigationModel';
import ProfileScreen from '../screens/profile/ProfileScreen';
import ProfileEditScreen from '../screens/profile/ProfileEditScreen';
import HeaderActions from '../components/HeaderActions';

const ProfileStack = createNativeStackNavigator();

const ProfileNavigation: FC = () => {
  return (
    <ProfileStack.Navigator initialRouteName={SCREENS.Profile}>
      <ProfileStack.Screen
        name={SCREENS.Profile}
        options={{ title: 'Profile', headerRight: () => <HeaderActions /> }}
        component={ProfileScreen}
      />
      <ProfileStack.Screen
        name={SCREENS.ProfileEdit}
        options={{ title: 'Profile Edit' }}
        component={ProfileEditScreen}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigation;
