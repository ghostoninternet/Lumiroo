import React, { useState } from "react";
import parkImage from "../../../assets/park.jpg";
import { Maximize2, ChevronLeft, ChevronRight } from "lucide-react";

const PlaygroundImage = ({imageUrl}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock multiple images
  const images = [
    imageUrl,parkImage,
    "/api/placeholder/400/300",
    "/api/placeholder/400/300",
  ];

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="col-span-7">
      <div className="relative group">
        <div className={`${
          isFullscreen 
            ? "fixed inset-0 z-50 bg-black flex items-center justify-center"
            : "aspect-4/3 rounded-xl overflow-hidden"
        }`}>
          <img
            src={images[currentImageIndex]}
            alt="遊び場"
            className={`w-full h-full object-cover transition-transform duration-500 ${
              !isFullscreen && "group-hover:scale-105"
            }`}
          />
        </div>

        {/* Image Controls */}
        <div className={`absolute inset-0 flex items-center justify-between p-4 ${
          isFullscreen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        } transition-opacity`}>
          <button
            onClick={handlePrevImage}
            className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNextImage}
            className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Fullscreen Toggle */}
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className={`absolute top-4 right-4 p-2 rounded-full 
            ${isFullscreen ? "bg-white text-black" : "bg-black/50 text-white"}
            ${!isFullscreen && "opacity-0 group-hover:opacity-100"}
            hover:bg-opacity-70 transition-all`}
        >
          <Maximize2 className="w-5 h-5" />
        </button>

        {/* Image Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                currentImageIndex === index
                  ? "bg-white w-4"
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaygroundImage;