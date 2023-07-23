import { FC, useCallback, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import global from '../../styles/global';
import {
  IProductScreenParams,
  IScreenProps,
} from '../../models/NavigationModel';
import { LoadingStatus } from '../../models/AppModel';
import API from '../../helpers/api';
import { IProduct } from '../../models/ProductModel';
import { ProductContent, ProductLoader } from '../../components/Product';

const ProductScreen: FC<IScreenProps> = props => {
  const { route } = props;
  const params = route.params as IProductScreenParams;

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
    <ScrollView style={global.fill} contentContainerStyle={global.container}>
      {isLoading && <ProductLoader product="loader" />}
      {!isLoading && product !== null && (
        <ProductContent
          product={product}
          nol={{ title: undefined, description: undefined }}
        />
      )}
    </ScrollView>
  );
};

export default ProductScreen;
