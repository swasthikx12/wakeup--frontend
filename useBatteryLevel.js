import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Battery from 'expo-battery';

const BatteryLevel = () => {
  const [batteryLevel, setBatteryLevel] = useState(null);

  useEffect(() => {
    const fetchBatteryLevel = async () => {
      const level = await Battery.getBatteryLevelAsync();
      setBatteryLevel(Math.round(level * 100)); // Convert to percentage
    };

    fetchBatteryLevel();
  }, []);

  return (
    <View style={styles.container}>
      {batteryLevel !== null ? (
        <Text style={styles.batteryText}>start battery value: {batteryLevel}%</Text>
      ) : (
        <Text style={styles.batteryText}>Fetching battery level...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  batteryText: {
    fontSize: 24,
    color: 'red', // Display the text in red color
  },
});

export default BatteryLevel;
