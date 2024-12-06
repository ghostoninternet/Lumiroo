import { FaHeart } from 'react-icons/fa';
import { MdPlace, MdAttachMoney } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import defaultImage from '../../assets/park.jpg';

const FavoriteCard = ({ favorite, onRemove }) => {
  const { id, name, address, price, imageUrl } = favorite;
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    if (!e.target.closest('button')) {
      navigate(`/playground/${id}`);
    }
  };

  return (
    <div
      className="w-full border rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105 hover:border-green-600 bg-white cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={imageUrl || defaultImage}
          alt={name}
          className="w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
        />
        <button
          onClick={() => onRemove(id)}
          className="absolute top-3 right-3 bg-white p-2 rounded-full text-red-500 hover:text-red-600 transition-colors"
        >
          <FaHeart className="w-5 h-5" />
        </button>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-green-600">
          {name}
        </h2>
        <p className="mt-2 text-sm text-gray-600 flex items-center">
          <MdPlace className="text-green-500 mr-2" />
          {address}
        </p>
        <p className="mt-2 text-sm font-medium text-green-600 flex items-center">
          <MdAttachMoney className="text-green-500 mr-2" />
          ¥{parseInt(price).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default FavoriteCard;