import React from "react";
import { useState } from "react";
import Slider from "./Slider";
import { useEffect } from "react";
import {
  getPlayground,
} from "../../apis/playground";

const isFake = 1;
const isReal = 0;
const HomePage = () => {
  const categories = [
    { name: "水族館", icon: "🐟" },
    { name: "動物園", icon: "🐘" },
    { name: "ウォーターパーク", icon: "🌊" },
    { name: "博物館", icon: "🏛️" },
    { name: "映画館", icon: "🎥" },

  ];
  const [playgrounds, setPlaygrounds] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limitPerPage = 10;
  const fetchPlaygrounds = async () => {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("limit", limitPerPage);
      queryParams.append("page", currentPage);
      const response = await getPlayground(queryParams);
      const responseData = response.data;
      setPlaygrounds(responseData.data);
      setTotalPage(responseData.pagination.totalPage);
      setCurrentPage(Number.parseInt(responseData.pagination.currentPage));
      console.log(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPlaygrounds()
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen pt-14">
      {/* Header Section */}
      <header className="bg-green-500 text-white py-6 text-center">
        <h1 className="text-3xl font-bold">
          ルミルーがあなたの週末に楽しい時間を提供します！
        </h1>
        <div className="mt-4">
          <input
            type="text"
            placeholder="遊び場を検索"
            className="w-3/4 max-w-md px-4 py-2 rounded-md shadow-md text-gray-700"
          />
        </div>
      </header>

      {/* Categories Section */}
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-xl font-semibold mb-6">人気のある遊び場の種類</h2>
          <div className="grid grid-cols-5 gap-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-gray-50 p-4 rounded-md shadow-md"
              >
                <div className="text-5xl">{category.icon}</div>
                <p className="mt-2 text-lg font-medium">{category.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Slider Section */}
      <section className="bg-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-10">
            <h3 className="text-lg font-bold mb-4">🐟 水族館</h3>
            <Slider 
              playgroundsData={playgrounds}
              is_faker = {isReal}
            />
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">🐘 動物園</h3>
            <Slider
              playgroundsData={playgrounds}
              is_faker = {isFake}
             />
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">🌊 ウォーターパーク</h3>
            <Slider
              playgroundsData={playgrounds}
              is_faker = {isFake}
             />
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">🏛️ 博物館</h3>
            <Slider  
              playgroundsData={playgrounds}
              is_faker = {isFake}
            />
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">🎥 映画館</h3>
            <Slider 
              playgroundsData={playgrounds}
              is_faker = {isFake}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-500 text-white py-4 text-center">
        <p>&copy; 2024 Lumiroo - 楽しい遊び場を探しましょう！</p>
      </footer>
    </div>
  );
};

export default HomePage;
