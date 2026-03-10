export default function StarRating({ rate, count }) {
  const stars = Math.round(rate);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <div style={{ display: "flex" }}>
        {[1, 2, 3, 4, 5].map(i => (
          <span key={i} style={{
            color: i <= stars ? "#FFD250" : "rgba(255,255,255,0.15)",
            fontSize: "0.85rem",
          }}>★</span>
        ))}
      </div>
      <span style={{
        fontSize: "0.72rem", color: "rgba(255,255,255,0.35)",
        fontFamily: "'DM Mono', monospace",
        letterSpacing: "0.5px",
      }}>
        ({count})
      </span>
    </div>
  );
}