import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontFamily, FontSize, Color } from "../GlobalStyles";

const FrameComponent = () => {
  return (
    <View style={styles.image1Parent}>
      <Image
        style={[styles.image1Icon, styles.image1IconLayout]}
        resizeMode="contain"
        source={require("../assets/image-1.png")}
      />
      <LinearGradient
        style={[styles.componentChild, styles.image1IconLayout]}
        locations={[0, 0.68, 1]}
        colors={["#0a071e", "rgba(10, 7, 30, 0.63)", "rgba(10, 7, 30, 0)"]}
      />
      <Text style={[styles.no1Online, styles.no1OnlineFlexBox]}>
        No. 1 online movie viewing service in Vietnam
      </Text>
      <Image
        style={styles.componentItem}
        contentFit="cover"
        source={require("../assets/group-114.png")}
      />
      <Text
        style={[styles.unlimitedEntertainmentWith, styles.no1OnlineFlexBox]}
      >
        Unlimited entertainment with thousands of hours of Vietnamese movies
      </Text>
      <Image
        style={styles.logo1Icon}
        contentFit="cover"
        source={require("../assets/logo-1.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image1IconLayout: {
    width: "100%",
    position: "absolute",
  },
  no1OnlineFlexBox: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    fontFamily: FontFamily.aliceRegular,
    left: "50%",
    position: "absolute",
  },
  image1Icon: {
    top: 63,
    left: -10,
    height: '100%',
  },
  componentChild: {
    top: 0,
    left: 0,
    backgroundColor: "transparent",
    height: 863,
  },
  no1Online: {
    marginLeft: -182,
    top: 475,
    fontSize: FontSize.size_5xl,
    lineHeight: 30,
    color: Color.colorWhite,
    width: 364,
  },
  componentItem: {
    marginLeft: -48,
    top: 547,
    width: 79,
    height: 8,
    left: "50%",
    position: "absolute",
  },
  unlimitedEntertainmentWith: {
    marginLeft: -162,
    top: 573,
    fontSize: FontSize.size_mini,
    color: Color.colorBeige,
    width: 323,
  },
  logo1Icon: {
    top: 103,
    left: 26,
    width: 73,
    height: 73,
    position: "absolute",
  },
  image1Parent: {
    top: 0, // Đặt lại top về 0
    left: 0, // Đặt lại left về 0
    width: '100%', // Chiếm toàn bộ chiều rộng
    height: '100%', // Chiếm toàn bộ chiều cao
    position: "absolute",
  },
});

export default FrameComponent;
