const KEY = "edge_ship_log";

export function loadEntries() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch (_) {
    return [];
  }
}

export function saveEntries(entries) {
  localStorage.setItem(KEY, JSON.stringify(entries));
}
