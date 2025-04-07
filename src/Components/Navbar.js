import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaMoon, FaSun, FaSignOutAlt, FaUser } from 'react-icons/fa';

const Navbar = ({ theme, toggleTheme, user, setUser }) => {
  const [showLoginInput, setShowLoginInput] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    if (email.trim() !== '') {
      setUser(email);
      setShowLoginInput(false);
      setEmail('');
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <nav className={`navbar navbar-expand-lg ${theme === 'dark' ? 'bg-dark' : 'bg-white'} shadow-sm`}>
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo */}
        <Link className="navbar-brand fw-bold" to="/" style={{ color: '#FF6F61' }}>
          MealExplorer
        </Link>

        {/* Right Section */}
        <div className="d-flex align-items-center gap-2">
          {/* Wishlist Button */}
          <Link className="btn btn-outline" to="/wishlist">
            <FaHeart className="me-1" />
            <span className="d-none d-lg-inline">Wishlist</span>
          </Link>

          {/* Theme Toggle */}
          <button className="btn btn-outline-dark" onClick={toggleTheme}>
            {theme === 'light' ? <FaMoon className="me-1" /> : <FaSun className="me-1" />}
            <span className="d-none d-lg-inline">
              {theme === 'light' ? 'Dark' : 'Light'} Mode
            </span>
          </button>

          {/* Login/Logout Logic */}
          {user ? (
            <>
              <span className="fw-semibold ms-3 d-none d-lg-inline">{user}</span>
              <button className="btn btn-danger d-flex align-items-center gap-1" onClick={handleLogout}>
                <FaSignOutAlt />
                <span className="d-none d-lg-inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              {!showLoginInput ? (
                <button className="btn btn-outline-primary" onClick={() => setShowLoginInput(true)}>
                  <FaUser className="me-1" />
                  <span className="d-none d-lg-inline">Login</span>
                </button>
              ) : (
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="email"
                    placeholder="Enter email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ maxWidth: '200px' }}
                  />
                  <button className="btn btn-primary" onClick={handleLogin}>
                    Login
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
