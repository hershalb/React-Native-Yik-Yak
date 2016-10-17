'use strict';

import React, { Component } from 'react';
import {
  findNodeHandle,
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  NavigatorIOS,
  Dimensions,
  Keyboard,
  DeviceEventEmitter,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return seconds == 0 ? "Just now" : Math.floor(seconds) + " seconds";
}

class SearchResults extends Component {
 
  constructor(props) {
    super(props);

    this.state = {
      visibleHeight: Dimensions.get('window').height,
      comment: '',
    }
    this.height = this.state.visibleHeight;
    console.log(this.state.visibleHeight);
  }

  componentWillMount () {
    Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
    Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
  }

  keyboardWillShow (e) {
    let newSize = Dimensions.get('window').height - e.endCoordinates.height
    this.setState({visibleHeight: newSize})
  }

  keyboardWillHide (e) {
    this.setState({visibleHeight: Dimensions.get('window').height})
  }

  loadComment() {
    this.props.loadComment(this.props.time, this.state.comment);
    this.setState({ comment: '' });
  }
  onCommentTextChanged(event) {
    this.setState({ comment: event.nativeEvent.text });
  }

  renderComments(key) {
    return (
      <View key={key} style={styles.rowContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{key}</Text>
        </View>
        <View style={styles.separator}/>
      </View>
    )
  }
 
  render() {
    var post = this.props.post;
    return (
      <View style={{flex : 1}}>
        <ScrollView ref='scrollView' contentContainerStyle={{flex: 1}}>
            <View style={styles.rowContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.price}>{timeSince(this.props.time)}</Text>
                <Text style={styles.title}>{post.message}</Text>
              </View>
              <View>
                <Text>{post.likes}</Text>
                <Icon name="thumbs-up" 
                      size={30} 
                      color={post.likes == 0 ? '#dddddd' : '#32cd32'} 
                      onPress={this.props.toggleLike.bind(this, this.props.time)}/>
              </View>
            </View>
            <View style={styles.separator}/>
            {post.comments.map(this.renderComments.bind(this))}
        </ScrollView>
        <View style={{flexDirection: 'row', bottom: this.height - this.state.visibleHeight}}>
          <TextInput ref='username'
              value={this.state.comment}
              style={styles.input}
              placeholder='New Post'
              clearButtonMode='while-editing'
              onChange={this.onCommentTextChanged.bind(this)}/>
          <TouchableHighlight style={styles.button}
              underlayColor='green' 
              onPress={this.loadComment.bind(this)}>
            <Text style={styles.buttonText}>Comment</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
 
}

const styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: 'orange'
  },
  input: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#32cd32',
    borderRadius: 8,
    color: '#32cd32'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'stretch'
},
buttonText: {
  fontSize: 18,
  color: 'white',
  alignSelf: 'center'
},
button: {
  height: 36,
  flex: 1,
  flexDirection: 'row',
  backgroundColor: '#32cd32',
  borderColor: '#32cd32',
  borderWidth: 1,
  borderRadius: 8,
  alignSelf: 'stretch',
  justifyContent: 'center'
},
searchInput: {
  height: 36,
  padding: 4,
  marginRight: 5,
  flex: 4,
  fontSize: 18,
  borderWidth: 1,
  borderColor: '#32cd32',
  borderRadius: 8,
  color: '#32cd32'
},
image: {
  width: 217,
  height: 138
},
wrapper: {
    flex: 1
  },
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: 'black'
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  }
});

export default SearchResults;