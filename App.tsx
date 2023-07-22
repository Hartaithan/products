import type { FC } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import Navigation from './src/navigation';
import { Provider } from 'react-redux';
import { store } from './src/store';

const App: FC = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Navigation />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
