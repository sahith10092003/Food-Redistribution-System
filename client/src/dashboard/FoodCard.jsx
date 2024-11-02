import React,{useState} from "react";
import { FaCalendarAlt, FaCartArrowDown, FaHome } from "react-icons/fa";
import "./FoodCard.css";
import axios from "axios";
import emailjs from '@emailjs/browser';

const FoodCard = ({ name, quantity, date, address, tag ,available ,user,foodId}) => {
  const [requested,setrequested]=useState(false);
  const buttonText = () => {
    if (!available) {
      return "Not Available";
    } else if (requested) {
      return "Requested";
    } else {
      return "Request Now";
    }
  };
  const buttonColor = () => {
    if (!available) {
      return "red";
    } else if (requested) {
      return "orange";
    } else {
      return "green";
    }
  };
  const sendOneMail=(e)=>{
    emailjs.send("service_b3o5df1","template_qtfbycg",e,"epOvrYrIbe0I06hea")
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    }); 
  };
  const handleRequest=async()=>{
    const email = localStorage.getItem("email");
    const currentUser= await axios.get(`http://localhost:3000/findbyemail/${email}`);
    if (available && !requested) {
      setrequested(true);
      const response= await axios.get(`http://localhost:3000/${user}`)
      console.log(user,"are equal" ,response.data);
      try{
          const respFromUpdate=await axios.put(`http://localhost:3000/updateFoodAvailability/${foodId}`);
          console.log("aftrer update response",respFromUpdate);
          const e={}
          e.email=email;
          e.to_name=currentUser.data.name;
          e.foodName=name;
          e.quantity=quantity;
          e.foodTag=tag;
          e.expiryDate=date;
          e.address=address;
          e.postedUser=response.data.name;
          e.postedUserMobile=response.data.number;
          console.log(e);
          //sendOneMail(e);
      }catch(err){
        console.log(err);
      }
    }
  }
  return (
    <div>
      <div class="card">
        <p
          style={{
            position: "absolute",
            top: "0.5rem",
            left: "0.5rem",
            padding: "0.5rem 1rem",
            background: "#f5f5f5",
            color: "#333",
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: "0.5rem",
          }}
        >
          {tag ? tag : "food"}
        </p>
        <img
          className="foodcard-img"
          src={`https://source.unsplash.com/random/?${name}`}
          alt="Card Image"
        />
        <div class="card-content">
          <h2 className="food-title">{name}</h2>
          <div className="food-details">
            <ul className="icons">
              <li>
                <span className="icons-name">
                  <FaCartArrowDown />
                </span>
                : {quantity}
              </li>
              <li>
                <span className="icons-name">
                  <FaCalendarAlt />
                </span>
                : {date}
              </li>
              <li>
                <span className="icons-name">
                  <FaHome />
                </span>
                : {address}
              </li>
            </ul>
          </div>
          <button className="food-btn" style={{ backgroundColor: buttonColor() }} onClick={handleRequest}  disabled={!available || requested}>{buttonText()}</button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
