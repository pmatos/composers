import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

type LocationData = {
  id: number;
  location: {
    lat: number;
    lng: number;
  };
  content: {
    text: string;
    imageUrl: string;
    link: string;
  };
};

const MapComponent = () => {
  const [data, setData] = useState<LocationData[]>([]);

  // Fetch JSON data
  useEffect(() => {
    fetch('data.json')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setData(data);
        } else {
          console.error('Invalid data format in data.json');
        }
      })
      .catch((error) => {
        console.error('Error fetching data.json:', error);
      });
  });

  return (
    <MapContainer center={[51.505, -0.09]} zoom={2} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {data.map((item) => (
        <Marker key={item.id} position={[item.location.lat, item.location.lng]}>
          <Popup>
            <h2>{item.content.text}</h2>
            <img src={item.content.imageUrl} alt="" style={{ width: '200px' }}/>
            <p>
              <a href={item.content.link}>Learn more</a>
            </p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(<MapComponent />);
