import * as React from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";

const GroupComponent = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.ctaParent}>
      <Pressable style={styles.button} onPress={() => navigation.navigate("Login")}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate("Register")}>
        <Text style={styles.buttonText}>Register</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate("MaybeLater")}>
        <Text style={styles.buttonText}>Maybe later</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  ctaParent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginTop: 550,
  },
  button: {
    borderWidth: 2,
    borderColor: Color.colorBeige,
    borderRadius: Border.br_xl,
    padding: 15,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: Color.colorBeige,
    fontFamily: FontFamily.poppinsLight,
    fontSize: FontSize.size_lg,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GroupComponent;
