import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as Battery from 'expo-battery';

const YourComponent = ({ websocket }) => {
  const [batteryLevel, setBatteryLevel] = useState(null);
  
  useEffect(() => {
    const fetchBatteryLevel = async () => {
      const level = await Battery.getBatteryLevelAsync();
      setBatteryLevel(Math.round(level * 100)); // Convert to percentage
    };

    fetchBatteryLevel();
  }, []);

  const sendBatteryValue = () => {
    if (batteryLevel !== null) {
      // Check if WebSocket is ready to send
      if (websocket.current.readyState === WebSocket.OPEN) {
        const message = JSON.stringify({ battery: batteryLevel });
        websocket.current.send(message);
        console.log("Message sent:", message);
      } else {
        console.error("WebSocket is not open. Current state:", websocket.current.readyState);
      }
    } else {
      console.log("Battery level not available yet.");
    }
  };

  return (
    <TouchableOpacity onPress={sendBatteryValue} style={styles.button}>
      <Text style={styles.buttonText}>Send Battery Value</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    // Your button styles
  },
  buttonText: {
    // Your button text styles
  },
});

export default YourComponent;
