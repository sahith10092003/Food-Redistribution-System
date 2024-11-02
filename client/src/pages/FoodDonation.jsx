import React, { useState } from "react";
import axios from "axios";
import {useForm} from 'react-hook-form';
import "./FoodDonation.css";
import emailjs from '@emailjs/browser';

function FoodDonation() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [foodName, setFoodName] = useState("");
  const [foodTag, setFoodTag] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [address, setAddress] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);


  const email = localStorage.getItem("email");
  console.log(email);
  // const x={
  //   email:"nishanth2106g@gmail.com",
  //   to_name:"Gunnai Nishanth",
  //   foodName:"Rice",
  //   foodTag:"veg",
  //   quantity:"10kg",
  //   address:"Nagole",
  //   expiryDate:"11th january 2024"
  // }
  const sendOneMail=(e)=>{
    emailjs.send("service_b3o5df1","template_nywqgs4",e,"epOvrYrIbe0I06hea")
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    }); 
  };
  const sendEmails =async (data) => {
    await axios.get("http://localhost:3000/getemails")
      .then((response) => {
        const emails = response.data;
        console.log(emails);
        emails.forEach((res)=>{
          const e={
            ...data,
            email:res.email
          }
          if(e.email!=email){
            //sendOneMail(e);
          }
          
        })
      })
      .catch((err) => {
        console.error(err);
      });
  };
  

  const  submitForm = async (event) => {
    const data= {
      ...event,
      email: localStorage.getItem("email")
    };
    console.log("This is data in submit form",data)
    // Send the form data to the server using fetch or Axios
    try {
      const response = await axios.post("http://localhost:3000/fooddonation",data);
      setShowSuccess(true);
      sendEmails(data); // Show success message
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000); 
      console.log(response.data);
      setFoodName("");
      setFoodTag("");
      setQuantity("");
      setExpiryDate("");
      setAddress("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="foodDonation_container">
      
      <div className="foodDonation_heading"><h1 className="heading-foodd ">FOOD DONATION FORM</h1>
      </div>
      <div className="foodDonation_wrapper">
        <form className="food-donation_form" onSubmit={handleSubmit(submitForm)}>
          <div className="form_element">
            <label htmlFor="foodName">Food Name</label>
            <input
              type="text"
              id="foodName"
              name="foodName"
              placeholder="Enter Food item"
              className="form-control"
              {...register("foodName", { required: true})}
            />
          </div>
          {errors.foodName?.type === "required" ? (
                <p className="text-danger fw-bold" style={{color:'red'}}>
                  * Food Name is required
                </p>
          ):(<p></p>)}
          
          <div className="form_element">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              className="form-control"
              {...register("quantity", { required: true })}
            />
          </div>
          {errors.quantity?.type === "required" ? (
                <p className="text-danger fw-bold" style={{color:'red'}}>
                  * Enter valid Quantity
                </p>
          ):(<p></p>)}

          <div className="form_element">
            <label htmlFor="foodTag">Food type or tag</label>
            <select
              id="foodTag"
              name="foodTag"
              className="form-control"
              {...register("foodTag", { required: true })}
            >
              <option value="" disabled selected>
                Choose type
              </option>
              <option value="veg" style={{ color: "black" }}>
                Veg
              </option>
              <option value="nonveg" style={{ color: "black" }}>
                Non Veg
              </option>
            </select>
          </div>

          <div className="form_element">
            <label htmlFor="expiryDate">Expiry Date</label>
            <input
              type="date"
              id="expiryDate"
              name="expiryDate"
              className="form-control"
              {...register("expiryDate", { required: true })}
            />
          </div>
          {errors.expiryDate?.type === "required" ? (
                <p className="text-danger fw-bold" style={{color:'red'}}>
                  * Select expiry date
                </p>
          ):(<p></p>)}
          <div className="form_element">
            <label htmlFor="address">Address</label>
            <input
              type="address"
              id="address"
              name="address"
              className="form-control"
              {...register("address", { required: true })}
            />
          </div>
          {errors.address?.type === "required" ? (
                <p className="text-danger fw-bold" style={{color:'red'}}>
                  * Enter valid address
                </p>
          ):(<p></p>)}
          <button id="foodDonation_submit-btn" type="submit">
            Submit
          </button>
        </form>
        {showSuccess && (
        <div className="success-message">
          <p style={{ color: 'green',marginTop:'20px' }}>Food added successfully!</p>
          {/* Additional success message content if needed */}
        </div>
      )}
      </div>
      
    </div>
  );
}

export default FoodDonation;
