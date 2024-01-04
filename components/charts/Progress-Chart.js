import React from "react";
import { ProgressChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { View, Text, StyleSheet } from "react-native";

const data = {
  labels: ["Kalori", "Şınav", "Curl", "Mekik"],
  data: [0.7, 0.6, 0.8, 0.2],
};

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#135355", // Başlangıç rengi
  backgroundGradientTo: "#00A896", // Bitiş rengi
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  backgroundGradientToOpacity: 0.2,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

const CustomProgressChart = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Günlük Hedeflerin</Text>

      <ProgressChart
        data={data}
        width={screenWidth - 32}
        height={220}
        strokeWidth={16}
        radius={32}
        chartConfig={chartConfig}
        hideLegend={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 16,
    textAlign: "center",
    display: "flex",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
});

export default CustomProgressChart;
