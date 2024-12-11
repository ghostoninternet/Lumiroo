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
import {getReviews,getPlaygroundDetails} from "../../apis/playground";
import formatReviewData from "../../utils/formattedReviewsData";
import formattedPlaygroundData from "../../utils/playgrounDataforDetail";
import { ClipLoader } from 'react-spinners';

const PlaygroundDetail = () => {
  const [activeTab, setActiveTab] = useState("details");
  const [selectedRating, setSelectedRating] = useState(null);
  const [isLoading,setIsLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState(reviews); // Trạng thái cho reviews đã lọc
  const [playgroundData, setPlaygroundData] = useState({});
  const { id } = useParams();
  console.log(id);
  
  const fetchReviews = async () => {
    setIsLoading(true)
    console.log("Fetching reviews...");
    const result = await getReviews(id);
    if (result) {
      const reviewsRaw = result.data;
      setReviews(formatReviewData(reviewsRaw)); 
    }
    setIsLoading(false)
  };
  const fetchPlayground = async () => {
    console.log("Fetching playground...");
    const result = await getPlaygroundDetails(id);   
      if (result) {
        const playgroundRaw = result.data;
        console.log("Playground raw: ", playgroundRaw);
        setPlaygroundData(formattedPlaygroundData(playgroundRaw));
      }
  };
  const fetchAll = () =>{
    
    fetchReviews();
    fetchPlayground();
    
  }
  useEffect(() => {
    fetchAll();
  }, [id]); 
  return (
    <div className="inset-x-0 top-16 bottom-0 bg-green-50/30" style={{ pointerEvents: isLoading ? 'none' : 'auto', opacity: isLoading ? 0.5 : 1 }}>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-50/80 z-50">
          <ClipLoader size={50} color={"#123abc"} loading={isLoading} />
        </div>
      )}
      <div className="h-full overflow-y-auto">
        <PlaygroundHeader />

        <div className="max-w-7xl mx-auto px-6 py-6">
          {/* Main content card */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6 border border-green-100">
            <div className="grid grid-cols-12 gap-8 p-6">
              <PlaygroundImage imageUrl ={playgroundData.image}/>
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
                  reviews={reviews} 
                  init_rating={playgroundData.rating}
                  />
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
                    onReviewSubmit={fetchAll}
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