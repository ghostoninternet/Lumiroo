// ReviewOverview.jsx
import React from "react";
import { Star } from "lucide-react";

const ReviewOverview = () => {
  const ratings = [
    { stars: 5, count: 235, percentage: 100 },
    { stars: 4, count: 188, percentage: 80 },
    { stars: 3, count: 141, percentage: 60 },
    { stars: 2, count: 94, percentage: 40 },
    { stars: 1, count: 47, percentage: 20 },
  ];

  return (
    <div className="p-6 bg-green-50/50 rounded-xl hover:shadow-md transition-shadow">
      <div className="grid grid-cols-12 gap-8">
        {/* Overall Rating */}
        <div className="col-span-4 flex flex-col items-center justify-center border-r border-green-100 py-4">
          <div className="text-5xl font-bold text-green-600 mb-3">4.8</div>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                size={24}
                className="fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
          <p className="text-gray-600 text-center">
            235件のレビューに基づく
          </p>
        </div>

        {/* Rating Breakdown */}
        <div className="col-span-8">
          <div className="space-y-4">
            {ratings.map(({ stars, count, percentage }) => (
              <div key={stars} className="flex items-center gap-4">
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
                <span className="text-sm text-gray-600 w-24 text-right">
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