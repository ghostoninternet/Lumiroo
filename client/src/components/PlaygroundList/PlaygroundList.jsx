import React, { useState } from 'react';
import Breadcrumb from '../components/PlaygroundList/Breadcrumb';
import ResultsGrid from '../components/PlaygroundList/ResultsGrid';
import Pagination from '../components/PlaygroundList/Pagination';

const PlaygroundList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // Tổng số trang
  const results = Array.from({ length: 12 }, (_, i) => ({
    name: `Playground ${i + 1}`,
    address: `Address ${i + 1}`,
    price: `$${i * 10}`,
    image: 'https://via.placeholder.com/150',
  }));

  return (
    <div className="p-4">
      <Breadcrumb path={['Home', 'Playgrounds']} />
      <ResultsGrid
        results={results.slice((currentPage - 1) * 6, currentPage * 6)}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default PlaygroundList;
