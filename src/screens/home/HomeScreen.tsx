import { FC } from 'react';
import { Text, View, Button } from 'react-native';
import global from '../../styles/global';
import { IScreenProps, SCREENS } from '../../models/NavigationModel';
import { useTypedDispatch, useTypedSelector } from '../../hooks/useStore';
import { signUp } from '../../store/authSlice';

const HomeScreen: FC<IScreenProps> = props => {
  const { navigation } = props;
  const auth = useTypedSelector(state => state.auth);
  const dispatch = useTypedDispatch();

  return (
    <View style={global.container}>
      <Text>Home Screen</Text>
      <Text>{JSON.stringify(auth, null, 2)}</Text>
      <Button
        title="SignUp"
        onPress={() =>
          dispatch(
            signUp({ email: 'hartaithan@gmail.com', password: '123123123' }),
          )
        }
      />
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate(SCREENS.Profile)}
      />
    </View>
  );
};

export default HomeScreen;
