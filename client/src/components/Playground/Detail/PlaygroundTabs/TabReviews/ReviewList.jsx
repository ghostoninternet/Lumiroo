import React from "react";
import { Star, ThumbsUp, MessageSquare, Flag } from "lucide-react";

const ReviewList = () => {
 const reviews = [
   {
     id: 1,
     userName: "田中 太郎",  
     avatar: "TT",
     rating: 5,
     timeAgo: "2日前",
     content: "とても素晴らしい遊び場でした。子供たちがとても楽しんでいました。スタッフの対応も丁寧で、施設も清潔でよく管理されています。特に教育的な要素と遊びを組み合わせたアクティビティが印象的でした。",
     likes: 24,
     replies: 3,
     images: ["/api/placeholder/400/300", "/api/placeholder/400/300"]
   },
   {
     id: 2, 
     userName: "鈴木 花子",
     avatar: "SH",
     rating: 4,
     timeAgo: "1週間前", 
     content: "施設は近代的で、楽しい遊び場が多くあります。料金は少し高めですが、体験する価値は十分にあります。",
     likes: 15,
     replies: 1,
   }
 ];

 return (
   <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
     {reviews.map((review) => (
       <div
         key={review.id}
         className="p-6 bg-green-50/30 rounded-xl hover:shadow-lg transition-all duration-300 border border-green-100/50"
       >
         <div className="flex items-start gap-4">
           <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-medium text-lg flex-shrink-0">
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

             {review.images && (
               <div className="flex gap-2 mb-4">
                 {review.images.map((image, idx) => (
                   <div key={idx} className="relative group">
                     <div className="w-24 h-24 rounded-lg overflow-hidden">
                       <img
                         src={image}
                         alt={`レビュー画像 ${idx + 1}`}
                         className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                       />
                     </div>
                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                   </div>
                 ))}
               </div>
             )}

             <div className="flex items-center gap-6 pt-3 border-t border-green-100">
               <button className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition-colors">
                 <ThumbsUp className="w-4 h-4" />
                 <span className="text-sm">{review.likes} 役に立った</span>
               </button>
               <button className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition-colors">
                 <MessageSquare className="w-4 h-4" />
                 <span className="text-sm">{review.replies} 返信</span>
               </button>
               <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors ml-auto">
                 <Flag className="w-4 h-4" />
                 <span className="text-sm">報告する</span>
               </button>
             </div>
           </div>
         </div>
       </div>
     ))}
   </div>
 );
};

export default ReviewList;