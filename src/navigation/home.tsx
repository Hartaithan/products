import { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREENS } from '../models/NavigationModel';
import HomeScreen from '../screens/home/HomeScreen';

const HomeStack = createNativeStackNavigator();

const HomeNavigation: FC = () => {
  return (
    <HomeStack.Navigator initialRouteName={SCREENS.Home}>
      <HomeStack.Screen
        name={SCREENS.Home}
        options={{ title: 'Home' }}
        component={HomeScreen}
      />
    </HomeStack.Navigator>
  );
};

export default HomeNavigation;
