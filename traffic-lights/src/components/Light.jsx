import PropTypes from "prop-types";

const Light = ({
  tlColor = "red",
  active = false,
  onSelect,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      aria-label={`Увімкнути ${tlColor} сигнал`}
      aria-pressed={active}
      onClick={() => onSelect(tlColor)}
      disabled={disabled}
      style={{
        backgroundColor: tlColor,
        width: 50,
        height: 50,
        borderRadius: "50%",
        margin: 5,
        border: active ? "3px solid white" : "3px solid transparent",
        opacity: active ? 1 : 0.3,
        boxShadow: active ? `0 0 15px ${tlColor}` : "none",
        transform: active ? "scale(1.08)" : "scale(1)",
        transition: "opacity 0.5s, box-shadow 0.5s, transform 0.5s",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    />
  );
};

Light.propTypes = {
  tlColor: PropTypes.oneOf(["red", "yellow", "green"]),
  active: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default Light;
