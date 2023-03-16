import React, { useState } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import axios from 'axios';

const mapStyles = {
  width: '100%',
  height: '100%'
};

const MapContainer = ({ google }) => {
  const [location, setLocation] = useState('');
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyCJCVbHoAaaa1WTL0vTdiqSOLfWgyXYIho`)
      .then((response) => {
        const { lat, lng } = response.data.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleLocationSubmit}>
        <input type="text" value={location} onChange={handleLocationChange} />
        <button type="submit">Search</button>
      </form>
      
      <p> 
        Latitude: {lat}
      </p>
      <p>
        Longitude: {lng}
      </p>
      {lat && lng && (
        <Map
          google={google}
          zoom={14}
          style={mapStyles}
          initialCenter={{ lat, lng }}
          center={{ lat, lng }}
        >
          <Marker position={{ lat, lng }} />
        </Map>
      )}
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCJCVbHoAaaa1WTL0vTdiqSOLfWgyXYIho'
})(MapContainer);
