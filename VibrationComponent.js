// VibrationComponent.js

import React, { useEffect } from 'react';
import { Vibration, Text, View, StyleSheet } from 'react-native';

const VibrationComponent = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      Vibration.vibrate(100); // Vibrate for 100ms
    }, 500); // Vibrate every 500ms

    // Cleanup the interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>This app vibrates every 500 milliseconds.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default VibrationComponent;
