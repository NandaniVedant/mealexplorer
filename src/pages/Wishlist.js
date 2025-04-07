// src/pages/Wishlist.jsx
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage when the page loads
  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  // Remove a meal from wishlist
  const removeMeal = (id) => {
    const updatedWishlist = wishlist.filter(meal => meal.idMeal !== id);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);
    toast.info('Removed from Wishlist');
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">My Wishlist</h2>

      {/* Back to Home Button */}
      <Link to="/" className="btn btn-secondary mb-4">Back to Home</Link>

      <div className="row">
        {wishlist.length === 0 ? (
          <p>No items in wishlist.</p>
        ) : (
          wishlist.map((meal) => (
            <div className="col-md-4 mb-4" key={meal.idMeal}>
              <div className="card h-100">
                <img src={meal.strMealThumb} className="card-img-top" alt={meal.strMeal} />
                <div className="card-body">
                  <h5 className="card-title">{meal.strMeal}</h5>
                  <button className="btn btn-danger" onClick={() => removeMeal(meal.idMeal)}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Wishlist;
