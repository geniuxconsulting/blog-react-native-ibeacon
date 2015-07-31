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

var ReactNativeBeaconExample = React.createClass({
  getInitialState: function() {
    return {
      beacons: []
    };
  },
  componentDidMount: function() {
    DeviceEventEmitter.addListener(
      'beaconsDidRange',
      (data) => {
        this.setState({
          beacons: data.beacons.filter(item => item.rssi < 0).map(item => item.rssi)
        });
      }
    );
  },
  render: function() {
    var beacons = this.state.beacons.map(function(strength, index) {
      var beaconPosition = {
        marginTop: Math.pow(strength, 3) / (Math.pow(-100, 3) / 250)
      };

      return <View key={index} style={[styles.beacon, beaconPosition]} />
    }, this);

    return (
      <View style={styles.container}>
        <View style={styles.device} />
        <View style={styles.beaconContainer}>
          {beacons}
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 20,
  },
  device: {
    width: 80,
    height: 80,
    backgroundColor: '#6cab36'
  },
  beaconContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
  },
  beacon: {
    width: 50,
    height: 50,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 200,
    backgroundColor: '#7c7c81'
  }
});

AppRegistry.registerComponent('ReactNativeBeaconExample', () => ReactNativeBeaconExample);
