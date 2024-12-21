// pages/Admin/AttractionManagement/index.jsx
import React, { useState } from 'react';
import AttractionHeader from './components/AttractionHeader';
import SearchBar from './components/SearchBar';
import AttractionTable from './components/AttractionTable';
import AttractionForm from './components/AttractionForm';
import Pagination from '../../../components/PlaygroundList/Pagination';

const AttractionManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedAttraction, setSelectedAttraction] = useState(null);

  // Mock data để kiểm tra giao diện
  const mockAttractions = [
    {
      id: 1,
      name: 'ジェットコースター',
      description: '高さ50mから落下する絶叫マシン。スリル満点の体験をお楽しみください。'
    },
    {
      id: 2,
      name: 'メリーゴーランド',
      description: '優雅に回転する伝統的な遊具。小さなお子様にも安心してお楽しみいただけます。'
    }
  ];

  const handleOpenForm = (attraction = null) => {
    setSelectedAttraction(attraction);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedAttraction(null);
  };

  const handleEdit = (attraction) => {
    handleOpenForm(attraction);
  };

  return (
    <div className="min-h-screen p-6 bg-green-50/30">
      <div className="max-w-[1400px] mx-auto space-y-6">
        <AttractionHeader onAddNew={() => handleOpenForm()} />
        
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
          <SearchBar 
            searchQuery={searchQuery} 
            onSearchChange={setSearchQuery} 
            placeholder="アトラクション名で検索"
          />
          
          <AttractionTable 
            attractions={mockAttractions}
            onEdit={handleEdit}
          />
          
          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <p className="text-sm text-green-600">
              表示: {mockAttractions.length} 件
            </p>
            <Pagination
              currentPage={currentPage}
              totalPages={5}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>

      {isFormOpen && (
        <AttractionForm
          attraction={selectedAttraction}
          onClose={handleCloseForm}
          onSubmit={(data) => {
            console.log('Form submitted:', data);
            handleCloseForm();
          }}
        />
      )}
    </div>
  );
};

export default AttractionManagement;