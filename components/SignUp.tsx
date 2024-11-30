import React, { useState } from "react";
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Alert } from "react-native";
import { Color, FontSize, FontFamily, Border, Padding } from "../GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import auth from "../firebaseAuth";
import db from "../firebaseFirestore";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import { CheckBox } from 'react-native-elements';


const SignUp = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);

  const validateForm = () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert("Lỗi", "Tất cả các trường đều phải được điền.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Lỗi", "Email không hợp lệ.");
      return false;
    }
    if (password.length < 6) {
      Alert.alert("Lỗi", "Mật khẩu phải có ít nhất 6 ký tự.");
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu và xác nhận mật khẩu không khớp.");
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm() || !isAgreed) {
      Alert.alert("Lỗi", "Bạn phải đồng ý với các điều khoản.");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "Customers", email), {
        username: username,
        email: email,
        role: "user"
      });
      Alert.alert("Thành công", "Đăng ký thành công!");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setIsAgreed(false);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Lỗi đăng ký: ", error);
      Alert.alert("Lỗi", "Đăng ký không thành công. Vui lòng thử lại.");
    }
  };

  return (
    <View style={styles.signUp}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="white" 
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="white" 
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="white" 
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm your password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholderTextColor="white" 
        />
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          checked={isAgreed}
          onPress={() => setIsAgreed(!isAgreed)}
          containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
        />
        <Text style={styles.checkboxLabel}>
          I agree to the terms and privacy policy
        </Text>
      </View>
      <TouchableOpacity onPress={handleSignUp}>
        <LinearGradient
          style={styles.cta}
          locations={[0, 1]}
          colors={["#000", "#535366"]}
        >
          <Text style={styles.createAccount1}>Create account</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  createAccount1: {
    fontSize: FontSize.size_base,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemiBold,
    textAlign: "center",
    color: Color.colorWhite,
  },
  cta: {
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowRadius: 15,
    elevation: 15,
    shadowOpacity: 1,
    borderRadius: Border.br_xl,
    borderColor: Color.colorWhite,
    borderWidth: 1,
    height: 55,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Padding.p_31xl,
    paddingTop: Padding.p_mini,
    paddingBottom: Padding.p_smi,
    backgroundColor: "transparent",
  },
  signUp: {
    padding: 20,
    marginTop: 245,
  },
  inputContainer: {
    marginBottom: 15,
    width: '100%', 
  },
  label: {
    color: Color.colorWhite,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.poppinsRegular,
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: Color.colorWhite,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    color: Color.colorWhite,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.poppinsRegular,
    backgroundColor: 'transparent',
    width: '100%', 
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkboxLabel: {
    color: Color.colorWhite,
    fontSize: FontSize.size_base,
  },
});

export default SignUp;
