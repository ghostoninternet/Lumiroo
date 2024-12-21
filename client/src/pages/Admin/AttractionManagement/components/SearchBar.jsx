// components/SearchBar.jsx
import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchQuery, onSearchChange, placeholder }) => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-green-500" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-4 py-3 text-sm text-gray-900 
                   bg-gray-50 border border-gray-200 rounded-2xl
                   focus:ring-2 focus:ring-green-500 focus:border-transparent
                   outline-none transition-all shadow-sm"
      />
    </div>
  );
};

export default SearchBar;