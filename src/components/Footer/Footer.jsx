import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer style={{ background: '#333', color: '#fff', padding: '15px 0', textAlign: 'center', marginTop: '40px' }}>
        <h2>Home Harbor</h2>

        <p>&copy; {new Date().getFullYear()} Home Harbor. All rights reserved.</p>

        <div style={{ marginTop: '10px' }}>
          <Link to="/properties/new" style={{ color: '#fff', margin: '0 10px', textDecoration: 'none' }}>Add New Property</Link>
          <Link to="/properties" style={{ color: '#fff', margin: '0 10px', textDecoration: 'none' }}>Properties List</Link>
        </div>

        <div style={{ marginTop: '15px' }}>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', margin: '0 10px' }}>
            <FaFacebook />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', margin: '0 10px' }}>
            <FaLinkedin />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', margin: '0 10px' }}>
            <FaTwitter />
          </a>
        </div>
    </footer>
  )
}

export default Footer
