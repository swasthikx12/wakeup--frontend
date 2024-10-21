// LocationComponent.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import * as Location from 'expo-location';

const LocationComponent = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const getLocation = async () => {
    // Request permission to access location
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    // Get the user's current location
    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text>Location Component</Text>
      {errorMsg ? (
        <Text>Error: {errorMsg}</Text>
      ) : location ? (
        <Text>
          Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}
        </Text>
      ) : (
        <Text>Fetching location...</Text>
      )}
      <Button title="Refresh Location" onPress={getLocation} />
    </View>
  );
};

export default LocationComponent;
