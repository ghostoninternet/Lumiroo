
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import RoutingMachine from "./RoutingMachine";
import OpenCage from "opencage-api-client"
const apiKey = import.meta.env.REACT_APP_OPENCAGE_API_KEY;

const MapPage = () => {
    const [startPoint, setStartPoint] = useState("Đại học Bách Khoa Hà Nội");
  const [endPoint, setEndPoint] = useState("Đại Học Hà Nội");
  const [startCoords, setStartCoords] = useState([21.0056, 105.8435]); // Tọa độ mặc định
  const [endCoords, setEndCoords] = useState([20.9808, 105.7960]); // Tọa độ mặc định

  const geocodeAddress = async (address, setCoords) => {
    try {
      const geocoder = new OpenCage({ apiKey }); // Thay bằng API key
      const response = await geocoder.geocode({ q: address });
      if (response && response.results.length > 0) {
        const { lat, lng } = response.results[0].geometry;
        setCoords([lat, lng]); // Cập nhật tọa độ
      } else {
        alert("Không thể tìm thấy địa chỉ!");
      }
    } catch (error) {
      console.error("Geocoding error:", error);
    }
  };

  const handleFindRoute = async () => {
    await geocodeAddress(startPoint, setStartCoords);
    await geocodeAddress(endPoint, setEndCoords);
  };

  const MapWithRouting = () => {
    const map = useMap();
    return <RoutingMachine map={map} start={startCoords} end={endCoords} />;
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-lg p-6 mt-16">
        <h2 className="text-xl font-bold mb-4">経路検索</h2>
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">出発地</label>
          <input
            type="text"
            value={startPoint}
            onChange={(e) => setStartPoint(e.target.value)}
            placeholder="例: Đại học Bách Khoa Hà Nội"
            className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-300"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">目的地</label>
          <input
            type="text"
            value={endPoint}
            onChange={(e) => setEndPoint(e.target.value)}
            placeholder="例: Đại Học Hà Nội"
            className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-300"
          />
        </div>
        <button
          onClick={handleFindRoute}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
        >
          見つける
        </button>
      </div>

      {/* Map */}
      <div className="flex-1 mt-16">
        <MapContainer center={startCoords} zoom={13} className="h-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapWithRouting />
        </MapContainer>
      </div>
    </div>
  );
};

export default MapPage;


