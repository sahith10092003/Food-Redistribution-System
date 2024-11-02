import React, { useState, useEffect } from "react";
import FoodCard from "./FoodCard";
import axios from "axios";
import "./Food.css";
const formatExpiryDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-GB', options);
  return formattedDate.replace(/\b(\d{1})\b/g, '0$1'); // Adds leading zero to single-digit days
};

const Food = () => {
  const [id,setId]=useState(null);
const fetchUserByEmail = async () => {
  const email = localStorage.getItem("email");
  try {
    const response = await axios.get(`http://localhost:3000/findbyemail/${email}`);
    console.log(response.data._id);
    setId(response.data._id);
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};
  const today=new Date();
  fetchUserByEmail();
  const [food, setFood] = useState([]);
  const [selectedTag, setSelectedTag] = useState("all");
  console.log(today);
  const currentDate = today.getDate();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();
  useEffect(() => {
    fetchFoodItems();
  }, []);
  console.log(food);
  const fetchFoodItems = async () => {
    try {
      const response = await axios.get("http://localhost:3000/allfoods");
      setFood(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleTagChange = (event) => {
    setSelectedTag(event.target.value);
  };

  const filteredFood =
    selectedTag === "all"
      ? food
      : food.filter((item) => item.foodTag === selectedTag);
  const filteredNonExpiredFood = filteredFood.filter((item) => {
    const itemExpiryDate = new Date(item.expiryDate);
    const itemDate = itemExpiryDate.getDate();
    const itemMonth = itemExpiryDate.getMonth() + 1;
    const itemYear = itemExpiryDate.getFullYear();
    if ((
      itemYear > currentYear ||
      (itemYear === currentYear && itemMonth > currentMonth) ||
      (itemYear === currentYear && itemMonth === currentMonth && itemDate >= currentDate)
    ) && item.user!=id) {
      return true; // Item is not expired
    }
    return false; // Item is expired
  });

  return (
    <div className="food">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",

          width: "100%",
        }}
      >
        <h1>Food Available</h1>
        <div
          className="tags"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <label htmlFor="tags">Filter by tag:</label>
          <select
            id="tags"
            name="tags"
            value={selectedTag}
            onChange={handleTagChange}
            style={{
              padding: "0.5rem",
              borderRadius: "0.5rem",
              border: "1px solid #ccc",
            }}
          >
            <option value="all">All</option>
            <option value="veg">Veg</option>
            <option value="nonveg">Non Veg</option>
          </select>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
        }}
      >
        {filteredNonExpiredFood.length !== 0 ? (
            filteredNonExpiredFood.map((item) => (
              <FoodCard
                key={item._id}
                name={item.foodName}
                quantity={item.quantity}
                date={formatExpiryDate(item.expiryDate)}
                address={item.address}
                tag={item.foodTag}
                available={item.available}
                user={item.user}
                foodId={item._id}
              />
            ))
            ) : (
                <p>No Food available</p>
              )}
      </div>
    </div>
  );
};

export default Food;
