import { FC, useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import global from '../../styles/global';
import {
  IProductScreenParams,
  IScreenProps,
} from '../../models/NavigationModel';
import { LoadingStatus } from '../../models/AppModel';
import API from '../../helpers/api';
import { IProduct } from '../../models/ProductModel';
import Text from '../../components/Text';

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
    <View style={global.container}>
      <Text tg="text-xs">ProductScreen</Text>
      <Text tg="text-xs">{JSON.stringify(isLoading, null, 2)}</Text>
      <Text tg="text-xs">{JSON.stringify(params, null, 2)}</Text>
      <Text tg="text-xs">{JSON.stringify(product, null, 2)}</Text>
    </View>
  );
};

export default ProductScreen;
