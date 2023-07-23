import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Icon } from '@rneui/themed';
import { FC } from 'react';
import { SCREENS } from '../models/NavigationModel';

const SearchAction: FC = () => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <Button type="clear" onPress={() => navigate(SCREENS.Search)}>
      <Icon name="search" type="material" />
    </Button>
  );
};

export default SearchAction;
