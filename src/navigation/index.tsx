import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SCREENS } from '../models/NavigationModel';
import ProductScreen from '../screens/products/ProductScreen';
import CartScreen from '../screens/products/CartScreen';
import TabsNavigation from './tabs';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';

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
        <RootStack.Screen name={SCREENS.SignIn} component={SignInScreen} />
        <RootStack.Screen name={SCREENS.SignUp} component={SignUpScreen} />
        <RootStack.Screen name={SCREENS.Product} component={ProductScreen} />
        <RootStack.Screen name={SCREENS.Cart} component={CartScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
