// Footer.jsx
import React from 'react';

const Footer = () => {
 return (
   <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 flex justify-center">
     <div className="ml-auto w-8 h-8 object-cover">
       <svg
         xmlns="http://www.w3.org/2000/svg"
         fill="none"
         viewBox="0 0 24 24" 
         stroke="currentColor"
         className="w-6 h-6"
       >
         <path
           strokeLinecap="round"
           strokeLinejoin="round"
           strokeWidth="2"
           d="M6 18c0 1.105-.895 2-2 2s-2-.895-2-2 2-2 2-2 2 .895 2 2zm10 0c0 1.105-.895 2-2 2s-2-.895-2-2 2-2 2-2 2 .895 2 2zM12 2l2.003 2.007a2.015 2.015 0 0 1 1.417-.65c.535-.001.912-.429.996-.852a.833.833 0 0 1 .996-.143c.564.561.458 1.512.124 1.846-1.167 1.095-2.898 1.29-4.344 1.005-1.446-.284-2.34-.952-2.88-1.615-1.08-1.151-1.206-2.779-.414-4.029C7.73 1.226 10.434 0 12 0c1.242 0 2.485.342 3.524.992 1.016.628 1.843 1.537 2.278 2.647A4.991 4.991 0 0 1 12 2z"
         />
       </svg>
     </div>
   </div>
 );
};

export default Footer;
