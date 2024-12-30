import { motion } from "framer-motion";
import { Upload, Camera, X } from "lucide-react";
import { uploadImage } from "../../../../../apis/upload";
import { ClipLoader } from "react-spinners";
import { useState } from "react";

function ImageDisplay({ image, onChange, isEditing }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onloadend = async () => {
        const formData = new FormData();

        formData.append("image", e.target.files[0]);

        const response = await uploadImage(formData);
        const imageUrl = response.data?.data;
        onChange(imageUrl);
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (e) {
      console.error("Error uploading image:", e);
      setIsLoading(false);
    }
  };

  const handleRemoveImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onChange(null);
  };

  if (!isEditing && !image) {
    return (
      <div className="w-full aspect-video bg-gray-100 rounded-xl flex items-center justify-center">
        <p className="text-sm text-gray-500">画像なし</p>
      </div>
    );
  }

  if (!isEditing) {
    return (
      <div className="w-full aspect-video rounded-xl overflow-hidden">
        <img
          src={typeof image === "string" ? image : URL.createObjectURL(image)}
          alt="Playground"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2 mb-2">
        <Camera className="w-5 h-5 text-green-600" />
        <label className="text-sm font-bold text-green-600">画像</label>
      </div>

      <motion.div
        whileHover={{ scale: 1.01 }}
        className="relative w-full aspect-video bg-gray-50 rounded-xl border-2 border-dashed 
                 border-gray-300 hover:border-green-500 transition-colors cursor-pointer 
                 overflow-hidden group"
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-20">
            <ClipLoader color="#22C55E" size={40} />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />

        {!image ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <Upload className="w-8 h-8 text-gray-400 mb-2 group-hover:text-green-500 transition-colors" />
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600 group-hover:text-green-600 transition-colors">
                クリックして画像をアップロード
              </p>
              <p className="text-xs text-gray-500 mt-1">
                または、ここにドラッグ＆ドロップ
              </p>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full">
            <img
              src={
                typeof image === "string" ? image : URL.createObjectURL(image)
              }
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 p-2 bg-white rounded-lg shadow-md 
                       hover:shadow-lg transition-all duration-200 group z-20"
            >
              <X className="w-4 h-4 text-gray-500 group-hover:text-red-500 transition-colors" />
            </motion.button>
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
          </div>
        )}
      </motion.div>
      <p className="text-xs text-gray-500 mt-1">推奨: JPG, PNG形式 (最大5MB)</p>
    </div>
  );
}

export default ImageDisplay;
