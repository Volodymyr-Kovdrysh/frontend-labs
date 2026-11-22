import { useEffect, useState } from "react";
import { TrafficLightsContext } from "./TrafficLightsContext";

// yellow зустрічається двічі, тому зберігаємо індекс фази
const CYCLE = ["red", "yellow", "green", "yellow"];
const PHASE_FOR_COLOR = { red: 0, yellow: 1, green: 2 };
const PHASE_DURATION_MS = 3000;

function TrafficLightsProvider({ children }) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [isAutomatic, setIsAutomatic] = useState(false);
  const [clicks, setClicks] = useState({ red: 0, yellow: 0, green: 0 });
  const [orientation, setOrientation] = useState("vertical");

  // похідні значення, без окремого useState
  const currentSignal = CYCLE[phaseIndex];
  const totalClicks = clicks.red + clicks.yellow + clicks.green;

  // життєвий цикл таймера з ЛР3 тепер живе тут, вище за маршрути
  useEffect(() => {
    if (!isAutomatic) {
      return;
    }

    const timerId = setInterval(() => {
      setPhaseIndex((previous) => (previous + 1) % CYCLE.length);
    }, PHASE_DURATION_MS);

    return () => clearInterval(timerId);
  }, [isAutomatic]);

  function selectSignal(color) {
    if (isAutomatic) {
      return;
    }
    setPhaseIndex(PHASE_FOR_COLOR[color]);
    setClicks((previous) => ({
      ...previous,
      [color]: previous[color] + 1,
    }));
  }

  function startAutomatic() {
    setIsAutomatic(true);
  }

  function stopAutomatic() {
    setIsAutomatic(false);
  }

  function toggleOrientation() {
    setOrientation((previous) =>
      previous === "vertical" ? "horizontal" : "vertical"
    );
  }

  const value = {
    // стан
    currentSignal,
    clicks,
    totalClicks,
    orientation,
    isAutomatic,
    // дії предметної області
    selectSignal,
    startAutomatic,
    stopAutomatic,
    toggleOrientation,
  };

  return (
    <TrafficLightsContext.Provider value={value}>
      {children}
    </TrafficLightsContext.Provider>
  );
}

export default TrafficLightsProvider;