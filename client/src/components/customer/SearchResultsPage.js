import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SearchResultsPage = () => {
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get('q');
    const searchResults = location.state.searchResults || [];
    const [newSearchQuery, setNewSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('itemName'); // Default sort by item name
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch additional data or perform other actions as needed
    }, []);

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/query", {     
                type: "food-search",
                query: newSearchQuery,
            }); 
    
            navigate(`/search`, { state: { searchResults: response.data } });
        } catch(error) {
            console.error("Error during search:", error.message);
        }
    };

    const handleSearchInputChange = (event) => {
        setNewSearchQuery(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    const handleAddToCart = (item) => {
        setCartItems([...cartItems, item]);
    };

    const handleCheckout = async () => {
        try {
            // Send the selected items to the backend for checkout
            await axios.post("http://localhost:3001/ViewCart", {
                items: cartItems,
            });
            // Clear the cart after successful checkout
            setCartItems([]);
            alert("Items added to cart and sent for checkout!");
        } catch (error) {
            console.error("Error during checkout:", error.message);
            alert("Error during checkout. Please try again later.");
        }
    };

    // Sort the search results based on the selected option
    const sortedResults = [...searchResults].sort((a, b) => {
        if (sortBy === 'calories') {
            return a.calories - b.calories;
        } else if (sortBy === 'price') {
            return a.price - b.price;
        } else {
            // Default sorting by item name
            return a.itemName.localeCompare(b.itemName);
        }
    });

    return (
        <div>
            <form onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={newSearchQuery}
                    onChange={handleSearchInputChange}
                />
                <button type="submit">Search</button>
            </form>
            <h1>Search Results</h1>
            <p>Showing results for: {searchQuery}</p>
            <div>
                <label htmlFor="sort">Sort by:</label>
                <select id="sort" value={sortBy} onChange={handleSortChange}>
                    <option value="itemName">Name</option>
                    <option value="calories">Calories</option>
                    <option value="price">Price</option>
                </select>
            </div>
            <ul>
                {sortedResults.map((result, index) => (
                    <li key={index}>
                        <h2>{result.itemName}</h2>
                        <p>Vendor Email: {result.vendorEmail}</p>
                        <p>Price: {result.price}</p>
                        <p>Calories: {result.calories}</p>
                        <img src={result.image} alt={result.itemName} />
                        <button onClick={() => handleAddToCart(result)}>Add to Cart</button>
                    </li>
                ))}
            </ul>
            {cartItems.length > 0 && (
                <div>
                    <h2>Cart</h2>
                    <ul>
                        {cartItems.map((item, index) => (
                            <li key={index}>{item.itemName}</li>
                        ))}
                    </ul>
                    <button onClick={handleCheckout}>Checkout</button>
                </div>
            )}
        </div>
    );
};

export default SearchResultsPage;