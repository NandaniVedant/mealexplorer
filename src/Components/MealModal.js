// src/Components/MealModal.jsx
import React, { useEffect, useRef } from 'react';

const MealModal = ({ meal, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!meal) return null;

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const ingredients = [...Array(20)].map((_, i) => {
    const ingredient = meal[`strIngredient${i + 1}`];
    const measure = meal[`strMeasure${i + 1}`];
    return ingredient ? `${ingredient} - ${measure}` : null;
  }).filter(Boolean);

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ background: 'rgba(0,0,0,0.5)' }}
      onClick={handleClickOutside}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content" ref={modalRef}>
          <div className="modal-header">
            <h5 className="modal-title">{meal.strMeal}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <div className="row">
              <div className="col-md-6">
                <img
                  src={meal.strMealThumb}
                  className="img-fluid mb-3 rounded"
                  alt={meal.strMeal}
                />
                <div className="mb-3">
                  <span className="badge bg-secondary me-2">
                    Category: {meal.strCategory}
                  </span>
                  <span className="badge bg-info text-dark">
                    Area: {meal.strArea}
                  </span>
                </div>
              </div>
              <div className="col-md-6">
                <h6>Ingredients:</h6>
                <ul>
                  {ingredients.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <h6>Instructions:</h6>
            <p>{meal.strInstructions}</p>

            {meal.strYoutube && (
              <div className="ratio ratio-16x9 mt-3">
                <iframe
                  src={meal.strYoutube.replace('watch?v=', 'embed/')}
                  title="YouTube Video"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default MealModal;
