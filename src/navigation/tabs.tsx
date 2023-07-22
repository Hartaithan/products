import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FC } from 'react';
import { TABS } from '../models/NavigationModel';
import HomeNavigation from './home';
import ProfileNavigation from './profile';
import { Icon } from 'react-native-elements';

const Tab = createBottomTabNavigator();

const TabsNavigation: FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarItemStyle: { padding: 8 },
      }}>
      <Tab.Screen
        name={TABS.Home}
        component={HomeNavigation}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon name="home" type="material" color={color} size={18} />
          ),
        }}
      />
      <Tab.Screen
        name={TABS.Profile}
        component={ProfileNavigation}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Icon name="person" type="material" color={color} size={18} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabsNavigation;
