import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";

export default function Confirmation() {
  const { cart = [], clearCart } = useCart();
  const { convert } = useCurrency();
  const navigate = useNavigate();

  const shipping = localStorage.getItem("selectedShipping") || "standard";
  const shippingLabel = shipping === "standard" ? "Free Shipping" : "Express Shipping";
  const shippingCost = shipping === "standard" ? 0 : 4.99;

  // Store cart snapshot on mount
  const [cartSnapshot] = useState(() => [...cart]);

  useEffect(() => {
    if (cart.length > 0 && typeof clearCart === "function") {
      clearCart();
    }
    // eslint-disable-next-line
  }, []);

  // Use cartSnapshot for rendering, never show "Your order is empty"
  return (
    <div className="checkout-page">
      <div className="checkout-left confirmation-left">
        <div className="checkout-breadcrumbs">
          <span className="checkout-breadcrumb-active">Cart</span>
          <span> &gt; </span>
          <span className="checkout-breadcrumb-active">Details</span>
          <span> &gt; </span>
          <span className="checkout-breadcrumb-active">Shipping</span>
          <span> &gt; </span>
          <span className="checkout-breadcrumb-active">Payment</span>
        </div>
        <div className="confirmation-center">
          <div className="confirmation-check">
            <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
              <circle cx="45" cy="45" r="40" stroke="#5ECE7B" strokeWidth="4" fill="#fff"/>
              <path d="M30 47L42 59L62 35" stroke="#5ECE7B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="confirmation-title-main">Payment Confirmed</div>
          <div className="confirmation-order-id">ORDER #2039</div>
          <button className="confirmation-back-btn" onClick={() => navigate("/")}>
            Back to shopping
          </button>
        </div>
      </div>
      <div className="checkout-right checkout-right-bg">
        {cartSnapshot.map((item) => (
          <div className="checkout-summary" key={item.id + (item.size || "")}>
            <div className="checkout-summary-product">
              <img src={item.image} alt={item.name} className="checkout-summary-img" />
              <div>
                <div className="checkout-summary-qty">{item.qty}</div>
              </div>
              <div>
                <div className="checkout-summary-name">{item.name}</div>
                <div className="checkout-summary-price">{convert(item.price)}</div>
              </div>
            </div>
            <div className="checkout-summary-table">
              <div className="checkout-summary-row">
                <span>Subtotal</span>
                <span>
                  {convert(
                    "$" + (item.qty * parseFloat(item.price.replace("$", ""))).toFixed(2)
                  )}
                </span>
              </div>
              <div className="checkout-summary-row">
                <span>Shipping</span>
                <span>{shippingLabel}</span>
              </div>
              <div className="checkout-summary-row">
                <span>Paid</span>
                <span className="confirmation-paid">
                  {convert(
                    "$" + ((item.qty * parseFloat(item.price.replace("$", ""))) + shippingCost).toFixed(2)
                  )}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}