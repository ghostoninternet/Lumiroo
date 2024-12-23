import React, { useEffect, useState } from "react";
import { Heart, MapPin, Star, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  addToFavorites,
  removeFromFavorites,
  getFavorites,
} from "../../../apis/playground";
const PlaygroundInfo = ({ data }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const checkFavorite = async () => {
    const response = await getFavorites();
    const favorites = response.data.data;
    let isLiked = false;
    if (!data.id) return;
    if (data.id) {
      isLiked = favorites.some((favorite) => favorite._id === data.id);
    }
    setIsFavorite(isLiked);
  };

  useEffect(() => {
    checkFavorite();
  }, [data.id]);

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return "text-green-600";
    if (rating >= 4.0) return "text-blue-600";
    if (rating >= 3.0) return "text-yellow-600";
    if (rating >= 2.0) return "text-orange-600";
    return "text-red-600";
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const partialStar = rating - fullStars;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-8 h-8 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && partialStar > 0) {
        stars.push(
          <div key={i} className="relative">
            <Star className="w-8 h-8 fill-gray-200 text-gray-200" />
            <div
              className="absolute top-0 left-0 overflow-hidden"
              style={{ width: `${partialStar * 100}%` }}
            >
              <Star className="w-8 h-8 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <Star key={i} className="w-8 h-8 fill-gray-200 text-gray-200" />
        );
      }
    }
    return stars;
  };

  const handleRouteClick = () => {
    navigate("/map", {
      state: {
        address: data.address,
        playgroundName: data.name,
        playgroundId: data.id,
      },
    });
  };

  const toggleFavouritePlayground = () => {
    if (!isFavorite) {
      setIsFavorite(true);
      addToFavorites(data.id);
      return;
    }
    setIsFavorite(false);
    removeFromFavorites(data.id);
  };

  return (
    <div className="col-span-5">
      <div className="flex flex-col justify-between h-full">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {data.name || "ディズニーランド"}
          </h1>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center">
              {renderStars(data.rating || 4.8)}
            </div>
            <span
              className={`text-2xl font-bold ${getRatingColor(
                data.rating || 4.8
              )} ml-2`}
            >
              {data.rating || 4.8}
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">所在地</p>
                <p className="text-gray-900">{data.address}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">入場料</p>
                <p className="text-gray-900">{data.price}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={() => toggleFavouritePlayground()}
            className={`flex-1 h-12 rounded-lg font-medium transition-all duration-300 
              flex items-center justify-center gap-2 
              ${
                isFavorite
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-white border-2 border-gray-200 hover:border-green-600 text-gray-700 hover:text-green-600"
              }`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
            {isFavorite ? "お気に入り追加済み" : "お気に入りに追加"}
          </button>

          <button
            onClick={handleRouteClick}
            className="h-12 px-8 bg-green-600 text-white rounded-lg font-medium
              hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <MapPin className="w-5 h-5" />
            道順
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaygroundInfo;
