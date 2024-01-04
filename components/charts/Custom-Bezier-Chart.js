import React from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";

const CustomBezierChart = ({ data }) => {
  return (
    <View style={styles.container}>
      <LineChart
        data={{
          labels: data.labels,
          datasets: data.datasets,
        }}
        width={Dimensions.get("window").width - 132}
        height={220}
        fromZero={true}
        yAxisSuffix=" cal"
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: "#1B4242",
          backgroundGradientFrom: "#135355",
          backgroundGradientTo: "#00A896",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "3",
            strokeWidth: "2 ",
            stroke: "#1B4242",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 0,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    borderRadius: 16,
    padding: 16,
    backgroundColor: "#fff", // Background color for the container
  },
});

export default CustomBezierChart;
