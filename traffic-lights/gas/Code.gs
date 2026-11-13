const SHEET_NAME = "TRAFFIC_LIGHTS";
const ALLOWED_SIGNALS = ["red", "yellow", "green"];

function doGet(e) {
  const action = e && e.parameter ? e.parameter.action : "";

  if (action !== "list") {
    return jsonError_("unknown_action", "Unsupported action");
  }

  try {
    return jsonOk_({ trafficLights: listTrafficLights_() });
  } catch (error) {
    return jsonError_("storage_error", error.message || "Unable to read storage");
  }
}

function doPost(e) {
  let command;

  try {
    command = JSON.parse(e && e.postData ? e.postData.contents || "{}" : "{}");
  } catch (error) {
    return jsonError_("bad_request", "Request body must be valid JSON");
  }

  if (!command || command.action !== "updateState") {
    return jsonError_("unknown_action", "Unsupported action");
  }

  if (typeof command.id !== "string" || command.id.trim() === "") {
    return jsonError_("invalid_id", "A non-empty id is required");
  }

  if (!ALLOWED_SIGNALS.includes(command.currentSignal)) {
    return jsonError_("invalid_signal", "Unsupported traffic-light signal");
  }

  try {
    const trafficLight = updateTrafficLight_(command.id, command.currentSignal);
    return jsonOk_({ trafficLight: trafficLight });
  } catch (error) {
    return jsonError_("storage_error", error.message || "Unable to update storage");
  }
}

function listTrafficLights_() {
  const sheet = getTrafficLightsSheet_();
  const columns = getColumns_(sheet);
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) {
    return [];
  }

  const values = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getValues();

  return values
    .map(function (row) {
      return {
        id: String(row[columns.id] || "").trim(),
        currentSignal: String(row[columns.currentSignal] || "").trim(),
      };
    })
    .filter(function (record) {
      return record.id !== "";
    })
    .map(function (record) {
      if (!ALLOWED_SIGNALS.includes(record.currentSignal)) {
        throw new Error("The sheet contains an unsupported current_signal value");
      }

      return record;
    });
}

function updateTrafficLight_(id, currentSignal) {
  const sheet = getTrafficLightsSheet_();
  const columns = getColumns_(sheet);
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) {
    throw new Error("Traffic-light record was not found");
  }

  const values = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getValues();

  for (let index = 0; index < values.length; index += 1) {
    const recordId = String(values[index][columns.id] || "").trim();

    if (recordId === id) {
      const rowNumber = index + 2;
      sheet.getRange(rowNumber, columns.currentSignal + 1).setValue(currentSignal);

      return {
        id: id,
        currentSignal: currentSignal,
      };
    }
  }

  throw new Error("Traffic-light record was not found");
}

function getTrafficLightsSheet_() {
  const spreadsheetId = PropertiesService
    .getScriptProperties()
    .getProperty("DB_SPREADSHEET_ID");

  if (!spreadsheetId) {
    throw new Error("Script Property DB_SPREADSHEET_ID is not configured");
  }

  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    throw new Error("Sheet TRAFFIC_LIGHTS was not found");
  }

  return sheet;
}

function getColumns_(sheet) {
  const lastColumn = sheet.getLastColumn();

  if (lastColumn < 2) {
    throw new Error("TRAFFIC_LIGHTS must have id and current_signal headers");
  }

  const headers = sheet
    .getRange(1, 1, 1, lastColumn)
    .getValues()[0]
    .map(function (header) {
      return String(header).trim();
    });

  const id = headers.indexOf("id");
  const currentSignal = headers.indexOf("current_signal");

  if (id === -1 || currentSignal === -1) {
    throw new Error("TRAFFIC_LIGHTS must have id and current_signal headers");
  }

  return { id: id, currentSignal: currentSignal };
}

function json_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function jsonOk_(data) {
  return json_({
    ok: true,
    data: data,
    error: null,
  });
}

function jsonError_(code, message) {
  return json_({
    ok: false,
    data: null,
    error: {
      code: code,
      message: message,
    },
  });
}
