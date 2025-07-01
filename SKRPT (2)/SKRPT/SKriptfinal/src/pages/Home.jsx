import React from "react";
import products from "../data/products";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useCurrency } from "../context/CurrencyContext";

export default function Home() {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { convert } = useCurrency();

  return (
    <div>
      <h1 className="category-title">Category name</h1>
      <div className="product-grid">
        {products
          .filter((product) => product.category === "women")
          .map((product) => (
            <div
              className={`product-card${!product.inStock ? " out-of-stock" : ""}`}
              key={product.id}
              onClick={() => product.inStock && navigate(`/product/${product.id}`)}
              style={{ cursor: product.inStock ? "pointer" : "default" }}
            >
              <div
                className="product-image"
                style={{ backgroundImage: `url(${product.image})` }}
              >
                {!product.inStock && (
                  <div className="out-of-stock-overlay">OUT OF STOCK</div>
                )}
              </div>
              <div className="product-info">
                <div className="product-name">{product.name}</div>
                <div className="product-price">
                  <span>{convert(product.price)}</span>
                </div>
              </div>
              {product.inStock && (
                <button
                  className="add-to-cart-btn"
                  aria-label="Add to cart"
                  onClick={e => {
                    e.stopPropagation(); // Prevents parent click events
                    addToCart(product, null);
                  }}
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.16 14l.84-2h7.45c.75 0 1.41-.41 1.75-1.03l3.24-5.88A1 1 0 0 0 20.25 4H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12z" />
                  </svg>
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}