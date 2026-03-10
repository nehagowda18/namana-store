import { useState } from "react";

export default function SearchBar({ value, onChange }) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{
      position: "relative",
      maxWidth: "400px",
      width: "100%",
    }}>
      <span style={{
        position: "absolute", left: "14px", top: "50%",
        transform: "translateY(-50%)",
        color: focused ? "#FFD250" : "rgba(255,255,255,0.25)",
        fontSize: "0.9rem",
        pointerEvents: "none",
        transition: "color 0.2s",
      }}>⌕</span>
      <input
        type="text"
        placeholder="Search products..."
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          background: "rgba(255,255,255,0.04)",
          border: focused ? "1.5px solid rgba(255,210,80,0.5)" : "1.5px solid rgba(255,255,255,0.1)",
          borderRadius: "2px",
          padding: "10px 14px 10px 36px",
          color: "#fff",
          fontFamily: "'Syne', sans-serif",
          fontSize: "0.85rem",
          outline: "none",
          boxSizing: "border-box",
          transition: "border-color 0.2s, box-shadow 0.2s",
          boxShadow: focused ? "0 0 0 3px rgba(255,210,80,0.07)" : "none",
        }}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          style={{
            position: "absolute", right: "10px", top: "50%",
            transform: "translateY(-50%)",
            background: "none", border: "none",
            color: "rgba(255,255,255,0.3)", cursor: "pointer",
            fontSize: "1rem", padding: "0",
            lineHeight: 1,
          }}
        >×</button>
      )}
    </div>
  );
}