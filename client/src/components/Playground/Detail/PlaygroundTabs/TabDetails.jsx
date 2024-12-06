import React from "react";
import { BookOpen, Sparkles } from "lucide-react";

const TabDetails = ({ data }) => {
  // Sample attractions data, cần cập nhật dữ liệu thật từ API
  const attractions = [
    "ウォータースライダー",
    "プール",
    "トランポリン",
    "アスレチック",
    "ボールプール",
    "クライミング"
  ];

  return (
    <div className="space-y-8">
      <div className="p-6 bg-green-50/50 rounded-xl hover:shadow-md transition-all">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-6 h-6 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">施設の説明</h3>
        </div>
        <p className="text-gray-700 leading-relaxed">
          当施設は子供たちの想像力と創造性を育む空間として設計された最新の遊び場です。
          安全性を最優先に考え、全ての遊具は定期的な点検を実施しています。
          また、熟練したスタッフが常駐し、お子様が安全に楽しく遊べる環境を提供しています。
          四季折々のイベントも開催しており、一年を通じて新しい発見と思い出作りをお手伝いします。
        </p>
      </div>

      <div className="p-6 bg-green-50/50 rounded-xl hover:shadow-md transition-all">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-6 h-6 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">アトラクション</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {attractions.map((attraction, index) => (
            <div 
              key={index}
              className="flex items-center gap-3 p-4 bg-white rounded-lg border border-green-100 hover:border-green-200 hover:shadow-sm transition-all"
            >
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-gray-700">{attraction}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabDetails;