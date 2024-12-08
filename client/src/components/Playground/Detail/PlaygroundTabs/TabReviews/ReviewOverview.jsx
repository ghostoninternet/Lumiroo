// ReviewOverview.jsx
import React from "react";
import { Star } from "lucide-react";
import calculateRatings from "../../../../../utils/ratings";
import { useEffect } from "react";



const ReviewOverview = ({reviews,init_rating}) => {
  const totalStars = 5; // Tổng số sao
  const [averageRating, setAverageRating] = React.useState(init_rating);
  const [totalReviews, setTotalReviews] = React.useState(0);
  const [ratings, setRatings] = React.useState([]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const partialStar = rating - fullStars;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star
            key={i}
            className="w-8 h-8 fill-yellow-400 text-yellow-400"
          />
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
          <Star
            key={i}
            className="w-8 h-8 fill-gray-200 text-gray-200"
          />
        );
      }
    }
    return stars;
  };
  
  useEffect(() => {
    const ratings = calculateRatings(reviews).reverse();
    console.log(ratings);
    setRatings(ratings);
    const totalReviews = reviews.length;
    setTotalReviews(totalReviews);
    if (totalReviews === 0) {
      setAverageRating(0);
      return;
    }
    const averageRating = (ratings.reduce((acc, { stars, count }) => acc + stars * count, 0) / totalReviews).toFixed(1);
    setAverageRating(averageRating);
 
  }, [reviews]);
  return (
    <div className="p-6 bg-green-50/50 rounded-xl hover:shadow-md transition-shadow">
      <div className="grid grid-cols-12 gap-6">
        {/* Overall Rating */}
        <div className="col-span-4 flex flex-col items-center justify-center border-r border-green-100 py-4">
          <div className="text-4xl font-bold text-green-600 mb-2">{averageRating}</div>
          <div className="flex items-center justify-center gap-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center">
              {renderStars(averageRating|| 4.8)}
            </div>
          </div>
          </div>
          <p className="text-gray-600 text-center text-sm whitespace-nowrap">
            {totalReviews} 件のレビューに基づく
          </p>
        </div>

        {/* Rating Breakdown */}
        <div className="col-span-8">
          <div className="space-y-3">
            {ratings.map(({ stars, count, percentage }) => (
              <div key={stars} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-28">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      className={`${
                        index < stars
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-600 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-24 text-right whitespace-nowrap">
                  {count}件のレビュー
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewOverview;