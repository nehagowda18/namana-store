import { useState } from "react";
import StarRating from "./StarRating";

export default function ProductCard({ product, onView, onAddToCart, onAddToWishlist, wishlist }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const isWishlisted = wishlist?.some(i => i.id === product.id);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    onAddToWishlist(product);
  };

  return (
    <div
      onClick={() => onView(product.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(30,28,24,1)" : "rgba(20,18,14,1)",
        border: hovered ? "1px solid rgba(255,210,80,0.35)" : "1px solid rgba(255,255,255,0.06)",
        borderRadius: "4px",
        cursor: "pointer",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered ? "0 16px 40px rgba(0,0,0,0.5)" : "none",
        position: "relative",
      }}
    >
      {/* Category badge */}
      <div style={{
        position: "absolute", top: "10px", left: "10px", zIndex: 2,
        background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)",
        padding: "3px 10px", borderRadius: "1px",
        fontSize: "0.62rem", letterSpacing: "1.5px",
        color: "rgba(255,210,80,0.8)", textTransform: "uppercase",
        fontFamily: "'Syne', sans-serif", fontWeight: 600,
        border: "1px solid rgba(255,210,80,0.2)",
      }}>
        {product.category}
      </div>

      {/* Wishlist heart button */}
      <button
        onClick={handleWishlist}
        style={{
          position: "absolute", top: "10px", right: "10px", zIndex: 2,
          background: isWishlisted ? "rgba(255,100,100,0.9)" : "rgba(0,0,0,0.5)",
          border: "1px solid rgba(255,100,100,0.4)",
          color: isWishlisted ? "#fff" : "rgba(255,100,100,0.7)",
          width: "30px", height: "30px", borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", fontSize: "0.9rem",
          transition: "all 0.2s",
        }}
      >
        {isWishlisted ? "♥" : "♡"}
      </button>

      {/* Image area */}
      <div style={{
        background: "#fff",
        height: "220px",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
        overflow: "hidden",
      }}>
        <img
          src={product.image}
          alt={product.title}
          style={{
            maxHeight: "180px", maxWidth: "100%", objectFit: "contain",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.35s ease",
          }}
        />
      </div>

      {/* Info */}
      <div style={{ padding: "1rem", flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
        <p style={{
          margin: 0, fontSize: "0.82rem",
          color: "rgba(255,255,255,0.85)",
          fontFamily: "'Syne', sans-serif", fontWeight: 500,
          lineHeight: 1.4,
          display: "-webkit-box", WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {product.title}
        </p>

        <StarRating rate={product.rating.rate} count={product.rating.count} />

        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between", marginTop: "auto", paddingTop: "8px"
        }}>
          <span style={{
            fontSize: "1.2rem", fontWeight: 800,
            color: "#FFD250", fontFamily: "'Syne', sans-serif",
            letterSpacing: "-0.5px",
          }}>
            ${product.price.toFixed(2)}
          </span>

          <button
            onClick={handleAdd}
            style={{
              background: added ? "#22c55e" : "rgba(255,210,80,0.1)",
              border: added ? "1.5px solid #22c55e" : "1.5px solid rgba(255,210,80,0.4)",
              color: added ? "#fff" : "#FFD250",
              padding: "6px 14px", borderRadius: "2px", cursor: "pointer",
              fontFamily: "'Syne', sans-serif",
              fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.8px",
              transition: "all 0.2s",
            }}
          >
            {added ? "✓ ADDED" : "+ CART"}
          </button>
        </div>
      </div>
    </div>
  );
}