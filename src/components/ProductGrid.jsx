import ProductCard from "./ProductCard";

export default function ProductGrid({ products, loading, onView, onAddToCart, onAddToWishlist, wishlist }) {
  if (loading) {
    return (
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: "1.2rem",
      }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "4px",
            height: "360px",
            animation: "pulse 1.5s infinite ease-in-out",
          }} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div style={{
        textAlign: "center", padding: "6rem 0",
        color: "rgba(255,255,255,0.3)",
        fontFamily: "'Syne', sans-serif",
      }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>∅</div>
        <p style={{ fontSize: "1rem", letterSpacing: "2px" }}>NO PRODUCTS FOUND</p>
      </div>
    );
  }

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
      gap: "1.2rem",
    }}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onView={onView}
          onAddToCart={onAddToCart}
          onAddToWishlist={onAddToWishlist}
          wishlist={wishlist}
        />
      ))}
    </div>
  );
}