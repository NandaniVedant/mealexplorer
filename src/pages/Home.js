import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import MealCard from '../Components/MealCard';
import MealModal from '../Components/MealModal';

const Home = () => {
    const [meals, setMeals] = useState([]);
    const [search, setSearch] = useState('');
    const [area, setArea] = useState('');
    const [areas, setAreas] = useState([]);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [loading, setLoading] = useState(false);

    const primaryColor = '#FF7F50';
    const lightBg = '#fffaf0';

    const fetchMeals = async (url) => {
        try {
            setLoading(true);
            const res = await fetch(url);
            const data = await res.json();
            setMeals(data.meals || []);
        } catch (error) {
            toast.error('Failed to fetch meals');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMeals('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood');
        fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
            .then(res => res.json())
            .then(data => setAreas(data.meals || []));
    }, []);

    const searchMeal = () => {
        if (!search.trim()) return;
        fetchMeals(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
    };

    const filterByArea = (area) => {
        if (area === 'default') return;
        setArea(area);
        fetchMeals(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    };

    const viewMealDetails = async (id) => {
        try {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            const data = await res.json();
            setSelectedMeal(data.meals[0]);
        } catch (error) {
            toast.error('Failed to load meal details.');
        }
    };

    const addToWishlist = (meal) => {
        const existing = JSON.parse(localStorage.getItem('wishlist')) || [];
        if (!existing.find(m => m.idMeal === meal.idMeal)) {
            localStorage.setItem('wishlist', JSON.stringify([...existing, meal]));
            toast.success('Added to Wishlist!');
        } else {
            toast.info('Already in Wishlist');
        }
    };

    return (
        <div className="container py-5" style={{ backgroundColor: lightBg, minHeight: '100vh' }}>
            <h2 className="text-center mb-4 fw-bold" style={{ color: primaryColor }}>
                 Explore Delicious Meals
            </h2>

            {/* Search & Filter Section */}
            <div className="mb-5 d-flex flex-wrap justify-content-center gap-3">
                <input
                    className="form-control shadow-sm"
                    placeholder="Search meal..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{ borderColor: primaryColor, maxWidth: '250px' }}
                />
                <button
                    className="btn shadow-sm"
                    onClick={searchMeal}
                    style={{ backgroundColor: primaryColor, color: '#fff' }}
                >
                     Search
                </button>
                <select
                    className="form-select shadow-sm"
                    onChange={e => filterByArea(e.target.value)}
                    style={{ borderColor: primaryColor, maxWidth: '200px' }}
                >
                    <option value="default">Filter by Region</option>
                    {areas.map(a => (
                        <option key={a.strArea} value={a.strArea}>
                            {a.strArea}
                        </option>
                    ))}
                </select>
            </div>

            {/* Meal Cards Section */}
            {loading ? (
                <p className="text-center text-secondary">Loading meals...</p>
            ) : meals.length > 0 ? (
                <div className="row g-4">
                    {meals.map(meal => (
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={meal.idMeal}>
                            <MealCard
                                meal={meal}
                                onView={() => viewMealDetails(meal.idMeal)}
                                onWishlist={addToWishlist}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-danger">No meals found.</p>
            )}

            <MealModal meal={selectedMeal} onClose={() => setSelectedMeal(null)} />
        </div>
    );
};

export default Home;
