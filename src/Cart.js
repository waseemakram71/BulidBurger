import React from "react";
import { useBurgerContext } from "./Context/BurgerContext ";
// import "./Cart.css"; // Import your custom CSS for the Cart component

const Cart = () => {
  const { selectedIngredients, totalPrice } = useBurgerContext();

  return (
    <div className="cart-container">
      <div className="cart-items">
        <h2>Your Cart</h2>
        <div className="ingredient-list">
          {Object.entries(selectedIngredients).map(([ingredient, quantity]) => (
            <div key={ingredient} className="ingredient-box">
              <p className="ingredient-name">{ingredient}</p>
              <p className="ingredient-quantity">Quantity: {quantity}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="cart-summary">
        <h2>Total Price:</h2>
        <p>${totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Cart;
