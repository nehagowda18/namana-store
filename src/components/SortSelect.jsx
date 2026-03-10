export default function SortSelect({ value, onChange }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <span style={{
        fontSize: "0.72rem", letterSpacing: "1.5px",
        color: "rgba(255,255,255,0.35)",
        fontFamily: "'Syne', sans-serif", textTransform: "uppercase",
      }}>Sort</span>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1.5px solid rgba(255,255,255,0.1)",
          borderRadius: "2px",
          color: "rgba(255,255,255,0.75)",
          padding: "8px 32px 8px 12px",
          fontFamily: "'Syne', sans-serif",
          fontSize: "0.8rem",
          outline: "none",
          cursor: "pointer",
          appearance: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='rgba(255,255,255,0.3)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "calc(100% - 10px) center",
        }}
      >
        <option value="default">Default</option>
        <option value="price-asc">Price: Low → High</option>
        <option value="price-desc">Price: High → Low</option>
        <option value="rating">Top Rated</option>
        <option value="name">Name A-Z</option>
      </select>
    </div>
  );
}