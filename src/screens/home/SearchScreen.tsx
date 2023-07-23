import { FC } from 'react';
import { Text, View } from 'react-native';
import global from '../../styles/global';
import { IScreenProps } from '../../models/NavigationModel';

const SearchScreen: FC<IScreenProps> = () => {
  return (
    <View style={global.container}>
      <Text>SearchScreen</Text>
    </View>
  );
};

export default SearchScreen;
