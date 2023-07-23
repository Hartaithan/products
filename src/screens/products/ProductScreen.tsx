import { FC, useCallback, useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import global from '../../styles/global';
import {
  IProductScreenParams,
  IScreenProps,
} from '../../models/NavigationModel';
import { LoadingStatus } from '../../models/AppModel';
import API from '../../helpers/api';
import { IProduct } from '../../models/ProductModel';
import {
  ProductContent,
  ProductHeader,
  ProductLoader,
} from '../../components/Product';
import { Button } from '@rneui/base';
import { useDispatch } from 'react-redux';
import { addCartItem } from '../../store/cartSlice';
import { spacing } from '../../styles/spacing';
import Text from '../../components/Text';

const ProductScreen: FC<IScreenProps> = props => {
  const { route } = props;
  const params = route.params as IProductScreenParams;

  const dispatch = useDispatch();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [status, setStatus] = useState<LoadingStatus>('loading');
  const isLoading = status === 'loading';

  const getProduct = useCallback(() => {
    setStatus('loading');
    API.get('/products/' + params?.productId)
      .then(({ data }) => {
        const productRes = data || null;
        setProduct(productRes);
      })
      .catch(error => console.error('get product error', error))
      .finally(() => {
        setStatus('completed');
      });
  }, [params?.productId]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  return (
    <ScrollView style={global.fill} contentContainerStyle={global.spacing}>
      {isLoading && <ProductLoader product="loader" />}
      {!isLoading && product !== null && (
        <>
          <ProductHeader
            product={product}
            nol={{ title: undefined, description: undefined }}
          />
          <ProductContent
            product={product}
            nol={{ title: undefined, description: undefined }}
          />
          <View
            style={{
              ...global.row,
              ...global.spaceBetween,
              marginTop: spacing[2],
            }}>
            <Text tg="text-sm">Brand:</Text>
            <Text tg="text-sm" fw={600}>
              {product.brand}
            </Text>
          </View>
          <Button
            title="Add to cart"
            buttonStyle={styles.cart}
            onPress={() =>
              dispatch(addCartItem({ item: product, quantity: 1 }))
            }
          />
          <View style={styles.gallery}>
            <Text tg="text-lg" fw={600}>
              Gallery:
            </Text>
            {product.images.map(image => (
              <Image key={image} style={styles.image} source={{ uri: image }} />
            ))}
          </View>
        </>
      )}
      {!isLoading && product === null && (
        <Text tg="text-lg" align="center">
          Nothing found :(
        </Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cart: {
    marginTop: spacing[5],
    borderRadius: spacing[3],
  },
  gallery: {
    marginTop: spacing[5],
    gap: spacing[5],
  },
  image: {
    height: 200,
    width: '100%',
    borderRadius: spacing[5],
  },
});

export default ProductScreen;
