import { useState, useEffect } from 'react';
import FavoriteResults from './FavoriteResults';
import SearchBar from './SearchBar';

const FavoritePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage] = useState(6);
  const [totalPage, setTotalPage] = useState(1);
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: "田中印刷株式会社",
      address: "24146 Đông Vỹ Grove, ハティン, ベトナム",
      price: "220000"
    },
    {
      id: 2,
      name: "林建設合資会社",
      address: "71967 Nguyễn Centers, ハナム, ベトナム",
      price: "105000"
    }
  ]);

  const handleRemoveFavorite = (id) => {
    setFavorites(favorites.filter(favorite => favorite.id !== id));
  };

  const filteredFavorites = favorites.filter(favorite =>
    favorite.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setTotalPage(Math.ceil(filteredFavorites.length / limitPerPage));
  }, [filteredFavorites.length, limitPerPage]);

  const getCurrentPageFavorites = () => {
    const startIndex = (currentPage - 1) * limitPerPage;
    const endIndex = startIndex + limitPerPage;
    return filteredFavorites.slice(startIndex, endIndex);
  };

  return (
    <div className="min-h-screen pt-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-left text-[#16a34a] mb-4">お気に入りの遊び場</h1>
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
        <FavoriteResults
          favorites={getCurrentPageFavorites()}
          onRemove={handleRemoveFavorite}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limitPerPage={limitPerPage}
          totalPage={totalPage}
        />
      </div>
    </div>
  );
};

export default FavoritePage;