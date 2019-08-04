import React, { Component, PropTypes } from 'react'
import RNTextDetector from 'react-native-text-detector';


import {
  CameraRoll,
  Button,
  Image,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  PermissionsAndroid
} from 'react-native';

import {SearchBar} from 'react-native-elements'

class LoadImages extends Component {
    
    constructor(props) {
        super(props)

        this.state ={
            photos : [],
            text:[],    
            search: '',
            displayPhotos : [],
            showImageLoadSpinner : true
        }

        // this._SearchFilterFunction = this._SearchFilterFunction.bind(this)

    }
    clear = () => {
      this.search.clear();
    };

    componentDidMount() {
      
      this._load_images()

    }

    detectText = async () => {
      console.log(this.state.photos)
        let text_from_images = []
        for (let image of this.state.photos) {
          console.log("running for this pic")
          console.log(image)

          try {
            // call text detect api
            const visionResp = await RNTextDetector.detectFromUri(image.node.image.uri);
            
            // extract word from response object
            final_keywords = []
            for (let wordObj of visionResp) {
              final_keywords.push(wordObj.text)
            }

            // add to buildup array
            text_from_images.push({
              key:   image.node.image.uri,
              value: final_keywords
            });
            
            image['keywords_text'] = final_keywords

            } catch (e) {
              console.warn(e);
            }

        }

        // update state
        this.setState({text : text_from_images,showImageLoadSpinner:false})
        console.log(this.state.text[0])
        console.log(this.state.photos)
      };


      async requestExternalStoreageRead() {
        try {
            const granted = await PermissionsAndroid.request(
                      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                      {
                           'title': 'iFoundIt',
                           'message': 'App needs access to external storage'
                       }
            );
    
            return granted == PermissionsAndroid.RESULTS.GRANTED
        } catch (err) {
            console.log(err)
            //Handle this error
            return false;
            }
        }

        
    _load_images = () => {

    if (this.requestExternalStoreageRead()) {
      CameraRoll.getPhotos({
          first: 20,
          assetType: 'Photos',
        })
        .then(r => {
          this.setState({ photos: r.edges , displayPhotos:r.edges});
          this.detectText()
        })
        .catch((err) => {
          console.log("Not getting photos")
          console.log(err)
          //Error Loading Images
        });
    } else {
      console.log("Permission not given")
    }


    _SearchFilterFunction = text => {
      //passing the inserted text in textinput
      console.log("in search")
      const filteredPhotos = this.state.photos.filter(function(photo) {
        //applying filter for the inserted text in search bar
        console.log(photo)
        let allKeywords= "";
        if(photo.keywords_text) {
           allKeywords = photo.keywords_text.join(" ");
        }else {
          allKeywords = ""
        }
        const itemData = allKeywords ? allKeywords.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        //setting the filtered newData on datasource
        //After setting the data it will automatically re-render the view
        displayPhotos: filteredPhotos,
        search:text,
      });
    }

    };
 render() {
  return (
    <View>
      <SearchBar 
        round
        onChangeText={text => {_SearchFilterFunction(text)}} 
        searchIcon={{ size: 24 }}
        onClear={text => this.SearchFilterFunction('')}
        placeholder="Enter keyword here..."
        value={this.state.search}
        > 
      </SearchBar>
      <ActivityIndicator style={{opacity: this.state.showImageLoadSpinner ? 1.0 : 0.0}} indicator={this.state.showImageLoadSpinner} size="large" color="#0000ff" />
      <ScrollView>
        {this.state.displayPhotos.map((p, i) => {
        return (
        <View key={i}>
        <Image
            style={{
              width: 300,
              height: 100,
            }}
            source={{ uri: p.node.image.uri }}
          />
          {this.state.text.length > 0 ? <Text  style={{width:50,height:50}}>{ "Words are " + this.state.text[i].value }</Text>:null}
          
        </View>
          
        );
      })}
      </ScrollView>
    </View>
  );
 }
}

export default LoadImages