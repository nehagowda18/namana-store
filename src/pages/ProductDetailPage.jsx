import { useState } from "react";
import { useProduct } from "../hooks/useProducts";
import StarRating from "../components/StarRating";
import RelatedProducts from "../components/RelatedProducts";

export default function ProductDetailPage({ productId, onBack, onAddToCart, onAddToWishlist, wishlist, onView }) {
  const { product, loading, error } = useProduct(productId);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [imgZoomed, setImgZoomed] = useState(false);
  const [selectedSize, setSelectedSize] = useState("M");
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "4rem 2rem" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem",
        }}>
          {[1, 2].map(i => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.03)",
              borderRadius: "4px", height: "500px",
              animation: "pulse 1.5s infinite ease-in-out",
            }} />
          ))}
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ textAlign: "center", padding: "8rem", color: "rgba(255,80,80,0.7)", fontFamily: "'Syne',sans-serif" }}>
        <p>{error || "Product not found."}</p>
        <button onClick={onBack} style={{
          marginTop: "1rem", padding: "10px 24px",
          background: "none", border: "1.5px solid rgba(255,255,255,0.2)",
          color: "#fff", cursor: "pointer", fontFamily: "'Syne',sans-serif",
          borderRadius: "2px",
        }}>← BACK</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: "8px",
        marginBottom: "2.5rem", marginTop: "1rem",
      }}>
        <button onClick={onBack} style={{
          background: "none", border: "none",
          color: "rgba(255,255,255,0.4)", cursor: "pointer",
          fontFamily: "'Syne', sans-serif", fontSize: "0.78rem",
          letterSpacing: "1px", padding: 0, transition: "color 0.2s",
        }}
          onMouseEnter={e => e.target.style.color = "#FFD250"}
          onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.4)"}
        >
          ← ALL PRODUCTS
        </button>
        <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "0.7rem" }}>/</span>
        <span style={{
          fontSize: "0.72rem", letterSpacing: "1px",
          color: "rgba(255,210,80,0.6)", textTransform: "capitalize",
          fontFamily: "'Syne', sans-serif",
        }}>
          {product.category}
        </span>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "minmax(280px, 480px) 1fr",
        gap: "4rem", alignItems: "start",
      }}>
        <div>
          <div
            onClick={() => setImgZoomed(!imgZoomed)}
            style={{
              background: "#fff", borderRadius: "4px", padding: "2.5rem",
              display: "flex", alignItems: "center", justifyContent: "center",
              height: "420px", cursor: "zoom-in", position: "relative",
              overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{
                maxHeight: "360px", maxWidth: "100%", objectFit: "contain",
                transform: imgZoomed ? "scale(1.3)" : "scale(1)",
                transition: "transform 0.4s ease",
              }}
            />
            <span style={{
              position: "absolute", bottom: "10px", right: "12px",
              fontSize: "0.65rem", letterSpacing: "1px",
              color: "rgba(0,0,0,0.3)", fontFamily: "'Syne', sans-serif",
            }}>
              {imgZoomed ? "CLICK TO ZOOM OUT" : "CLICK TO ZOOM"}
            </span>
          </div>

          <div style={{ display: "flex", gap: "6px", marginTop: "1rem", flexWrap: "wrap" }}>
            {["Free Returns", "Secure Payment", "Authentic"].map(tag => (
              <span key={tag} style={{
                fontSize: "0.68rem", padding: "4px 10px",
                border: "1px solid rgba(255,255,255,0.08)", borderRadius: "1px",
                color: "rgba(255,255,255,0.28)", fontFamily: "'Syne', sans-serif",
              }}>
                ✓ {tag}
              </span>
            ))}
          </div>
        </div>

        <div style={{ paddingTop: "0.5rem" }}>
          <div style={{
            display: "inline-block",
            background: "rgba(255,210,80,0.08)",
            border: "1px solid rgba(255,210,80,0.25)",
            color: "#FFD250", padding: "4px 12px", borderRadius: "2px",
            fontSize: "0.68rem", letterSpacing: "2px", textTransform: "uppercase",
            fontFamily: "'Syne', sans-serif", fontWeight: 600, marginBottom: "1rem",
          }}>
            {product.category}
          </div>

          <h1 style={{
            margin: "0 0 1rem",
            fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            color: "#fff", lineHeight: 1.2, letterSpacing: "-0.5px",
          }}>
            {product.title}
          </h1>

          <div style={{ marginBottom: "1.5rem" }}>
  <StarRating rate={product.rating.rate} count={product.rating.count} />

  {/* Rating Progress Bars */}
  <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "6px" }}>
    {[5, 4, 3, 2, 1].map(star => {
      const percentage = star === Math.round(product.rating.rate)
        ? 70 : star === Math.round(product.rating.rate) - 1
        ? 45 : star === Math.round(product.rating.rate) + 1
        ? 20 : 10;
      return (
        <div key={star} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{
            fontSize: "0.68rem", color: "rgba(255,255,255,0.35)",
            fontFamily: "'DM Mono', monospace", width: "16px", textAlign: "right"
          }}>{star}★</span>
          <div style={{
            flex: 1, height: "4px",
            background: "rgba(255,255,255,0.06)",
            borderRadius: "2px", overflow: "hidden"
          }}>
            <div style={{
              width: `${percentage}%`, height: "100%",
              background: star >= 4 ? "#FFD250" : star === 3 ? "rgba(255,210,80,0.5)" : "rgba(255,255,255,0.15)",
              borderRadius: "2px",
              transition: "width 0.6s ease",
            }} />
          </div>
          <span style={{
            fontSize: "0.65rem", color: "rgba(255,255,255,0.25)",
            fontFamily: "'DM Mono', monospace", width: "28px"
          }}>{percentage}%</span>
        </div>
      );
    })}
  </div>
