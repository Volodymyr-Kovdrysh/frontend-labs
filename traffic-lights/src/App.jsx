import TrafficLights from "./components/TrafficLights";

function App() {
  return (
    <div style={{ display: "flex", gap: 40, padding: 40 }}>
      <TrafficLights orientation="horizontal" />
      <TrafficLights orientation="vertical" />
    </div>
  );
}

export default App;