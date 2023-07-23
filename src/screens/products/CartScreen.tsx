import { FC } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { IScreenProps } from '../../models/NavigationModel';
import { useTypedSelector } from '../../hooks/useStore';
import CartItem from '../../components/CartItem';
import { spacing } from '../../styles/spacing';
import Separator from '../../components/Separator';
import global from '../../styles/global';
import Text from '../../components/Text';

const CartScreen: FC<IScreenProps> = () => {
  const { items } = useTypedSelector(state => state.cart);

  const total = items.reduce(
    (prev, curr) => ({
      price: prev.price + curr.item.price * curr.quantity,
      count: prev.count + curr.quantity,
    }),
    { price: 0, count: 0 },
  );

  return (
    <View style={global.fill}>
      <FlatList
        data={items}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => <CartItem item={item} />}
        ItemSeparatorComponent={() => <Separator />}
        keyExtractor={({ item }) => item.id.toString()}
      />
      <View style={styles.total}>
        <Text tg="text-lg">
          Total price:&nbsp;
          <Text tg="text-lg" fw={600}>
            {total.price} $
          </Text>
        </Text>
        <Text tg="text-lg">
          Items count:&nbsp;
          <Text tg="text-lg" fw={600}>
            {total.count} pcs.
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing[5],
  },
  total: {
    padding: spacing[5],
  },
});

export default CartScreen;
