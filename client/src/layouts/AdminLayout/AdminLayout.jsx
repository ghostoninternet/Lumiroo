import React from 'react'
import Header from '../MainLayout/Header';
import Footer from '../MainLayout/Footer';

function AdminLayout() {
  return (
    <div style={styles.layout}>
      <header>
        <Header role="user"/>
      </header>

      <main style={styles.mainContent}>
        <h2>This main layout of website!</h2>
        <p>This is the main content of admin page.</p>
      </main>

      <footer style={styles.footer}>
        <Footer/>
      </footer>

    </div>
  );
}

const styles = {
  layout: {
    display: 'flex',         
    flexDirection: 'column',       
    minHeight: '100vh',            
  },
  mainContent: {
    flexGrow: 1,                  
    padding: '20px',
    backgroundColor: '#f4f4f4',
  },
};

export default AdminLayout