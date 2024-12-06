import React, { useState } from "react";
import { Star, ThumbsUp } from "lucide-react";
import Pagination from "../../../../PlaygroundList/Pagination";

const ReviewList = () => {
  const [helpfulReviews, setHelpfulReviews] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  const initialReviews = [
    {
      id: 1,
      userName: "田中 太郎",
      avatar: "TT",
      rating: 5,
      timeAgo: "2日前",
      content: "とても素晴らしい遊び場でした。子供たちがとても楽しんでいました。スタッフの対応も丁寧で、施設も清潔でよく管理されています。特に教育的な要素と遊びを組み合わせたアクティビティが印象的でした。",
      helpfulCount: 24
    },
    {
      id: 2,
      userName: "鈴木 花子",
      avatar: "SH",
      rating: 4,
      timeAgo: "1週間前",
      content: "施設は近代的で、楽しい遊び場が多くあります。料金は少し高めですが、体験する価値は十分にあります。スタッフの方々も親切で安心して子供を遊ばせることができました。",
      helpfulCount: 15
    },
    {
      id: 3,
      userName: "佐藤 健",
      avatar: "SK",
      rating: 5,
      timeAgo: "2週間前",
      content: "子供が大喜びでした。特に新しく導入された遊具が素晴らしく、安全面にも配慮が行き届いています。休憩スペースも充実していて、長時間の滞在でも快適に過ごせました。",
      helpfulCount: 32
    },
    {
      id: 4,
      userName: "山田 美咲",
      avatar: "YM",
      rating: 4,
      timeAgo: "3週間前",
      content: "定期的に利用していますが、毎回清潔に保たれていて好印象です。季節ごとのイベントも楽しく、子供の成長に良い影響を与えてくれています。",
      helpfulCount: 18
    }
  ];

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
  const currentReviews = initialReviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(initialReviews.length / reviewsPerPage);

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
                {review.avatar}
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