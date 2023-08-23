import React from "react";
import { useNavigate } from "react-router-dom";
import { useBurgerContext } from "./Context/BurgerContext ";

const CheckOut = () => {
  const navigate = useNavigate();
  const { selectedIngredients, ingredientColors, ingredientSizes, totalPrice } = useBurgerContext();

  const handleCancel = () => {
    navigate("/");
  };

  const handleContinue = () => {
    navigate("/datacount");
  };

  const areIngredientsSelected = Object.keys(selectedIngredients).length > 0;

  return (
    <div className="checkout-container">
      <h1>We hope it tastes well!!!</h1>
      {areIngredientsSelected && (
        <div>
          <div className="upper-div">
            <div className="container">
              <div className="one"></div>
              <div className="two"></div>
              <div className="three"></div>
              <div className="four"></div>
              <div className="five"></div>
              <div className="burger-patty"></div>
            </div>
          </div>
          <div className="ingredient-divs">
            {Object.entries(selectedIngredients).map(([ingredient, quantity]) =>
              Array.from({ length: quantity }).map((_, index) => (
                <div
                  key={`${ingredient}-${index}`}
                  className="ingredient-div"
                  style={{
                    backgroundColor: ingredientColors[ingredient],
                    width: ingredientSizes[ingredient].width,
                    height: ingredientSizes[ingredient].height,
                    borderRadius: "5px",
                  }}
                ></div>
              ))
            )}
          </div>
          <div className="bottom-div"></div>
        </div>
      )}
     <div>
        <p className="paragraph">Total Price: ${totalPrice.toFixed(2)}</p> 
      </div>
      <div className="button-container">
        <button className="cancel-button" onClick={handleCancel}>Cancel</button>
        <button className="continue-button" onClick={handleContinue}>Continue</button>
      </div>
    </div>
  );
};

export default CheckOut;
