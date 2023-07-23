import { FC } from 'react';
import { Button, ScrollView } from 'react-native';
import global from '../../styles/global';
import { IScreenProps, SCREENS } from '../../models/NavigationModel';
import { useTypedDispatch, useTypedSelector } from '../../hooks/useStore';
import { signUp } from '../../store/authSlice';
import Text from '../../components/Text';

const HomeScreen: FC<IScreenProps> = props => {
  const { navigation } = props;
  const auth = useTypedSelector(state => state.auth);
  const dispatch = useTypedDispatch();

  return (
    <ScrollView style={global.fill} contentContainerStyle={global.spacing}>
      <Text tg="text-xs">{JSON.stringify(auth, null, 2)}</Text>
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
    </ScrollView>
  );
};

export default HomeScreen;
