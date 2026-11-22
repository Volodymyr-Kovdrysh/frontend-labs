import StatsBar from "../components/StatsBar";
import { useTrafficLights } from "../context/TrafficLightsContext";

function StatsPage() {
  const { clicks, totalClicks, currentSignal, orientation, isAutomatic } =
    useTrafficLights();

  return (
    <div>
      <h1>Статистика</h1>
      <StatsBar
        clicks={clicks}
        totalClicks={totalClicks}
        currentSignal={currentSignal}
        orientation={orientation}
        isAutomatic={isAutomatic}
      />
    </div>
  );
}

export default StatsPage;