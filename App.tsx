import { useEffect, type FC } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import Navigation from './src/navigation';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { supabase } from './src/helpers/supabase';
import { useTypedDispatch } from './src/hooks/useStore';
import { getProfile, updateSession } from './src/store/authSlice';
import global from './src/styles/global';

const App: FC = () => {
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(getProfile());
    supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(updateSession(session));
    });
  }, [dispatch]);

  return (
    <SafeAreaView style={global.fill}>
      <StatusBar barStyle="light-content" />
      <Navigation />
    </SafeAreaView>
  );
};

const Wrapper: FC = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Wrapper;
