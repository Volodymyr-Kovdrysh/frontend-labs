const COLORS = {
  red: "#e53935",
  yellow: "#fdd835",
  green: "#43a047",
};

function Light({ color, active, disabled = false, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(color)}
      disabled={disabled}
      aria-label={color}
      aria-pressed={active}
      style={{
        width: 80,
        height: 80,
        borderRadius: "50%",
        border: active ? "4px solid #fff" : "4px solid #222",
        backgroundColor: COLORS[color],
        opacity: active ? 1 : 0.25,
        transform: active ? "scale(1.15)" : "scale(1)",
        boxShadow: active ? `0 0 24px 8px ${COLORS[color]}` : "none",
        cursor: disabled ? "not-allowed" : "pointer",
        transition:
          "opacity 0.5s ease, transform 0.5s ease, box-shadow 0.5s ease, border-color 0.5s ease",
      }}
    />
  );
}

export default Light;