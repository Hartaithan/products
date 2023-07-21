import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SCREENS } from '../models/NavigationModel';
import HomeScreen from '../screens/home/HomeScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import ProfileEditScreen from '../screens/profile/ProfileEditScreen';
import ProductScreen from '../screens/products/ProductScreen';
import CartScreen from '../screens/products/CartScreen';

const RootStack = createNativeStackNavigator();

const Navigation: FC = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName={SCREENS.Home}>
        <RootStack.Screen name={SCREENS.Home} component={HomeScreen} />
        <RootStack.Screen name={SCREENS.SignIn} component={SignInScreen} />
        <RootStack.Screen name={SCREENS.SignUp} component={SignUpScreen} />
        <RootStack.Screen name={SCREENS.Profile} component={ProfileScreen} />
        <RootStack.Screen
          name={SCREENS.ProfileEdit}
          component={ProfileEditScreen}
        />
        <RootStack.Screen name={SCREENS.Product} component={ProductScreen} />
        <RootStack.Screen name={SCREENS.Cart} component={CartScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
