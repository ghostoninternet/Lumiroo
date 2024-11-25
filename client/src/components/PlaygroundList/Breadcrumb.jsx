import React from 'react';

const Breadcrumb = ({ path }) => {
  return (
    <nav className="text-sm text-gray-500 mb-4">
      {path.map((item, index) => (
        <span key={index}>
          {item}
          {index < path.length - 1 && <span className="mx-1">/</span>}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
