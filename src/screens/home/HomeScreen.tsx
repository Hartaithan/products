import { FC, useEffect, useState, useCallback } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import global from '../../styles/global';
import { IScreenProps } from '../../models/NavigationModel';
import Text from '../../components/Text';
import API from '../../helpers/api';
import { IProduct } from '../../models/ProductModel';
import { LoadingStatus } from '../../models/AppModel';

const HomeScreen: FC<IScreenProps> = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [status, setStatus] = useState<LoadingStatus>('loading');
  const isLoading = status === 'loading';

  const getProducts = useCallback(() => {
    setStatus('loading');
    API.get('/products')
      .then(({ data }) => {
        const productsRes = data?.products || [];
        setProducts(productsRes);
      })
      .catch(error => console.error('get products error', error))
      .finally(() => {
        setStatus('completed');
      });
  }, []);

  const onRefresh = useCallback(() => {
    getProducts();
  }, [getProducts]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <View style={global.fill}>
      <FlatList
        data={products}
        contentContainerStyle={global.spacing}
        renderItem={({ item }) => (
          <Text tg="text-xs">{JSON.stringify(item, null, 2)}</Text>
        )}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default HomeScreen;
