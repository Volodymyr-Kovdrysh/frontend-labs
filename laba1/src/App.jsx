import { Route, Routes } from "react-router";
import AppLayout from "./components/AppLayout";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import StatsPage from "./pages/StatsPage";
import StatusPage from "./pages/StatusPage";
import TrafficLightPage from "./pages/TrafficLightPage";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/traffic-light" element={<TrafficLightPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/status" element={<StatusPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;