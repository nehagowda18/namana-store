import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

export default function RelatedProducts({ category, currentId, onView, onAddToCart, onAddToWishlist, wishlist }) {
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category) return;
    fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`)
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(p => p.id !== currentId).slice(0, 4);
        setRelated(filtered);
      })
      .finally(() => setLoading(false));
  }, [category, currentId]);

  if (loading) return null;
  if (related.length === 0) return null;

  return (
    <div style={{ marginTop: "5rem", paddingTop: "3rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <p style={{
        margin: "0 0 0.4rem",
        fontSize: "0.68rem", letterSpacing: "4px",
        color: "#FFD250", fontFamily: "'Syne', sans-serif",
        textTransform: "uppercase",
      }}>
        YOU MAY ALSO LIKE
      </p>
      <h2 style={{
        margin: "0 0 2rem",
        fontSize: "1.8rem", fontFamily: "'Syne', sans-serif",
        fontWeight: 800, color: "#fff", letterSpacing: "-1px",
      }}>
        Related Products
      </h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "1.2rem",
      }}>
        {related.map((product, i) => (
  <div key={product.id}>
            <ProductCard
              product={product}
              onView={onView}
              onAddToCart={onAddToCart}
              onAddToWishlist={onAddToWishlist}
              wishlist={wishlist}
            />
          </div>
        ))}
      </div>
    </div>
  );
}