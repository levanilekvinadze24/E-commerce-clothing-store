import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";

export default function ShippingMethod() {
  const { cart } = useCart();
  const { convert } = useCurrency();
  const navigate = useNavigate();

  // Simulate contact and address from previous step
  const contact = "joe.spagnuolo@uxbly.com";
  const address = "Via Firenze 23, 92023, Campobello di Licata AG, Italia";

  const [shipping, setShipping] = useState("standard");

  // Cart summary (show only first item for this step)
  const item = cart[0];
  const subtotal = item ? (item.qty * parseFloat(item.price.replace("$", ""))) : 0;
  const shippingCost = shipping === "standard" ? 0 : 4.99;
  const shippingLabel = shipping === "standard" ? "Free Shipping" : "Express Shipping";
  const shippingDisplay = shipping === "standard" ? "Free" : "4.99$";
  const total = subtotal + shippingCost;

  return (
    <div className="checkout-page">
      <div className="checkout-left">
        <div className="shipping-method-form-box">
          <div className="checkout-breadcrumbs">
            <span className="checkout-breadcrumb-active">Cart</span>
            <span> &gt; </span>
            <span className="checkout-breadcrumb-active">Details</span>
            <span> &gt; </span>
            <span className="checkout-breadcrumb-active">Shipping</span>
            <span> &gt; </span>
            <span>Payment</span>
          </div>
          <div className="shipping-contact-box">
            <div className="shipping-contact-row">
              <span className="shipping-contact-label">Contact:</span>
              <span className="shipping-contact-value">{contact}</span>
            </div>
            <div className="shipping-contact-row">
              <span className="shipping-contact-label">Ship to</span>
              <span className="shipping-contact-value">{address}</span>
            </div>
          </div>
          <div className="checkout-section-title" style={{marginTop: 32}}>Shipping method</div>
          <div className="shipping-method-list">
            <label className={`shipping-method-option${shipping === "standard" ? " selected" : ""}`}>
              <input
                type="radio"
                name="shipping"
                value="standard"
                checked={shipping === "standard"}
                onChange={() => setShipping("standard")}
              />
              <span className="shipping-method-name">Standard Shipping</span>
              <span className="shipping-method-price">Free</span>
            </label>
            <label className={`shipping-method-option${shipping === "express" ? " selected" : ""}`}>
              <input
                type="radio"
                name="shipping"
                value="express"
                checked={shipping === "express"}
                onChange={() => setShipping("express")}
              />
              <span className="shipping-method-name">Express Shipping</span>
              <span className="shipping-method-price">4.99$</span>
            </label>
          </div>
          <div className="checkout-buttons-row">
            <button
              type="button"
              className="checkout-back-btn"
              onClick={() => navigate("/shipping-info")}
            >
              Back to details
            </button>
            <button
              className="checkout-next-btn"
              onClick={() => {
                localStorage.setItem("selectedShipping", shipping);
                navigate("/payment");
              }}
            >
              Go to payment
            </button>
          </div>
        </div>
      </div>
      <div className="checkout-right checkout-right-bg">
        {cart && cart.length > 0 && (
          <div className="checkout-summary">
            {cart.map((item, idx) => (
              <div className="checkout-summary-product" key={item.id + (item.size || "") + idx}>
                <img src={item.image} alt={item.name} className="checkout-summary-img" />
                <div>
                  <div className="checkout-summary-qty">{item.qty}</div>
                </div>
                <div>
                  <div className="checkout-summary-name">{item.name}</div>
                  <div className="checkout-summary-price">{convert(item.price)}</div>
                </div>
              </div>
            ))}
            <div className="checkout-summary-table">
              <div className="checkout-summary-row">
                <span>Subtotal</span>
                <span>
                  {convert(
                    "$" +
                      cart
                        .reduce(
                          (sum, item) =>
                            sum + item.qty * parseFloat(item.price.replace("$", "")),
                          0
                        )
                        .toFixed(2)
                  )}
                </span>
              </div>
              <div className="checkout-summary-row">
                <span>Shipping</span>
                <span>{shippingLabel}</span>
              </div>
              <div className="checkout-summary-row checkout-summary-total">
                <span>Total</span>
                <span>
                  {convert(
                    "$" +
                      (
                        cart.reduce(
                          (sum, item) =>
                            sum + item.qty * parseFloat(item.price.replace("$", "")),
                          0
                        ) + shippingCost
                      ).toFixed(2)
                  )}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}