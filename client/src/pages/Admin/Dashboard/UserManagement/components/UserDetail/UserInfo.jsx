import { m, motion } from 'framer-motion';
import { User, MapPin, Calendar, Activity, UserCheck } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown } from 'lucide-react';
import { updateUser } from '../../../../../../apis/admin';




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





function UserInfo({ data }) {

  const [roles] = useState([
    { id: 1, name: "admin"},
    { id: 2, name: "user" },
   ]);

   const [status] = useState([
    { id: 1, name: "アクティブ" },
    { id: 2, name: "無効" },
   ]);
  
   const [selectedRole, setSelectedRole] = useState('');
   
   const [showRoleDropdown, setShowRoleDropdown] = useState(false);
   const dropdownRef = useRef(null);
   const itemRefs = useRef([]);

   const [selectedStatus, setSelectedStatus] = useState('');
   const [showStatusDropdown, setShowStatusDropdown] = useState(false);
   const dropdownRef_stt = useRef(null);
   const itemRefs_stt = useRef([]);



   //role
   useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)&&
       !itemRefs.current.some((ref) => ref && ref.contains(event.target))) {
        setShowRoleDropdown(false);
      }
    };
 
    if (showRoleDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
 
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showRoleDropdown]);
 
  
  useEffect(() => {
    if (showRoleDropdown) {
      const handleScroll = () => setShowRoleDropdown(false);
      window.addEventListener('scroll', handleScroll, true);
      return () => window.removeEventListener('scroll', handleScroll, true);
    }
  }, [showRoleDropdown]);




  //status
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef_stt.current && !dropdownRef_stt.current.contains(event.target)&&
       !itemRefs_stt.current.some((ref) => ref && ref.contains(event.target))) {
        setShowStatusDropdown(false);
      }
    };
 
    if (showStatusDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
 
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showStatusDropdown]);
 
  
  useEffect(() => {
    if (showStatusDropdown) {
      const handleScroll = () => setShowStatusDropdown(false);
      window.addEventListener('scroll', handleScroll, true);
      return () => window.removeEventListener('scroll', handleScroll, true);
    }
  }, [showStatusDropdown]);


  const handleUpdate = async () => {
    const result = await updateUser(data.userId, {role: selectedRole, status: selectedStatus});
    console.log(result.data.message);
  }

  useEffect(() => {
    setSelectedRole(data.role);
    setSelectedStatus(data.status);
  }, [data.role, data.status]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl shadow-lg border-2 border-green-500/20 overflow-visible relative"
    >
      {/* User Avatar Section */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-green-100">
        <div className="flex items-center space-x-6">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-24 h-24 rounded-full overflow-hidden shadow-lg border-4 border-white"
          >
            <img 
              src={data?.avatar} 
              alt="User Avatar" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div>
            <h2 className="text-2xl font-bold text-green-600 mb-1">{data?.name}</h2>
            <p className="text-sm text-gray-600">{data?.email}</p>
          </div>
        </div>
      </div>

      {/* User Details */}
      <div className="p-6 space-y-6">
        {/* Address */}
        <motion.div 
          className="space-y-2"
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-green-600" />
            <label className="text-sm font-bold text-green-600">住所</label>
          </div>
          <div className="px-4 py-3 bg-gray-50 rounded-xl text-sm text-gray-900 shadow-sm hover:bg-gray-100 transition-colors">
            {data?.address}
          </div>
        </motion.div>

        {/* Birth Date */}
        <motion.div 
          className="space-y-2"
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-green-600" />
            <label className="text-sm font-bold text-green-600">生年月日</label>
          </div>
          <div className="px-4 py-3 bg-gray-50 rounded-xl text-sm text-gray-900 shadow-sm hover:bg-gray-100 transition-colors">
            {data?.birthDate}
          </div>
        </motion.div>

         {/* Status */}
          <motion.div 
           className="space-y-2"
           whileHover={{ scale: 1.01 }}
           transition={{ type: "spring", stiffness: 300 }}
         >
         <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-green-600" />
            <label className="text-sm font-bold text-green-600">ステータス</label>
          </div>
           <div className="relative" ref={dropdownRef_stt}>
             <button
               onClick={() => setShowStatusDropdown(!showStatusDropdown)}
               className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl
                        text-left hover:border-green-400 focus:ring-0 focus:border-green-500
                        transition-all duration-200 text-sm shadow-sm hover:shadow-md outline-none"
             >
               <div className="flex items-center justify-between">
                 <span className="text-gray-700">{selectedStatus}</span>
                 <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 
                   ${showStatusDropdown ? 'rotate-180' : ''}`} />
               </div>
             </button>
            
             <DropdownPortal isOpen={showStatusDropdown} targetRef={dropdownRef_stt}>
             
               <motion.div
                 initial={{ opacity: 0, y: -10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 className="bg-white border-2 border-gray-200 rounded-xl shadow-xl 
                           max-h-60 overflow-y-auto"
               >
                 {status.map((it,index) => {
                
                  return (
                    <motion.button
                      key={it.id}
                      ref={(el) => (itemRefs_stt.current[index] = el)}  // Thêm ref cho mỗi item
                      onClick={(e) => {
                        setSelectedStatus(it.name);
                        setShowStatusDropdown(false);
                      }}
                      whileHover={{ backgroundColor: 'rgb(240, 253, 244)' }}
                      style={{ pointerEvents: 'auto' }}
                      className={`z-50 w-full px-4 py-3 text-sm text-left transition-colors
                        ${it.name === selectedStatus
                          ? 'bg-green-100 text-green-600 font-bold' 
                          : 'text-gray-700 hover:text-green-600'}`}
                    >
                      {it.name}
                    </motion.button>
                  )
                 })}
               </motion.div>
             </DropdownPortal>
           </div>
         </motion.div>

        {/* Role */}
                 <motion.div 
           className="space-y-2"
           whileHover={{ scale: 1.01 }}
           transition={{ type: "spring", stiffness: 300 }}
         >
           <div className="flex items-center space-x-2">
            <UserCheck className="w-5 h-5 text-green-600" />
            <label className="text-sm font-bold text-green-600">役割</label>
          </div>
           <div className="relative" ref={dropdownRef}>
             <button
               onClick={() => setShowRoleDropdown(!showRoleDropdown)}
               className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl
                        text-left hover:border-green-400 focus:ring-0 focus:border-green-500
                        transition-all duration-200 text-sm shadow-sm hover:shadow-md outline-none"
             >
               <div className="flex items-center justify-between">
                 <span className="text-gray-700">{selectedRole
                  }</span>
                 <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 
                   ${showRoleDropdown ? 'rotate-180' : ''}`} />
               </div>
             </button>
            
             <DropdownPortal isOpen={showRoleDropdown} targetRef={dropdownRef}>
             
               <motion.div
                 initial={{ opacity: 0, y: -10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 className="bg-white border-2 border-gray-200 rounded-xl shadow-xl 
                           max-h-60 overflow-y-auto"
               >
                 {roles.map((role,index) => {
                
                  return (
                    <motion.button
                      key={role.id}
                      ref={(el) => (itemRefs.current[index] = el)}  // Thêm ref cho mỗi item
                      onClick={(e) => {
                        setSelectedRole(role.name);
                        setShowRoleDropdown(false);
                      }}
                      whileHover={{ backgroundColor: 'rgb(240, 253, 244)' }}
                      style={{ pointerEvents: 'auto' }}
                      className={`z-50 w-full px-4 py-3 text-sm text-left transition-colors
                        ${role.name === selectedRole
                          ? 'bg-green-100 text-green-600 font-bold' 
                          : 'text-gray-700 hover:text-green-600'}`}
                    >
                      {role.name}
                    </motion.button>
                  )
                 })}
               </motion.div>
             </DropdownPortal>
           </div>
         </motion.div>
       
        {/* Role */}
       
      </div>

      {/* Action Buttons */}
      <div className="px-6 py-4 bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200">
        <div className="flex justify-end space-x-3">
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: '#f3f4f6' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.history.back()}
            className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white 
                    border-2 border-gray-300 rounded-xl hover:bg-gray-50 
                    transition-colors shadow-sm"
          >
            戻る
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleUpdate}
            className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-500 
                    text-white font-bold rounded-xl text-sm border-2 border-green-500
                    shadow-lg hover:shadow-xl hover:from-green-500 hover:to-green-400
                    transition-all duration-200"
          >
            完了
          </motion.button>
        </div>
      </div>
      
    </motion.div>
  );
}

export default UserInfo;