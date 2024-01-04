import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Card } from "react-native-elements";
import CustomButton from "../components/Button-Custom";
import { useNavigation } from "@react-navigation/native";

const SelectMove = () => {
  const [movements, setMovements] = useState([]);
  const auth = getAuth();
  const navigation = useNavigation();

  useEffect(() => {
    const db = getFirestore();
    const movesCollection = collection(db, "Moves");
    const unsubscribe = onSnapshot(movesCollection, (querySnapshot) => {
      const movesData = [];
      querySnapshot.forEach((doc) => {
        movesData.push({ id: doc.id, ...doc.data() });
      });
      setMovements(movesData);
    });
    return () => unsubscribe(); // Önceki dinleme işlemlerini iptal et
  }, [auth]);

  const handleSelect = async (selectedMove) => {
    try {
      const db = getFirestore();
      const user = auth.currentUser;
      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, { selectedMove });

      console.log("Selected move updated successfully:", selectedMove);

      // Seçilen hareketin sayfasına geçiş yap
      navigation.navigate("MoveDetailPage");

      console.log("Selected move updated successfully:", selectedMove);
    } catch (error) {
      console.error("Error updating selected move:", error);
    }
  };

  const renderItem = ({ item }) => (
    <Card key={item.id} containerStyle={styles.card}>
      <Text style={styles.cardHeader}>{item.move}</Text>
      <CustomButton title="Select" onPress={() => handleSelect(item)} />
    </Card>
  );

  return (
    <FlatList
      data={movements}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    marginBottom: 16,
  },
  cardHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default SelectMove;
