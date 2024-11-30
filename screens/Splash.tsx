import * as React from "react";
import { StyleSheet, View } from "react-native";
import FrameComponent from "../components/FrameComponent";
import GroupComponent from "../components/GroupComponent";
import IOSStatusBarBlack from "../components/IOSStatusBarBlack";

const Splash = () => {
  return (
    <View style={styles.splash1}>
      <FrameComponent />
      <GroupComponent />
      <IOSStatusBarBlack />
    </View>
  );
};

const styles = StyleSheet.create({
  splash1: {
    backgroundColor: "#0a071e",
    flex: 1,
    width: "100%",
    height: 800,
    overflow: "hidden",
  },
});

export default Splash;
