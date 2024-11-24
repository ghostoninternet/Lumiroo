import { Outlet } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

function MainLayout() {
  return (
    <div style={styles.layout}>
      <header>
        <Header role="user"/>
      </header>

      <main style={styles.mainContent}>
        <h2>This main layout of website!</h2>
        <p>This is the main content of the page.</p>
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

export default MainLayout