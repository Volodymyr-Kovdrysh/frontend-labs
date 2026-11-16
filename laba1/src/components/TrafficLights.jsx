import { useEffect, useState } from "react";
import Light from "./Light";
import StatsBar from "./StatsBar";

const SIGNALS = ["red", "yellow", "green"];

// Послідовність фаз. yellow зустрічається двічі, тому зберігаємо індекс.
const CYCLE = ["red", "yellow", "green", "yellow"];

// Для ручного вибору: яку позицію циклу відповідає кольору.
// Для yellow завжди використовуємо першу позицію (1).
const PHASE_FOR_COLOR = { red: 0, yellow: 1, green: 2 };

const PHASE_DURATION_MS = 3000;

function TrafficLights({ defaultOrientation = "vertical" }) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [isAutomatic, setIsAutomatic] = useState(false);
  const [clicks, setClicks] = useState({ red: 0, yellow: 0, green: 0 });
  const [orientation, setOrientation] = useState(defaultOrientation);

  // похідне значення: видимий сигнал випливає з індексу фази
  const currentSignal = CYCLE[phaseIndex];
  const totalClicks = clicks.red + clicks.yellow + clicks.green;

  // Ефект синхронізує браузерний таймер зі станом isAutomatic.
  useEffect(() => {
    if (!isAutomatic) {
      return;
    }

    const timerId = setInterval(() => {
      // функціональна форма: ефекту не потрібен phaseIndex у залежностях
      setPhaseIndex((previous) => (previous + 1) % CYCLE.length);
    }, PHASE_DURATION_MS);

    // очищення: зупиняє саме цей таймер
    return () => clearInterval(timerId);
  }, [isAutomatic]);

  // ручний вибір (як у ЛР2): змінює фазу і збільшує лічильник
  function handleSelect(color) {
    if (isAutomatic) {
      return;
    }
    setPhaseIndex(PHASE_FOR_COLOR[color]);
    setClicks((previous) => ({
      ...previous,
      [color]: previous[color] + 1,
    }));
  }

  function handleStart() {
    setIsAutomatic(true);
  }

  function handleStop() {
    setIsAutomatic(false);
  }

  function handleToggleOrientation() {
    setOrientation((previous) =>
      previous === "vertical" ? "horizontal" : "vertical"
    );
  }

  return (
    <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
      <div
        style={{
          display: "flex",
          flexDirection: orientation === "vertical" ? "column" : "row",
          gap: 20,
          padding: 20,
          borderRadius: 12,
          background: "#111",
        }}
      >
        {SIGNALS.map((color) => (
          <Light
            key={color}
            color={color}
            active={currentSignal === color}
            disabled={isAutomatic}
            onSelect={handleSelect}
          />
        ))}
      </div>

      <StatsBar
        clicks={clicks}
        totalClicks={totalClicks}
        currentSignal={currentSignal}
        orientation={orientation}
        isAutomatic={isAutomatic}
        onToggleOrientation={handleToggleOrientation}
        onStart={handleStart}
        onStop={handleStop}
      />
    </div>
  );
}

export default TrafficLights;