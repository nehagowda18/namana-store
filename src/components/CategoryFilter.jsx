export default function CategoryFilter({ categories, selected, onSelect }) {
  const all = ["all", ...categories];

  return (
    <div style={{
      display: "flex", gap: "0.6rem", flexWrap: "wrap",
      padding: "1.5rem 0", marginBottom: "0.5rem",
    }}>
      {all.map(cat => {
        const active = selected === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            style={{
              padding: "7px 18px",
              borderRadius: "2px",
              border: active ? "1.5px solid #FFD250" : "1.5px solid rgba(255,255,255,0.12)",
              background: active ? "#FFD250" : "transparent",
              color: active ? "#000" : "rgba(255,255,255,0.55)",
              cursor: "pointer",
              fontFamily: "'Syne', sans-serif",
              fontSize: "0.75rem",
              fontWeight: active ? 700 : 500,
              letterSpacing: "1.2px",
              textTransform: "capitalize",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => {
              if (!active) {
                e.currentTarget.style.borderColor = "rgba(255,210,80,0.4)";
                e.currentTarget.style.color = "#FFD250";
              }
            }}
            onMouseLeave={e => {
              if (!active) {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                e.currentTarget.style.color = "rgba(255,255,255,0.55)";
              }
            }}
          >
            {cat === "all" ? "ALL PRODUCTS" : cat.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}