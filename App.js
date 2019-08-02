import React, { Component } from 'react';

import {Style, Text, View, Image} from 'react-native';
import TestComponent from './src/components/testComponent';
import CameraRollView from './src/components/CameraRollView';

export default class App extends Component {
    render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
    <View>  
        <Image source={pic} style={{width: 193, height: 110}}/>
        {/* <CameraRollView>    </CameraRollView> */}
        <TestComponent> </TestComponent>
    </View>
      
    );

  }
}

