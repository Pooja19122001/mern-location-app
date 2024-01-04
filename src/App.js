// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Fetch live location using the Geolocation API
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
          },
          (error) => {
            console.error('Error getting location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    fetchLocation();
  }, []);

  const sendLocation = async () => {
    if (location) {
      const phoneNumber = '+91 9148105639'; // Replace with the actual phone number

      try {
        await axios.post('http://localhost:5000/api/location', {
          phoneNumber,
          latitude: location.latitude,
          longitude: location.longitude,
        });

        alert('Location sent successfully');
      } catch (error) {
        console.error('Error sending location:', error);
      }
    }
  };

  return (
    <div className="App">
      <h1>Send Live Location</h1>
      {location && (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          <button onClick={sendLocation}>Send Location</button>
        </div>
      )}
    </div>
  );
}

export default App;
