'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Image,
  View,
  ScrollView,
  ListView,
  NavigatorIOS
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import SearchResults from './SearchResults';
import posts from './sample_posts.js'

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

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      loaded: false,
      messages: {},
    };
    this.nextPage = this.nextPage.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
    this.loadComment = this.loadComment.bind(this);
  }
  onSearchTextChanged(event) {
    this.setState({ searchString: event.nativeEvent.text });
  }
  nextPage(key) {
    console.log(this.state.messages);
    this.props.navigator.push({
      title: 'Post',
      component: SearchResults,
      passProps: {post: this.state.messages[key], time: key, 
                  toggleLike: this.toggleLike, loadComment: this.loadComment}
    });
  }
  onSearchPressed() {
    this.state.messages[Date.now()] = {message: this.state.searchString, likes: 0};
    this.setState({ messages: this.state.messages, searchString: ''});
    console.log(this.state.messages);
    // this.nextPage();
  }
  loadComment(key, comment) {
    this.state.messages[key].comments.push(comment);
    this.setState({ messages : this.state.messages });
  }
  loadPosts() {
    this.state.messages = posts;
    this.setState({
      messages : this.state.messages,
      loaded : true,
    });
    // this.nextPage();
  }
  toggleLike(key) {
    var post = this.state.messages[key];
    post.likes == 0 ? post.likes += 1 : post.likes -= 1;
    this.setState({ messages: this.state.messages });
  }
  renderRow(key) {
    return (
      <TouchableOpacity key={key} onPress={this.nextPage.bind(this, key)}>
        <View key={key} style={styles.rowContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.price}>{timeSince(key)}</Text>
              <Text style={styles.title}
                    numberOfLines={1}>{this.state.messages[key].message}</Text>
            </View>
            <View>
              <Text>{this.state.messages[key].likes}</Text>
              <Icon name="thumbs-up" 
                    size={30} 
                    color={this.state.messages[key].likes == 0 ? '#dddddd' : '#32cd32'} 
                    onPress={this.toggleLike.bind(this, key)}/>
            </View>
        </View>
      </TouchableOpacity>
    );
  }
  render() {
    var times = Object.keys(this.state.messages).reverse();

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.flowRight}>
        <TextInput
          style={styles.searchInput}
          value={this.state.searchString}
          onChange={this.onSearchTextChanged.bind(this)}
          placeholder='New Post'
          clearButtonMode='while-editing'/>
          <TouchableHighlight style={styles.button}
              underlayColor='green'>
            <Text style={styles.buttonText} onPress={this.onSearchPressed.bind(this)}>Post</Text>
          </TouchableHighlight>
        </View>
        {!this.state.loaded ? 
        <TouchableHighlight style={styles.button}
              underlayColor='green'>
            <Text style={styles.buttonText} onPress={this.loadPosts.bind(this)}>Load Posts</Text>
          </TouchableHighlight>
        : null } 
        {times.map(this.renderRow.bind(this))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#6A85B1',
    height: 300,
    flex: 1,
  },
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: 'orange'
  },
  container: {
    padding: 15
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
  marginBottom: 10,
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
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#dddddd'
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#32cd32'
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

export default SearchPage;