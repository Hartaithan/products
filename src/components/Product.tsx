import { FC, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { IProduct } from '../models/ProductModel';
import { Button, Skeleton } from '@rneui/themed';
import { spacing } from '../styles/spacing';
import { colors } from '../styles/colors';
import Text from './Text';

interface IProductsProps {
  product: IProduct | 'loader';
}

const Product: FC<IProductsProps> = props => {
  const { product } = props;
  const [quantity, setQuantity] = useState<number>(1);

  if (product === 'loader') {
    return <Skeleton style={styles.loader} height={200} />;
  }

  return (
    <View style={styles.container}>
      <Image style={styles.thumbnail} source={{ uri: product.thumbnail }} />
      <View style={styles.title}>
        <Text tg="text-lg" numberOfLines={1}>
          {product.title}
        </Text>
        <Text tg="text-md" fw={600}>
          Price: {product.price}$
        </Text>
      </View>
      <Text tg="text-xs" numberOfLines={3}>
        {product.description}
      </Text>
      <View style={styles.buttons}>
        <View style={styles.actions}>
          <Button
            title="-"
            activeOpacity={0}
            onPress={() => setQuantity(prev => prev - 1)}
            buttonStyle={styles.multiplier}
          />
          <Text tg="text-lg" style={styles.quantity}>
            {quantity}
          </Text>
          <Button
            title="+"
            activeOpacity={0}
            onPress={() => setQuantity(prev => prev + 1)}
            buttonStyle={styles.multiplier}
          />
        </View>
        <Button title="Add to cart" buttonStyle={styles.cart} />
      </View>
      <Button title="Details" buttonStyle={styles.details} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 100,
    borderRadius: spacing[5],
    backgroundColor: colors.gray[2],
    overflow: 'hidden',
    padding: spacing[3],
  },
  loader: {
    borderRadius: spacing[5],
  },
  thumbnail: {
    height: 150,
    width: '100%',
    borderRadius: spacing[3],
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing[2],
  },
  buttons: {
    marginTop: spacing[4],
    flexDirection: 'row',
  },
  details: {
    marginTop: spacing[4],
    borderRadius: spacing[3],
  },
  multiplier: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
  },
  actions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: spacing[4],
  },
  quantity: {
    width: 20,
    textAlign: 'center',
  },
  cart: {
    width: '100%',
    borderRadius: spacing[3],
  },
});

export default Product;
