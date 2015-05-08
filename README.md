Using iBeacons with React Native
================================
![beacons](https://raw.githubusercontent.com/geniuxconsulting/blog-react-native-ibeacon/master/beacon_small.jpg)

In case you never heard of beacons or iBeacons before, beacons are little devices that send a signal in a certain interval through Bluetooth LE. iBeacon is the specification that emits specific events and values which we can listen, interpret and react to. On a mobile device we can might interpret this data as sending a notification when you are near a beacon. This can be used for museums as providing additional information for exhibitions, a whole tour guide or even playing audio files when you are in a certain room of a building. Another use case is in retail to show different specific information about products where you are in their vicinity - let's say in a shoe shop you get the information for a specific shoe on your device when you're passing by. In this scenario, we might even get more specific, like have the option to buy the shoe on the spot or be directed to where is available in different sizes and colors.

React Native is a new way of developing native applications for iOS with JavaScript. It differs from other solutions like Cordova in the regard that Cordova embeds a complete web view wherein our browser environment lies. With React Native on the other hand, we get the default iOS JavaScript engine (JavaScriptCore) but instead of fiddling around with DOM elements, we get access to native elements. We can use React component in a similar fashion than we do in our React web apps. (This means we shouldn't go around and just copy-and-paste React components from the web in our mobile React projects.) The biggest difference is that instead of having `<div />`, `<span />` and `<img />` elements we have `<View />`, `<Text />` and `<Image />` components. How we style our application is also different to what we might be familiar with: Instead of writing CSS, styles are written as JavaScript objects and then inserted as inline styles into our components. React Native uses the Flexbox model for styling components.

Let's combine these two technologies. We at Geniux Consulting created [`react-native-ibeacon`](https://github.com/geniuxconsulting/react-native-ibeacon) while we were prototyping an app. As the name suggests, it lets us use iBeacons in our React Native apps. Since the `react-native-ibeacon` already contains a small example where it displays all beacons in the area in a list, let's create an app that shows the distance of our beacons relative to our device.

![beacons](https://raw.githubusercontent.com/geniuxconsulting/blog-react-native-ibeacon/master/sketch_small.jpg)

Prerequisites
-------------
Before we get into developing our application, there are certain things we need:

Node.js or io.js
For our purposes it doesn't really matter which one we choose. If we are using Node.js, we need at least version 0.10, while any io.js version should work. If you don't have either Node.js or io.js installed, grab Node.js from https://nodejs.org/ or io.js from https://iojs.org/.

Next up, we need to install the React Native command line application which includes a nifty project creator for mobile apps. To install open a terminal and type `npm install -g react-native-cli`.

Creating our app
----------------
Using the React Native command line tools we just installed we can easily create a new project using `react-native init ReactNativeBeaconExample`. This will create a folder called `ReactNativeBeaconExample` where our project resides. In there, we'll find an Xcode project, the usual `package.json` file - we might already be familiar with when working with Node.js applications - that handles our dependencies amongst other things. The `index.ios.js` file is our main entry point for JavaScript code.

To integrate iBeacons into this setup, follow these steps:

1. Open the command-line and enter `npm install react-native-ibeacon --save`
2. Open the Xcode project. Drag `RNBeacon.xcodeproj` from the `node_modules/react-native-ibeacon` folder into your XCode project.
3. Click on the your project in XCode, goto `Build Phases` then `Link Binary With Libraries` and add `libRNBeacon.a` and `CoreLocation.framework`.

So what actually happened here? In step one, we are adding `react-native-ibeacon` as a dependency in our `package.json` file. The library is now under the `dependencies` section in that file. Afterwards, we link the native component of `react-native-ibeacon` with our project. That works in two steps: First, we need to add the `react-native-ibeacon`s Xcode project to our application. Put it in the same place where all the other Xcode projects are. Technically, you could drop `RNBeacon.xcodeproj` anywhere inside our project, it doesn't matter if it's in the root folder or in one of the sub-folders. Then, we need to link the resulting library with our application. After we dropped `RNBeacon.xcodeproj` in our project, the first suggestion will be `libRNBeacon.a`. This is not the only library we need to link though: We need to link against `CoreLocation.framework` to enable iBeacon support in the first place.
For a more visual representation of how linking libraries work, take a look the section inside the [React Native documentation](https://facebook.github.io/react-native/docs/linking-libraries.html).

Getting the beacon signals
--------------------------
Open `index.ios.js` in your favorite IDE or text editor and remove all views except for root view inside the main component. Do the same for the styles. After which, our code should look like this:
```js
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
```

After the destructuring assignment code segment, we are now importing `react-native-ibeacon` and assign it to a variable.
```js
var Beacons = require('react-native-ibeacon');
```

Before we can 
```js
Beacons.requestWhenInUseAuthorization();
```

Interpreting the data
---------------------
Now that we have our beacon signals and we know that we actually get the data we want, let's use this to display our beacons on the screen.

Adding more visual appeal
-------------------------
While completely functional, from a visual point of view our application is not very appealing at the moment. Let's change that by adding a background and images for the device and the beacons.

Best practices when using beacons
---------------------------------
