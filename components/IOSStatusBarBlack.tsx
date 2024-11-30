import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

const IOSStatusBarBlack = () => {
  return (
    <View style={[styles.iosstatusBarblack, styles.bgIconPosition]}>
      <Image
        style={[styles.bgIcon, styles.bgIconPosition]}
        contentFit="cover"
        source={require("../assets/bg.png")}
      />
      <View style={[styles.rightSide, styles.sidePosition]}>
        <Image
          style={[styles.batteryIcon, styles.batteryIconPosition]}
          contentFit="cover"
          source={require("../assets/battery.png")}
        />
        <Image
          style={styles.wifiIcon}
          contentFit="cover"
          source={require("../assets/wifi.png")}
        />
        <Image
          style={styles.mobileSignalIcon}
          contentFit="cover"
          source={require("../assets/mobile-signal.png")}
        />
      </View>
      <Image
        style={[styles.leftSideIcon, styles.sidePosition]}
        contentFit="cover"
        source={require("../assets/left-side.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bgIconPosition: {
    overflow: "hidden",
    position: "absolute",
  },
  sidePosition: {
    top: 17,
    height: 11,
    position: "absolute",
  },
  batteryIconPosition: {
    right: 0,
    top: 0,
  },
  bgIcon: {
    top: -2,
    right: 70,
    bottom: 16,
    left: 69,
    maxWidth: "100%",
    maxHeight: "100%",
    display: "none",
  },
  batteryIcon: {
    width: 24,
    height: 11,
    position: "absolute",
    top: 0,
  },
  wifiIcon: {
    width: 15,
    height: 11,
  },
  mobileSignalIcon: {
    width: 17,
    height: 11,
  },
  rightSide: {
    right: 15,
    width: 67,
    height: 11,
  },
  leftSideIcon: {
    left: 34,
    width: 28,
    height: 11,
  },
  iosstatusBarblack: {
    left: 2,
    height: 44,
    right: 0,
    top: 0,
  },
});

export default IOSStatusBarBlack;
