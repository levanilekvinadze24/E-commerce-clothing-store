import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import CartOverlay from "./components/CartOverlay";
import Header from "./components/Header";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import ShippingInfo from "./pages/ShippingInfo";
import ShippingMethod from "./pages/ShippingMethod";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import Payment from "./pages/Payment";
import Men from "./pages/Men";
import Kids from "./pages/Kids";
import "./styles/global.css";

function App() {
  return (
    <CurrencyProvider>
      <CartProvider>
        <Router>
          <Header /> {/* Always visible at the top */}
          <CartOverlay />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/shipping-info" element={<ShippingInfo />} />
            <Route path="/shipping-method" element={<ShippingMethod />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/men" element={<Men />} />
            <Route path="/kids" element={<Kids />} />
          </Routes>
        </Router>
      </CartProvider>
    </CurrencyProvider>
  );
}

export default App;
