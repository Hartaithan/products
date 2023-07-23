import { FC } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { IScreenProps } from '../../models/NavigationModel';
import { useTypedSelector } from '../../hooks/useStore';
import CartItem from '../../components/CartItem';
import { spacing } from '../../styles/spacing';

const CartScreen: FC<IScreenProps> = () => {
  const { items } = useTypedSelector(state => state.cart);

  return (
    <FlatList
      data={items}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => <CartItem item={item} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      keyExtractor={({ item }) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing[5],
  },
  separator: {
    height: spacing[5],
  },
});

export default CartScreen;
