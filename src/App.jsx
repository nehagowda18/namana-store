import { useState } from "react";
import Navbar from "./components/Navbar";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import WishlistDrawer from "./components/WishlistDrawer";

export default function App() {
  const [page, setPage] = useState("list");
  const [selectedId, setSelectedId] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const addToWishlist = (product) => {
    setWishlist(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.filter(i => i.id !== product.id);
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist(prev => prev.filter(i => i.id !== id));
  };

  const moveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  const viewProduct = (id) => {
    setSelectedId(id);
    setPage("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const wishlistCount = wishlist.length;

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a08" }}>
      <Navbar
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        onCartClick={() => { setCartOpen(o => !o); setWishlistOpen(false); }}
        onWishlistClick={() => { setWishlistOpen(o => !o); setCartOpen(false); }}
        onCategorySelect={(cat) => {
          setPage("list");
          setSelectedCategory(cat);
        }}
      />

      {/* Wishlist Drawer */}
      {wishlistOpen && (
        <WishlistDrawer
          wishlist={wishlist}
          onClose={() => setWishlistOpen(false)}
          onRemove={removeFromWishlist}
          onMoveToCart={moveToCart}
        />
      )}

      {/* Cart Drawer */}
      {cartOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", justifyContent: "flex-end" }}>
          <div onClick={() => setCartOpen(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)" }} />
          <div style={{
            position: "relative", width: "360px", background: "#111009",
            borderLeft: "1px solid rgba(255,210,80,0.12)",
            display: "flex", flexDirection: "column", overflowY: "auto",
          }}>
            <div style={{ padding: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 800, fontSize: "1rem", color: "#fff", fontFamily: "'Syne', sans-serif" }}>CART ({cartCount})</span>
              <button onClick={() => setCartOpen(false)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: "1.3rem" }}>×</button>
            </div>

            {cart.length === 0 ? (
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.2)", fontSize: "0.8rem", letterSpacing: "2px", fontFamily: "'Syne', sans-serif" }}>
                YOUR CART IS EMPTY
              </div>
            ) : (
              <>
                <div style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
                  {cart.map(item => (
                    <div key={item.id} style={{ display: "flex", gap: "12px", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <div style={{ background: "#fff", borderRadius: "2px", padding: "6px", width: "54px", height: "54px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <img src={item.image} alt={item.title} style={{ maxWidth: "42px", maxHeight: "42px", objectFit: "contain" }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ margin: "0 0 4px", fontSize: "0.75rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: "'Syne', sans-serif" }}>{item.title}</p>
                        <p style={{ margin: 0, fontSize: "0.8rem", color: "#FFD250", fontWeight: 700, fontFamily: "'Syne', sans-serif" }}>×{item.qty} · ${(item.price * item.qty).toFixed(2)}</p>
                      </div>
                      <button onClick={() => setCart(prev => prev.filter(i => i.id !== item.id))} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.2)", cursor: "pointer", fontSize: "1rem", alignSelf: "center" }}>×</button>
                    </div>
                  ))}
                </div>
                <div style={{ padding: "1.2rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                    <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.8rem", letterSpacing: "1px", fontFamily: "'Syne', sans-serif" }}>TOTAL</span>
                    <span style={{ color: "#FFD250", fontWeight: 800, fontSize: "1.1rem", fontFamily: "'Syne', sans-serif" }}>${cartTotal.toFixed(2)}</span>
                  </div>
                  <button style={{
                    width: "100%", padding: "13px", background: "#FFD250",
                    border: "none", borderRadius: "2px", color: "#000",
                    fontFamily: "'Syne', sans-serif", fontWeight: 800,
                    fontSize: "0.82rem", letterSpacing: "2px", cursor: "pointer",
                  }}>CHECKOUT</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Pages */}
      {page === "list" && (
        <ProductListPage
          onViewProduct={viewProduct}
          onAddToCart={addToCart}
          onAddToWishlist={addToWishlist}
          wishlist={wishlist}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      )}
      {page === "detail" && (
        <ProductDetailPage
  productId={selectedId}
  onBack={() => { setPage("list"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
  onAddToCart={addToCart}
  onAddToWishlist={addToWishlist}
  wishlist={wishlist}
  onView={viewProduct}
/>
      )}

      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "2rem", textAlign: "center",
        color: "rgba(255,255,255,0.15)",
        fontSize: "0.7rem", letterSpacing: "2px",
        fontFamily: "'Syne', sans-serif", marginTop: "4rem",
      }}>
        NAMANA STORE · POWERED BY FAKESTOREAPI.COM
      </footer>
    </div>
  );
}