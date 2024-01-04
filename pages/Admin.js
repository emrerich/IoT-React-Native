import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { getAuth, signOut } from "firebase/auth";

import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import CustomButton from "../components/Button-Custom";
import { useNavigation } from "@react-navigation/native";
import CustomBezierChart from "../components/charts/Custom-Bezier-Chart";
import CustomBarChart from "../components/charts/Custom-Bar-Chart";

const Admin = () => {
  const [move, setMove] = useState("");
  const [calorie, setCalorie] = useState(0);
  const [gap, setGap] = useState(0);
  const [users, setUsers] = useState([]);
  const [bigData, setBigData] = useState({
    bezierData: {
      labels: ["Şınav", "Mekik", "Curl"],
      datasets: [
        {
          data: [],
        },
      ],
    },
    barData: {
      labels: ["Şınav", "Mekik", "Curl"],
      datasets: [
        {
          data: [],
        },
      ],
      header: "Bu Haftaki Kullanıcıların Aktiviteleri",
    },
  });
  const auth = getAuth();

  // useEffect ile kullanıcıları getir
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const db = getFirestore();
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const usersData = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchMovesData = async () => {
      try {
        const db = getFirestore();
        const movesCollection = collection(db, "Moves");
        const movesSnapshot = await getDocs(movesCollection);

        const movesData = movesSnapshot.docs.map((doc) => {
          const moveData = doc.data();
          return 3 * moveData.counter; // Her biri için counter ile çarp
        });

        const updatedBigData = {
          bezierData: {
            ...bigData.bezierData,
            datasets: [{ data: movesData }],
          },
          barData: {
            ...bigData.barData,
            datasets: [{ data: movesData }], // Update this array with the correct values
          },
        };

        setBigData(updatedBigData);
      } catch (error) {
        console.error("Error fetching moves data:", error);
      }
    };

    fetchMovesData();
  }, []);
  useEffect(() => {
    const fetchMovesData = async () => {
      try {
        const db = getFirestore();
        const movesCollection = collection(db, "Moves");
        const movesSnapshot = await getDocs(movesCollection);

        const movesData = movesSnapshot.docs.map((doc) => {
          const moveData = doc.data();
          return 3 * moveData.counter; // Her biri için counter ile çarp
        });

        const updatedBezierData = {
          ...bigData.bezierData,
          datasets: [{ data: movesData }],
        };

        setBigData((prevBigData) => ({
          ...prevBigData,
          bezierData: updatedBezierData,
        }));
      } catch (error) {
        console.error("Error fetching moves data:", error);
      }
    };

    fetchMovesData();
  }, [bigData.bezierData]);
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
    navigation.navigate("Customers", { users }); // Customers sayfasına kullanıcıları props olarak gönder
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
      {/* <CustomBezierChart data={bigData.bezierData} />
      <CustomBarChart data={bigData.barData} /> */}

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
