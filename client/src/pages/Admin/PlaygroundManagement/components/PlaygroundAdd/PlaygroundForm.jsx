import { motion } from "framer-motion";
import { MapPin, Clock, CreditCard, FileText } from "lucide-react";
import ImageUpload from "./ImageUpload";
import AttractionSelect from "./AttractionSelect";

function PlaygroundForm({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  allAttractions,
  checkedAttractions,
  setCheckedAttractions,
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg border-2 border-green-500/20 overflow-hidden">
      <div className="p-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Playground Name */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="w-5 h-5 text-green-600" />
                <label className="text-sm font-bold text-green-600">名前</label>
              </div>
              <input
                type="text"
                value={formData?.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 
         rounded-xl outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500
         hover:border-green-400 transition-all duration-200 text-sm"
                placeholder="遊び場の名前を入力"
              />
            </div>

            {/* Image Upload */}
            <ImageUpload
              image={formData?.imageUrl}
              onChange={(image) =>
                setFormData({ ...formData, imageUrl: image })
              }
            />
          </div>

          {/* Right Column */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Business Hours */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-5 h-5 text-green-600" />
                <label className="text-sm font-bold text-green-600">
                  営業時間
                </label>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="time"
                  value={formData?.openingTime}
                  onChange={(e) =>
                    setFormData({ ...formData, openingTime: e.target.value })
                  }
                  className="flex-1 px-4 py-3 bg-white border-2 border-gray-200 
                         rounded-xl focus:ring-0 focus:border-green-500 outline-none
                         hover:border-green-400 transition-all duration-200 text-sm"
                />
                <span className="text-gray-400">→</span>
                <input
                  type="time"
                  value={formData?.closingTime}
                  onChange={(e) =>
                    setFormData({ ...formData, closingTime: e.target.value })
                  }
                  className="flex-1 px-4 py-3 bg-white border-2 border-gray-200 
                         rounded-xl focus:ring-0 focus:border-green-500 outline-none
                         hover:border-green-400 transition-all duration-200 text-sm"
                />
              </div>
            </div>

            {/* Ticket Price */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <CreditCard className="w-5 h-5 text-green-600" />
                <label className="text-sm font-bold text-green-600">
                  チケット料金
                </label>
              </div>
              <input
                type="text"
                value={formData?.admissionFee}
                onChange={(e) =>
                  setFormData({ ...formData, admissionFee: e.target.value })
                }
                placeholder=""
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 
         rounded-xl outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500
         hover:border-green-400 transition-all duration-200 text-sm"
              />
            </div>

            {/* Attractions */}
            <AttractionSelect
              attractions={allAttractions}
              checkedAttractions={checkedAttractions}
              setCheckedAttractions={setCheckedAttractions}
            />

            {/* Description */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <FileText className="w-5 h-5 text-green-600" />
                <label className="text-sm font-bold text-green-600">
                  詳細情報
                </label>
              </div>
              <textarea
                value={formData?.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 
         rounded-xl outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500
         hover:border-green-400 transition-all duration-200 text-sm"
                placeholder="遊び場の詳細情報を入力"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div
        className="px-6 py-4 bg-gradient-to-br from-gray-50 to-gray-100/80 
                   border-t-2 border-green-500/20 flex justify-end space-x-3"
      >
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={onCancel}
          className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white 
                   border-2 border-gray-300 rounded-xl hover:bg-gray-50 
                   transition-colors shadow-sm"
        >
          キャンセル
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={onSubmit}
          className="px-6 py-2.5 text-sm font-medium text-white 
                   bg-gradient-to-r from-green-600 to-green-500
                   hover:from-green-500 hover:to-green-400 
                   rounded-xl shadow-sm hover:shadow transition-all duration-200"
        >
          完了
        </motion.button>
      </div>
    </div>
  );
}

export default PlaygroundForm;
