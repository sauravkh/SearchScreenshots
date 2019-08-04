import React, { Component } from 'react';
import { View, Text } from 'react-native';
import LoadImages from '../components/LoadImages';

export default class Search extends Component {
  render() {
    return (
      <View>
        <Text> Search your images below</Text>
        
        <LoadImages></LoadImages>
      </View>
    );
  }
}