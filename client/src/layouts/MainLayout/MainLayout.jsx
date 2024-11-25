import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

function MainLayout() {
 return (
   <div className="min-h-screen flex flex-col relative">
     <header>
       <Header role="user" />
     </header>

     <main className="flex-grow bg-gray-100 mb-16">
       <Outlet />
     </main>

     <footer className="bg-black text-white">
       <Footer />
     </footer>
   </div>
 );
}

export default MainLayout;