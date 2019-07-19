import React from 'react';
import { Main, CurrencySelection } from './screens'
import { createStackNavigator, createAppContainer } from 'react-navigation';

const AppNavigator = createStackNavigator(
  {
    Main,
    CurrencySelection,
  },
  {
    headerMode: 'none',
    mode: 'modal',
  });

const AppContainer = createAppContainer(AppNavigator);

const App = () => (
  <AppContainer />
);

export default App;