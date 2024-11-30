import React, { useMemo } from "react";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";

export type HiddenIconType = {
  /** Style props */
  propTop?: number | string;
  propLeft?: number | string;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const HiddenIcon = ({ propTop, propLeft }: HiddenIconType) => {
  const hiddenIconStyle = useMemo(() => {
    return {
      ...getStyleValue("top", propTop),
      ...getStyleValue("left", propLeft),
    };
  }, [propTop, propLeft]);

  return (
    <Image
      style={[styles.hiddenIcon, hiddenIconStyle]}
      contentFit="cover"
      source={require("../assets/hidden.png")}
    />
  );
};

const styles = StyleSheet.create({
  hiddenIcon: {
    position: "absolute",
    top: 45,
    left: 266,
    width: 22,
    height: 14,
  },
});

export default HiddenIcon;
