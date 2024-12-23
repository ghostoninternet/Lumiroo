import { useState, useEffect } from "react";
import FavoriteResults from "./FavoriteResults";
import SearchBar from "./SearchBar";
import { getFavorites, removeFromFavorites } from "../../apis/playground";

const FavoritePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage] = useState(6);
  const [totalPage, setTotalPage] = useState(1);

  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    const response = await getFavorites();
    setFavorites(response.data.data);
    setTotalPage(response.data.pagination.totalPage);
  };

  useEffect(() => {
    fetchFavorites();
  }, [currentPage]);

  const handleRemoveFavorite = async (id) => {
    await removeFromFavorites(id);
    fetchFavorites(); // Refresh list after removal
  };

  const filteredFavorites = favorites.filter((favorite) =>
    favorite.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCurrentPageFavorites = () => {
    const startIndex = (currentPage - 1) * limitPerPage;
    const endIndex = startIndex + limitPerPage;
    return filteredFavorites.slice(startIndex, endIndex);
  };

  return (
    <div className="min-h-screen pt-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-left text-[#16a34a] mb-4">
            お気に入りの遊び場
          </h1>
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
