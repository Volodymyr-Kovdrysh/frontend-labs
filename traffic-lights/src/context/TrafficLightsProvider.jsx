import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { TrafficLightsContext } from "./TrafficLightsContext";
import {
  listTrafficLights,
  updateTrafficLightState,
} from "../api/trafficLightsApi";

const CYCLE = ["red", "yellow", "green", "yellow"];
const INTERVAL_MS = 2000;
const MAIN_TRAFFIC_LIGHT_ID = "main";

function getErrorMessage(error) {
  return error instanceof Error ? error.message : "Сталася невідома помилка";
}

function TrafficLightsProvider({ children }) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [clicks, setClicks] = useState({
    red: 0,
    yellow: 0,
    green: 0,
  });
  const [orientation, setOrientation] = useState("vertical");
  const [isAutomatic, setIsAutomatic] = useState(false);
  const [serverTrafficLights, setServerTrafficLights] = useState([]);
  const [loadStatus, setLoadStatus] = useState("loading");
  const [loadError, setLoadError] = useState("");
  const [saveStatus, setSaveStatus] = useState("idle");
  const [saveError, setSaveError] = useState("");

  const currentSignal = CYCLE[phaseIndex];
  const totalClicks = clicks.red + clicks.yellow + clicks.green;

  const reloadTrafficLights = useCallback(async () => {
    setLoadStatus("loading");
    setLoadError("");

    try {
      const trafficLights = await listTrafficLights();
      const mainTrafficLight = trafficLights.find(
        (trafficLight) => trafficLight.id === MAIN_TRAFFIC_LIGHT_ID
      );

      if (!mainTrafficLight) {
        throw new Error('На сервері не знайдено запис зі стабільним id "main".');
      }

      setServerTrafficLights(trafficLights);
      // For yellow, indexOf chooses the first yellow phase deterministically.
      setPhaseIndex(CYCLE.indexOf(mainTrafficLight.currentSignal));
      setSaveStatus("idle");
      setSaveError("");
      setLoadStatus("success");
      return mainTrafficLight;
    } catch (error) {
      setLoadError(getErrorMessage(error));
      setLoadStatus("error");
      return null;
    }
  }, []);

  useEffect(() => {
    void reloadTrafficLights();
  }, [reloadTrafficLights]);

  useEffect(() => {
    if (!isAutomatic) return undefined;

    const timerId = setInterval(() => {
      setPhaseIndex((previous) => (previous + 1) % CYCLE.length);
      // Timer changes stay in browser memory; they never write to GAS.
      setSaveStatus("idle");
      setSaveError("");
    }, INTERVAL_MS);

    return () => clearInterval(timerId);
  }, [isAutomatic]);

  const selectSignal = (color) => {
    if (
      loadStatus !== "success" ||
      isAutomatic ||
      !["red", "yellow", "green"].includes(color)
    ) {
      return;
    }

    setPhaseIndex(CYCLE.indexOf(color));
    setClicks((previous) => ({
      ...previous,
      [color]: previous[color] + 1,
    }));
    setSaveStatus("idle");
    setSaveError("");
  };

  const startAutomatic = () => {
    if (loadStatus === "success") {
      setIsAutomatic(true);
    }
  };

  const stopAutomatic = () => {
    setIsAutomatic(false);
  };

  const toggleOrientation = () => {
    if (loadStatus !== "success") return;

    setOrientation((previous) =>
      previous === "vertical" ? "horizontal" : "vertical"
    );
  };

  const saveCurrentSignal = useCallback(async () => {
    if (loadStatus !== "success") return null;

    setSaveStatus("loading");
    setSaveError("");

    try {
      const updatedTrafficLight = await updateTrafficLightState(
        MAIN_TRAFFIC_LIGHT_ID,
        currentSignal
      );

      setServerTrafficLights((previous) =>
        previous.map((trafficLight) =>
          trafficLight.id === updatedTrafficLight.id
            ? updatedTrafficLight
            : trafficLight
        )
      );
      setSaveStatus("success");
      return updatedTrafficLight;
    } catch (error) {
      setSaveError(getErrorMessage(error));
      setSaveStatus("error");
      return null;
    }
  }, [currentSignal, loadStatus]);

  const value = {
    phaseIndex,
    currentSignal,
    clicks,
    totalClicks,
    orientation,
    isAutomatic,
    selectSignal,
    startAutomatic,
    stopAutomatic,
    toggleOrientation,
    serverTrafficLights,
    loadStatus,
    loadError,
    saveStatus,
    saveError,
    reloadTrafficLights,
    saveCurrentSignal,
  };

  return (
    <TrafficLightsContext.Provider value={value}>
      {children}
    </TrafficLightsContext.Provider>
  );
}

TrafficLightsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TrafficLightsProvider;
