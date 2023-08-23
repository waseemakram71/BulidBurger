import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { BurgerProvider } from './Context/BurgerContext '; // Import the BurgerProvider

import BulidBurgur from './BulidBurgur';
import Navbar from './Navbar';
import SignIn from './SignIn';
import Cart from './Cart';
import NotFound from './NotFound';
import CheckOut from './CheckOut';
import DataCount from './DataCount';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <BurgerProvider> {/* Wrap with BurgerProvider */}
          <Navbar />
          <Routes>
            <Route path="/" element={<BulidBurgur />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/datacount" element={<DataCount />} />
            <Route path="/*" element={<NotFound />} />
            
          </Routes>
        </BurgerProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
