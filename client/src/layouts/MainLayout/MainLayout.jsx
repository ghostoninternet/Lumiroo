import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Header role="user" />
      </header>

      <main className="flex-grow p-5 bg-gray-100">
        <h2>This main layout of website!</h2>
        <p>This is the main content of the page.</p>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default MainLayout;
