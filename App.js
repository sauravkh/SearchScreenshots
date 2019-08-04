import React, { Component } from 'react';

// import { Text, View} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './src/screens/Home';
import Search from './src/screens/Search';

// import LoadImages from './src/components/LoadImages';

const AppNavigator = createStackNavigator(
  {
    Home,
    Search
  },
  {
    initialRouteName: 'Home'
  }
);
const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
    render() {
    return (
      <AppContainer />
    );

  }
}
