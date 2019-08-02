import React, { Component, PropTypes } from 'react'
import {
  CameraRoll,
  PermissionsAndroid,
  Image,
  ScrollView,
  StyleSheet,
  TouchableHighlight,Text,
  View,Dimensions
} from 'react-native';
const { width } = Dimensions.get('window')
class CameraRollView extends Component {

 

  constructor(props) {
    super(props)
    var controls = props.controls
    this.state = {
        images: ['https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg','https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'],
        photos:[],
        summary:[],
        selected: '',
        fetchParams: { first: 25 },
        groupTypes: 'SavedPhotos',
        errorMsg:''
      }
   
    console.log('constuctor')
    console.log(this.state)
    
  }

  async requestExternalStoreageRead() {
    try {
        const granted = await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                  {
                       'title': 'Cool App ...',
                       'message': 'App needs access to external storage'
                   }
        );

        return granted == PermissionsAndroid.RESULTS.GRANTED
} 
catch (err) {
    console.log(err)
  //Handle this error
  return false;
}
}



  componentDidMount() {
    // get photos from camera roll
    console.log("helo")
    if (this.requestExternalStoreageRead()){
        CameraRoll.getPhotos({
            first: 1000,
            assetType: 'All'
        })
        .then((r) => {
            
             this.setState({ photos: r.edges, summary: `Number of photos found ${r.edges.length}` })
    })
    .catch((error) => {
        console.log(error)
        this.setState({errorMsg: error.message});
    })
    
    }

    console.log("mounted")
    console.log(this.state.photos)
    console.log("end --")
    // CameraRoll.getPhotos(this.state.fetchParams, this._storeImages, this._logImageError);
  }


  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
          {console.log(this.state.photos)}
          {this.state.images.length > 0?
          <ScrollView contentContainerStyle={styles.scrollView}>
            
            {
                this.state.photos.map((p, i) => {
                  return (
                    

                      <Image key={i}
                        style={{
                          width: 50,
                          height: 50
                        }}
                        source={{uri: p.node.image.uri}}
                      />
                  )
                })
            }
            </ScrollView>:<Text>Hii</Text>}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
  },
  imageGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center'
  },
  image: {
      width: 100,
      height: 100,
      margin: 10,
  },
});

export default CameraRollView