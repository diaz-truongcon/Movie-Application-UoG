import React, { useMemo } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Color, FontSize, Border, FontFamily } from "../GlobalStyles";

export type EmailType = {
  exampleForEmailAddress?: string;
  emailTitle?: string;

  /** Style props */
  propTop?: number | string;
  propWidth?: number | string;
  propWidth1?: number | string;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const Email = ({
  propTop,
  exampleForEmailAddress,
  propWidth,
  emailTitle,
  propWidth1,
}: EmailType) => {
  const emailStyle = useMemo(() => {
    return {
      ...getStyleValue("top", propTop),
    };
  }, [propTop]);

  const exampleForEmailStyle = useMemo(() => {
    return {
      ...getStyleValue("width", propWidth),
    };
  }, [propWidth]);

  const emailTitleStyle = useMemo(() => {
    return {
      ...getStyleValue("width", propWidth1),
    };
  }, [propWidth1]);

  return (
    <View style={[styles.email, styles.bgPosition, emailStyle]}>
      <View style={[styles.bg, styles.bgPosition]} />
      <Text
        style={[styles.exampleForEmail, styles.emailTypo, exampleForEmailStyle]}
      >
        {exampleForEmailAddress}
      </Text>
      <Text style={[styles.emailTitle, styles.emailTypo, emailTitleStyle]}>
        {emailTitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bgPosition: {
    width: 302,
    position: "absolute",
    left: 0,
  },
  emailTypo: {
    textAlign: "left",
    color: Color.colorWhite,
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  bg: {
    top: 29,
    borderRadius: Border.br_xl,
    borderStyle: "solid",
    borderColor: Color.colorWhite,
    borderWidth: 1,
    height: 45,
  },
  exampleForEmail: {
    top: 39,
    left: 15,
    fontFamily: FontFamily.poppinsRegular,
    width: 227,
  },
  emailTitle: {
    top: 0,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemiBold,
    width: 55,
    height: 29,
    left: 0,
    color: Color.colorWhite,
    fontSize: FontSize.size_base,
  },
  email: {
    top: 94,
    height: 74,
  },
});

export default Email;
