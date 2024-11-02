import React from 'react';
import "./Contactus.css"

const contactUs = () => {
    const handleSendMessage = () => {
        window.location.href = 'mailto:teamank321@gmail.com?subject=Message from Website';
      };
  return (
    <div className="contact-us-container">
      <div className="contact-details">
        <h2>Contact Us</h2>
        <p>
          Have a question, suggestion, or just want to say hi? We'd love to hear from you!
        </p>
        <div>
          <p>Name:Share The Meal</p>
          <p>Email: sharethemeal@gmail.com</p>
          <p>Phone: +91734567890</p>
          <p>Location: 123 Main Street, Hyderabd</p>
          <p>Feel free to reach out through the provided contact information.</p>
          <button className="send-message-btn" onClick={handleSendMessage}>
            
            Send Message
          </button>
        </div>
      </div>
      <div className="additional-info">
        <h2>Additional Information</h2>
        <p>
          Our office hours are from 9 AM to 5 PM, Monday to Friday.
        </p>
        <p>
          For urgent matters or immediate assistance, please call the provided phone number.
        </p>
      </div>
    </div>
  );
};

export default contactUs;
