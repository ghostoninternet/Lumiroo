import React, { useState } from "react";
import { Star, ThumbsUp } from "lucide-react";
import Pagination from "../../../../PlaygroundList/Pagination";
import { useEffect } from "react";
import {getReviews} from "../../../../../apis/playground"
import formatReviewData from "../../../../../utils/formattedReviewsData";

const ReviewList = ({reviews}) => {
  const [helpfulReviews, setHelpfulReviews] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;
  console.log(reviews);
  const handleHelpfulClick = (reviewId) => {
    setHelpfulReviews(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  };

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        {currentReviews.map((review) => (
          <div
            key={review.id}
            className="p-6 bg-green-50/30 rounded-xl border border-green-100/50 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-medium text-lg">
                {/* set avatar từ link ảnh? */}
                <img
                      src={review.avatar}
                      className="w-12 h-12 rounded-full border-4 border-white shadow-lg object-cover"
                    />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{review.userName}</h4>
                  <span className="text-sm text-gray-500">{review.timeAgo}</span>
                </div>

                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      size={16}
                      className={`${
                        idx < review.rating 
                          ? "fill-yellow-400 text-yellow-400" 
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-gray-700 leading-relaxed mb-4">
                  {review.content}
                </p>

                <div className="flex items-center pt-3 border-t border-green-100">
                  <button 
                    onClick={() => handleHelpfulClick(review.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                      ${helpfulReviews.has(review.id)
                        ? "text-green-600 bg-green-50"
                        : "text-gray-500 hover:text-green-600 hover:bg-green-50"
                      }`}
                  >
                    <ThumbsUp className={`w-4 h-4 ${
                      helpfulReviews.has(review.id) ? "fill-current" : ""
                    }`} />
                    <span className="text-sm">
                      役に立った ({review.helpfulCount + (helpfulReviews.has(review.id) ? 1 : 0)})
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default ReviewList;