import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Router from './router';

const MainApp = () => {
  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </>
  );
};

const App = () => {
  return <MainApp />;
};

export default App;
