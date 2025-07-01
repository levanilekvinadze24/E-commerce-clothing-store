import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";

export default function Payment() {
  const { cart } = useCart();
  const { convert } = useCurrency();
  const navigate = useNavigate();

  // Simulate previous info
  const contact = "joe.spagnuolo@uxbly.com";
  const address = "Via Firenze 23, 92023, Campobello di Licata AG, Italia";
  const shipping = localStorage.getItem("selectedShipping") || "standard";
  const shippingLabel = shipping === "standard" ? "Free Shipping" : "Express Shipping";
  const shippingCost = shipping === "standard" ? 0 : 4.99;

  const [form, setForm] = useState({
    card: "",
    name: "",
    exp: "",
    cvv: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  function validateCard(form) {
    const cardNumberRegex = /^\d{16}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvRegex = /^\d{3,4}$/;
    if (!cardNumberRegex.test(form.card)) {
      return "Card number must be 16 digits.";
    }
    if (!form.name.trim()) {
      return "Card holder name is required.";
    }
    if (!expiryRegex.test(form.exp)) {
      return "Expiration must be in MM/YY format.";
    }
    // Check if expiry is in the future
    const [mm, yy] = form.exp.split("/");
    const expDate = new Date(`20${yy}`, mm);
    const now = new Date();
    if (expDate < now) {
      return "Card is expired.";
    }
    if (!cvvRegex.test(form.cvv)) {
      return "CVV must be 3 or 4 digits.";
    }
    return "";
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validateCard(form);
    if (err) {
      setError(err);
      return;
    }
    setError("");
    // Continue to confirmation
    navigate("/confirmation");
  };

  const item = cart[0];
  const subtotal = item ? (item.qty * parseFloat(item.price.replace("$", ""))) : 0;
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
            <span className="checkout-breadcrumb-active">Payment</span>
          </div>
          <div className="shipping-contact-box">
            <div className="shipping-contact-row">
              <span className="shipping-contact-label">Contact</span>
              <span className="shipping-contact-value">{contact}</span>
            </div>
            <div className="shipping-contact-row">
              <span className="shipping-contact-label">Ship to</span>
              <span className="shipping-contact-value">{address}</span>
            </div>
            <div className="shipping-contact-row">
              <span className="shipping-contact-label">Method</span>
              <span className="shipping-contact-value">{shipping}</span>
            </div>
          </div>
          <div className="checkout-section-title" style={{marginTop: 32}}>Payment method</div>
          <form className="payment-form" onSubmit={handleSubmit} autoComplete="off">
            <div className="payment-card-header">
              <span className="payment-card-icon">
                <svg width="24" height="24" fill="none"><rect x="2" y="6" width="20" height="12" rx="2" fill="#fff"/><rect x="2" y="6" width="20" height="12" rx="2" stroke="#5ECE7B" strokeWidth="2"/><rect x="2" y="10" width="20" height="2" fill="#5ECE7B"/></svg>
              </span>
              <span className="payment-card-title">Credit Card</span>
            </div>
            <div className="payment-card-body">
              <div className="payment-input-row">
                <input
                  className="payment-input"
                  type="text"
                  name="card"
                  placeholder="Card Number"
                  value={form.card}
                  onChange={handleChange}
                  maxLength={19}
                />
                <span className="payment-input-icon">
                  <svg width="18" height="18" fill="none"><rect x="3" y="7" width="12" height="8" rx="2" stroke="#888" strokeWidth="1.5"/><rect x="7" y="11" width="4" height="2" rx="1" fill="#888"/></svg>
                </span>
              </div>
              <div className="payment-input-row">
                <input
                  className="payment-input"
                  type="text"
                  name="name"
                  placeholder="Holder Name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div className="payment-input-row payment-input-row-split">
                <input
                  className="payment-input"
                  type="text"
                  name="exp"
                  placeholder="Expiration (MM/YY)"
                  value={form.exp}
                  onChange={handleChange}
                  maxLength={5}
                />
                <input
                  className="payment-input"
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={form.cvv}
                  onChange={handleChange}
                  maxLength={4}
                />
                <span className="payment-input-icon payment-input-icon-cvv">
                  <svg width="18" height="18" fill="none"><circle cx="9" cy="9" r="8" stroke="#888" strokeWidth="1.5"/><rect x="8" y="5" width="2" height="5" rx="1" fill="#888"/><circle cx="9" cy="13" r="1" fill="#888"/></svg>
                </span>
              </div>
            </div>
            {error && <div className="checkout-error">{error}</div>}
            <div className="checkout-buttons-row">
              <button
                type="button"
                className="checkout-back-btn"
                onClick={() => navigate("/shipping-method")}
              >
                Back to shipping
              </button>
              <button type="submit" className="checkout-next-btn">
                Pay now
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="checkout-right checkout-right-bg">
        {item && (
          <div className="checkout-summary">
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
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="checkout-summary-row">
                <span>Shipping</span>
                <span>{shippingLabel}</span>
              </div>
              <div className="checkout-summary-row checkout-summary-total">
                <span>Total</span>
                <span>{convert("$" + ((item.qty * parseFloat(item.price.replace("$", ""))) + shippingCost).toFixed(2))}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}