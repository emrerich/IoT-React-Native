import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import CustomButton from "../components/Button-Custom";
import { Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user;
      if (user.uid === "ZkGmab3GT8VpBlTyW82ujTpzXDs2") {
        navigation.navigate("Admin");
      } else {
        handleSuccess();
      }
    });
  };

  const navigation = useNavigation();
  const handleSuccess = () => {
    navigation.navigate("Profile");
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["#B99470", "#F4DFB6"]}
        style={styles.background}
      />
      <Image
        style={{
          width: Dimensions.get("window").width * 0.8,
          height: Dimensions.get("window").height * 0.3,
          resizeMode: "contain",
        }}
        source={require("../assets/png_w_words.png")}
      />
      <TextInput
        style={styles.input}
        placeholder="E-Mail"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <CustomButton title="Login" onPress={handleLogin} />
      <View>
        <Text> Click for </Text>

        <TouchableOpacity onPress={handleRegister} style={styles.registerText}>
          <Text> Register </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    marginBottom: 30,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    zIndex: -1,
    height: Dimensions.get("window").height,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    alignItems: "center",

    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    objectFit: "cover",
  },
  input: {
    width: Dimensions.get("window").width * 0.8,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "white",
  },
  registerText: {
    color: "blue",
    fontWeight: "bold",
    textDecorationLine: "none",
    marginTop: 10,
  },
});

export default Login;
