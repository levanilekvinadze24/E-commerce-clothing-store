import React, { useState } from "react";
import { useCurrency } from "../context/CurrencyContext";

const options = [
  { code: "USD", label: "$ USD" },
  { code: "EUR", label: "€ EUR" },
  { code: "JPY", label: "¥ JPY" },
];

export default function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        style={{
          background: "#fff",
          border: "none",
          fontWeight: 600,
          fontSize: 18,
          cursor: "pointer",
          padding: "8px 16px",
          borderRadius: 4,
          boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
        onClick={() => setOpen((v) => !v)}
      >
        {options.find((o) => o.code === currency).label}
        <span style={{ marginLeft: 8 }}>▼</span>
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "110%",
            background: "#fff",
            borderRadius: 6,
            boxShadow: "0 2px 8px rgba(0,0,0,0.13)",
            zIndex: 100,
            minWidth: 100,
          }}
        >
          {options.map((opt) => (
            <div
              key={opt.code}
              style={{
                padding: "10px 18px",
                cursor: "pointer",
                fontWeight: 500,
                background: currency === opt.code ? "#f6f6f6" : "#fff",
              }}
              onClick={() => {
                setCurrency(opt.code);
                setOpen(false);
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}