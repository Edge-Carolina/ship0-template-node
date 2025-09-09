import { add } from "./logic.js";
import { loadEntries, saveEntries } from "./storage.js";

const txt = document.getElementById("txt");
const addBtn = document.getElementById("add");
const list = document.getElementById("list");

function render(entries) {
  list.innerHTML = entries.map(e => {
    const dt = new Date(e.t).toLocaleString();
    return `<li><time>${dt}</time><span class="text">${escapeHtml(e.v)}</span></li>`;
  }).join("");
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

function main() {
  let entries = loadEntries();
  render(entries);

  addBtn.addEventListener("click", () => {
    const v = (txt.value || "").trim();
    if (!v) return;
    try {
      entries = add(entries, v);
      saveEntries(entries);
      txt.value = "";
      render(entries);
    } catch (e) {
      alert(e.message || e);
    }
  });
}

main();