</div>

          <div style={{
            background: "rgba(255,210,80,0.04)",
            border: "1px solid rgba(255,210,80,0.1)",
            borderRadius: "3px", padding: "1.2rem 1.5rem", marginBottom: "2rem",
          }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
              <span style={{
                fontSize: "2.2rem", fontWeight: 800, color: "#FFD250",
                fontFamily: "'Syne', sans-serif", letterSpacing: "-1px",
              }}>
                ${product.price.toFixed(2)}
              </span>
              <span style={{
                fontSize: "1rem", color: "rgba(255,255,255,0.25)",
                textDecoration: "line-through", fontFamily: "'DM Mono', monospace",
              }}>
                ${(product.price * 1.18).toFixed(2)}
              </span>
              <span style={{
                background: "#22c55e", color: "#fff", padding: "2px 8px",
                borderRadius: "2px", fontSize: "0.72rem", fontWeight: 700,
                fontFamily: "'Syne', sans-serif",
              }}>
                -15%
              </span>
            </div>
            <p style={{
              margin: "0.4rem 0 0", fontSize: "0.75rem",
              color: "rgba(255,255,255,0.3)", fontFamily: "'DM Mono', monospace",
            }}>
              Inclusive of all taxes · Free delivery on orders over $50
            </p>
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <p style={{
              margin: "0 0 0.4rem", fontSize: "0.68rem", letterSpacing: "2px",
              color: "rgba(255,255,255,0.25)", textTransform: "uppercase",
              fontFamily: "'Syne', sans-serif",
            }}>Description</p>
            <p style={{
              margin: 0, color: "rgba(255,255,255,0.6)",
              fontSize: "0.9rem", lineHeight: 1.75,
              fontFamily: "'DM Mono', monospace",
            }}>
              {product.description}
            </p>
          </div>

         {/* User Rating */}
<div style={{ marginTop: "1.5rem", padding: "1rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "3px" }}>
  <p style={{
    margin: "0 0 0.6rem", fontSize: "0.68rem", letterSpacing: "2px",
    color: "rgba(255,255,255,0.25)", textTransform: "uppercase",
    fontFamily: "'Syne', sans-serif",
  }}>Rate This Product</p>

  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
    <div style={{ display: "flex", gap: "4px" }}>
      {[1, 2, 3, 4, 5].map(star => (
        <span
          key={star}
          onClick={() => {
            setUserRating(star);
            setRatingSubmitted(false);
          }}
          onMouseEnter={() => setHoveredRating(star)}
          onMouseLeave={() => setHoveredRating(0)}
          style={{
            fontSize: "1.6rem",
            cursor: "pointer",
            color: star <= (hoveredRating || userRating)
              ? "#FFD250"
              : "rgba(255,255,255,0.12)",
            transition: "color 0.15s, transform 0.15s",
            transform: star <= (hoveredRating || userRating)
              ? "scale(1.2)"
              : "scale(1)",
            display: "inline-block",
          }}
        >★</span>
      ))}
    </div>

    {userRating > 0 && !ratingSubmitted && (
      <button
        onClick={() => setRatingSubmitted(true)}
        style={{
          background: "#FFD250", border: "none",
          color: "#000", padding: "6px 16px",
          borderRadius: "2px", cursor: "pointer",
          fontFamily: "'Syne', sans-serif",
          fontSize: "0.72rem", fontWeight: 700,
          letterSpacing: "1px",
        }}
      >
        SUBMIT
      </button>
    )}

    {ratingSubmitted && (
      <span style={{
        fontSize: "0.75rem", color: "#22c55e",
        fontFamily: "'Syne', sans-serif", letterSpacing: "1px",
      }}>
        ✓ Thanks for rating!
      </span>
    )}
  </div>

  {userRating > 0 && (
    <p style={{
      margin: "0.5rem 0 0", fontSize: "0.72rem",
      color: "rgba(255,255,255,0.25)",
      fontFamily: "'DM Mono', monospace",
    }}>
      You rated this product {userRating} out of 5 stars
    </p>
  )}
</div>
         {/* Size Selector */}
          <div style={{ marginBottom: "1.5rem" }}>
            <p style={{
              margin: "0 0 0.6rem", fontSize: "0.68rem", letterSpacing: "2px",
              color: "rgba(255,255,255,0.25)", textTransform: "uppercase",
              fontFamily: "'Syne', sans-serif",
            }}>Select Size</p>
            <div style={{ display: "flex", gap: "8px" }}>
              {["XS", "S", "M", "L", "XL", "XXL"].map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    width: "42px", height: "42px",
                    borderRadius: "2px",
                    border: selectedSize === size
                      ? "1.5px solid #FFD250"
                      : "1.5px solid rgba(255,255,255,0.12)",
                    background: selectedSize === size
                      ? "rgba(255,210,80,0.1)"
                      : "transparent",
                    color: selectedSize === size
                      ? "#FFD250"
                      : "rgba(255,255,255,0.4)",
                    cursor: "pointer",
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "0.72rem", fontWeight: 700,
                    transition: "all 0.2s",
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "1rem" }}>
            <div style={{
              display: "flex", alignItems: "center",
              border: "1.5px solid rgba(255,255,255,0.12)",
              borderRadius: "2px", overflow: "hidden",
            }}>
              {["-", qty, "+"].map((item, i) => (
                i === 1 ? (
                  <span key="val" style={{
                    padding: "10px 18px", color: "#fff",
                    fontFamily: "'Syne', sans-serif", fontWeight: 700,
                    fontSize: "0.9rem",
                    borderLeft: "1px solid rgba(255,255,255,0.1)",
                    borderRight: "1px solid rgba(255,255,255,0.1)",
                    minWidth: "44px", textAlign: "center",
                  }}>{qty}</span>
                ) : (
                  <button key={item} onClick={() => {
                    if (item === "+" && qty < 10) setQty(q => q + 1);
                    if (item === "-" && qty > 1) setQty(q => q - 1);
                  }} style={{
                    background: "none", border: "none",
                    color: "rgba(255,255,255,0.5)", cursor: "pointer",
                    padding: "10px 14px", fontSize: "1.1rem",
                    fontFamily: "'Syne', sans-serif", transition: "color 0.15s",
                  }}
                    onMouseEnter={e => e.target.style.color = "#FFD250"}
                    onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}
                  >{item}</button>
                )
              ))}
            </div>

            <button onClick={handleAdd} style={{
              flex: 1, padding: "12px 24px",
              background: added ? "#22c55e" : "#FFD250",
              border: "none", borderRadius: "2px", color: "#000",
              fontFamily: "'Syne', sans-serif", fontWeight: 800,
              fontSize: "0.85rem", letterSpacing: "1.5px", cursor: "pointer",
              transition: "all 0.2s",
            }}>
              {added ? `✓ ${qty} ITEM${qty > 1 ? "S" : ""} ADDED` : "ADD TO CART"}
            </button>
          </div>

         <button
  onClick={() => onAddToWishlist(product)}
  style={{
    width: "100%", padding: "11px", background: "none",
    border: `1.5px solid ${wishlist?.some(i => i.id === product.id) ? "rgba(255,100,100,0.5)" : "rgba(255,255,255,0.1)"}`,
    color: wishlist?.some(i => i.id === product.id) ? "rgba(255,100,100,0.8)" : "rgba(255,255,255,0.4)",
    borderRadius: "2px", cursor: "pointer",
    fontFamily: "'Syne', sans-serif",
    fontSize: "0.8rem", letterSpacing: "1.5px", transition: "all 0.2s",
  }}
>
  {wishlist?.some(i => i.id === product.id) ? "♥ SAVED TO WISHLIST" : "♡ SAVE TO WISHLIST"}
</button>

          <p style={{
            marginTop: "1.5rem", fontSize: "0.68rem",
            color: "rgba(255,255,255,0.18)", fontFamily: "'DM Mono', monospace",
          }}>
            SKU: NAMANA-{String(product.id).padStart(4, "0")} · Stock: In Stock
          </p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts
        category={product.category}
        currentId={product.id}
        onView={onView}
        onAddToCart={onAddToCart}
        onAddToWishlist={onAddToWishlist}
        wishlist={wishlist}
      />

    </div>
  );
}