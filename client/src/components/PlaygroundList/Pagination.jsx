import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center mt-6">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-4 py-2 mx-1 border rounded-lg text-gray-500 bg-white hover:bg-green-600 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaArrowLeft />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 mx-1 border rounded-lg transition ${
            currentPage === page
              ? "bg-green-600 text-white shadow-md"
              : "bg-white text-gray-600 hover:bg-green-600 hover:text-white"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 mx-1 border rounded-lg text-gray-500 bg-white hover:bg-green-600 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
