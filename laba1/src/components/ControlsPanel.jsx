function ControlsPanel({
  isAutomatic,
  onStart,
  onStop,
  onToggleOrientation,
}) {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <button type="button" onClick={onStart} disabled={isAutomatic}>
        Запустити
      </button>
      <button type="button" onClick={onStop} disabled={!isAutomatic}>
        Зупинити
      </button>
      <button type="button" onClick={onToggleOrientation}>
        Перемкнути орієнтацію
      </button>
    </div>
  );
}

export default ControlsPanel;