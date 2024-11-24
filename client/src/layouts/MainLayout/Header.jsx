import React from 'react'

function Header({ role }) {
  return (
    <header style={styles.header}>
      {/* Logo */}  
      <div style={styles.logo}>Lumiroo</div>

      {/* Navigation Links */}
      {role !== 'admin' && (
        <nav style={styles.nav}>
          <a href="/" style={styles.link}>ホームページ</a>
          <a href="/search" style={styles.link}>遊び/編集検索</a>
          <a href="/favorites" style={styles.link}>お気に入りの遊び場</a>
        </nav>
      )}

      {/* Profile Section */}
      <div style={styles.profile}>
        <img
          src="https://avatars.dicebear.com/api/bottts/johndoe.svg" // URL ảnh đại diện
          alt="User Avatar"
          style={styles.icon}
        />
        <span style={styles.profileText}>User</span>
      </div>
    </header>
  )
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #ddd',
  },
  logo: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  nav: {
    display: 'flex',
    gap: '60px', 
    marginLeft: 'auto', 
    marginRight: '30px',
  },
  link: {
    textDecoration: 'none',
    color: '#000',
    fontSize: '16px',
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    overflow: 'hidden',
  },
  icon: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
};

export default Header