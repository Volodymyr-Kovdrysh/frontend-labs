function StatsBar({
  clicks,
  totalClicks,
  currentSignal,
  orientation,
  isAutomatic,
  onToggleOrientation,
  onStart,
  onStop,
}) {
  const orientationText =
    orientation === "vertical"
      ? "Вертикальна орієнтація"
      : "Горизонтальна орієнтація";

  const modeText = isAutomatic ? "Автоматичний" : "Ручний";

  return (
    <div
      style={{
        padding: "12px 16px",
        borderRadius: 8,
        background: "#2a2a2a",
        color: "#fff",
        minWidth: 240,
      }}
    >
      <div>Red: {clicks.red}</div>
      <div>Yellow: {clicks.yellow}</div>
      <div>Green: {clicks.green}</div>
      <hr />
      <div>Всього кліків: {totalClicks}</div>
      <div>Активний сигнал: {currentSignal}</div>
      <div>Режим: {modeText}</div>
      <div>{orientationText}</div>

      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button type="button" onClick={onStart} disabled={isAutomatic}>
          Запустити
        </button>
        <button type="button" onClick={onStop} disabled={!isAutomatic}>
          Зупинити
        </button>
      </div>

      <button
        type="button"
        onClick={onToggleOrientation}
        style={{ marginTop: 8 }}
      >
        Перемкнути орієнтацію
      </button>
    </div>
  );
}

export default StatsBar;