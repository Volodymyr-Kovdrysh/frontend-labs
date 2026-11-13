import TrafficLights from "../components/TrafficLights";
import StatsBar from "../components/StatsBar";
import { useTrafficLights } from "../context/TrafficLightsContext";

const statusStyle = {
  borderRadius: 8,
  padding: "12px 16px",
  margin: "12px 0",
};

function TrafficLightPage() {
  const {
    currentSignal,
    clicks,
    totalClicks,
    orientation,
    isAutomatic,
    selectSignal,
    startAutomatic,
    stopAutomatic,
    toggleOrientation,
    loadStatus,
    loadError,
    reloadTrafficLights,
    saveStatus,
    saveError,
    saveCurrentSignal,
  } = useTrafficLights();

  const isReady = loadStatus === "success";

  return (
    <section>
      <h1>Керування світлофором</h1>

      {loadStatus === "loading" && (
        <p role="status" style={{ ...statusStyle, background: "#e8f1ff" }}>
          Завантажуємо збережений сигнал із сервера…
        </p>
      )}

      {loadStatus === "error" && (
        <div
          role="alert"
          style={{ ...statusStyle, background: "#fff0f0", color: "#8a1c1c" }}
        >
          <p>Не вдалося завантажити сигнал: {loadError}</p>
          <button
            type="button"
            onClick={() => void reloadTrafficLights()}
            style={{ marginTop: 8 }}
          >
            Повторити
          </button>
        </div>
      )}

      {isReady && (
        <p role="status" style={{ ...statusStyle, background: "#eef8ef" }}>
          Завантажено сигнал із сервера. Поточні зміни зберігаються лише після
          натискання кнопки нижче.
        </p>
      )}

      <TrafficLights
        currentSignal={currentSignal}
        orientation={orientation}
        isAutomatic={isAutomatic}
        controlsDisabled={!isReady}
        onSelect={selectSignal}
      />

      <StatsBar
        clicks={clicks}
        totalClicks={totalClicks}
        currentSignal={currentSignal}
        orientation={orientation}
        isAutomatic={isAutomatic}
        controlsDisabled={!isReady}
        onToggleOrientation={toggleOrientation}
        onStart={startAutomatic}
        onStop={stopAutomatic}
      />

      <div style={{ marginTop: 24, textAlign: "left" }}>
        <button
          type="button"
          onClick={() => void saveCurrentSignal()}
          disabled={!isReady || saveStatus === "loading"}
        >
          {saveStatus === "loading"
            ? "Зберігаємо…"
            : "Зберегти поточний сигнал"}
        </button>

        {saveStatus === "success" && (
          <p role="status" style={{ ...statusStyle, background: "#eef8ef" }}>
            Сервер підтвердив збереження сигналу «{currentSignal}».
          </p>
        )}

        {saveStatus === "error" && (
          <p
            role="alert"
            style={{ ...statusStyle, background: "#fff0f0", color: "#8a1c1c" }}
          >
            Не вдалося підтвердити збереження: {saveError}
          </p>
        )}
      </div>
    </section>
  );
}

export default TrafficLightPage;
