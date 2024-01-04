import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#1B4242",
    borderRadius: 5,
    padding: 10,
    width: 200,
    height: 40,
    marginVertical: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fafafa",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CustomButton;
