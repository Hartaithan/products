import { FC, useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { IScreenProps } from '../../models/NavigationModel';
import { IProduct } from '../../models/ProductModel';
import { LoadingStatus } from '../../models/AppModel';
import API from '../../helpers/api';
import Product from '../../components/Product';
import { spacing } from '../../styles/spacing';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { Icon, Input } from '@rneui/themed';
import Separator from '../../components/Separator';
import Text from '../../components/Text';
import global from '../../styles/global';

const loaders: number[] = Array.from(Array(4).keys());

const SearchScreen: FC<IScreenProps> = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [status, setStatus] = useState<LoadingStatus>('loading');
  const [search, setSearch] = useState<string>('');
  const [debouncedSearch] = useDebouncedValue(search, 500);
  const isLoading = status === 'loading';

  const getProducts = useCallback(() => {
    setStatus('loading');
    API.get(`/products/search?q=${debouncedSearch}`)
      .then(({ data }) => {
        const productsRes = data?.products || [];
        setProducts(productsRes);
      })
      .catch(error => console.error('get searched products error', error))
      .finally(() => {
        setStatus('completed');
      });
  }, [debouncedSearch]);

  const onRefresh = useCallback(() => {
    getProducts();
  }, [getProducts]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <View style={global.fill}>
      <View style={styles.search}>
        <Input
          placeholder="Search..."
          leftIcon={<Icon name="search" type="material" />}
          onChangeText={text => setSearch(text)}
        />
      </View>
      <FlatList<IProduct | number>
        data={isLoading ? loaders : products}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <Product product={typeof item === 'number' ? 'loader' : item} />
        )}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
        ItemSeparatorComponent={() => <Separator />}
        keyExtractor={item =>
          typeof item === 'number' ? item.toString() : item.id.toString()
        }
        ListEmptyComponent={() => (
          <Text tg="text-lg" align="center">
            Nothing found :(
          </Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing[5],
    paddingTop: 0,
  },
  search: {
    paddingTop: spacing[4],
    paddingHorizontal: spacing[4],
  },
});

export default SearchScreen;
