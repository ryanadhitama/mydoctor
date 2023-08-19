import { Loading } from '@components';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import FlashMessage from 'react-native-flash-message';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';
import Router from './router';

const MainApp = () => {
  const stateLoading = useSelector<{
    loading: boolean;
  }>((state) => state?.loading);

  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
      {stateLoading && <Loading />}
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;
