import Light from "./Light";

const SIGNALS = ["red", "yellow", "green"];

function TrafficLights({
  currentSignal,
  orientation = "vertical",
  disabled = false,
  onSelect,
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: orientation === "vertical" ? "column" : "row",
        gap: 20,
        padding: 20,
        borderRadius: 12,
        background: "#111",
      }}
    >
      {SIGNALS.map((color) => (
        <Light
          key={color}
          color={color}
          active={currentSignal === color}
          disabled={disabled}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export default TrafficLights;