import ControlsPanel from "../components/ControlsPanel";
import TrafficLights from "../components/TrafficLights";
import { useTrafficLights } from "../context/TrafficLightsContext";

function TrafficLightPage() {
  const {
    currentSignal,
    orientation,
    isAutomatic,
    selectSignal,
    startAutomatic,
    stopAutomatic,
    toggleOrientation,
  } = useTrafficLights();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h1>Світлофор</h1>
      <TrafficLights
        currentSignal={currentSignal}
        orientation={orientation}
        disabled={isAutomatic}
        onSelect={selectSignal}
      />
      <ControlsPanel
        isAutomatic={isAutomatic}
        onStart={startAutomatic}
        onStop={stopAutomatic}
        onToggleOrientation={toggleOrientation}
      />
    </div>
  );
}

export default TrafficLightPage;