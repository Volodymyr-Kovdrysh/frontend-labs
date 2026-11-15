import { useState } from "react";
import Light from "./Light";
import StatsBar from "./StatsBar";

const SIGNALS = ["red", "yellow", "green"];

function TrafficLights({ defaultOrientation = "vertical" }) {
  const [currentSignal, setCurrentSignal] = useState("red");
  const [clicks, setClicks] = useState({ red: 0, yellow: 0, green: 0 });
  const [orientation, setOrientation] = useState(defaultOrientation);

  function handleSelect(color) {
    setCurrentSignal(color);
    setClicks((previous) => ({
      ...previous,
      [color]: previous[color] + 1,
    }));
  }

  function handleToggleOrientation() {
    setOrientation((previous) =>
      previous === "vertical" ? "horizontal" : "vertical"
    );
  }

  // похідне значення, без окремого useState
  const totalClicks = clicks.red + clicks.yellow + clicks.green;

  return (
    <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
      <div
        style={{
          display: "flex",
          flexDirection: orientation === "vertical" ? "column" : "row",
          gap: 16,
          padding: 16,
          borderRadius: 12,
          background: "#111",
        }}
      >
        {SIGNALS.map((color) => (
          <Light
            key={color}
            color={color}
            active={currentSignal === color}
            onSelect={handleSelect}
          />
        ))}
      </div>

      <StatsBar
        clicks={clicks}
        totalClicks={totalClicks}
        currentSignal={currentSignal}
        orientation={orientation}
        onToggleOrientation={handleToggleOrientation}
      />
    </div>
  );
}

export default TrafficLights;