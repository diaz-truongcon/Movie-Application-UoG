import * as React from "react";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import IOSStatusBarBlack from "../components/IOSStatusBarBlack";
import GoBackIcon from "../components/GoBackIcon";
import SignUp from "../components/SignUp";
import { FontFamily, Color, FontSize, Border, Padding } from "../GlobalStyles";
import firebaseApp from '../firebaseConfig';

const RegisterScreen = () => {
  return (
    <LinearGradient
      style={[styles.login2, { width: '100%' }]}
      locations={[0, 1]}
      colors={["rgba(0, 0, 0, 0.6)", "rgba(186, 186, 186, 0.6)"]}
    >
      <ImageBackground
        style={[styles.icon, { width: '100%' }]}
        resizeMode="cover"
        source={require("../assets/login2.png")}
      >
      <View style={[styles.login1Child, styles.loginZ1Position]} />

        <LinearGradient
          style={[styles.login2Child, styles.logo1IconPosition]}
          locations={[0, 0.47, 1]}
          colors={["#0a071e", "rgba(10, 7, 30, 0.63)", "rgba(10, 7, 30, 0)"]}
        />
        <IOSStatusBarBlack />
        <View style={styles.top}>
          <Text style={[styles.createAccount, styles.ctaFlexBox]}>{`Create Account`}</Text>
          <GoBackIcon />
        </View>
        <SignUp />
      
        <Image
          style={[styles.logo1Icon, styles.logo1IconPosition]}
          contentFit="cover"
          source={require("../assets/logo-11.png")}
        />
        <Text style={[styles.later, styles.laterTypo]}>Later</Text>
      </ImageBackground>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  loginZ1Position: {
    width: "100%",
    left: 0,
    top: 0,
    position: "absolute",
    height: "100%",
  },
  login1Child: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  logo1IconPosition: {
    top: 0,
    position: "absolute",
    left: 155
  },
  ctaFlexBox: {
    alignItems: "center",
    position: "absolute",
  },
  laterTypo: {
    textAlign: "left",
    fontFamily: FontFamily.aliceRegular,
    lineHeight: 50,
    color: Color.colorWhite,
  },
  login2Child: {
    height: '100%',
    left: 0,
    backgroundColor: "transparent",
  },
  createAccount: {
    top: 42,
    fontSize: FontSize.size_29xl,
    display: "flex",
    height: 115,
    textAlign: "left",
    fontFamily: FontFamily.aliceRegular,
    lineHeight: 50,
    color: Color.colorWhite,
    width: 298,
    left: 0,
  },
  top: {
    top: 112,
    left: 31,
    height: 157,
    width: 298,
    position: "absolute",
  },
  createAccount1: {
    fontSize: FontSize.size_base,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemiBold,
    textAlign: "center",
    color: Color.colorWhite,
  },
  cta: {
    marginLeft: -151,
    top: 698,
    left: "50%",
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: {
      width: 2.000000238418579,
      height: 2.000000238418579,
    },
    shadowRadius: 15,
    elevation: 15,
    shadowOpacity: 1,
    borderRadius: Border.br_xl,
    borderStyle: "solid",
    borderColor: Color.colorWhite,
    borderWidth: 1,
    width: 302,
    height: 55,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: Padding.p_31xl,
    paddingTop: Padding.p_mini,
    paddingBottom: Padding.p_smi,
    backgroundColor: "transparent",
  },
  logo1Icon: {
    left: 109,
    width: 142,
    height: 142,
  },
  later: {
    top: 62,
    left: 350,
    fontSize: FontSize.size_xl,
    position: "absolute",
  },
  icon: {
    flex: 1,
    height: "100%",
    width: "100%",
    overflow: "hidden",
    backgroundColor: "transparent",
  },
  login2: {
    height: "100%",
    width: "100%",
  },
});

export default RegisterScreen;
