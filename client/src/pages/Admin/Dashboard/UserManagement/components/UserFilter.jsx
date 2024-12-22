import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Phone, User, ChevronDown, ChevronRight } from 'lucide-react';
import {getAreas} from "../../../../../apis/playground"



const DropdownPortal = ({ children, isOpen, targetRef }) => {
 const [portalNode] = useState(() => document.createElement('div'));
 useEffect(() => {
   if (isOpen) {
     document.body.appendChild(portalNode);
     return () => {
       document.body.removeChild(portalNode);
     };
   }
 }, [isOpen, portalNode]);

 if (!isOpen || !targetRef.current) return null;

 const { left, top, width } = targetRef.current.getBoundingClientRect();

 return createPortal(
   <div
     style={{
       position: 'fixed',
       left: `${left}px`,
       top: `${top + targetRef.current.offsetHeight + 8}px`,
       width: `${width}px`,
       zIndex: 20,
     }}
   >
     {children}
   </div>,
   portalNode
 );
};

const UserFilter = ({setFilter,setIsFiltering,isFiltering}) => {
 const [formData, setFormData] = useState({
   name: '',
   phone: '',
   minAge: '',
   maxAge: '',
 });

 const [areas,setAreas] = useState([
   { id: 1, name: "すべての地域" },
 ]);
 
 const [selectedArea, setSelectedArea] = useState(areas[0]);
 const [showAreaDropdown, setShowAreaDropdown] = useState(false);
 const dropdownRef = useRef(null);
 const itemRefs = useRef([]);

 const onSearch = async () => {
    const searchParams = {
      name: formData.name,
      phone: formData.phone,
      minAge: formData.minAge,
      maxAge: formData.maxAge,
      area: selectedArea.name,
    };
    setFilter(searchParams);
    setIsFiltering(true);
    console.log(areas);
  };
  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await getAreas();
        const data = response.data.map(area => ({
          id: area._id,
          name: area.name,
        }));
        setAreas(
         [ { id: 1, name: "すべての地域" },
          ...data]
        );
        
      } catch (error) {
        console.error(error);
      }
    };
    fetchAreas();
  }, []);


 useEffect(() => {
   const handleClickOutside = (event) => {
     if (dropdownRef.current && !dropdownRef.current.contains(event.target)&&
      !itemRefs.current.some((ref) => ref && ref.contains(event.target))) {
       setShowAreaDropdown(false);
     }
   };

   if (showAreaDropdown) {
     document.addEventListener('mousedown', handleClickOutside);
   }

   return () => {
     document.removeEventListener('mousedown', handleClickOutside);
   };
 }, [showAreaDropdown]);

 
 useEffect(() => {
   if (showAreaDropdown) {
     const handleScroll = () => setShowAreaDropdown(false);
     window.addEventListener('scroll', handleScroll, true);
     return () => window.removeEventListener('scroll', handleScroll, true);
   }
 }, [showAreaDropdown]);

 return (
  
   <motion.div
     initial={{ opacity: 0, y: -10 }}
     animate={{ opacity: 1, y: 0 }}
     className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg overflow-hidden border-2 border-green-500/20"
   >
     <div className="p-6 space-y-6">
       {/* First Row */}
       <div className="grid grid-cols-2 gap-6">
         {/* Name Input */}
         <motion.div 
           className="space-y-2"
           whileHover={{ scale: 1.01 }}
           transition={{ type: "spring", stiffness: 300 }}
         >
           <div className="flex items-center space-x-2 mb-3">
             <Search className="w-5 h-5 text-green-600" />
             <label className="text-sm font-bold text-green-600">
               名前
             </label>
           </div>
           <div className="relative group">
             <input
               type="text"
               placeholder="名前を入力"
               value={formData.name}
               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
               className="w-full pl-4 pr-4 py-3 bg-white border-2 border-gray-200 
                        rounded-xl focus:ring-0 focus:border-green-500
                        hover:border-green-400 transition-all duration-200 text-sm
                        shadow-sm hover:shadow-md outline-none"
             />
           </div>
         </motion.div>

         {/* Area Dropdown */}
         <motion.div 
           className="space-y-2"
           whileHover={{ scale: 1.01 }}
           transition={{ type: "spring", stiffness: 300 }}
         >
           <div className="flex items-center space-x-2 mb-3">
             <MapPin className="w-5 h-5 text-green-600" />
             <label className="text-sm font-bold text-green-600">
               地域
             </label>
           </div>
           <div className="relative" ref={dropdownRef}>
             <button
               onClick={() => setShowAreaDropdown(!showAreaDropdown)}
               className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl
                        text-left hover:border-green-400 focus:ring-0 focus:border-green-500
                        transition-all duration-200 text-sm shadow-sm hover:shadow-md outline-none"
             >
               <div className="flex items-center justify-between">
                 <span className="text-gray-700">{selectedArea.name}</span>
                 <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 
                   ${showAreaDropdown ? 'rotate-180' : ''}`} />
               </div>
             </button>
            
             <DropdownPortal isOpen={showAreaDropdown} targetRef={dropdownRef}>
             
               <motion.div
                 initial={{ opacity: 0, y: -10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 className="bg-white border-2 border-gray-200 rounded-xl shadow-xl 
                           max-h-60 overflow-y-auto"
               >
                 {areas.map((area,index) => (
                   <motion.button
                     key={area.id}
                     ref={(el) => (itemRefs.current[index] = el)}  // Thêm ref cho mỗi item
                     onClick={(e) => {
                       setSelectedArea(area);
                       setShowAreaDropdown(false);
                     }}
                     whileHover={{ backgroundColor: 'rgb(240, 253, 244)' }}
                     style={{ pointerEvents: 'auto' }}
                     className={`z-50 w-full px-4 py-3 text-sm text-left transition-colors
                       ${area.id === selectedArea.id 
                         ? 'bg-green-100 text-green-600 font-bold' 
                         : 'text-gray-700 hover:text-green-600'}`}
                   >
                     {area.name}
                   </motion.button>
                 ))}
               </motion.div>
             </DropdownPortal>
           </div>
         </motion.div>
       </div>

       {/* Second Row */}
       <div className="grid grid-cols-2 gap-6">
         {/* Phone Number */}
         <motion.div 
           className="space-y-2"
           whileHover={{ scale: 1.01 }}
           transition={{ type: "spring", stiffness: 300 }}
         >
           <div className="flex items-center space-x-2 mb-3">
             <Phone className="w-5 h-5 text-green-600" />
             <label className="text-sm font-bold text-green-600">
               電話番号
             </label>
           </div>
           <div className="relative group">
             <input
               type="tel"
               placeholder="電話番号を入力"
               value={formData.phone}
               onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
               className="w-full px-4 py-3 bg-white border-2 border-gray-200 
                       rounded-xl focus:ring-0 focus:border-green-500
                       hover:border-green-400 transition-all duration-200 text-sm
                       shadow-sm hover:shadow-md outline-none"
             />
           </div>
         </motion.div>

         {/* Age Range */}
         <motion.div 
           className="space-y-2"
           whileHover={{ scale: 1.01 }}
           transition={{ type: "spring", stiffness: 300 }}
         >
           <div className="flex items-center space-x-2 mb-3">
             <User className="w-5 h-5 text-green-600" />
             <label className="text-sm font-bold text-green-600">
               年齢
             </label>
           </div>
           <div className="flex items-center space-x-3">
             <div className="relative group flex-1">
               <input
                 type="number"
                 placeholder="最小年齢"
                 value={formData.minAge}
                 onChange={(e) => setFormData({ ...formData, minAge: e.target.value })}
                 className="w-full px-4 py-3 bg-white border-2 border-gray-200 
                         rounded-xl focus:ring-0 focus:border-green-500
                         hover:border-green-400 transition-all duration-200 text-sm
                         shadow-sm hover:shadow-md outline-none"
               />
             </div>
             <ChevronRight className="w-5 h-5 text-gray-400" />
             <div className="relative group flex-1">
               <input
                 type="number"
                 placeholder="最大年齢"
                 value={formData.maxAge}
                 onChange={(e) => setFormData({ ...formData, maxAge: e.target.value })}
                 className="w-full px-4 py-3 bg-white border-2 border-gray-200 
                         rounded-xl focus:ring-0 focus:border-green-500
                         hover:border-green-400 transition-all duration-200 text-sm
                         shadow-sm hover:shadow-md outline-none"
               />
             </div>
           </div>
         </motion.div>
       </div>
     </div>

     {/* Search Button */}
     <div className="px-6 py-4 bg-gradient-to-br from-gray-50 to-gray-100 border-t border-green-500/20">
       <div className="flex justify-end gap-4">
         <motion.button
           whileHover={{ scale: 1.02, y: -1 }}
           whileTap={{ scale: 0.98 }}
           className="px-5 py-3 bg-gradient-to-r from-red-500 to-red-400 
                     font-bold rounded-xl text-sm
                    shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-400
                    transition-all duration-200"
            onClick={() => {setIsFiltering(false)
                            setFormData({
                              name: '',
                              phone: '',
                              minAge: '',
                              maxAge: '',
                            });
                            setSelectedArea(areas[0]);
            }}
         >
            リセット
         </motion.button>
         <motion.button
           whileHover={{ scale: 1.02, y: -1 }}
           whileTap={{ scale: 0.98 }}
           className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-500 
                    text-white font-bold rounded-xl text-sm
                    shadow-lg hover:shadow-xl hover:from-green-500 hover:to-green-400
                    transition-all duration-200"
            onClick={onSearch}
         >
           検索
         </motion.button>
       </div>
     </div>
   </motion.div>
 );
};

export default UserFilter;