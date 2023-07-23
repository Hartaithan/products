import { FC } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ICategory } from '../models/CategoryModel';
import Text from './Text';
import { colors } from '../styles/colors';
import { spacing } from '../styles/spacing';

interface ICategoryTabsProps {
  active: ICategory;
  categories: ICategory[];
  onChange: (value: ICategory) => void;
}

const CategoryTabs: FC<ICategoryTabsProps> = props => {
  const { active, categories, onChange } = props;

  return (
    <FlatList
      horizontal
      data={categories}
      style={styles.container}
      contentContainerStyle={styles.list}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => {
        const isActive = item.id === active.id;
        return (
          <TouchableOpacity
            onPress={() => onChange(item)}
            style={{
              ...styles.tab,
              backgroundColor: isActive ? colors.blue[9] : colors.gray[3],
            }}>
            <Text
              tg="text-xs"
              c={isActive ? 'gray' : 'blue'}
              cs={isActive ? 0 : 9}>
              {item.label.toUpperCase()}
            </Text>
          </TouchableOpacity>
        );
      }}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
  list: {
    padding: spacing[5],
    alignItems: 'center',
  },
  tab: {
    minWidth: 50,
    height: 30,
    borderRadius: spacing[4],
    padding: spacing[3],
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    width: spacing[4],
  },
});

export default CategoryTabs;
