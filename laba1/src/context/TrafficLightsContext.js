import { createContext, useContext } from "react";

export const TrafficLightsContext = createContext(null);

export function useTrafficLights() {
  const context = useContext(TrafficLightsContext);
  if (context === null) {
    throw new Error(
      "useTrafficLights потрібно викликати всередині TrafficLightsProvider"
    );
  }
  return context;
}