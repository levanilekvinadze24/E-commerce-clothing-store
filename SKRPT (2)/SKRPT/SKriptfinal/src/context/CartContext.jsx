import React, { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [overlayOpen, setOverlayOpen] = useState(false);

  function addToCart(product, size) {
    setCart((prev) => {
      const normSize = size || null;
      const idx = prev.findIndex(
        (item) =>
          item.id === product.id &&
          (item.size || null) === normSize
      );
      if (idx > -1) {
        const updated = [...prev];
        updated[idx].qty += 1;
        return updated;
      }
      return [...prev, { ...product, size: normSize, qty: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  // This function handles both + and - buttons
  function changeQty(id, size, delta) {
    const normSize = size || null;
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id && (item.size || null) === normSize
            ? { ...item, qty: item.qty + delta }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  }

  function updateCartItemSize(id, oldSize, newSize) {
    setCart((prev) => {
      // Find the item with id and oldSize
      const idx = prev.findIndex(
        (item) => item.id === id && (item.size || null) === (oldSize || null)
      );
      if (idx === -1) return prev;
      // If another item with same id and newSize exists, merge qty
      const mergeIdx = prev.findIndex(
        (item, i) => i !== idx && item.id === id && item.size === newSize
      );
      if (mergeIdx > -1) {
        const updated = [...prev];
        updated[mergeIdx].qty += updated[idx].qty;
        updated.splice(idx, 1);
        return updated;
      }
      // Otherwise, just update the size
      const updated = [...prev];
      updated[idx] = { ...updated[idx], size: newSize };
      return updated;
    });
  }

  function closeOverlay() {
    setOverlayOpen(false);
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        changeQty,
        overlayOpen,
        setOverlayOpen,
        closeOverlay,
        updateCartItemSize,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default function CartOverlay() {
  const { cart, changeQty, updateCartItemSize } = useCart();

  return (
    <div>
      {cart.map((product) => (
        <div key={product.id}>
          <span>{product.name}</span>
          <button onClick={() => changeQty(product.id, -1)}>-</button>
          <span>{product.qty}</span>
          <button onClick={() => changeQty(product.id, 1)}>+</button>
        </div>
      ))}
    </div>
  );
}
