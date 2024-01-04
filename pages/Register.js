import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../components/Button-Custom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      const db = getFirestore();
      const userRef = doc(db, "users", user.uid);

      // Eklemek istediğiniz kullanıcı ayrıntılarını burada belirtin
      const additionalDetails = {
        firstName: "", // Örneğin kullanıcı adı
        height: "",
        lastName: "", // Örneğin kullanıcı soyadı
        phoneNumber: "", // Örneğin kullanıcı telefon numarası
        weight: "",
        email: user.email,
        uid: user.uid,
        selectedMove: [],
        // Diğer ayrıntılar...
      };

      await setDoc(userRef, additionalDetails);

      // Kayıt başarıyla tamamlandıktan sonra profili yönlendir
      handleSuccess();
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      // Handle error
    }
  };
  const handleSuccess = () => {
    navigation.navigate("Profile");
  };
  const handleLoginRedirect = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <LinearGradient
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
        placeholder="Email"
        keyboardType="email-address"
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

      <CustomButton title="Register" onPress={handleRegister} />
      <View>
        <Text> Already have an Account? </Text>

        <TouchableOpacity onPress={handleRegister} style={styles.registerText}>
          <Text> Login </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    alignItems: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
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
  loginText: {
    color: "#1B4242",
    fontWeight: "bold",
    textDecorationLine: "none",
    marginTop: 10,
  },
});

export default Register;
