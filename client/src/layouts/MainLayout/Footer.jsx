import React from "react";

const Footer = () => {
  return (
    <footer className="bg-green-100 border-t border-gray-300 py-6">
    <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-gray-600">
      {/* Left Section */}
      <div className="text-center sm:text-left">
        <p className="text-sm">&copy; 2024 Lumiroo. All Rights Reserved.</p>
        <p className="text-sm">楽しい遊び場を探しましょう！</p>
      </div>

      {/* Center Section: Links */}
      <div className="flex space-x-6 mt-4 sm:mt-0">
        <a
          href="/terms"
          className="text-sm text-gray-500 hover:text-gray-800"
        >
          利用規約
        </a>
        <a
          href="/privacy"
          className="text-sm text-gray-500 hover:text-gray-800"
        >
          プライバシーポリシー
        </a>
        <a
          href="/contact"
          className="text-sm text-gray-500 hover:text-gray-800"
        >
          お問い合わせ
        </a>
      </div>

      {/* Right Section: Social Icons */}
      <div className="flex space-x-4 mt-4 sm:mt-0">
        <a
          href="https://facebook.com"
          className="text-gray-500 hover:text-blue-600"
        >
          <i className="fab fa-facebook-f"></i>
        </a>
        <a
          href="https://twitter.com"
          className="text-gray-500 hover:text-blue-400"
        >
          <i className="fab fa-twitter"></i>
        </a>
        <a
          href="https://instagram.com"
          className="text-gray-500 hover:text-pink-500"
        >
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
