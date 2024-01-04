import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import CustomButton from "../components/Button-Custom";

const Profile = () => {
  const auth = getAuth();
  const navigation = useNavigation();
  const [additionalDetails, setAdditionalDetails] = useState({});
  const user = auth.currentUser;

  const handleSignOut = async () => {
    try {
      // Kullanıcının çıkış yapması

      // Çıkış yaptığında selectedMove'u sıfırla
      const db = getFirestore();
      const user = auth.currentUser;
      const userRef = doc(db, "users", user.uid);
      await signOut(auth);

      await updateDoc(userRef, { selectedMove: "" });

      console.log("User signed out successfully.");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  const handleSelectMove = () => {
    navigation.navigate("SelectMove");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (user !== null) {
        const db = getFirestore();
        const userRef = doc(db, "users", user.uid);

        try {
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setAdditionalDetails(userData);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [user]);

  if (user !== null) {
    const displayName = user.displayName;
    const email = user.email;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Profile Page</Text>
        <View style={styles.userInfoContainer}></View>
        <Text style={styles.userInfo}>Name: {displayName}</Text>
        <Text style={styles.userInfo}>Email: {email}</Text>

        <View style={styles.userInfoContainer}>
          <Text style={styles.header}>Günlük Kalori Yakımı</Text>
        </View>
        <CustomButton title="Sign Out" onPress={handleSignOut} />
        <CustomButton title="Select Move" onPress={handleSelectMove} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },

  userInfoContainer: {
    backgroundColor: "#fff",
    padding: 36,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 8,
    color: "#555",
  },
});

export default Profile;
