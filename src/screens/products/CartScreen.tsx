import { FC } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { IScreenProps } from '../../models/NavigationModel';
import { useTypedSelector } from '../../hooks/useStore';
import CartItem from '../../components/CartItem';
import { spacing } from '../../styles/spacing';
import Separator from '../../components/Separator';
import global from '../../styles/global';
import Text from '../../components/Text';
import { getPrice } from '../../helpers/price';

const CartScreen: FC<IScreenProps> = () => {
  const { items } = useTypedSelector(state => state.cart);
  const { isAuth } = useTypedSelector(state => state.auth);

  const total = items.reduce(
    (prev, curr) => {
      const price = getPrice(curr.item);
      return {
        price: prev.price + price.value * curr.quantity,
        count: prev.count + curr.quantity,
      };
    },
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
        ListEmptyComponent={() => (
          <Text tg="text-lg" align="center">
            Empty cart :(
          </Text>
        )}
      />
      {!isAuth && (
        <Text tg="text-lg" c="red" cs={6} style={styles.unauth}>
          You need to be authorized to place an order.
        </Text>
      )}
      <View style={styles.total}>
        <Text tg="text-lg">
          Total price:&nbsp;
          <Text tg="text-lg" fw={600}>
            {total.price.toFixed(2)} $
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
  unauth: {
    textAlign: 'center',
    padding: spacing[5],
  },
});

export default CartScreen;
