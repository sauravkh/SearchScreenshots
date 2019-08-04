import React, { Component } from 'react';
import {View, Image,Text, ScrollView, Button, CameraRoll, FlatList} from 'react-native';


class TestComponent extends Component {
  // _handleButtonPress = () => {
  //   console.log(this.state.photos)

    // try {
    //   console.log('reacher enter try')
    //   const granted = await PermissionsAndroid.request(
    //     PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    //     {
    //       'title': 'Access Storage',
    //       'message': 'Access Storage for the pictures'
    //     }
    //   )
    //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //     console.log("You can use read from the storage")
    //     CameraRoll.getPhotos({
    //       first: 20,
    //       assetType: 'Photos',
    //     })
    //     .then(r => {
    //       console.log("reaching here")
    //       this.setState({ photos: r.edges });
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //        //Error Loading Images
    //     });
    //     console.log(this.state.photos);
     
    //   }
    //    else {
    //     console.log("Storage permission denied")
    //   }
    // }
    //   catch (err) {
    //   console.warn(err)
    // }
  // }
     

    


    // state = {
    //   photos: [],
    // }

    constructor(props) {
      super(props)
      
      this.state = {
        list : [1,3,4,5,6,67]
      }
    }

    
 render() {

  return (
    <FlatList
      data={this.state.list}
      renderItem={({item}) => <Text>{item}</Text>}
    />
  )


    // {console.log(this.state.list)}
    // <ScrollView>  
    //   {this.state.list.map((item, index) => {
    //   return (
    //     <Button key={index} title="fuck me up" ></Button>
    //     // <View key = {index} style={{height: 50, width: 50, backgroundColor: 'orange', marginBottom: 10}} />
    //   )
    // })}
    // </ScrollView>
    
  // return (
  //   <View>
  //     <Button title="Load Images" onPress={this._handleButtonPress} />
  //     <ScrollView>
  //     {console.log(this.state.photos)}

  //       {this.state.photos.map((p, i) => {
  //       return (
  //         <Image
  //           key={i}
  //           style={{
  //             width: 300,
  //             height: 100,
  //           }}
  //           source={{ uri: p.node.image.uri }}
  //         />
  //       );
  //     })}
  //     </ScrollView>
  //   </View>
  // );
 }
}

  export default TestComponent;