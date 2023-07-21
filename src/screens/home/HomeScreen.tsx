import { FC } from 'react';
import { Text, View, Button } from 'react-native';
import global from '../../styles/global';
import { IScreenProps, SCREENS } from '../../models/NavigationModel';

const HomeScreen: FC<IScreenProps> = props => {
  const { navigation } = props;

  return (
    <View style={global.container}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate(SCREENS.Profile)}
      />
    </View>
  );
};

export default HomeScreen;
