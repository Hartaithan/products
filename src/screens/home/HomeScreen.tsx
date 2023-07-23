import { FC, useEffect, useState, useCallback } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import global from '../../styles/global';
import { IScreenProps } from '../../models/NavigationModel';
import API from '../../helpers/api';
import { IProduct } from '../../models/ProductModel';
import { LoadingStatus } from '../../models/AppModel';
import Product from '../../components/Product';
import { spacing } from '../../styles/spacing';

const loaders: number[] = Array.from(Array(4).keys());

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
      <FlatList<IProduct | number>
        data={isLoading ? loaders : products}
        contentContainerStyle={global.spacing}
        renderItem={({ item }) => (
          <Product product={typeof item === 'number' ? 'loader' : item} />
        )}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={item =>
          typeof item === 'number' ? item.toString() : item.id.toString()
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: spacing[5],
  },
});

export default HomeScreen;
