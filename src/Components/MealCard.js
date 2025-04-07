import React from 'react';

const MealCard = ({ meal, onView, onWishlist }) => {
  const primaryColor = '#FF7F50';

  return (
    <div className="card h-100 shadow-sm border-0" style={{ backgroundColor: '#fffaf0' }}>
      <img
        src={meal.strMealThumb || 'https://via.placeholder.com/300'}
        alt={meal.strMeal}
        className="card-img-top"
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column justify-content-between">
        <h5 className="card-title fw-semibold text-dark" style={{ color: primaryColor }}>
          {meal.strMeal}
        </h5>
        <div className="d-flex justify-content-between mt-3">
          <button
            onClick={onView}
            className="btn btn-sm"
            style={{
              backgroundColor: primaryColor,
              color: '#fff',
              border: `1px solid ${primaryColor}`,
            }}
          >
            <i className="bi bi-eye me-1"></i> View
          </button>
          <button
            onClick={() => onWishlist(meal)}
            className="btn btn-sm"
            style={{ backgroundColor: primaryColor, color: '#fff' }}
          >
            <i className="bi bi-heart-fill me-1"></i> Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
