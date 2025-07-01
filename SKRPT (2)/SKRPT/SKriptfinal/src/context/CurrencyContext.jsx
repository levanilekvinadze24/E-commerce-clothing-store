import React, { createContext, useContext, useState } from "react";

const CurrencyContext = createContext();

const rates = {
  USD: 1,
  EUR: 0.93,
  JPY: 157.5,
};

const symbols = {
  USD: "$",
  EUR: "€",
  JPY: "¥",
};

export function useCurrency() {
  return useContext(CurrencyContext);
}

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState("USD");

  function convert(price) {
    const num = parseFloat(price.replace(/[^0-9.]/g, ""));
    const converted = num * rates[currency];
    return symbols[currency] + converted.toFixed(2);
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convert }}>
      {children}
    </CurrencyContext.Provider>
  );
}