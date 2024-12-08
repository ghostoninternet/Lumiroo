import React, { useState } from "react";
import PlaygroundHeader from "../../components/Playground/Detail/PlaygroundHeader";
import PlaygroundImage from "../../components/Playground/Detail/PlaygroundImage";
import PlaygroundInfo from "../../components/Playground/Detail/PlaygroundInfo";
import TabDetails from "../../components/Playground/Detail/PlaygroundTabs/TabDetails";
import ReviewOverview from "../../components/Playground/Detail/PlaygroundTabs/TabReviews/ReviewOverview";
import ReviewFilters from "../../components/Playground/Detail/PlaygroundTabs/TabReviews/ReviewFilters";
import ReviewList from "../../components/Playground/Detail/PlaygroundTabs/TabReviews/ReviewList";
import ReviewForm from "../../components/Playground/Detail/PlaygroundTabs/TabReviews/ReviewForm";
import { Square, MessageSquare } from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {getReviews} from "../../apis/playground";
import formatReviewData from "../../utils/formattedReviewsData";

const PlaygroundDetail = () => {
  const [activeTab, setActiveTab] = useState("details");
  const [selectedRating, setSelectedRating] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState(reviews); // Trạng thái cho reviews đã lọc
  const { id } = useParams();
  console.log(id);
  
  const fetchReviews = async () => {
    console.log("Fetching reviews...");
    const result = await getReviews(id);
    if (result) {
      const reviewsRaw = result.data;
      setReviews(formatReviewData(reviewsRaw)); 
      console.error("Failed to fetch reviews");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [id]); 
  const playgroundData = {
    id: id,
    name: "ディズニーランド",
    openTime: "午前8時から午後8時まで",
    address: "24146 Đông Vy Grove, ハティン, ベトナム",
    price: "220,000 VND",
    description: "遊び場の詳細情報がここに表示されます。",
  };

  return (
    <div className="absolute inset-x-0 top-16 bottom-0 bg-green-50/30">
      <div className="h-full overflow-y-auto">
        <PlaygroundHeader />

        <div className="max-w-7xl mx-auto px-6 py-6">
          {/* Main content card */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6 border border-green-100">
            <div className="grid grid-cols-12 gap-8 p-6">
              <PlaygroundImage />
              <PlaygroundInfo data={playgroundData} />
            </div>
          </div>

          {/* Tabs section */}
          <div className="bg-white rounded-xl shadow-sm border border-green-100">
            {/* Tab headers */}
            <div className="border-b border-green-100">
              <div className="flex">
                <button
                  className={`px-8 py-4 font-medium transition-all flex items-center gap-2 relative
                    ${activeTab === "details"
                      ? "text-green-600 bg-green-50"
                      : "text-gray-600 hover:text-gray-800 hover:bg-green-50"
                    }`}
                  onClick={() => setActiveTab("details")}
                >
                  <Square className="w-5 h-5" />
                  詳細情報
                  {activeTab === "details" && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600" />
                  )}
                </button>
                <button
                  className={`px-8 py-4 font-medium transition-all flex items-center gap-2 relative
                    ${activeTab === "reviews"
                      ? "text-green-600 bg-green-50"
                      : "text-gray-600 hover:text-gray-800 hover:bg-green-50"
                    }`}
                  onClick={() => setActiveTab("reviews")}
                >
                  <MessageSquare className="w-5 h-5" />
                  レビュー
                  {activeTab === "reviews" && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Tab content */}
            <div className="p-6">
              {activeTab === "details" ? (
                <TabDetails data={playgroundData} />
              ) : (
                <div className="space-y-8">
                  <ReviewOverview 
                  reviews={reviews} />
                  <ReviewFilters 
                    selectedRating={selectedRating}
                    onRatingChange={setSelectedRating}
                    reviews={reviews}
                    setFilteredReviews={setFilteredReviews}
                  />
                  <ReviewList 
                    reviews={filteredReviews}
                  />
                  <ReviewForm 
                    playgroundId={playgroundData.id}
                    onReviewSubmit={fetchReviews}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaygroundDetail;