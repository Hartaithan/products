import { FC } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ICartItem } from '../models/CartModel';
import Text from './Text';
import { colors } from '../styles/colors';
import { spacing } from '../styles/spacing';
import { Button, Icon } from '@rneui/themed';
import { useTypedDispatch } from '../hooks/useStore';
import {
  decrementQuantity,
  incrementQuantity,
  removeCartItem,
} from '../store/cartSlice';

interface ICartItemProps {
  item: ICartItem;
}

const CartItem: FC<ICartItemProps> = props => {
  const { item: product, quantity } = props.item;
  const dispatch = useTypedDispatch();

  return (
    <View style={styles.container}>
      <Image style={styles.thumbnail} source={{ uri: product.thumbnail }} />
      <Text tg="text-sm" style={styles.title} numberOfLines={2}>
        {product.title}
      </Text>
      <View style={styles.actions}>
        <Button
          title="-"
          buttonStyle={styles.multiplier}
          onPress={() => dispatch(decrementQuantity(props.item))}
        />
        <Text tg="text-lg" style={styles.quantity}>
          {quantity}
        </Text>
        <Button
          title="+"
          activeOpacity={0}
          buttonStyle={styles.multiplier}
          onPress={() => dispatch(incrementQuantity(props.item))}
        />
      </View>
      <TouchableOpacity
        style={styles.delete}
        onPress={() => dispatch(removeCartItem(props.item))}>
        <Icon name="delete" type="material" color={colors.red[9]} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.gray[2],
    borderRadius: spacing[5],
    padding: spacing[5],
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.dark[9],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  thumbnail: {
    height: 50,
    width: 50,
    borderRadius: spacing[4],
    marginRight: spacing[5],
  },
  title: {
    flex: 1,
  },
  multiplier: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    padding: 0,
  },
  actions: {
    width: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: spacing[4],
  },
  quantity: {
    width: 20,
    textAlign: 'center',
  },
  delete: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.red[2],
    marginLeft: spacing[4],
  },
});

export default CartItem;
