import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SCREENS } from '../models/NavigationModel';
import ProductScreen from '../screens/products/ProductScreen';
import CartScreen from '../screens/products/CartScreen';
import TabsNavigation from './tabs';

const RootStack = createNativeStackNavigator();

const Navigation: FC = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={SCREENS.Root}
        screenOptions={{ headerShown: false }}>
        <RootStack.Screen name={SCREENS.Root} component={TabsNavigation} />
        <RootStack.Screen name={SCREENS.Product} component={ProductScreen} />
        <RootStack.Screen name={SCREENS.Cart} component={CartScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
