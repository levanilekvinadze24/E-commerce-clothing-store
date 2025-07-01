import React, { useEffect, useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import { NavLink } from "react-router-dom";
import CurrencySwitcher from "./CurrencySwitcher";

export default function Header() {
  const { cart, setOverlayOpen } = useCart();
  const [animate, setAnimate] = useState(false);
  const prevCount = useRef(cart.length);

  // Animate badge when cart count increases
  useEffect(() => {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    if (count > prevCount.current) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 400); // Animation duration
    }
    prevCount.current = count;
  }, [cart]);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <nav className="main-nav">
      <div className="nav-links">
        <NavLink to="/" className="nav-link">WOMEN</NavLink>
        <NavLink to="/men" className="nav-link">MEN</NavLink>
        <NavLink to="/kids" className="nav-link">KIDS</NavLink>
      </div>
      <div className="nav-center">
        <img
          src="/images/Brand icon.png"
          alt="Brand Logo"
          className="logo"
          style={{ height: 28, width: 28, objectFit: "contain" }}
        />
      </div>
      <div className="nav-actions" style={{ position: "relative" }}>
        <CurrencySwitcher />
        <div style={{ position: "relative", display: "inline-block" }}>
          <img
            src="/images/Empty Cart.png"
            alt="Cart"
            className="cart-icon"
            onClick={() => setOverlayOpen(true)}
            style={{ cursor: "pointer", height: 22, width: 22, objectFit: "contain" }}
          />
          {cartCount > 0 && (
            <span
              className={`cart-badge${animate ? " cart-badge-animate" : ""}`}
              style={{
                position: "absolute",
                top: -10,
                right: -10,
                background: "#222",
                color: "#fff",
                borderRadius: "50%",
                width: 24,
                height: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 16,
                transition: "transform 0.2s",
                zIndex: 2,
              }}
            >
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}