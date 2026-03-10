import { useState } from "react";

export default function Navbar({ cartCount, wishlistCount, onCartClick, onWishlistClick, onCategorySelect }) {

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(10, 10, 10, 0.95)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(255,210,80,0.15)",
      padding: "0 2rem",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: "64px",
      fontFamily: "'Syne', sans-serif",
    }}>
      <div
        onClick={() => onCategorySelect("all")}
        style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
        <span style={{ fontSize: "1.6rem", fontWeight: 800, color: "#FFD250", letterSpacing: "-1px" }}>
          NAMANA
        </span>
        <span style={{ fontSize: "1.6rem", fontWeight: 300, color: "#fff", letterSpacing: "4px" }}>
          STORE
        </span>
      </div>

      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {[
          { label: "NEW IN", category: "all" },
          { label: "MEN", category: "men's clothing" },
          { label: "WOMEN", category: "women's clothing" },
          { label: "SALE", category: "electronics" },
        ].map(item => (
          <button
            key={item.label}
            onClick={() => onCategorySelect(item.category)}
            style={{
              background: "none", border: "none",
              color: "rgba(255,255,255,0.6)",
              fontSize: "0.82rem", letterSpacing: "1.5px",
              fontWeight: 500, transition: "color 0.2s",
              cursor: "pointer", fontFamily: "'Syne', sans-serif",
            }}
            onMouseEnter={e => e.target.style.color = "#FFD250"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.6)"}
          >
            {item.label}
          </button>
        ))}

        {/* Wishlist Button */}
        <button onClick={onWishlistClick} style={{
          background: "none", border: "1.5px solid rgba(255,100,100,0.4)",
          color: "rgba(255,100,100,0.8)", padding: "6px 16px", borderRadius: "2px",
          cursor: "pointer", fontFamily: "'Syne', sans-serif",
          fontSize: "0.8rem", letterSpacing: "1px", fontWeight: 600,
          display: "flex", alignItems: "center", gap: "6px",
          transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,100,100,0.8)"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "rgba(255,100,100,0.8)"; }}
        >
          ♡ {wishlistCount > 0 && <span style={{
            background: "rgba(255,100,100,0.8)", color: "#fff", borderRadius: "50%",
            width: "18px", height: "18px", display: "inline-flex",
            alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 800,
          }}>{wishlistCount}</span>}
          Wishlist
        </button>

        {/* Cart Button */}
        <button onClick={onCartClick} style={{
          background: "none", border: "1.5px solid rgba(255,210,80,0.5)",
          color: "#FFD250", padding: "6px 16px", borderRadius: "2px",
          cursor: "pointer", fontFamily: "'Syne', sans-serif",
          fontSize: "0.8rem", letterSpacing: "1px", fontWeight: 600,
          display: "flex", alignItems: "center", gap: "6px",
          transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "#FFD250"; e.currentTarget.style.color = "#000"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#FFD250"; }}
        >
          🛒 {cartCount > 0 && <span style={{
            background: "#FFD250", color: "#000", borderRadius: "50%",
            width: "18px", height: "18px", display: "inline-flex",
            alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 800,
          }}>{cartCount}</span>}
          Cart
        </button>
      </div>
    </nav>
  );
}