import React from 'react';
import Header from '../MainLayout/Header';
import Footer from '../MainLayout/Footer';

function AdminLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Header role="admin" />
      </header>

      <main className="flex-grow p-5 bg-gray-100">
        <h2>This main layout of website!</h2>
        <p>This is the main content of admin page.</p>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default AdminLayout;
