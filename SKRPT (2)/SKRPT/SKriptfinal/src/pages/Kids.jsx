import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";
import products from "../data/products";

export default function Kids() {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { convert } = useCurrency();

  return (
    <div>
      <h1 className="category-title">Kids</h1>
      <div className="product-grid">
        {products
          .filter((product) => product.category === "kids")
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
                    e.stopPropagation();
                    addToCart(product, null);
                  }}
                >
                  {/* ...icon... */}
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}