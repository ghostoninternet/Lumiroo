import React from 'react';
import {useState, useEffect} from 'react';
import { motion } from 'framer-motion';
import UserFilter from './components/UserFilter';
import UserTable from './components/UserTable';
import { searchUsers ,getUsers , deleteUser} from  "../../../../apis/admin"

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  const limitPerPage = 5;
  const [isFiltering, setIsFiltering] = useState(false);
  const [filter, setFilter] = useState(
    {
      name: '',
      phone: '',
      minAge: null,
      maxAge: null,
      area: '',
    
    }
  );
  
  const fetchUsers = async () => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("limit", limitPerPage);
    queryParams.append("page", currentPage);
    const response = await getUsers(queryParams);
    
    const responseData = response.data;
    setUsers(responseData.data);
    setTotalPage(responseData.pagination.totalPage);
    setCurrentPage(Number.parseInt(responseData.pagination.currentPage));
  } catch (error) {
    console.log(error);
  }
};
const fetchFilterUsers = async () => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("limit", limitPerPage);
    queryParams.append("page", currentPage);
    queryParams.append("name", filter.name);
    queryParams.append("phone", filter.phone);
    queryParams.append("minAge", filter.minAge);
    queryParams.append("maxAge", filter.maxAge);
    queryParams.append("area", filter.area);
    const response = await searchUsers(queryParams);
    
    const responseData = response.data;
    setUsers(responseData.data);
    setTotalPage(responseData.pagination.totalPage);
    setCurrentPage(Number.parseInt(responseData.pagination.currentPage));
    console.log(responseData);
  } catch (error) {
    console.log(error);
  }
};
const getUsersData = () => {
  if (!isFiltering) {
    fetchUsers();
  } else {
    fetchFilterUsers();
  }
};
useEffect(() => {
  console.log("fetching users");
  getUsersData();
}, [currentPage, isFiltering, filter]);

const userDeleteHandler = async (userId) => {
  try {
    console.log(userId);
    const response = await deleteUser(userId);
    console.log(response.data.message);
    getUsersData();
  } catch (error) {
    console.log(error);
  }
}
  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 max-w-[1400px] mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-green-600">ユーザー管理</h1>
          <p className="text-sm text-gray-500">ユーザーの一覧と管理が可能です。</p>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <UserFilter
          setFilter={setFilter}
          setIsFiltering={setIsFiltering}
          isFiltering={isFiltering}
          />
          <UserTable 
            users={users}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={totalPage}
            userDeleteHandler={userDeleteHandler}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default UserManagement;