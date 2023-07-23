import { ParamListBase, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export enum SCREENS {
  Root = 'RootScreen',
  // HOME
  Home = 'HomeScreen',
  Search = 'SearchScreen',
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

export enum TABS {
  Home = 'HomeTab',
  Profile = 'ProfileTab',
}

export interface IScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
}

export interface IProductScreenParams {
  productId: number;
}
