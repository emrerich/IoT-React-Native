import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { Card } from "react-native-elements";

const AllMoves = () => {
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    const db = getFirestore();
    const movesCollection = collection(db, "Moves");
    console.log(movements);
    // Firestore koleksiyonundaki değişikliklere anlık olarak tepki ver
    const unsubscribe = onSnapshot(movesCollection, (querySnapshot) => {
      const movesData = [];
      querySnapshot.forEach((doc) => {
        movesData.push({ id: doc.id, ...doc.data() });
      });
      setMovements(movesData);
    });

    // Temizleme fonksiyonunu döndür, bileşenin unmount edildiğinde çalıştırılacak
    return () => unsubscribe();
  }, []);
  const renderItem = ({ item }) => (
    <Card key={item.id} containerStyle={styles.card}>
      <Text style={styles.cardHeader}>{item.move}</Text>
      <Text style={styles.cardText}>{item.calorie} Calorie per rep</Text>
      <Text style={styles.cardText}>{item.gap} degree for gyro censor</Text>
    </Card>
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={movements}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: StatusBar.currentHeight || 0,
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
export default AllMoves;
