import React, { Component } from 'react';
import { View, Text, Button} from 'react-native';
import LoadImages from '../components/LoadImages';
import Search from '../screens/Search';


export default class Home extends Component {
  render() {
    return (
      <View>
        <Text> iFoundit</Text>
        <Button title="Go" onPress={() => this.props.navigation.navigate('Search')}></Button>
      </View>
    );
  }
}