import PropTypes from "prop-types";
import Light from "./Light";

const COLORS = ["red", "yellow", "green"];

function TrafficLights({
  currentSignal,
  orientation,
  isAutomatic,
  controlsDisabled = false,
  onSelect,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: orientation === "horizontal" ? "row" : "column",
        backgroundColor: "#333",
        padding: 10,
        borderRadius: 10,
        width: "fit-content",
        margin: "0 auto 20px",
      }}
    >
      {COLORS.map((color) => (
        <Light
          key={color}
          tlColor={color}
          active={currentSignal === color}
          disabled={isAutomatic || controlsDisabled}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

TrafficLights.propTypes = {
  currentSignal: PropTypes.oneOf(["red", "yellow", "green"]).isRequired,
  orientation: PropTypes.oneOf(["vertical", "horizontal"]).isRequired,
  isAutomatic: PropTypes.bool.isRequired,
  controlsDisabled: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
};

export default TrafficLights;
