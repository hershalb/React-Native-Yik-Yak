/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} from 'react-native';
import SearchPage from './SearchPage';

const styles = StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  container: {
    flex: 1
  }
});

class MinYikYak extends Component {
  render() {
    return (
      <NavigatorIOS 
        style={styles.container}
        initialRoute={{
          title: 'MinYikYak',
          component: SearchPage
          age
        }}/>
    );
  }
}

class HelloWorld extends Component {
  render() {
    return (
      <Text style={styles.text}>Hello World!</Text>
    );
  }
}

AppRegistry.registerComponent('MinYikYak', () => MinYikYak);
