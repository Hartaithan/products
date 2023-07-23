import { FC, useState } from 'react';
import { Image, StyleSheet, TextProps, View } from 'react-native';
import { IProduct } from '../models/ProductModel';
import { Button, Skeleton } from '@rneui/themed';
import { spacing } from '../styles/spacing';
import { colors } from '../styles/colors';
import Text from './Text';
import { useDispatch } from 'react-redux';
import { addCartItem } from '../store/cartSlice';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IProductScreenParams, SCREENS } from '../models/NavigationModel';

type QuantityType = 'add' | 'remove';

interface INumberOfLines {
  title: TextProps['numberOfLines'];
  description: TextProps['numberOfLines'];
}

interface IProductsProps {
  product: IProduct | 'loader';
  nol?: INumberOfLines;
}

const ProductContent: FC<IProductsProps> = props => {
  const { product, nol = { title: 1, description: 3 } } = props;

  if (product === 'loader') return null;

  return (
    <>
      <Image style={styles.thumbnail} source={{ uri: product.thumbnail }} />
      <View style={{ ...styles.row, marginTop: spacing[2] }}>
        <Text tg="text-lg" numberOfLines={nol.title} style={styles.title}>
          {product.title}
        </Text>
        <Text tg="text-md" fw={600}>
          Price: {product.price}$
        </Text>
      </View>
      <Text tg="text-xs" numberOfLines={nol.description}>
        {product.description}
      </Text>
    </>
  );
};

const ProductLoader: FC<IProductsProps> = props => {
  const { product } = props;
  if (product !== 'loader') return null;
  return <Skeleton style={styles.loader} height={200} />;
};

const Product: FC<IProductsProps> = props => {
  const { product } = props;
  const dispatch = useDispatch();
  const { navigate } =
    useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [quantity, setQuantity] = useState<number>(1);

  const navigateToProductDetails = () => {
    if (product === 'loader') return;
    const params: IProductScreenParams = { productId: product.id };
    navigate(SCREENS.Product, params);
  };

  const handleQuantity = (type: QuantityType) => {
    setQuantity(prev => {
      switch (type) {
        case 'add':
          return prev + 1;
        case 'remove':
          if (prev === 0) return prev;
          return prev - 1;
        default:
          return prev;
      }
    });
  };

  if (product === 'loader') {
    return <ProductLoader {...props} />;
  }

  return (
    <View style={styles.container}>
      <ProductContent {...props} />
      <View style={styles.buttons}>
        <View style={styles.actions}>
          <Button
            title="-"
            activeOpacity={0}
            onPress={() => handleQuantity('remove')}
            buttonStyle={styles.multiplier}
          />
          <Text tg="text-lg" style={styles.quantity}>
            {quantity}
          </Text>
          <Button
            title="+"
            activeOpacity={0}
            onPress={() => handleQuantity('add')}
            buttonStyle={styles.multiplier}
          />
        </View>
        <Button
          title="Add to cart"
          buttonStyle={styles.cart}
          onPress={() => dispatch(addCartItem({ item: product, quantity }))}
        />
      </View>
      <Button
        title="Details"
        buttonStyle={styles.details}
        onPress={() => navigateToProductDetails()}
      />
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    marginRight: spacing[4],
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
  chip: {
    color: colors.blue[9],
    backgroundColor: colors.blue[2],
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: spacing[3],
    fontSize: 12,
    marginBottom: spacing[2],
  },
});

export { ProductContent, ProductLoader };
export default Product;
