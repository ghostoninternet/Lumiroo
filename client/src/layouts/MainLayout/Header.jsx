import React from 'react';
import { Link } from 'react-router-dom';

function Header({ role }) {
  return (
    <header className="flex justify-between items-center p-4 bg-white border-b border-gray-300">
      {/* Logo */}  
      <div className="text-xl font-bold">Lumiroo</div>

      {/* Navigation Links */}
      {role !== 'admin' && (
        <nav className="flex gap-16 ml-auto mr-8">
          <Link to="/" className="text-black text-base no-underline">ホームページ</Link>
          <Link to="/search" className="text-black text-base no-underline">遊び/編集検索</Link>
          <Link to="/favorites" className="text-black text-base no-underline">お気に入りの遊び場</Link>
        </nav>
      )}

      {/* Profile Section */}
      <div className="flex items-center gap-2 overflow-hidden">
        <img
          src="https://avatars.dicebear.com/api/bottts/johndoe.svg"
          alt="User Avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="text-base">User</span>
      </div>
    </header>
  );
}

export default Header;
