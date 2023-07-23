import { FC, useEffect, useState, useCallback } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { IScreenProps } from '../../models/NavigationModel';
import API from '../../helpers/api';
import { IProduct } from '../../models/ProductModel';
import { LoadingStatus } from '../../models/AppModel';
import Product from '../../components/Product';
import { spacing } from '../../styles/spacing';
import { ICategory } from '../../models/CategoryModel';
import CategoryTabs from '../../components/CategoryTabs';
import Separator from '../../components/Separator';
import Text from '../../components/Text';

const loaders: number[] = Array.from(Array(4).keys());

const defaultCategory: ICategory = { id: 0, label: 'all' };

const HomeScreen: FC<IScreenProps> = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([defaultCategory]);
  const [category, setCategory] = useState<ICategory>(defaultCategory);
  const [status, setStatus] = useState<LoadingStatus>('loading');
  const isLoading = status === 'loading';

  const handleCategoryChange = (value: ICategory) => {
    setCategory(value);
  };

  const getProducts = useCallback(() => {
    setStatus('loading');
    let url = '/products';
    if (category.id !== 0) {
      url = url + `/category/${category.label}`;
    }
    API.get(url)
      .then(({ data }) => {
        const productsRes = data?.products || [];
        setProducts(productsRes);
      })
      .catch(error => console.error('get products error', error))
      .finally(() => {
        setStatus('completed');
      });
  }, [category]);

  const getCategories = useCallback(() => {
    API.get('/products/categories')
      .then(({ data }) => {
        const categoriesRes: string[] = data || [];
        const mapped: ICategory[] = [...categoriesRes].map((i, idx) => ({
          id: idx + 1,
          label: i,
        }));
        setCategories([defaultCategory, ...mapped]);
      })
      .catch(error => console.error('get categories error', error));
  }, []);

  const onRefresh = useCallback(() => {
    getProducts();
  }, [getProducts]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <View>
      <CategoryTabs
        active={category}
        categories={categories}
        onChange={handleCategoryChange}
      />
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
  tabs: {
    flexDirection: 'row',
  },
});

export default HomeScreen;
