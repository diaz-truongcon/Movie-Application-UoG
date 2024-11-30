import * as React from "react";
import { Image } from "expo-image";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';

const GoBackIcon = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Splash')}>
      <Image
        style={styles.goBackIcon}
        contentFit="cover"
        source={require("../assets/go-back.png")}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  goBackIcon: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 14,
    height: 24,
  },
});

export default GoBackIcon;
