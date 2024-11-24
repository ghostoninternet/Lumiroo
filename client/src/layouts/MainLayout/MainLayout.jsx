import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Header role="user" />
      </header>

      <main className="flex-grow bg-gray-100">
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default MainLayout;
