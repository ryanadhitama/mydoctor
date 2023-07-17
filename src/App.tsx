import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Router from './router';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';
import { Loading } from './components';

const MainApp = () => {
  const stateGlobal = useSelector((state) => state);
  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      {stateGlobal?.loading && <Loading />}
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
