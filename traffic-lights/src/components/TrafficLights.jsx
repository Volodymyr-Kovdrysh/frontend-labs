import PropTypes from "prop-types";
import Light from "./Light";

const TrafficLights = ({ orientation = "vertical" }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: orientation === "horizontal" ? "row" : "column",
        backgroundColor: "#333",
        padding: 10,
        borderRadius: 10,
        width: "fit-content",
      }}
    >
      <Light tlColor="red" />
      <Light tlColor="yellow" />
      <Light tlColor="green" />
    </div>
  );
};

TrafficLights.propTypes = {
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
};

export default TrafficLights;