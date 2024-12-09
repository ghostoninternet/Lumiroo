import React from "react";
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
    <div
      className="p-4 bg-gray-50/80 flex flex-col"
      style={{ height: "calc(100vh - 130px)" }} // Đồng bộ chiều cao
    >
          {/* Nội dung chính */}
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-col flex-grow">
        <h2 className="text-xl font-bold text-green-600 mb-4">
          おすすめの遊び場
        </h2>

        {/* Hiển thị danh sách kết quả */}
        <div className="flex-grow">
          <ResultsGrid results={playgrounds} />
        </div>

        {/* Phân trang */}
        <div className="mt-4">
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
