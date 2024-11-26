import React, { useState } from "react";
import Breadcrumb from "../../components/PlaygroundList/Breadcrumb";
import ResultsGrid from "../../components/PlaygroundList/ResultsGrid";
import Pagination from "../../components/PlaygroundList/Pagination";

const PlaygroundResults = ({
  playgrounds,
  currentPage,
  setCurrentPage,
  limitPerPage,
  setLimitPerPage,
  totalPage,
}) => {
  return (
    <div className="p-5 bg-gray-50 h-full flex flex-col">
      {/* Breadcrumb */}
      <Breadcrumb path={["ホーム", "遊び場リスト"]} />

      {/* Nội dung chính */}
      <div className="flex-grow bg-white p-4 rounded-lg shadow-md flex flex-col">
        <h2 className="text-xl font-bold text-green-600 mb-4">
          おすすめの遊び場
        </h2>

        {/* Hiển thị danh sách kết quả */}
        <ResultsGrid results={playgrounds} />

        {/* Phân trang */}
        <div className="mt-1 mb-12">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default PlaygroundResults;
