import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="relative max-w-xl mx-auto">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <FaSearch className="h-5 w-5 text-green-500 transition duration-300 ease-in-out transform group-hover:rotate-12 group-hover:text-green-600" />
      </div>
      <input
        type="text"
        placeholder="場所を検索"
        className="block w-full pl-12 pr-4 py-3 text-base text-gray-900 placeholder-gray-500 transition duration-300 ease-in-out bg-white border border-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 focus:border-transparent"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
        <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default SearchBar;