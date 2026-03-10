import { useState, useMemo } from "react";
import { useProducts } from "../hooks/useProducts";
import { filterProducts, sortProducts } from "../utils/productUtils";
import CategoryFilter from "../components/CategoryFilter";
import SearchBar from "../components/SearchBar";
import SortSelect from "../components/SortSelect";
import ProductGrid from "../components/ProductGrid";

export default function ProductListPage({ onViewProduct, onAddToCart, onAddToWishlist, wishlist, selectedCategory, onCategoryChange }) {
  const { products, categories, loading, error } = useProducts();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const filtered = useMemo(() => {
    const f = filterProducts(products, { category: selectedCategory, search });
    return sortProducts(f, sortBy);
  }, [products, selectedCategory, search, sortBy]);

  if (error) {
    return (
      <div style={{
        textAlign: "center", padding: "8rem 2rem",
        color: "rgba(255,80,80,0.8)",
        fontFamily: "'Syne', sans-serif",
      }}>
        <p style={{ fontSize: "1.1rem" }}>{error}</p>
        <button
          onClick={() => window.location.reload()}
          style={{
            marginTop: "1rem",
            padding: "10px 24px",
            background: "none",
            border: "1.5px solid rgba(255,80,80,0.4)",
            color: "rgba(255,80,80,0.8)",
            cursor: "pointer",
            fontFamily: "'Syne', sans-serif",
            borderRadius: "2px",
          }}
        >
          RETRY
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "2rem" }}>
      <div style={{
        padding: "3rem 0 2rem",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        marginBottom: "1.5rem",
      }}>
        <p style={{
          margin: "0 0 0.4rem",
          fontSize: "0.72rem", letterSpacing: "4px",
          color: "#FFD250", fontFamily: "'Syne', sans-serif",
          textTransform: "uppercase",
        }}>
          CURATED COLLECTION
        </p>
        <h1 style={{
          margin: 0, fontSize: "clamp(2rem, 4vw, 3.2rem)",
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          color: "#fff", lineHeight: 1.1, letterSpacing: "-1.5px",
        }}>
          All Products
        </h1>
        <p style={{
          margin: "0.6rem 0 0",
          color: "rgba(255,255,255,0.35)",
          fontSize: "0.88rem",
          fontFamily: "'DM Mono', monospace",
        }}>
          {loading ? "Loading..." : `${filtered.length} items`}
        </p>
      </div>

      <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        onSelect={onCategoryChange}
      />

      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap", gap: "1rem",
        marginBottom: "2rem",
      }}>
        <SearchBar value={search} onChange={setSearch} />
        <SortSelect value={sortBy} onChange={setSortBy} />
      </div>

      <ProductGrid
        products={filtered}
        loading={loading}
        onView={onViewProduct}
        onAddToCart={onAddToCart}
        onAddToWishlist={onAddToWishlist}
        wishlist={wishlist}
      />
    </div>
  );
}