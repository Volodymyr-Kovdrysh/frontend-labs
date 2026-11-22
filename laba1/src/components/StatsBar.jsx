function StatsBar({
  clicks,
  totalClicks,
  currentSignal,
  orientation,
  isAutomatic,
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
        minWidth: 240,
      }}
    >
      <div>Red: {clicks.red}</div>
      <div>Yellow: {clicks.yellow}</div>
      <div>Green: {clicks.green}</div>
      <hr />
      <div>Всього кліків: {totalClicks}</div>
      <div>Активний сигнал: {currentSignal}</div>
      <div>Режим: {isAutomatic ? "Автоматичний" : "Ручний"}</div>
      <div>{orientationText}</div>
    </div>
  );
}

export default StatsBar;