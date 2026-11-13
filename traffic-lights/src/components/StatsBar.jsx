import PropTypes from "prop-types";

function StatsBar({
  clicks,
  totalClicks,
  currentSignal,
  orientation,
  isAutomatic,
  onToggleOrientation,
  onStart,
  onStop,
  readOnly = false,
  controlsDisabled = false,
}) {
  return (
    <div style={{ textAlign: "left", lineHeight: 1.8 }}>
      <h2>Статистика світлофора</h2>

      <p>Червоний: {clicks.red}</p>
      <p>Жовтий: {clicks.yellow}</p>
      <p>Зелений: {clicks.green}</p>

      <p>Усього натискань: {totalClicks}</p>
      <p>Активний сигнал: {currentSignal}</p>

      <p>
        Орієнтація:{" "}
        {orientation === "vertical" ? "вертикальна" : "горизонтальна"}
      </p>

      <p>Режим: {isAutomatic ? "автоматичний" : "ручний"}</p>

      {!readOnly && (
        <>
          <button
            type="button"
            onClick={onToggleOrientation}
            disabled={controlsDisabled}
          >
            Змінити орієнтацію
          </button>

          <div style={{ marginTop: 15, display: "flex", gap: 10 }}>
            <button
              type="button"
              onClick={onStart}
              disabled={controlsDisabled || isAutomatic}
            >
              Запустити
            </button>

            <button
              type="button"
              onClick={onStop}
              disabled={controlsDisabled || !isAutomatic}
            >
              Зупинити
            </button>
          </div>
        </>
      )}
    </div>
  );
}

StatsBar.propTypes = {
  clicks: PropTypes.shape({
    red: PropTypes.number.isRequired,
    yellow: PropTypes.number.isRequired,
    green: PropTypes.number.isRequired,
  }).isRequired,
  totalClicks: PropTypes.number.isRequired,
  currentSignal: PropTypes.oneOf(["red", "yellow", "green"]).isRequired,
  orientation: PropTypes.oneOf(["vertical", "horizontal"]).isRequired,
  isAutomatic: PropTypes.bool.isRequired,
  onToggleOrientation: PropTypes.func,
  onStart: PropTypes.func,
  onStop: PropTypes.func,
  readOnly: PropTypes.bool,
  controlsDisabled: PropTypes.bool,
};

export default StatsBar;
