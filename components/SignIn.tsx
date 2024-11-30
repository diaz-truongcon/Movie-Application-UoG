import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Color, Border, FontFamily, FontSize, Padding } from "../GlobalStyles";
import { signInWithEmailAndPassword } from "firebase/auth"; 
import { useNavigation } from '@react-navigation/native';
import auth from "../firebaseAuth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, doc, getDoc } from "firebase/firestore";

const SignIn = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const db = getFirestore();

  const fetchUserData = async (email: string) => {
    try {
      const userDoc = doc(db, "Customers", email);
      const userSnapshot = await getDoc(userDoc);
      if (userSnapshot.exists()) {
        return userSnapshot.data();
      } else {
        console.error("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
      return null;
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Lỗi", "Vui lòng nhập email và mật khẩu.");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const userData = await fetchUserData(email);
      if (userData) {
        console.log(userData);
        await AsyncStorage.setItem('userProfile', JSON.stringify(userData));
        setEmail(""); 
        setPassword(""); 
        Alert.alert("Thành công", "Đăng nhập thành công!");
        navigation.navigate("Home" as never);
      } else {
        Alert.alert("Lỗi", "Không tìm thấy thông tin người dùng.");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập: ", error);
      Alert.alert("Lỗi", "Đăng nhập không thành công. Vui lòng kiểm tra lại email và mật khẩu.");
    }
  };

  return (
    <View style={styles.signUp}>
      <View style={[styles.input, styles.bgPosition]}>
        <View style={[styles.password, styles.emailLayout]}>
          <TextInput
            style={[styles.exampleForPassword, styles.exampleTypo]}
            placeholder="Hãy nhập mật khẩu"
            placeholderTextColor="white" 
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <Text style={[styles.passwordTitle, styles.titleTypo, { color: 'white' }]}>Password</Text>
        </View>
        <View style={[styles.email, styles.emailLayout]}>
          <TextInput
            style={[styles.exampleForEmail, styles.exampleTypo]}
            placeholder="Hãy nhập email"
            placeholderTextColor="white" 
            value={email}
            onChangeText={setEmail}
          />
          <Text style={[styles.emailTitle, styles.titleTypo, { color: 'white' }]}>
            Username / Email
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleLogin}>
        <LinearGradient
          style={[styles.cta, styles.ctaFlexBox]}
          locations={[0, 1]}
          colors={["#000", "#535366"]}
        >
          <Text style={[styles.login, styles.ctaFlexBox]}>Login</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bgPosition: {
    left: 0,
    width: '100%',
  },
  emailLayout: {
    height: 74,
    left: 0,
    width: '100%',
    position: "absolute",
  },
  bgBorder: {
    borderWidth: 1,
    borderColor: Color.colorWhite,
    borderStyle: "solid",
    borderRadius: Border.br_xl,
    position: "absolute",
  },
  exampleTypo: {
    height: 50,
    borderColor: Color.colorWhite,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    color: Color.colorWhite,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.poppinsRegular,
    backgroundColor: 'transparent',
  },
  titleTypo: {
    height: 29,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    textAlign: "left",
    color: Color.colorWhite,
    fontSize: FontSize.size_base,
    left: 0,
    top: 0,
    position: "absolute",
  },
  ctaFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  bg: {
    top: 29,
    height: 45,
    left: 0,
    width: 390,
  },
  exampleForPassword: {
    top: 30,
    width: '100%',
  },
  passwordTitle: {
    width: 110,
  },
  password: {
    top: 99,
  },
  exampleForEmail: {
    top: 35,
  },
  emailTitle: {
    width: 155,
  },
  email: {
    top: 0,
  },
  input: {
    height: 173,
    top: 0,
    position: "absolute",
    left: 0,
    width: '100%',
  },
  login: {
    textAlign: "center",
    display: "flex",
    width: 44,
    height: 30,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    justifyContent: "center",
    alignItems: "center",
    color: Color.colorWhite,
    fontSize: FontSize.size_base,
  },
  cta: {
    top: 202,
    left: 270,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: {
      width: 2.000000238418579,
      height: 2.000000238418579,
    },
    shadowRadius: 15,
    elevation: 15,
    shadowOpacity: 1,
    width: 116,
    height: 36,
    flexDirection: "row",
    paddingHorizontal: Padding.p_31xl,
    paddingTop: Padding.p_mini,
    paddingBottom: Padding.p_smi,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Color.colorWhite,
    borderStyle: "solid",
    borderRadius: Border.br_xl,
    position: "absolute",
  },
  signUp: {
    top: 234,
    height: 238,
    width: '100%',
    maxWidth: '90%',
    position: "absolute",
  },
});

export default SignIn;
