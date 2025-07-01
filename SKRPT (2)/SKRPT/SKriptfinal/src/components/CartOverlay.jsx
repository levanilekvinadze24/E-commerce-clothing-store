import React from "react";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";
import { useNavigate } from "react-router-dom";

export default function CartOverlay() {
  const { cart, updateCartItemSize, changeQty, overlayOpen, closeOverlay } = useCart();
  const { convert } = useCurrency();
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.qty * parseFloat(item.price.replace("$", "")),
    0
  );

  if (!overlayOpen) return null;

  return (
    <div className="cart-overlay-bg" onClick={closeOverlay}>
      <div className="cart-overlay" onClick={e => e.stopPropagation()}>
        <div className="cart-overlay-title">
          <b>My Bag</b>, {cart.length} item{cart.length !== 1 ? "s" : ""}
        </div>
        <div className="cart-overlay-items">
          {cart.map((item, idx) => (
            <div className="cart-overlay-item" key={item.id + item.size + idx}>
              <div className="cart-overlay-info">
                <div className="cart-overlay-name" style={{ fontWeight: 700, fontSize: 18 }}>
                  {item.name}
                </div>
                <div className="cart-overlay-price" style={{ fontWeight: 700, fontSize: 18, margin: "8px 0" }}>
                  {convert(item.price)}
                </div>
                <div className="cart-overlay-size-label" style={{ fontSize: 14, marginBottom: 4 }}>Size:</div>
                <div className="cart-overlay-size-btns">
                  {["XS", "S", "M", "L"].map((size) => (
                    <button
                      key={size}
                      className={`cart-overlay-size-btn${item.size === size ? " selected" : ""}`}
                      onClick={() => {
                        if (item.size !== size) updateCartItemSize(item.id, item.size, size);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div className="cart-overlay-controls-img" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div className="cart-overlay-controls" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <button className="cart-overlay-qty-btn" style={{
                    width: 32, height: 32, fontSize: 20, border: "1px solid #222", background: "#fff", cursor: "pointer"
                  }} onClick={() => changeQty(item.id, item.size, 1)}>+</button>
                  <div className="cart-overlay-qty" style={{ fontWeight: 600, fontSize: 16 }}>{item.qty}</div>
                  <button className="cart-overlay-qty-btn" style={{
                    width: 32, height: 32, fontSize: 20, border: "1px solid #222", background: "#fff", cursor: "pointer"
                  }} onClick={() => changeQty(item.id, item.size, -1)}>-</button>
                </div>
                <img className="cart-overlay-img" src={item.image} alt={item.name} style={{
                  width: 105, height: 137, objectFit: "cover", borderRadius: 4
                }} />
              </div>
            </div>
          ))}
        </div>
        <div className="cart-overlay-total-row" style={{
          display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: 700, fontSize: 18, margin: "24px 0 16px"
        }}>
          <span>Total</span>
          <span>{convert("$" + total.toFixed(2))}</span>
        </div>
        <div className="cart-overlay-actions" style={{ display: "flex", gap: 12 }}>
          <button
            className="cart-overlay-viewbag"
            style={{
              flex: 1,
              border: "1.5px solid #222",
              background: "#fff",
              color: "#222",
              fontWeight: 700,
              fontSize: 16,
              padding: "14px 0",
              borderRadius: 2,
              cursor: "pointer"
            }}
            onClick={() => {
              closeOverlay();
              navigate("/cart");
            }}
          >
            VIEW BAG
          </button>
          <button
            className="checkout-btn"
            style={{
              flex: 1,
              border: "none",
              background: "#5ECE7B",
              color: "#fff",
              fontWeight: 700,
              fontSize: 16,
              padding: "14px 0",
              borderRadius: 2,
              cursor: "pointer"
            }}
            onClick={() => navigate("/shipping-info")}
          >
            CHECK OUT
          </button>
        </div>
      </div>
    </div>
  );
}