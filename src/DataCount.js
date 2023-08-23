import React, { useState } from "react";
import { useBurgerContext } from "./Context/BurgerContext ";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useNavigate } from "react-router-dom";
// Import the BurgerContext
// import "./DataCount.css"; // Import your CSS file for styling

const DataCount = () => {
  const navigate = useNavigate();
  const { selectedIngredients, totalPrice } = useBurgerContext(); // Retrieve context values

  const [showForm, setShowForm] = useState(false); // State to control form visibility

  const [formData, setFormData] = useState({
    name: "",
    street: "",
    zipCode: "",
    country: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    street: "",
    zipCode: "",
    country: "",
    email: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Validate each field and update errors
    for (const field in formData) {
      if (formData[field].trim() === "") {
        newErrors[field] = "This field is required";
        valid = false;
      } else {
        newErrors[field] = "";
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Create a new order document in the "orders" collection
      try {
        const orderRef = await addDoc(collection(db, "userOrders"), {
          selectedIngredients,
          totalPrice: totalPrice.toFixed(2),
          shippingInfo: formData,
          timestamp: new Date(),
        });
        console.log("Order added with ID: ", orderRef.id);

        // Handle any further actions here, such as navigation or success message
        // For example, you can navigate to a success page:
        navigate("/");
      } catch (error) {
        console.error("Error adding order: ", error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    navigate("/"); // Navigate back to the BuildBurger component
  };

  const handleContinue = () => {
    setShowForm(true); // Show the form for entering shipping information
  };

  return (
    <div className="data-count-container">
      <h1>We hope it tastes well!!!</h1>
      <div className="ingredients-list">
        <ul>
          {Object.entries(selectedIngredients).map(([ingredient, quantity]) => (
            <li key={ingredient}>
              {ingredient}: {quantity}
            </li>
          ))}
        </ul>
      </div>
      <div className="total-price">
        <h2>Total Price:</h2>
        <p>{totalPrice.toFixed(2)}</p>
      </div>
      {showForm ? (
        <div className="shipping-info">
          <h2>Contact data required</h2>
          
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </label>
            <br />
            <label>
              Street:
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleInputChange}
              />
              {errors.street && <span className="error-message">{errors.street}</span>}
            </label>
            <br />
            <label>
              Zip Code:
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
              />
              {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
            </label>
            <br />
            <label>
              Country:
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
              />
              {errors.country && <span className="error-message">{errors.country}</span>}
            </label>
            <br />
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </label>
            <br />
            <button type="submit">Order</button>
          </form>
          
        </div>
      ) : (
        <div className="button-container">
        <button className="cancel-button" onClick={handleCancel}>Cancel</button>
        <button className="continue-button" onClick={handleContinue}>Continue</button>
      </div>
      )}
    </div>
  );
};

export default DataCount;
