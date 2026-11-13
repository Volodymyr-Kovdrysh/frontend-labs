
import { BrowserRouter, Routes, Route } from "react-router";

import TrafficLightsProvider from "./context/TrafficLightsProvider";
import AppLayout from "./components/AppLayout";

import HomePage from "./pages/HomePage";
import TrafficLightPage from "./pages/TrafficLightPage";
import StatsPage from "./pages/StatsPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <TrafficLightsProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/traffic-light"
              element={<TrafficLightPage />}
            />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </TrafficLightsProvider>
    </BrowserRouter>
  );
}

export default App;
