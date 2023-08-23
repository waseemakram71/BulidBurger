import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBurgerContext } from "./Context/BurgerContext ";
import { auth } from "./firebase";




const BuildBurger = () => {
  const navigate = useNavigate();
  const { setSelectedIngredients, setTotalPrice: setContextTotalPrice } = useBurgerContext();

  const ingredientPrices = {
    salad: 1,
    bacon: 2,
    cheese: 1.5,
    meat: 3,
  };

  const [ingredients, setIngredients] = useState({
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  });

  const [totalPrice, setTotalPrice] = useState(0);

  const ingredientColors = {
    salad: "green",
    bacon: "red",
    cheese: "yellow",
    meat: "brown",
  };

  const addIngredient = (ingredient) => {
    setIngredients((prevIngredients) => ({
      ...prevIngredients,
      [ingredient]: prevIngredients[ingredient] + 1,
    }));
    setTotalPrice((prevTotal) => prevTotal + ingredientPrices[ingredient]);
  };

  const removeIngredient = (ingredient) => {
    if (ingredients[ingredient] === 0) return;
    setIngredients((prevIngredients) => ({
      ...prevIngredients,
      [ingredient]: prevIngredients[ingredient] - 1,
    }));
    setTotalPrice((prevTotal) => prevTotal - ingredientPrices[ingredient]);
  };

  const ingredientDivs = [];
  for (const ingredient in ingredients) {
    for (let i = 0; i < ingredients[ingredient]; i++) {
      ingredientDivs.push(
        <div
          key={`${ingredient}-${i}`}
          style={{
            backgroundColor: ingredientColors[ingredient],
            width: "350px",
            height: "20px",
            margin: "2px",
            borderRadius: '5px',
          }}
        ></div>
      );
    }
  }

  const hasIngredients = ingredientDivs.length > 0;

  const navigateSignin = () => {
  setSelectedIngredients(ingredients);
  setContextTotalPrice(totalPrice);

  if (auth.currentUser) {
    // User is signed in, navigate to the checkout component
    navigate("/checkout");
  } else {
    // User is not signed in, navigate to the signin component
    navigate("/signin");
  }
};


  return (
    <div>
      <div className="main-container">
        <h1>Build Burger</h1>
        <div className="upper-div">
          <div className="container">
            <div className="one"></div>
            <div className="two"></div>
            <div className="three"></div>
            <div className="four"></div>
            <div className="five"></div>
          </div>
          <div className="burger-patty">
            {/* Add your patty dividers here */}
          </div>
        </div>
        {hasIngredients ? null : <p>Please Start Adding Ingredients!</p>}
        {ingredientDivs}
        <div className="bottom-div">
          {/* Add your bottom div content here */}
        </div>
      </div>
      <div className="main">
        <p className="paragraph">
          Current Price: {totalPrice.toFixed(2)}
        </p>
        <div className="ingredient">
  <div className="ingredient-heading">
    <h2>Salad</h2>
  </div>
  <div className="button-group">
    <button className="btn-ing1" onClick={() => addIngredient("salad")}>
      More
    </button>
    <button className="btn-ing2" onClick={() => removeIngredient("salad")}>
      Less
    </button>
  </div>
</div>

<div className="ingredient">
  <div className="ingredient-heading">
    <h2>Bacon</h2>
  </div>
  <div className="button-group">
    <button className="btn-ing1" onClick={() => addIngredient("bacon")}>
      More
    </button>
    <button className="btn-ing2" onClick={() => removeIngredient("bacon")}>
      Less
    </button>
  </div>
</div>

<div className="ingredient">
  <div className="ingredient-heading">
    <h2>Chees</h2>
  </div>
  <div className="button-group">
    <button className="btn-ing1" onClick={() => addIngredient("cheese")}>
      More
    </button>
    <button className="btn-ing2" onClick={() => removeIngredient("cheese")}>
      Less
    </button>
  </div>
</div>

<div className="ingredient">
  <div className="ingredient-heading">
    <h2>Meat</h2>
  </div>
  <div className="button-group">
    <button className="btn-ing1" onClick={() => addIngredient("meat")}>
      More
    </button>
    <button className="btn-ing2" onClick={() => removeIngredient("meat")}>
      Less
    </button>
  </div>
</div>

        <div className="link">
  {auth.currentUser ? (
    <button onClick={navigateSignin} disabled={!hasIngredients}>
      Order Now
    </button>
  ) : (
    <button className="signin-button" onClick={navigateSignin} disabled={!hasIngredients}>
      Signin/Up For Your Order
    </button>
  )}
</div>

      </div>
    </div>
  );
};

export default BuildBurger;

