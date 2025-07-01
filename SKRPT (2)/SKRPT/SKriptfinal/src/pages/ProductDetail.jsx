import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";
import products from "../data/products";

const SIZES = ["XS", "S", "M", "L"];

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { addToCart } = useCart();
  const { convert } = useCurrency();
  // Use the same image three times for thumbnails
  const images = [product?.image, product?.image, product?.image];
  const [mainImage, setMainImage] = useState(images[0]);
  const [selectedSize, setSelectedSize] = useState("S");

  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-detail-container">
      <div className="product-detail-gallery">
        <div className="product-thumbnails">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={product.name}
              className={`product-thumbnail${mainImage === img ? " selected" : ""}`}
              style={{
                marginBottom: 16,
                width: 80,
                height: 80,
                objectFit: "cover",
                borderRadius: 4,
                border: mainImage === img ? "2px solid #5ECE7B" : "1px solid #eee",
                cursor: "pointer",
                background: "#fff",
              }}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
        <div className="product-main-image">
          <img
            src={mainImage}
            alt={product.name}
            style={{
              width: 500,
              height: 500,
              objectFit: "cover",
              borderRadius: 8,
              background: "#fff",
            }}
          />
        </div>
      </div>
      <div className="product-detail-info">
        <h2>{product.name}</h2>
        
        <div className="label">SIZE:</div>
        <div className="product-sizes">
          {SIZES.map((size) => (
            <button
              key={size}
              className={`size-btn${selectedSize === size ? " selected" : ""}`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
        <div className="label" style={{ marginTop: 24 }}>PRICE:</div>
        <div className="price-value">{convert(product.price)}</div>
        <button
          className="product-add-to-cart-btn"
          onClick={e => {
            e.stopPropagation();
            addToCart(product, selectedSize || null);
          }}
        >
          ADD TO CART
        </button>
        <p className="product-description">
          Find stunning women's cocktail dresses and party dresses. Stand out in
          lace and metallic cocktail dresses and party dresses from all your
          favorite brands.
        </p>
      </div>
    </div>
  );
}