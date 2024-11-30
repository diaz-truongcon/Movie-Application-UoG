import * as React from "react";
import { Image } from "expo-image";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ImageBackground,
  TextInput,
} from "react-native";
import GoBackIcon from "../components/GoBackIcon";
import SignIn from "../components/SignIn";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";

const LoginScreen = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <ImageBackground
      style={styles.login1}
      resizeMode="cover"
    >
      <View style={styles.centeredContainer}>
        <Image
          style={styles.loginZ1Position}
          contentFit="cover"
          source={require("../assets/login-z-1.png")}
        />
        <View style={[styles.login1Child, styles.loginZ1Position]} />
        <Image
          style={styles.logo1Icon}
          contentFit="cover"
          source={require("../assets/logo-11.png")}
        />
        <View style={[styles.top, styles.topLayout]}>
          <Text style={[styles.login, styles.orFlexBox]}>Login</Text>
          <GoBackIcon />
        </View>
        <SignIn />
        <View style={styles.cta}>
          <Image
            style={styles.image3Icon}
            contentFit="cover"
            source={require("../assets/image-3.png")}
          />
          <Text style={[styles.signInWith, styles.signTypo]}>
            {" "}
            Sign in with Google
          </Text>
        </View>
        <Pressable
          style={styles.later}
          onPress={() => navigation.navigate("Splash")}
        >
          <Text style={styles.later1}>Later</Text>
        </Pressable>
        <View style={[styles.orz, styles.orPosition]}>
          <Text style={[styles.or, styles.orPosition]}>Or</Text>
          <View style={[styles.orzChild, styles.orzLayout]} />
          <View style={[styles.orzItem, styles.orzLayout]} />
        </View>
        <Text style={styles.dontHaveAnContainer}>
          <Text style={styles.dontHaveAnContainer1}>
            <Text style={styles.dontHaveAn}>Don’t have an account?</Text>
            <Text style={styles.signTypo} onPress={() => navigation.navigate("Register")}> Sign up</Text>
          </Text>
        </Text>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
       
      </View>
    </ImageBackground>
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
  topLayout: {
    width: 298,
    position: "absolute",
  },
  orFlexBox: {
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    color: Color.colorWhite,
    fontFamily: FontFamily.aliceRegular,
    lineHeight: 50,
  },
  signTypo: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
  },
  orPosition: {
    height: 41,
    left: "50%",
    position: "absolute",
  },
  orzLayout: {
    height: 1,
    width: 133,
    borderTopWidth: 1,
    top: 23,
    borderColor: Color.colorWhite,
    borderStyle: "solid",
    position: "absolute",
  },
  login1Child: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  logo1Icon: {
    left: 165,
    width: 142,
    height: 142,
    top: 0,
    position: "absolute",
  },
  login: {
    top: 42,
    fontSize: FontSize.size_29xl,
    height: 61,
    width: 298,
    position: "absolute",
    left: 0,
  },
  top: {
    top: 112,
    left: 31,
    height: 103,
  },
  image3Icon: {
    width: 40,
    height: 37,
    left: 30
  },
  signInWith: {
    fontSize: FontSize.size_base,
    color: "#000",
    width: 210,
    textAlign: "left",
    left: 20
  },
  cta: {
    top: 612,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: {
      width: 2.000000238418579,
      height: 2.000000238418579,
    },
    shadowRadius: 15,
    elevation: 15,
    shadowOpacity: 1,
    borderRadius: Border.br_xl,
    backgroundColor: Color.colorWhite,
    borderWidth: 1,
    height: 58,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: Padding.p_31xl,
    paddingTop: Padding.p_mini,
    paddingBottom: Padding.p_smi,
    gap: 10,
    borderColor: Color.colorWhite,
    borderStyle: "solid",
    alignItems: "center",
    position: "absolute",
  },
  later1: {
    fontSize: FontSize.size_xl,
    textAlign: "left",
    color: Color.colorWhite,
    fontFamily: FontFamily.aliceRegular,
    lineHeight: 50,
    left: 65
  },
  later: {
    left: 295,
    top: 62,
    position: "absolute",
  },
  or: {
    marginLeft: -14,
    fontSize: FontSize.size_5xl,
    width: 28,
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    color: Color.colorWhite,
    fontFamily: FontFamily.aliceRegular,
    lineHeight: 50,
    top: 0,
  },
  orzChild: {
    left: 0,
  },
  orzItem: {
    left: 170,
  },
  orz: {
    marginLeft: -151,
    top: 559,
    width: 302,
  },
  dontHaveAn: {
    fontFamily: FontFamily.poppinsRegular,
  },
  dontHaveAnContainer1: {
    width: "100%",
  },
  dontHaveAnContainer: {
    marginLeft: -146,
    top: 516,
    fontSize: 14,
    textAlign: "center",
    width: 292,
    height: 36,
    left: "50%",
    alignItems: "center",
    display: "flex",
    color: Color.colorWhite,
    position: "absolute",
  },
  forgotPassword: {
    top: 436,
    fontSize: 13,
    fontWeight: "300",
    fontFamily: FontFamily.poppinsLight,
    width: 126,
    height: 33,
    left: 29,
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    color: Color.colorWhite,
    position: "absolute",
  },
  login1: {
    flex: 1,
    overflow: "hidden",
    height: "100%",
    width: "100%",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center", // Căn giữa theo chiều dọc
    alignItems: "center", // Căn giữa theo chiều ngang
  },
  input: {
    height: 40, // Chiều cao của input
    borderColor: "#ccc", // Màu viền
    borderWidth: 1, // Độ dày viền
    borderRadius: 5, // Bo góc
    paddingHorizontal: 10, // Padding bên trong
    marginBottom: 20, // Khoảng cách giữa các input
    width: "80%", // Chiều rộng của input
    color: "#000", // Màu chữ
  },
});

export default LoginScreen;
