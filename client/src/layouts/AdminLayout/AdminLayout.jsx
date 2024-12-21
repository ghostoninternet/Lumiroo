import { Outlet } from "react-router-dom";
import Header from "../MainLayout/Header";
import Footer from "../MainLayout/Footer";
import Sidebar from "./components/Sidebar";

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 w-64 bg-white/80 backdrop-blur-lg shadow-lg z-40 overflow-y-auto">
        <Sidebar />
      </div>

      {/* Main Content Container */}
      <div className="flex flex-col flex-1 ml-64">
        {/* Sticky Header */}
        <div className="sticky top-0 z-50">
          <Header role="admin" />
        </div>
        
        {/* Spacer */}
        <div className="h-14"></div>

        {/* Main Content */}
        <main className="flex-grow px-8 py-8">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer className="bg-green-500 text-white" />
      </div>
    </div>
  );
}

export default AdminLayout;