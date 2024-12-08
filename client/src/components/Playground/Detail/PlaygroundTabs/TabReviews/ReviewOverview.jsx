// ReviewOverview.jsx
import React from "react";
import { Star } from "lucide-react";
import calculateRatings from "../../../../../utils/ratings";
import { useEffect } from "react";

const ReviewOverview = ({reviews}) => {
  const totalStars = 5; // Tổng số sao
  const [averageRating, setAverageRating] = React.useState(0);
  const [fullStars, setFullStars] = React.useState(0);
  const [halfStar, setHalfStar] = React.useState(0);
  const [emptyStars, setEmptyStars] = React.useState(0);
  const [totalReviews, setTotalReviews] = React.useState(0);
  const [ratings, setRatings] = React.useState([]);
  
  useEffect(() => {
    const ratings = calculateRatings(reviews).reverse();
    console.log(ratings);
    setRatings(ratings);
    const totalReviews = reviews.length;
    setTotalReviews(totalReviews);
    const averageRating = (ratings.reduce((acc, { stars, count }) => acc + stars * count, 0) / totalReviews).toFixed(1);
    setAverageRating(averageRating);
    const fullStars = Math.floor(averageRating); // Số sao đầy đủ
    setFullStars(fullStars);
    const halfStar = averageRating % 1 >= 0.5 ? 1 : 0; // Kiểm tra nửa sao
    setHalfStar(halfStar);
    const emptyStars = totalStars - fullStars - halfStar; // Số sao rỗng
    setEmptyStars(emptyStars);
    console.log(averageRating, fullStars, halfStar, emptyStars );
  }, [reviews]);
  return (
    <div className="p-6 bg-green-50/50 rounded-xl hover:shadow-md transition-shadow">
      <div className="grid grid-cols-12 gap-6">
        {/* Overall Rating */}
        <div className="col-span-4 flex flex-col items-center justify-center border-r border-green-100 py-4">
          <div className="text-4xl font-bold text-green-600 mb-2">{averageRating}</div>
          <div className="flex items-center justify-center gap-1">
          {[...Array(totalStars)].map((_, index) => {
          if (index < fullStars) {
            // Hiển thị sao đầy đủ
            return (
              <Star
                key={index}
                size={20}
                className="fill-yellow-400 text-yellow-400"
              />
            );
          } else if (index === fullStars && halfStar > 0) {
            // Hiển thị sao nửa
            return (
              <Star
                key={index}
                size={20}
                className="fill-yellow-400 text-yellow-400"
                style={{ clipPath: 'inset(0 50% 0 0)' }} // Hiển thị nửa sao
              />
            );
          } else {
            // Hiển thị sao rỗng
            return (
              <Star
                key={index}
                size={20}
                className="fill-gray-400 text-gray-400"
              />
            );
          }
        })}
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