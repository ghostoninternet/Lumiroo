// src/pages/Favorite/FavoriteCard.jsx
import { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import defaultImage from '../../assets/park.jpg';
import DeleteConfirmation from './DeleteConfirmation';

const FavoriteCard = ({ favorite, onRemove }) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleRemoveClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    onRemove(favorite.id);
    setShowDeleteConfirmation(false);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
        <div className="relative">
          <img
            src={favorite.imageUrl || defaultImage}
            alt={favorite.name}
            className="w-full h-48 object-cover"
          />
          <button
            onClick={handleRemoveClick}
            className="absolute top-3 right-3 bg-white/80 p-2 rounded-full text-red-500 hover:text-red-600 hover:bg-white transition-colors"
          >
            <FaHeart className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900 hover:text-green-600 transition-colors">
            {favorite.name}
          </h2>
          <p className="mt-2 text-sm text-gray-600">{favorite.address}</p>
          <p className="mt-2 text-sm font-medium text-green-600">
            ¥{parseInt(favorite.price).toLocaleString()}
          </p>
        </div>
      </div>

      <DeleteConfirmation
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={handleConfirmDelete}
        playgroundName={favorite.name}
      />
    </>
  );
};

export default FavoriteCard;