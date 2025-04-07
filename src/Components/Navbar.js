import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaMoon, FaSun, FaSignOutAlt } from 'react-icons/fa';
import Login from './Login';

const Navbar = ({ theme, toggleTheme, user, setUser }) => {
  return (
    <nav className={`navbar navbar-expand-lg ${theme === 'dark' ? 'bg-dark' : 'bg-white'} shadow-sm`}>
      <div className="container d-flex justify-content-between align-items-center">
        <Link className="navbar-brand fw-bold" to="/" style={{ color: '#FF6F61' }}>
          MealExplorer
        </Link>

        <div className="d-flex align-items-center gap-2">
          <Link className="btn btn-outline" to="/wishlist">
            <FaHeart className="me-1" />
            Wishlist
          </Link>

          <button className="btn btn-outline-dark" onClick={toggleTheme}>
            {theme === 'light' ? <FaMoon className="me-1" /> : <FaSun className="me-1" />}
            {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>

          {user ? (
            <>
              <span className="fw-semibold ms-3">{user}</span>
              <button className="btn btn-danger d-flex align-items-center gap-1" onClick={() => setUser(null)}>
                <FaSignOutAlt />
                Logout
              </button>
            </>
          ) : (
            <Login setUser={setUser} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
