import FavoriteCard from "./FavoriteCard";
import Pagination from "../../components/PlaygroundList/Pagination";

const FavoriteResults = ({
  favorites,
  onRemove,
  currentPage,
  setCurrentPage,
  limitPerPage,
  totalPage,
}) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {favorites.map((favorite) => (
          <FavoriteCard
            key={favorite._id}
            favorite={favorite}
            onRemove={onRemove}
          />
        ))}
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">お気に入りの遊び場はありません</p>
        </div>
      ) : (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limitPerPage={limitPerPage}
          totalPage={totalPage}
        />
      )}
    </div>
  );
};

export default FavoriteResults;
