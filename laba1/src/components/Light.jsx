const COLORS = {
  red: "#e53935",
  yellow: "#fdd835",
  green: "#43a047",
};

function Light({ color, active, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(color)}
      aria-label={color}
      aria-pressed={active}
      style={{
        width: 80,
        height: 80,
        borderRadius: "50%",
        border: active ? "4px solid #fff" : "4px solid #222",
        backgroundColor: COLORS[color],
        opacity: active ? 1 : 0.25,
        boxShadow: active ? `0 0 20px 6px ${COLORS[color]}` : "none",
        cursor: "pointer",
        transition: "opacity 0.2s, box-shadow 0.2s",
      }}
    />
  );
}

export default Light;