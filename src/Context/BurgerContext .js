import React, { createContext, useContext, useState } from 'react';

const BurgerContext = createContext();

export const BurgerProvider = ({ children }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const ingredientColors = {
    salad: "green",
    bacon: "red",
    cheese: "yellow",
    meat: "brown",
  };

  const ingredientSizes = {
    salad: {
      width: "350px",
      height: "20px",
    },
    bacon: {
      width: "350px",
      height: "20px",
    },
    cheese: {
      width: "350px",
      height: "20px",
    },
    meat: {
      width: "350px",
      height: "20px",
    },
  };

  return (
    <BurgerContext.Provider
      value={{
        selectedIngredients,
        setSelectedIngredients,
        totalPrice,
        setTotalPrice,
        ingredientColors,
        ingredientSizes,
      }}
    >
      {children}
    </BurgerContext.Provider>
  );
};

export const useBurgerContext = () => useContext(BurgerContext);
