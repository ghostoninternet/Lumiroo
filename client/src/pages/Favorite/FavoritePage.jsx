import React, { useState } from "react";

const favorites = [
  { id: 1, name: "遊び場A", location: "東京", price: "無料" },
  { id: 2, name: "遊び場B", location: "大阪", price: "500円" },
  // 他のダミーデータを追加
];

const FavoritePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFavorites, setFilteredFavorites] = useState(favorites);

  // お気に入りリストを削除する関数
  const removeFavorite = (id) => {
    setFilteredFavorites(filteredFavorites.filter((item) => item.id !== id));
  };

  // 検索機能
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredFavorites(
      favorites.filter((item) =>
        item.name.toLowerCase().includes(query)
      )
    );
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">
      {/* ヘッダー */}
      <header className="text-center text-2xl font-bold mb-6">お気に入りの遊び場</header>

      {/* 検索バー */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="🔍 search"
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-300"
        />
      </div>

      {/* お気に入りリスト */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredFavorites.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 shadow-md rounded-md flex flex-col items-center"
          >
            <div className="w-full h-32 bg-gray-300 mb-2"></div>
            <div className="text-center">
              <p className="font-bold">名前: {item.name}</p>
              <p>場所: {item.location}</p>
              <p>価格: {item.price}</p>
            </div>
            <button
              onClick={() => removeFavorite(item.id)}
              className="mt-2 text-red-600 hover:text-red-800"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>

      {/* ページネーション */}
      <div className="mt-6 flex justify-center space-x-2">
        <button className="p-2 border rounded-md">≪ 初め</button>
        <button className="p-2 border rounded-md">＜ 前に</button>
        <button className="p-2 border rounded-md">1</button>
        <button className="p-2 border rounded-md bg-gray-300">2</button>
        <button className="p-2 border rounded-md">3</button>
        <button className="p-2 border rounded-md">次 ＞</button>
        <button className="p-2 border rounded-md">最後 ≫</button>
      </div>
    </div>
  );
};

export default FavoritePage;
