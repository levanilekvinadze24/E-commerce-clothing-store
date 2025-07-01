import React from "react";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";
import { useNavigate } from "react-router-dom";

const SIZES = ["XS", "S", "M", "L"]; // <-- Add this line

export default function CartPage() {
  const { cart, changeQty } = useCart();
  const { currency, convert } = useCurrency();
  const navigate = useNavigate();

  if (!cart || cart.length === 0) {
    return (
      <div className="cart-page-container">
        <h1 className="cart-title">CART</h1>
        <div style={{ margin: "40px 0", fontSize: "18px" }}>Your cart is empty.</div>
      </div>
    );
  }

  const total = cart.reduce(
    (sum, item) => sum + item.qty * parseFloat(item.price.replace("$", "")),
    0
  );
  const quantity = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="cart-page-container">
      <h1 className="cart-title">CART</h1>
      <div className="cart-items-list">
        {cart.map((item, idx) => (
          <div className="cart-item-row" key={item.id + item.size + idx}>
            <div className="cart-item-info">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-price">
                <span>{convert(item.price)}</span>
              </div>
              <div className="cart-item-size-label">SIZE:</div>
              <div className="cart-item-sizes">
                {SIZES.map((size) => (
                  <span
                    key={size}
                    className={`cart-item-size-btn${
                      item.size === size ? " selected" : ""
                    }`}
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
            <div className="cart-item-qty-controls">
              <button
                className="cart-item-qty-btn"
                onClick={() => changeQty(item.id, item.size, 1)}
              >
                +
              </button>
              <div className="cart-item-qty">{item.qty}</div>
              <button
                className="cart-item-qty-btn"
                onClick={() => changeQty(item.id, item.size, -1)}
              >
                -
              </button>
            </div>
            <img
              className="cart-item-img"
              src={item.image}
              alt={item.name}
            />
          </div>
        ))}
      </div>
      <div className="cart-summary-row">
        <div>
          Quantity:{" "}
          <span className="cart-summary-value">{quantity}</span>
        </div>
        <div>
          Total:{" "}
          <span className="cart-summary-value">
            {convert("$" + total.toFixed(2))}
          </span>
        </div>
      </div>
      <button
        className="cart-continue-btn"
        onClick={() => navigate("/shipping-info")}
      >
        CONTINUE
      </button>
    </div>
  );
}