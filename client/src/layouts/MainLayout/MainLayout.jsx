import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header>
        <Header role="user" />
      </header>

      {/* Main content */}
      <main className="flex-grow bg-gray-50/80">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default MainLayout;
