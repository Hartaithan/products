import { FC } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ICategory } from '../models/CategoryModel';
import Text from './Text';
import { colors } from '../styles/colors';
import { spacing } from '../styles/spacing';
import Separator from './Separator';

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
      contentContainerStyle={styles.list}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => {
        const isActive = item.id === active.id;
        return (
          <TouchableOpacity
            onPress={() => onChange(item)}
            style={{
              ...styles.tab,
              backgroundColor: isActive ? colors.blue[5] : colors.gray[3],
            }}>
            <Text
              tg="text-xs"
              c={isActive ? 'gray' : 'blue'}
              cs={isActive ? 0 : 6}>
              {item.label.toUpperCase()}
            </Text>
          </TouchableOpacity>
        );
      }}
      ItemSeparatorComponent={() => <Separator w={spacing[4]} />}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: spacing[5],
    alignItems: 'center',
  },
  tab: {
    minWidth: 50,
    height: 30,
    borderRadius: spacing[4],
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategoryTabs;
