
import { createContext, useContext } from "react";

export const TrafficLightsContext = createContext(null);

export function useTrafficLights() {
  const context = useContext(TrafficLightsContext);

  if (!context) {
    throw new Error(
      "useTrafficLights must be used inside TrafficLightsProvider"
    );
  }

  return context;
}
