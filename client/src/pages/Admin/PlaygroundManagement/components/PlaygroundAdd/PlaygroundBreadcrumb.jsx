import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

function PlaygroundBreadcrumb() {
  return (
    <nav className="mb-6">
      <ol className="flex items-center space-x-2">
        <li>
          <Link to="/admin" className="text-gray-500 hover:text-green-600 transition-colors">
            <Home className="w-4 h-4" />
          </Link>
        </li>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <li>
          <Link 
            to="/admin/playgrounds" 
            className="text-gray-500 hover:text-green-600 transition-colors"
          >
            遊び場管理
          </Link>
        </li>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <li>
          <span className="text-green-600 font-medium">遊び場追加</span>
        </li>
      </ol>
    </nav>
  );
}

export default PlaygroundBreadcrumb;