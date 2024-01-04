import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const Customers = ({ route }) => {
  const { users } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Kullanıcılar</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text>Email: {item.email}</Text>
            {/* Diğer kullanıcı bilgileri */}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  userContainer: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default Customers;
