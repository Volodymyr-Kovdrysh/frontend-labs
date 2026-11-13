const API_URL = import.meta.env.VITE_GAS_WEB_APP_URL?.trim();
const ALLOWED_SIGNALS = ["red", "yellow", "green"];

function getApiUrl() {
  if (!API_URL) {
    throw new Error(
      "Не задано VITE_GAS_WEB_APP_URL. Додайте URL розгортання GAS у файл .env.local."
    );
  }

  return API_URL;
}

async function parseEnvelope(response) {
  let payload;

  try {
    payload = await response.json();
  } catch {
    throw new Error("Сервер повернув відповідь, яку неможливо прочитати як JSON.");
  }

  if (!response.ok) {
    throw new Error(
      payload?.error?.message || "Сервер не зміг виконати запит."
    );
  }

  if (!payload || typeof payload.ok !== "boolean") {
    throw new Error("Сервер повернув відповідь невідомого формату.");
  }

  if (!payload.ok) {
    throw new Error(payload.error?.message || "GAS request failed");
  }

  return payload.data;
}

export async function listTrafficLights() {
  const url = new URL(getApiUrl());
  url.searchParams.set("action", "list");

  const response = await fetch(url.toString());
  const data = await parseEnvelope(response);

  if (!Array.isArray(data?.trafficLights)) {
    throw new Error("Сервер не повернув список світлофорів.");
  }

  return data.trafficLights.map((trafficLight) => {
    if (
      !trafficLight ||
      typeof trafficLight.id !== "string" ||
      !ALLOWED_SIGNALS.includes(trafficLight.currentSignal)
    ) {
      throw new Error("Сервер повернув некоректний запис світлофора.");
    }

    return {
      id: trafficLight.id,
      currentSignal: trafficLight.currentSignal,
    };
  });
}

export async function updateTrafficLightState(id, currentSignal) {
  if (typeof id !== "string" || id.trim() === "") {
    throw new Error("Для збереження потрібен id світлофора.");
  }

  if (!ALLOWED_SIGNALS.includes(currentSignal)) {
    throw new Error("Не можна зберегти невідомий сигнал світлофора.");
  }

  const response = await fetch(getApiUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify({
      action: "updateState",
      id,
      currentSignal,
    }),
  });

  const data = await parseEnvelope(response);
  const trafficLight = data?.trafficLight;

  if (
    !trafficLight ||
    trafficLight.id !== id ||
    trafficLight.currentSignal !== currentSignal
  ) {
    throw new Error("Сервер не підтвердив збереження поточного сигналу.");
  }

  return trafficLight;
}
