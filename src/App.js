  // src/App.jsx
  import React, { useState } from 'react';
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import Navbar from './Components/Navbar';
  import Home from './pages/Home';
  import Wishlist from './pages/Wishlist';
  import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Footer from './pages/Footer';
  const App = () => {
    const [theme, setTheme] = useState('light');
    const [user, setUser] = useState(null);

    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

    return (
      <>
      <Router>
        <div className={theme === 'dark' ? 'bg-dark text-white min-vh-100' : 'bg-light text-dark min-vh-100'}>
          <Navbar theme={theme} toggleTheme={toggleTheme} user={user} setUser={setUser} />
          <div className="container py-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/wishlist" element={<Wishlist />} />
            </Routes>
          </div>
          <ToastContainer />
        </div>
      </Router>
      <Footer/>
      </>
    );
  };

  export default App;
