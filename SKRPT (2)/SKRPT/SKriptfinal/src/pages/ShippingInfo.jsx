import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";

export default function ShippingInfo() {
  const { cart } = useCart();
  const { currency, convert } = useCurrency();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    contact: "",
    name: "",
    surname: "",
    address: "",
    note: "",
    city: "",
    postal: "",
    province: "",
    country: "Italy",
    saveInfo: false,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Email or phone validation (simple)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?\d{7,15}$/;
    if (!form.contact || (!emailRegex.test(form.contact) && !phoneRegex.test(form.contact))) {
      setError("Please enter a valid email or phone number.");
      return;
    }
    if (!form.name.trim()) {
      setError("Name is required.");
      return;
    }
    if (!form.surname.trim()) {
      setError("Second Name is required.");
      return;
    }
    if (!form.address.trim()) {
      setError("Address is required.");
      return;
    }
    if (!form.city.trim()) {
      setError("City is required.");
      return;
    }
    if (!form.postal.trim() || !/^\d{4,10}$/.test(form.postal)) {
      setError("Please enter a valid postal code.");
      return;
    }
    if (!form.province.trim()) {
      setError("Province is required.");
      return;
    }
    if (!form.country.trim()) {
      setError("Country is required.");
      return;
    }
    setError("");
    navigate("/shipping-method");
  };

  if (!cart || cart.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  // Cart summary (show only first item for this step)
  const item = cart[0];
  const subtotal = item ? (item.qty * parseFloat(item.price.replace("$", ""))) : 0;
  const shippingCost = 0;
  const shippingLabel = "Calculated at the next step";

  return (
    <div className="checkout-page">
      <div className="checkout-left">
        {/* Add breadcrumbs here */}
        <div className="checkout-breadcrumbs">
          <span className="checkout-breadcrumb-active">Cart</span>
          <span className="checkout-breadcrumb-sep">{'>'}</span>
          <span className="checkout-breadcrumb-active">Details</span>
          <span className="checkout-breadcrumb-sep">{'>'}</span>
          <span className="checkout-breadcrumb-active">Shipping</span>
          <span className="checkout-breadcrumb-sep">{'>'}</span>
          <span className="checkout-breadcrumb-active">Payment</span>
        </div>
        <form className="checkout-form" onSubmit={handleSubmit} autoComplete="off">
          <div className="checkout-section-title">Contact</div>
          <input
            className="checkout-input"
            type="text"
            name="contact"
            placeholder="Email or mobile phone number"
            value={form.contact}
            onChange={handleChange}
            required
          />
          <div className="checkout-section-title">Shipping Address</div>
          <div className="checkout-row">
            <input
              className="checkout-input"
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              className="checkout-input"
              type="text"
              name="surname"
              placeholder="Second Name"
              value={form.surname}
              onChange={handleChange}
              required
            />
          </div>
          <input
            className="checkout-input"
            type="text"
            name="address"
            placeholder="Address and number"
            value={form.address}
            onChange={handleChange}
            required
          />
          <input
            className="checkout-input"
            type="text"
            name="note"
            placeholder="Shipping note (optional)"
            value={form.note}
            onChange={handleChange}
          />
          <div className="checkout-row">
            <input
              className="checkout-input"
              type="text"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              required
            />
            <input
              className="checkout-input"
              type="text"
              name="postal"
              placeholder="Postal Code"
              value={form.postal}
              onChange={handleChange}
              required
            />
            <input
              className="checkout-input"
              type="text"
              name="province"
              placeholder="Province"
              value={form.province}
              onChange={handleChange}
              required
            />
          </div>
          <div className="checkout-row">
            <select
              className="checkout-input"
              name="country"
              value={form.country}
              onChange={handleChange}
              required
            >
              <option value="Italy">Italy</option>
              <option value="USA">USA</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
            </select>
          </div>
          <div className="checkout-checkbox-row">
            <input
              type="checkbox"
              name="saveInfo"
              checked={form.saveInfo}
              onChange={handleChange}
              id="saveInfo"
            />
            <label htmlFor="saveInfo">
              Save this informations for a future fast checkout
            </label>
          </div>
          {error && <div className="checkout-error">{error}</div>}
          <div className="checkout-buttons-row">
            <button
              type="button"
              className="checkout-back-btn"
              onClick={() => navigate("/cart")}
            >
              Back to cart
            </button>
            <button type="submit" className="checkout-next-btn">
              Go to shipping
            </button>
          </div>
        </form>
      </div>
      <div className="checkout-right checkout-right-bg">
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
                        (sum, item) => sum + item.qty * parseFloat(item.price.replace("$", "")),
                        0
                      )
                      .toFixed(2)
                )}
              </span>
            </div>
            <div className="checkout-summary-row">
              <span>Shipping</span>
              <span className="shipping-next-step">{shippingLabel}</span>
            </div>
            <div className="checkout-summary-row checkout-summary-total">
              <span>Total</span>
              <span>
                {convert(
                  "$" +
                    cart
                      .reduce(
                        (sum, item) => sum + item.qty * parseFloat(item.price.replace("$", "")),
                        0
                      )
                      .toFixed(2)
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}