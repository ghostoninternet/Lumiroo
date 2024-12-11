import React, { useState } from "react";
import { Star, Send } from "lucide-react";
import {postReview} from "../../../../../apis/playground"

const ReviewForm = ({playgroundId,onReviewSubmit}) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [content, setContent] = useState("");

  const starLabels = {
    1: "非常に不満",
    2: "不満",
    3: "普通",
    4: "満足",
    5: "非常に満足"
  };

  const handleSubmit = async () => {
    if (!rating) {
      alert("評価を選択してください。");
      return;
    }
    if (!content.trim()) {
      alert("レビュー内容を入力してください。");
      return;
    }
    console.log({ rating, content });
    const reviewData = { rating, content };
    const result = await postReview(playgroundId, reviewData);
    if (result) {
      setRating(0);
      setContent("");
      // Refresh reviews
      onReviewSubmit();
    }
    // Handle submission logic here
  };

  return (
    <div className="mt-8 bg-green-50/50 rounded-xl border border-green-100 overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-6 text-gray-900">レビューを書く</h3>
        
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-3 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className="group relative"
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(star)}
              >
                <Star
                  className={`w-10 h-10 transition-all duration-300 ${
                    star <= (hoveredRating || rating)
                      ? "fill-yellow-400 text-yellow-400 scale-110"
                      : "text-gray-300 hover:scale-110"
                  }`}
                />
                <span className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm
                  whitespace-nowrap px-3 py-1 rounded-full bg-gray-800 text-white
                  transition-all duration-300
                  ${star === hoveredRating ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
                  {starLabels[star]}
                </span>
              </button>
            ))}
          </div>
          <span className="text-green-600 font-medium mt-4">
            {rating ? starLabels[rating] : "評価を選択してください"}
          </span>
        </div>

        <div className="relative mb-6">
          <textarea
            className="w-full min-h-[150px] p-4 border border-green-100 rounded-xl resize-none
              focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent
              transition-all bg-white"
            placeholder="体験を共有してください..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <span className="absolute bottom-4 right-4 text-sm text-gray-400">
            {content.length}/1000
          </span>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!rating || !content.trim()}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700
              transition-colors flex items-center gap-2 disabled:opacity-50
              disabled:cursor-not-allowed font-medium"
          >
            <Send className="w-4 h-4" />
            レビューを投稿
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;