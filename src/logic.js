// Pure functions that operate on entry arrays.
// An entry has shape: { t: number, v: string }
// Newest entries should appear first (higher 't' first).

export function add(entries, text, now = Date.now()) {
  const v = String(text || "").trim();
  if (!v) throw new Error("empty entry");
  return [{ t: now, v }, ...entries];
}

// TODO (Hard Mode): implement delete/edit/filter

export function remove(entries, t) {
  // remove the entry whose timestamp === t
  throw new Error("not implemented");
}

export function edit(entries, t, newText) {
  // update entry with timestamp t to new text (trimmed, non-empty)
  throw new Error("not implemented");
}

export function filterByQuery(entries, q) {
  // return entries whose text includes q (case-insensitive). empty q -> return entries
  throw new Error("not implemented");
}
