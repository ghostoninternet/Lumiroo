import React, { useState } from "react";
import { Heart, MapPin, Star, DollarSign } from "lucide-react";

const PlaygroundInfo = ({ data }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="col-span-5">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        {data.name || "ディズニーランド"}
      </h1>

      <div className="flex items-center gap-2 mb-6">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= data.rating 
                ? "fill-yellow-400 text-yellow-400" 
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
        <span className="text-lg font-medium text-gray-700 ml-2">
          {data.rating || 4.8}
        </span>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-3 text-gray-700">
          <MapPin className="w-5 h-5 text-green-600 flex-shrink-0" />
          <span>{data.address}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-700">
          <DollarSign className="w-5 h-5 text-green-600 flex-shrink-0" />
          <span>入場料: {data.price}</span>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className={`flex-1 h-12 px-6 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
            isFavorite
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-white border-2 border-gray-200 text-gray-700 hover:border-green-600 hover:text-green-600"
          }`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
          {isFavorite ? "お気に入り追加済み" : "お気に入りに追加"}
        </button>
        
        <button 
          onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(data.address)}`, '_blank')}
          className="h-12 px-8 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <MapPin className="w-5 h-5" />
          道順
        </button>
      </div>
    </div>
  );
};

export default PlaygroundInfo;