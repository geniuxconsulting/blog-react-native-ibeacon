/**
 * React Native iBeacon App
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  DeviceEventEmitter,
  Text,
  View,
} = React;

// Import react-native-ibeacon module
var Beacons = require('react-native-ibeacon');

// Request for authorization while the app is open
Beacons.requestWhenInUseAuthorization();

var region = {
  identifier: 'Estimotes',
  uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D'  
};

Beacons.startRangingBeaconsInRegion(region);

DeviceEventEmitter.addListener(
  'beaconsDidRange',
  (data) => {
    console.log(data);
  }
);

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
