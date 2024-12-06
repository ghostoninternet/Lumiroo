import React, { useState } from "react";
import { Star } from "lucide-react";

const ReviewFilters = () => {
 const [selectedRating, setSelectedRating] = useState(null);
 const [selectedFilter, setSelectedFilter] = useState("すべて");

 const filters = [
   "すべて",
   "1つ星",
   "2つ星", 
   "3つ星",
   "4つ星",
   "5つ星"
 ];

 return (
   <div className="p-4 bg-green-50/50 rounded-xl hover:shadow-md transition-all">
     <div className="flex items-center justify-between">
       {/* Star Rating Buttons */}
       <div className="flex gap-2">
         {[1, 2, 3, 4, 5].map((rating) => (
           <button
             key={rating}
             onClick={() => setSelectedRating(rating === selectedRating ? null : rating)}
             className={`w-12 h-12 rounded-xl flex items-center justify-center gap-1 transition-all
               ${rating === selectedRating
                 ? "bg-green-600 text-white border-2 border-green-600"
                 : "border-2 border-gray-200 text-gray-600 hover:border-green-600 hover:text-green-600 hover:bg-green-50"
               }`}
           >
             {rating}
             <Star 
               className={`w-4 h-4 ${
                 rating === selectedRating ? "fill-white" : "group-hover:fill-current"
               }`}
             />
           </button>
         ))}
       </div>

       {/* Filter Buttons */}
       <div className="flex gap-2">
         {filters.map((filter) => (
           <button
             key={filter}
             onClick={() => setSelectedFilter(filter)}
             className={`px-4 py-2 rounded-lg transition-all text-sm
               ${filter === selectedFilter
                 ? "bg-green-600 text-white"
                 : "text-gray-600 hover:bg-green-50 hover:text-green-600"
               }`}
           >
             {filter}
           </button>
         ))}
       </div>
     </div>
   </div>
 );
};

export default ReviewFilters;