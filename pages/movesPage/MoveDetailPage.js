import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import CustomButton from "../../components/Button-Custom";

const MoveDetailPage = () => {
  const [selectedMove, setSelectedMove] = useState(null);
  const [counterState, setCounter] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchSelectedMove = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        console.error("User not authenticated.");
        setLoading(false);
        return;
      }

      const db = getFirestore();
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const selectedMoveData = userDoc.data().selectedMove;

        if (selectedMoveData) {
          const { calorie, gap, id, counter, move } = selectedMoveData;
          const updatedSelectedMove = { calorie, gap, id, counter, move };
          setSelectedMove(updatedSelectedMove);
          setCounter(counter);
        } else {
          console.error("No selected move found in user document.");
        }
      } else {
        console.error("User document not found.");
      }
    } catch (error) {
      console.error("Error fetching selected move:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSelectedMove();

    const intervalId = setInterval(() => {
      fetchSelectedMove();
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  console.log(selectedMove);

  return (
    <View style={styles.cardContainer}>
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : selectedMove ? (
        <View>
          <Text style={styles.moveText}>
            Selected Move: {selectedMove.move}
          </Text>
          <Text style={styles.counterText}>Counter: {counterState}</Text>
        </View>
      ) : (
        <Text style={styles.noMoveText}>No selected move found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 16,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  moveText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  counterText: {
    fontSize: 16,
  },
  noMoveText: {
    fontSize: 18,
    color: "red",
    fontWeight: "bold",
  },
});

export default MoveDetailPage;
