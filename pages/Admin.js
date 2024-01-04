import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { getAuth, signOut } from "firebase/auth";

import { getFirestore, doc, setDoc, collection } from "firebase/firestore";
import CustomButton from "../components/Button-Custom";
import { useNavigation } from "@react-navigation/native";
import CustomBezierChart from "../components/charts/Custom-Bezier-Chart";
import CustomBarChart from "../components/charts/Custom-Bar-Chart";

const Admin = () => {
  const [move, setMove] = useState("");
  const [calorie, setCalorie] = useState(0);
  const [gap, setGap] = useState(0);
  const auth = getAuth();
  const bigData = {
    bezierData: {
      labels: ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"],
      datasets: [
        {
          data: [
            Math.random() * 10000,
            Math.random() * 10000,
            Math.random() * 10000,
            Math.random() * 10000,
            Math.random() * 10000,
            Math.random() * 10000,
            Math.random() * 10000,
          ],
        },
      ],
    },
    barData: {
      labels: ["Şınav", "Mekik", "Curl"],
      datasets: [
        {
          data: [2500, 4500, 2800],
        },
      ],
      header: "Bu Haftaki Kullanıcıların Aktiviteleri",
    },
  };
  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigation.navigate("Login");
    });
  };
  const handleAllMoves = () => {
    navigation.navigate("AllMoves");
  };
  const navigation = useNavigation();
  const handleCustomers = () => {
    navigation.navigate("Profile");
  };
  const handleAddMove = async () => {
    try {
      // Get a reference to the Firestore database
      const db = getFirestore();

      // Koleksiyon var mı kontrol et, yoksa oluştur
      const movesCollection = collection(db, "Moves");

      // Moves koleksiyonu içine doküman ekle
      await setDoc(doc(movesCollection), {
        move: move,
        calorie: calorie,
        gap: gap,
        counter: 0,
      });
      Alert.alert("Success", "Move added successfully");
      setMove("");
    } catch (error) {
      console.error("Error adding move:", error);
      Alert.alert("Error", "Failed to add move");
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 16,
          textAlign: "center",
        }}
      >
        Hareket Ekle
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Yeni Hareket Ekle"
        value={move}
        onChangeText={setMove}
      />
      <Text>Kalori</Text>
      <TextInput
        style={styles.input}
        placeholder="Hareket başına kalori"
        value={calorie}
        onChangeText={setCalorie}
      />
      <Text>Hareket Arası Gap</Text>
      <TextInput
        style={styles.input}
        placeholder="Hareket arası gap"
        value={gap}
        onChangeText={setGap}
      />
      <CustomButton title="Ekle" onPress={handleAddMove} />
      <CustomBezierChart data={bigData.bezierData} />
      <CustomBarChart data={bigData.barData} />

      <CustomButton title="Kullanıcıları gör" onPress={handleCustomers} />
      <CustomButton title="Tüm Hareketleri Gör" onPress={handleAllMoves} />
      <CustomButton title="Çıkış Yap" onPress={handleSignOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default Admin;
