import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import DeckDetailScreen from '../screens/DeckDetailScreen';
import AddCardScreen from '../screens/AddCardScreen';
import QuizScreen from '../screens/QuizScreen';

export default createAppContainer(createStackNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: {
    screen: MainTabNavigator,
    navigationOptions: {
      header: null
    }
  },
  DeckDetail: DeckDetailScreen,
  AddCard: AddCardScreen,
  Quiz: QuizScreen
}));