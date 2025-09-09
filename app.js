(function(){
  const KEY = "edge_ship_log";
  const txt = document.getElementById("txt");
  const list = document.getElementById("list");
  const addBtn = document.getElementById("add");

  function load(){
    try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
    catch(e){ return []; }
  }
  function save(data){
    localStorage.setItem(KEY, JSON.stringify(data));
  }
  function render(data){
    list.innerHTML = data.map(x => {
      const dt = new Date(x.t).toLocaleString();
      return `<li><time>${dt}</time> — <span>${escapeHtml(x.v)}</span></li>`;
    }).join("");
  }
  function escapeHtml(s){
    return s.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  }

  addBtn.addEventListener("click", () => {
    const v = (txt.value || "").trim();
    if(!v) return;
    const data = load();
    data.unshift({ t: Date.now(), v });
    save(data);
    txt.value = "";
    render(data);
  });

  // Init
  render(load());
})();
