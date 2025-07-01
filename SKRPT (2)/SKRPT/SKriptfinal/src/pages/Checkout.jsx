import React from "react";
import { useCurrency } from "../context/CurrencyContext";

export default function Checkout() {
  const { convert } = useCurrency();

  return (
    <div>
      <h1>Checkout Page</h1>
      {/* Add your checkout content here */}
      <span>{convert(item.price)}</span>
      <span>{convert("$" + total.toFixed(2))}</span>
    </div>
  );
}