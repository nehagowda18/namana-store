export default function WishlistDrawer({ wishlist, onClose, onRemove, onMoveToCart }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", justifyContent: "flex-end" }}>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      />

      {/* Drawer */}
      <div style={{
        position: "relative", width: "380px", background: "#111009",
        borderLeft: "1px solid rgba(255,100,100,0.15)",
        display: "flex", flexDirection: "column", overflowY: "auto",
      }}>

        {/* Header */}
        <div style={{
          padding: "1.5rem",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex", justifyContent: "space-between", alignItems: "center"
        }}>
          <span style={{
            fontWeight: 800, fontSize: "1rem", color: "#fff",
            fontFamily: "'Syne', sans-serif", letterSpacing: "1px"
          }}>
            ♡ WISHLIST ({wishlist.length})
          </span>
          <button
            onClick={onClose}
            style={{
              background: "none", border: "none",
              color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: "1.3rem"
            }}>×</button>
        </div>

        {/* Empty State */}
        {wishlist.length === 0 ? (
          <div style={{
            flex: 1, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: "0.5rem",
            color: "rgba(255,255,255,0.2)", fontFamily: "'Syne', sans-serif"
          }}>
            <span style={{ fontSize: "2.5rem" }}>♡</span>
            <p style={{ fontSize: "0.8rem", letterSpacing: "2px" }}>YOUR WISHLIST IS EMPTY</p>
          </div>
        ) : (
          <div style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
            {wishlist.map(item => (
              <div key={item.id} style={{
                display: "flex", gap: "12px",
                padding: "12px 0",
                borderBottom: "1px solid rgba(255,255,255,0.05)"
              }}>
                {/* Image */}
                <div style={{
                  background: "#fff", borderRadius: "2px", padding: "6px",
                  width: "64px", height: "64px",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                }}>
                  <img
                    src={item.image} alt={item.title}
                    style={{ maxWidth: "50px", maxHeight: "50px", objectFit: "contain" }}
                  />
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    margin: "0 0 4px", fontSize: "0.75rem",
                    color: "rgba(255,255,255,0.75)", lineHeight: 1.3,
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                    fontFamily: "'Syne', sans-serif"
                  }}>{item.title}</p>
                  <p style={{
                    margin: "0 0 8px", fontSize: "0.85rem",
                    color: "#FFD250", fontWeight: 800,
                    fontFamily: "'Syne', sans-serif"
                  }}>${item.price.toFixed(2)}</p>

                  {/* Buttons */}
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button
                      onClick={() => onMoveToCart(item)}
                      style={{
                        background: "#FFD250", border: "none",
                        color: "#000", padding: "4px 10px",
                        borderRadius: "2px", cursor: "pointer",
                        fontFamily: "'Syne', sans-serif",
                        fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.8px"
                      }}>
                      + MOVE TO CART
                    </button>
                    <button
                      onClick={() => onRemove(item.id)}
                      style={{
                        background: "none",
                        border: "1px solid rgba(255,100,100,0.3)",
                        color: "rgba(255,100,100,0.7)", padding: "4px 10px",
                        borderRadius: "2px", cursor: "pointer",
                        fontFamily: "'Syne', sans-serif",
                        fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.8px"
                      }}>
                      REMOVE
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}