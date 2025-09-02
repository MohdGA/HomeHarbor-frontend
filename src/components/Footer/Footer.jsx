import React from 'react'
import { Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <h2 className="footer-brand">HomeHarbor</h2>

      <p className="footer-text">&copy; {new Date().getFullYear()} HomeHarbor. All rights reserved.</p>

      <div className="footer-links">
        <Link to="/properties/new" className="footer-link">Add New Property</Link>
        <Link to="/properties" className="footer-link">Properties List</Link>
      </div>

      <div className="footer-icons">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="footer-icon">
          <FaFacebook />
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-icon">
          <FaLinkedin />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-icon">
          <FaTwitter />
        </a>
      </div>
    </footer>
  )
}

export default Footer