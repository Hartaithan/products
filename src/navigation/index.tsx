import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SCREENS } from '../models/NavigationModel';
import ProductScreen from '../screens/products/ProductScreen';
import CartScreen from '../screens/products/CartScreen';
import TabsNavigation from './tabs';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import SearchScreen from '../screens/home/SearchScreen';

const RootStack = createNativeStackNavigator();

const Navigation: FC = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName={SCREENS.Root}>
        <RootStack.Screen
          name={SCREENS.Root}
          options={{ headerShown: false }}
          component={TabsNavigation}
        />
        <RootStack.Screen
          name={SCREENS.Search}
          options={{ title: 'Search' }}
          component={SearchScreen}
        />
        <RootStack.Screen
          name={SCREENS.SignIn}
          options={{ title: 'Sign In' }}
          component={SignInScreen}
        />
        <RootStack.Screen
          name={SCREENS.SignUp}
          options={{ title: 'Sign Up' }}
          component={SignUpScreen}
        />
        <RootStack.Screen
          name={SCREENS.Product}
          options={{ title: 'Product Details' }}
          component={ProductScreen}
        />
        <RootStack.Screen
          name={SCREENS.Cart}
          options={{ title: 'My Cart' }}
          component={CartScreen}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
