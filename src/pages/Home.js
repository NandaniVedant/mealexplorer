import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import MealCard from '../Components/MealCard';
import MealModal from '../Components/MealModal';

const Home = () => {
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState('');
  const [areas, setAreas] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [loading, setLoading] = useState(false);

  // Colors
  const primaryColor = '#FF7F50';
  const lightBg = '#fffaf0';

  // Fetch default meals and area list when page loads
  useEffect(() => {
    getMeals('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood');
    getAreas();
  }, []);

  // Function to fetch meals from a given URL
  const getMeals = async (url) => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      setMeals(data.meals || []);
    } catch (err) {
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  // Function to get list of areas (regions)
  const getAreas = async () => {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    const data = await res.json();
    setAreas(data.meals || []);
  };

  // Search meal by name
  const searchMeal = () => {
    if (search.trim()) {
      getMeals(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
    }
  };

  // Filter meals by region
  const filterByArea = (area) => {
    if (area === 'default') return;
    getMeals(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
  };

  // Show meal details in modal
  const viewMealDetails = async (id) => {
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await res.json();
      setSelectedMeal(data.meals[0]);
    } catch (error) {
      toast.error('Failed to load details.');
    }
  };

  // Add meal to wishlist in localStorage
  const addToWishlist = (meal) => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const exists = wishlist.find(item => item.idMeal === meal.idMeal);

    if (exists) {
      toast.info('Already in wishlist');
    } else {
      wishlist.push(meal);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      toast.success('Added to wishlist!');
    }
  };

  return (
    <div className="container py-5" style={{ backgroundColor: lightBg }}>
      <h2 className="text-center mb-4 fw-bold" style={{ color: primaryColor }}>
        Explore Delicious Meals
      </h2>

      {/* Search & Filter Section */}
      <div className="mb-4 d-flex flex-wrap justify-content-center gap-3">
        <input
          className="form-control"
          placeholder="Search meal..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ maxWidth: '250px', borderColor: primaryColor }}
        />
        <button
          className="btn"
          onClick={searchMeal}
          style={{ backgroundColor: primaryColor, color: '#fff' }}
        >
          Search
        </button>
        <select
          className="form-select"
          onChange={e => filterByArea(e.target.value)}
          style={{ maxWidth: '200px', borderColor: primaryColor }}
        >
          <option value="default">Filter by Region</option>
          {areas.map((a) => (
            <option key={a.strArea} value={a.strArea}>
              {a.strArea}
            </option>
          ))}
        </select>
      </div>

      {/* Meal List */}
      {loading ? (
        <p className="text-center text-secondary">Loading meals...</p>
      ) : meals.length > 0 ? (
        <div className="row g-4">
          {meals.map(meal => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={meal.idMeal}>
              <MealCard
                meal={meal}
                onView={() => viewMealDetails(meal.idMeal)}
                onWishlist={() => addToWishlist(meal)}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-danger">No meals found.</p>
      )}

      {/* Modal for meal details */}
      {selectedMeal && (
        <MealModal meal={selectedMeal} onClose={() => setSelectedMeal(null)} />
      )}
    </div>
  );
};

export default Home;
