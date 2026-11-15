function StatsBar({
  clicks,
  totalClicks,
  currentSignal,
  orientation,
  onToggleOrientation,
}) {
  const orientationText =
    orientation === "vertical"
      ? "Вертикальна орієнтація"
      : "Горизонтальна орієнтація";

  return (
    <div
      style={{
        padding: "12px 16px",
        borderRadius: 8,
        background: "#2a2a2a",
        color: "#fff",
        minWidth: 220,
      }}
    >
      <div>Red: {clicks.red}</div>
      <div>Yellow: {clicks.yellow}</div>
      <div>Green: {clicks.green}</div>
      <hr />
      <div>Всього кліків: {totalClicks}</div>
      <div>Активний сигнал: {currentSignal}</div>
      <div>{orientationText}</div>
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