import React from "react";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { View, Text, StyleSheet } from "react-native";

const screenWidth = Dimensions.get("window").width;

const graphStyle = {
  marginVertical: 8,
  borderRadius: 16,
};

const chartConfig = {
  backgroundGradientFrom: "#135355", // Başlangıç rengi
  backgroundGradientTo: "#135355", // Bitiş rengi
  decimalPlaces: 0, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  backgroundGradientToOpacity: 1,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
  fromZero: true, // Grafik minimum değerini sıfıra ayarlar
};

const CustomBarChart = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{data.header}</Text>

      <BarChart
        style={graphStyle}
        data={{ labels: data.labels, datasets: data.datasets }}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        verticalLabelRotation={30}
        fromZero={true}
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
    padding: 36,
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

export default CustomBarChart;
