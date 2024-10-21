import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import BatteryLevel from './useBatteryLevel';
import VibrationComponent from './VibrationComponent'; 
import * as Battery from 'expo-battery';
import YourComponent from './YourComponent';

const App = () => {
  let a=1;
  const darkBlack = '#101820'; 
  const black = '#121212';

  const [bgColor, setBgColor] = useState('#00ff00');
  const [messages, setMessages] = useState([]);
  const [isMaxUser, setIsMaxUser] = useState(false);
  const [isSender, setIsSender] = useState(false);
  const [maxData, setMaxData] = useState({ firstmax: '', secondmax: '' });
  const [batteryMax, setBatteryMax] = useState(0);
  const [userId, setUserId] = useState(null);
  const websocket = useRef(null);

  const [batteryLevel, setBatteryLevel] = useState(null);

  // Hook to fetch battery level and send it via WebSocket
  const sendBatteryLevel = async () => {
    try {
      const level = await Battery.getBatteryLevelAsync();
      const batteryPercentage = Math.round(level * 100); // Convert to percentage
      setBatteryLevel(batteryPercentage);

      if (websocket.current.readyState === WebSocket.OPEN) {
        const message = JSON.stringify({ battery: batteryPercentage });
        websocket.current.send(message);
        console.log("Battery level sent:", message);
      } else {
        console.log("WebSocket not open to send battery level.");
      }
    } catch (error) {
      console.error("Error fetching or sending battery level:", error);
    }
  };

  const connectWebSocket = () => {
    if (!websocket.current || websocket.current.readyState === WebSocket.CLOSED) {
      websocket.current = new WebSocket('https://wakeupradio.onrender.com');

      websocket.current.onopen = () => {
        console.log('Connected to WebSocket server');
      };

      websocket.current.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.userId) {
          setUserId(data.userId);
        }

        if (data.message) {
          const { focaldepth, hypocenter, degree_of_earthquake, magnitude, focal_mechanism, node_number } = data.message;

          if (focaldepth !== undefined && hypocenter !== undefined && degree_of_earthquake !== undefined && magnitude !== undefined && focal_mechanism !== undefined && node_number) {
            console.log('Received stored object:', { focaldepth, hypocenter });
            setMessages((prevMessages) => [
              { sender: node_number, message: `Focal Depth: ${focaldepth}` },
              { sender: node_number, message: `Hypocenter: ${hypocenter.latitude} ${hypocenter.longitude}` },
              { sender: node_number, message: `Degree of Earthquake: ${degree_of_earthquake}` },
              { sender: node_number, message: `Magnitude: ${magnitude}` },
              { sender: node_number, message: `Focal Mechanism: ${focal_mechanism}` },
              ...prevMessages,
            ]);
          } else {
            if (data.message === 'sender') {
              setBgColor(darkBlack);
              setIsSender(true);
            } else if (data.message === 'send') {
              setBgColor(black);
              setIsSender(false);
              sendBatteryLevel(); //send ur battery automatically
            } else if (data.message === 'max') {
              setIsMaxUser(true);
              if (data.maxBattery && data.secondMaxBattery) {
                setMaxData({ firstmax: data.maxBattery, secondmax: data.secondMaxBattery });
                setBatteryMax(data.maxBattery);
              }
            } else if (data.message === 'low') {
              setIsMaxUser(false);
            } else {
              console.log(data.message);
              setMessages((prevMessages) => [
                { sender: isSender ? 'node' : 'Sender (yellow background)', message: data.message },
                ...prevMessages,
              ]);
            }
          }
        }
      };

      websocket.current.onerror = (error) => {
        console.error('WebSocket Error:', error);
      };

      websocket.current.onclose = () => {
        console.log('WebSocket connection closed');
      };
    }
  };

  const sendbig = () => {
    setMaxData(prev => ({ ...prev, firstmax: 10 }));
    a=0;
  };

  const easy = () => {
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomElement(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }

    function getRandomElementfromarray(arr) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      return arr[randomIndex];
    }

    const coordinates = [
      { latitude: 37.7749, longitude: -122.4194 },
      { latitude: 51.5074, longitude: -0.1278 },
      { latitude: -33.8688, longitude: 151.2093 },
      { latitude: 40.7128, longitude: -74.0060 },
      { latitude: 35.6895, longitude: 139.6917 },
      { latitude: 48.8566, longitude: 2.3522 },
      { latitude: -23.5505, longitude: -46.6333 },
      { latitude: 34.0522, longitude: -118.2437 },
      { latitude: 55.7558, longitude: 37.6173 },
      { latitude: -1.2921, longitude: 36.8219 },
      { latitude: 19.4326, longitude: -99.1332 },
      { latitude: 28.6139, longitude: 77.2090 },
      { latitude: 52.5200, longitude: 13.4050 },
      { latitude: -34.6037, longitude: -58.3816 },
      { latitude: 31.2304, longitude: 121.4737 },
      { latitude: -4.4419, longitude: 15.2663 },
      { latitude: -37.8136, longitude: 144.9631 },
      { latitude: 41.9028, longitude: 12.4964 },
      { latitude: -29.8587, longitude: 31.0218 },
      { latitude: 60.1699, longitude: 24.9384 },
      { latitude: 45.4215, longitude: -75.6972 },
      { latitude: 35.6762, longitude: 139.6503 },
      { latitude: 25.2760, longitude: 55.2963 },
      { latitude: -22.9068, longitude: -43.1729 },
      { latitude: 50.8503, longitude: 4.3517 },
      { latitude: 1.3521, longitude: 103.8198 },
      { latitude: -26.2041, longitude: 28.0473 },
      { latitude: 35.2271, longitude: -80.8431 },
      { latitude: 37.5665, longitude: 126.9780 },
      { latitude: 12.9716, longitude: 77.5946 },
      { latitude: 43.6532, longitude: -79.3832 },
      { latitude: 13.7563, longitude: 100.5018 },
      { latitude: 25.2048, longitude: 55.2708 },
      { latitude: 54.6872, longitude: 25.2797 },
      { latitude: -41.2865, longitude: 174.7762 },
      { latitude: 30.0444, longitude: 31.2357 },
      { latitude: -12.0464, longitude: -77.0428 },
      { latitude: 39.9042, longitude: 116.4074 },
      { latitude: 49.2827, longitude: -123.1207 },
      { latitude: 36.1699, longitude: -115.1398 }
    ];

    const focalMechanisms = [
      "Strike-slip fault", 
      "Reverse fault", 
      "Normal fault",
      "Oblique-slip fault",
      "Thrust fault",
      "Detachment fault",
      "Transform fault",
      "Blind thrust fault",
      "Listric fault",
      "Rotational fault",
      "Horst and graben fault",
      "Step-over fault",
      "Conjugate fault",
      "Extensional fault",
      "Riedel shear fault",
      "Decollement fault",
      "Transpressional fault",
      "Transtensional fault",
      "Transfer fault",
      "Growth fault"
    ];

    const storedObject = {
      focaldepth: getRandomInt(50, 200),
      hypocenter: getRandomElement(coordinates),
      degree_of_earthquake: getRandomInt(1, 10),
      magnitude: getRandomInt(1, 20),
      focal_mechanism: getRandomElementfromarray(focalMechanisms),
      node_number: userId
    };

    websocket.current.send(JSON.stringify({ message: storedObject }));

    setMessages((prevMessages) => [
      { sender: userId, message: `Focal Depth: ${storedObject.focaldepth}` },
      { sender: userId, message: `Hypocenter: ${storedObject.hypocenter.latitude} ${storedObject.hypocenter.longitude}` },
      { sender: userId, message: `Degree of Earthquake: ${storedObject.degree_of_earthquake}` },
      { sender: userId, message: `Magnitude: ${storedObject.magnitude}` },
      { sender: userId, message: `Focal Mechanism: ${storedObject.focal_mechanism}` },
      ...prevMessages,
    ]);
  };

  const handleBatteryMaxClick = () => {
    setIsMaxUser(false);
    a=0;
    websocket.current.send(JSON.stringify({ message: 'low' }));
  };

  useEffect(() => {
    let interval;

    if (isMaxUser) {
      interval = setInterval(() => {
        // Call your function here
        easy();
      }, 3000);
    }

    // Cleanup function to clear the interval
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isMaxUser]); 

  const retrivebattery = async (isMaxUser) => {
    if (!isMaxUser || a === 0) return; 
    try {
      const level = await Battery.getBatteryLevelAsync();
      const batteryPercentage = Math.round(level * 100); // Convert to percentage
      setMaxData(prev => ({ ...prev, firstmax: batteryPercentage }));

      // Check if firstmax < secondmax and send 'low' if necessary
      if (batteryPercentage <= maxData.secondmax) {
        handleBatteryMaxClick();
      }
    } catch (error) {
      console.error("Error fetching or sending battery level:", error);
    }
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      retrivebattery(isMaxUser);
    }, 2000);
  
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [websocket, maxData.firstmax]);
  
  useEffect(() => {
    if (maxData.firstmax && maxData.secondmax && maxData.firstmax <= maxData.secondmax) {
      handleBatteryMaxClick();
    }
  }, [maxData]);

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <TouchableOpacity onPress={connectWebSocket} style={[
        styles.button,
        bgColor === darkBlack ? styles.limeBorder : styles.cyanBorder
      ]}>
        <Text style={bgColor === darkBlack ? styles.limeText : styles.cyanText}>Connect to WebSocket</Text>
      </TouchableOpacity>

      {userId && (
        <View style={[styles.userIdContainer, 

        ]}>
          <Text style={[styles.userIdText,
            bgColor === darkBlack ? styles.limeText : styles.cyanText]}>Node : {userId}</Text>
        </View>
      )}

      <ScrollView style={[
          styles.maxUserContainer,
          bgColor === black ? styles.cyanBorder : styles.limeBorder,
          { backgroundColor: bgColor === black ?  black: darkBlack}
        ]}>
        <Text style={[styles.messagesHeader,
          bgColor === darkBlack ? styles.limeText : styles.cyanText
        ]}>Messages</Text>
        {messages.length === 0 ? (
          <Text style={[styles.noMessagesText,
            bgColor === darkBlack ? styles.limeText : styles.cyanText
          ]}>No messages yet</Text>
        ) : (
          messages.map((msg, index) => (
            <Text key={index} style={[styles.messageText,
              bgColor === darkBlack ? styles.limeText : styles.cyanText
            ]}>
              {msg.sender}: {msg.message}
            </Text>
          ))
        )}
      </ScrollView>

      {bgColor === black && (
        <>
          <YourComponent websocket={websocket} />
          <TouchableOpacity onPress={sendbig} style={[
        styles.button,
        bgColor === darkBlack ? styles.limeBorder : styles.cyanBorder
      ]}>
            <Text style={bgColor === darkBlack ? styles.limeText : styles.cyanText}>make it 10</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleBatteryMaxClick} style={styles.button}>
            <Text style={bgColor === darkBlack ? styles.limeText : styles.cyanText}>Stop</Text>
          </TouchableOpacity>
        </>
      )}

      {isMaxUser && (
        <View style={[
          styles.maxUserContainer,
          bgColor === black ? styles.cyanBorder : styles.limeBorder
        ]}>
          <BatteryLevel />
          <VibrationComponent />
          <View style={[styles.maxDataContainer,
            bgColor === darkBlack ? styles.limeBorder : styles.cyanBorder
          ]}>
            <Text style={bgColor === darkBlack ? styles.limeText : styles.cyanText}>Data</Text>
            <Text style={bgColor === darkBlack ? styles.limeText : styles.cyanText}>battery value: {maxData.firstmax}</Text>
            <Text style={bgColor === darkBlack ? styles.limeText : styles.cyanText}>second Max: {maxData.secondmax}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor:'#36454F'
  },
  button: {
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  limeText: {
    color: '#00FF00',
    textAlign: 'center',
  },
  cyanText: {
    color: '#00FFFF',
    textAlign: 'center',
  },
  limeBorder: {
    borderColor: '#00FF00',
    borderWidth: 2,
  },
  cyanBorder: {
    borderColor: '#00FFFF',
    borderWidth: 2,
  },
  userIdContainer: {
    marginVertical: 10,
  },
  userIdText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  messagesContainer: {
    flex: 1,
    marginVertical: 10,
  },
  messagesHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noMessagesText: {
    textAlign: 'center',
    color: 'gray',
  },
  messageText: {
    fontSize: 16,
    marginVertical: 2,
  },
  maxUserContainer: {
    marginVertical: 10,
  },
  input: {
    borderColor: '#00FFFF',
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
  },
  maxDataContainer: {
    marginTop: 10,
  },
  maxDataText: {
    fontSize: 16,
  },
});

export default App;
