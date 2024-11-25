import React, { useState } from "react";
import Breadcrumb from "../../components/PlaygroundList/Breadcrumb";
import ResultsGrid from "../../components/PlaygroundList/ResultsGrid";
import Pagination from "../../components/PlaygroundList/Pagination";

const PlaygroundResults = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 6; // Giữ nguyên hiển thị 6 card (3x2)

  const results = Array.from({ length: 20 }, (_, i) => ({
    name: `遊び場 ${i + 1}`,
    address: `住所 ${i + 1}`,
    price: `¥${(i + 1) * 1000}`,
    image: "/src/assets/park.jpg",
  }));

  const totalPages = Math.ceil(results.length / resultsPerPage);

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col">
      {/* Breadcrumb */}
      <Breadcrumb path={["ホーム", "遊び場リスト"]} />

      {/* Nội dung chính */}
      <div className="flex-grow bg-white p-6 rounded-lg shadow-md flex flex-col">
        <h2 className="text-xl font-bold text-green-600 mb-4">
          おすすめの遊び場
        </h2>

        {/* Hiển thị danh sách kết quả */}
        <ResultsGrid
          results={results.slice(
            (currentPage - 1) * resultsPerPage,
            currentPage * resultsPerPage
          )}
        />

        {/* Phân trang */}
        <div className="mt-6 mb-12">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default PlaygroundResults;
