import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const MapHeader = ({ playgroundName }) => {
  const navigate = useNavigate();

  const breadcrumbItems = [
    { label: 'ホームページ', path: '/' },
    { label: '遊び場検索', path: '/playground-recommendation' },
    { label: playgroundName, path: '/playground-detail' },
    { label: '道順', path: null }
  ];

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="py-3 flex items-center gap-2 text-sm">
          {breadcrumbItems.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
              )}
              {item.path ? (
                <button
                  onClick={() => navigate(item.path)}
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  {item.label}
                </button>
              ) : (
                <span className="text-green-600">{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapHeader;