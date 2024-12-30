import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, CreditCard, FileText, Sparkles } from "lucide-react";
import ImageDisplay from "./ImageDisplay";
import AttractionSelect from "./AttractionSelect";
import convertTimeToString from "../../../../../utils/convertTimeToString";
import convertStringToTime from "../../../../../utils/convertStringToTime";
import { getAttractions } from "../../../../../apis/playground";

function PlaygroundInfo({ data, isEditing, onSave, onCancel }) {
  const [editedData, setEditedData] = useState({ ...data });
  const [allAttractions, setAllAttractions] = useState([]);
  const [checkedAttractions, setCheckedAttractions] = useState({});

  useEffect(() => {
    const selectedAttractions = Object.keys(checkedAttractions)?.filter(
      (id) => checkedAttractions[id]
    );
    setEditedData((prev) => ({ ...prev, attractions: selectedAttractions }));
  }, [checkedAttractions]);

  useEffect(() => {
    if (data) {
      setEditedData({ ...data });
    }
  }, [data]);

  const fetchAllAttractions = async () => {
    try {
      const { data } = await getAttractions();
      setAllAttractions(data);
    } catch (e) {
      console.log("error fetch api getAttractions", e);
    }
  };

  useEffect(() => {
    fetchAllAttractions();
  }, []);

  useEffect(() => {
    // Initialize checked state based on attractions prop
    const initialChecked = {};
    allAttractions.forEach((attr) => {
      initialChecked[attr._id] =
        data?.attractions?.some((a) => a._id === attr._id) || false;
    });
    setCheckedAttractions(initialChecked);
  }, [allAttractions, data?.attractions]);

  const handleSubmit = async () => {
    try {
      await onSave(data?._id, editedData);
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

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
              {isEditing ? (
                <input
                  type="text"
                  value={editedData?.name}
                  onChange={(e) =>
                    setEditedData({ ...editedData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 
                         rounded-xl outline-none focus:ring-2 focus:ring-green-500/20 
                         focus:border-green-500 hover:border-green-400 
                         transition-all duration-200 text-sm"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-xl text-sm text-gray-900">
                  {data?.name}
                </div>
              )}
            </div>

            {/* Image Section */}
            <ImageDisplay
              image={isEditing ? editedData?.imageUrl : data?.imageUrl}
              onChange={
                isEditing
                  ? (img) => setEditedData({ ...editedData, imageUrl: img })
                  : undefined
              }
              isEditing={isEditing}
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
                {isEditing ? (
                  <>
                    <input
                      type="time"
                      value={convertTimeToString(editedData?.openingTime)}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          openingTime: convertStringToTime(e.target.value),
                        })
                      }
                      className="flex-1 px-4 py-3 bg-white border-2 border-gray-200 
                             rounded-xl outline-none focus:ring-2 focus:ring-green-500/20 
                             focus:border-green-500 hover:border-green-400 
                             transition-all duration-200 text-sm"
                    />
                    <span className="text-gray-400">→</span>
                    <input
                      type="time"
                      value={convertTimeToString(editedData?.closingTime)}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          closingTime: convertStringToTime(e.target.value),
                        })
                      }
                      className="flex-1 px-4 py-3 bg-white border-2 border-gray-200 
                             rounded-xl outline-none focus:ring-2 focus:ring-green-500/20 
                             focus:border-green-500 hover:border-green-400 
                             transition-all duration-200 text-sm"
                    />
                  </>
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-sm text-gray-900 w-full">
                    {convertTimeToString(data?.openingTime)} →{" "}
                    {convertTimeToString(data?.closingTime)}
                  </div>
                )}
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
              {isEditing ? (
                <input
                  type="text"
                  value={editedData?.admissionFee}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      admissionFee: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 
                         rounded-xl outline-none focus:ring-2 focus:ring-green-500/20 
                         focus:border-green-500 hover:border-green-400 
                         transition-all duration-200 text-sm"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-xl text-sm text-gray-900">
                  {data?.admissionFee}
                </div>
              )}
            </div>

            {/* Attractions */}
            {isEditing ? (
              <AttractionSelect
                attractions={editedData?.attractions}
                setEditedData={setEditedData}
                allAttractions={allAttractions}
                checkedAttractions={checkedAttractions}
                setCheckedAttractions={setCheckedAttractions}
              />
            ) : (
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Sparkles className="w-5 h-5 text-green-600" />
                  <label className="text-sm font-bold text-green-600">
                    アトラクション
                  </label>
                </div>
                <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl">
                  {data?.attractions?.map((attraction, index) => (
                    <div key={index} className="text-sm text-gray-900">
                      {attraction?.name}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <FileText className="w-5 h-5 text-green-600" />
                <label className="text-sm font-bold text-green-600">
                  詳細情報
                </label>
              </div>
              {isEditing ? (
                <textarea
                  value={editedData?.description}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      description: e.target.value,
                    })
                  }
                  rows={4}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 
                         rounded-xl outline-none focus:ring-2 focus:ring-green-500/20 
                         focus:border-green-500 hover:border-green-400 
                         transition-all duration-200 text-sm"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-xl text-sm text-gray-900 whitespace-pre-wrap">
                  {data?.description}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
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
            onClick={handleSubmit}
            className="px-6 py-2.5 text-sm font-medium text-white 
                    bg-gradient-to-r from-green-600 to-green-500
                    hover:from-green-500 hover:to-green-400 
                    rounded-xl shadow-sm hover:shadow transition-all duration-200"
          >
            保存
          </motion.button>
        </div>
      )}
    </div>
  );
}

export default PlaygroundInfo;
