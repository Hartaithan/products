import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Badge, Button, Icon } from '@rneui/themed';
import { FC } from 'react';
import { SCREENS } from '../models/NavigationModel';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { spacing } from '../styles/spacing';
import { useTypedSelector } from '../hooks/useStore';

const HeaderActions: FC = () => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { items } = useTypedSelector(state => state.cart);

  const total = items.reduce((prev, curr) => prev + curr.quantity, 0);

  return (
    <View style={styles.container}>
      <Button type="clear" onPress={() => navigate(SCREENS.Search)}>
        <Icon name="search" type="material" />
      </Button>
      <Button
        type="clear"
        buttonStyle={styles.cart}
        onPress={() => navigate(SCREENS.Cart)}>
        {items.length > 0 && (
          <Badge value={total} status="primary" containerStyle={styles.badge} />
        )}
        <Icon name="shopping-cart" type="material" />
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', gap: spacing[4] },
  cart: { position: 'relative' },
  badge: { position: 'absolute', top: 0, right: 0, zIndex: 2 },
});

export default HeaderActions;
