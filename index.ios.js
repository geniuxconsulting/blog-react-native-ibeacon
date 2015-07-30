/**
 * React Native iBeacon App
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

// Import react-native-ibeacon module
var Beacons = require('react-native-ibeacon');

// Request for authorization while the app is open
Beacons.requestWhenInUseAuthorization();

var ReactNativeBeaconExample = React.createClass({
  render: function() {
    return (
      <View style={styles.container} />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('ReactNativeBeaconExample', () => ReactNativeBeaconExample);
