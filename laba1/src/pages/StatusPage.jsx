import { useTrafficLights } from "../context/TrafficLightsContext";

function StatusPage() {
  const { currentSignal, isAutomatic, orientation, totalClicks } =
    useTrafficLights();

  return (
    <div>
      <h1>Статус</h1>
      <ul>
        <li>Поточний сигнал: {currentSignal}</li>
        <li>Режим: {isAutomatic ? "автоматичний" : "ручний"}</li>
        <li>Орієнтація: {orientation}</li>
        <li>Ручних натискань: {totalClicks}</li>
      </ul>
    </div>
  );
}

export default StatusPage;