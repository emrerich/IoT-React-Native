import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
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

  const handleClick = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        console.error("User not authenticated.");
        return;
      }

      const db = getFirestore();
      const userRef = doc(db, "users", user.uid);
      const movesCollection = collection(db, "Moves");

      // Eğer user dokümanı varsa, onun içindeki selectedMove alanını çek
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();

        // Eğer selectedMove alanı varsa ve içinde counter varsa, onun içindeki counter'ı arttır
        if (
          userData.selectedMove &&
          userData.selectedMove.counter !== undefined
        ) {
          const { id, counter } = userData.selectedMove;
          const updatedCounter = counter + 1;

          // Güncellenmiş selectedMove objesini oluştur
          const updatedSelectedMove = {
            ...userData.selectedMove,
            counter: updatedCounter,
          };

          // User dokümanını güncelle
          await updateDoc(userRef, { selectedMove: updatedSelectedMove });

          // Aynı counter'ı Moves koleksiyonundaki belgeye de uygula
          const moveQuerySnapshot = await getDocs(
            query(movesCollection, where("id", "==", selectedMove.id))
          );

          console.log(
            "Number of documents in moveQuerySnapshot:",
            moveQuerySnapshot.size
          );
          console.log("Selected Move:", selectedMove);

          moveQuerySnapshot.forEach(async (moveDoc) => {
            console.log("moveDoc:", moveDoc.data());
            await updateDoc(moveDoc.ref, { counter: updatedCounter });
          });

          // State'deki değeri güncelle, bu re-render'ı tetikleyecektir
          setCounter(updatedCounter);
        } else {
          console.error("selectedMove or counter not found in user document.");
        }
      } else {
        console.error("User document not found.");
      }
    } catch (error) {
      console.error("Error updating selected move:", error);
    }
  };

  useEffect(() => {
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

    fetchSelectedMove();
  }, []);
  console.log(selectedMove);

  return (
    <View>
      {loading ? (
        <Text>Loading...</Text>
      ) : selectedMove ? (
        <View>
          <Text>Selected Move: {selectedMove.move}</Text>
          <Text>Counter: {counterState}</Text>
          <CustomButton title="Arttır" onPress={handleClick} />
        </View>
      ) : (
        <Text>No selected move found.</Text>
      )}
    </View>
  );
};

export default MoveDetailPage;
