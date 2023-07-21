import { ParamListBase, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export enum SCREENS {
  // HOME
  Home = 'HomeScreen',
  // AUTH
  SignIn = 'SignInScreen',
  SignUp = 'SignUpScreen',
  // PROFILE
  Profile = 'ProfileScreen',
  ProfileEdit = 'ProfileEditScreen',
  // PRODUCTS
  Product = 'ProductScreen',
  Cart = 'CartScreen',
}

export interface IScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
}
