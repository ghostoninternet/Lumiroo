import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxPageToShow = 7; // Số lượng trang tối đa hiển thị
  let startPage = Math.max(1, currentPage - Math.floor(maxPageToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPageToShow - 1);

  // Điều chỉnh nếu không đủ trang để hiển thị đủ maxPageToShow
  if (endPage - startPage < maxPageToShow - 1) {
    startPage = Math.max(1, endPage - maxPageToShow + 1);
  }

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="flex justify-center items-center mt-6">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-4 py-2 mx-1 border rounded-lg text-gray-500 bg-white hover:bg-green-600 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaArrowLeft />
      </button>

      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-4 py-2 mx-1 border rounded-lg bg-white text-gray-600 hover:bg-green-600 hover:text-white"
          >
            1
          </button>
          {startPage > 2 && <span className="px-2 text-gray-500">...</span>}
        </>
      )}

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

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-2 text-gray-500">...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-4 py-2 mx-1 border rounded-lg bg-white text-gray-600 hover:bg-green-600 hover:text-white"
          >
            {totalPages}
          </button>
        </>
      )}

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
