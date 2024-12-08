import React, { useState } from "react";
import { Star } from "lucide-react";
import { useEffect } from "react";

const ReviewFilters = ({reviews,setFilteredReviews}) => {
  const [selectedFilter, setSelectedFilter] = useState("すべて"); // Trạng thái cho filter

  useEffect(() => {
    if (selectedFilter === "すべて") {
      setFilteredReviews(reviews); // Nếu chọn "すべて", hiển thị tất cả các reviews
    } else {
      setFilteredReviews(
        reviews.filter(review => review.rating === parseInt(selectedFilter))
      ); 
    }
  }, [selectedFilter, reviews]); 
  const filters = [
    { value: "すべて", label: "すべて" },
    { value: "1", label: "1つ星" },
    { value: "2", label: "2つ星" },
    { value: "3", label: "3つ星" },
    { value: "4", label: "4つ星" },
    { value: "5", label: "5つ星" }
  ];

  return (
    <div className="bg-green-50 border border-green-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-end gap-2">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setSelectedFilter(filter.value)}
            className={`relative px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 overflow-hidden
              ${filter.value === selectedFilter
                ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg scale-105"
                : "bg-white text-gray-600 hover:bg-green-50 hover:text-green-600 hover:scale-105"
              }
              before:absolute before:inset-0 before:bg-white before:opacity-0 hover:before:opacity-20 
              before:transition-opacity before:duration-300
              border border-transparent hover:border-green-200`}
          >
            {filter.value !== "すべて" && (
              <div className="flex items-center gap-0.5">
                <Star 
                  className={`w-4 h-4 transition-transform duration-300 ${
                    filter.value === selectedFilter 
                      ? "fill-white scale-110" 
                      : "fill-gray-400"
                  }`}
                />
              </div>
            )}
            <span className="text-sm font-medium relative z-10">{filter.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReviewFilters;