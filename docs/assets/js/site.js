/* Norges Dartsforbund – konsept. All "innlogging" er simulert i nettleseren.
   Ingen data sendes noe sted. */
(function () {
  "use strict";
  const D = window.NDF;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const MONTHS = ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"];
  const MON = ["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "okt", "nov", "des"];
  const d = (iso) => new Date(iso + "T12:00:00");
  const fmtDate = (iso) => { const x = d(iso); return `${x.getDate()}. ${MONTHS[x.getMonth()]} ${x.getFullYear()}`; };
  const fmtShort = (iso) => { const x = d(iso); return `${String(x.getDate()).padStart(2, "0")}.${String(x.getMonth() + 1).padStart(2, "0")}.${x.getFullYear()}`; };
  const fmtRange = (a, b) => {
    if (a === b) return fmtDate(a);
    const x = d(a), y = d(b);
    if (x.getMonth() === y.getMonth()) return `${x.getDate()}.–${y.getDate()}. ${MONTHS[y.getMonth()]} ${y.getFullYear()}`;
    return `${fmtDate(a)} – ${fmtDate(b)}`;
  };
  const kr = (n) => `${n.toLocaleString("nb-NO")} kr`;
  const LEVEL = { nasjonal: "Nasjonal", internasjonal: "Internasjonal", krets: "Krets" };

  /* ---------- Storage (safe) ---------- */
  const store = {
    get(k, fb) { try { const v = localStorage.getItem("ndf:" + k); return v ? JSON.parse(v) : fb; } catch (e) { return fb; } },
    set(k, v) { try { localStorage.setItem("ndf:" + k, JSON.stringify(v)); } catch (e) { /* ignore */ } },
    del(k) { try { localStorage.removeItem("ndf:" + k); } catch (e) { /* ignore */ } }
  };
  const user = () => store.get("user", null);
  const regs = () => store.get("regs", []);

  function toast(msg) {
    let t = $(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.textContent = msg;
    requestAnimationFrame(() => t.classList.add("show"));
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("show"), 3200);
  }

  /* ---------- Header ---------- */
  function initHeader() {
    const btn = $(".nav-toggle"), nav = $(".main-nav");
    if (btn && nav) btn.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
    });
    const u = user(), slot = $("#auth-slot");
    if (slot && u) {
      slot.innerHTML = `<a class="btn btn-light btn-small" href="min-side.html">Min side<span class="visually-hidden">, innlogget som ${esc(u.name)}</span></a>`;
    }
  }

  /* ---------- Countdown ---------- */
  function initCountdown() {
    const el = $("[data-countdown]");
    if (!el) return;
    const next = D.events.filter((e) => e.championship).map((e) => e).sort((a, b) => a.start.localeCompare(b.start))
      .find((e) => d(e.end) >= new Date()) || D.events[0];
    $("[data-next-name]").textContent = next.name;
    $("[data-next-meta]").textContent = `${fmtRange(next.start, next.end)}, ${next.place}. Påmeldingsfrist ${fmtDate(next.deadline)}.`;
    $("[data-next-link]").href = `terminliste.html#${next.id}`;
    const target = new Date(next.start + "T10:00:00");
    const tick = () => {
      let s = Math.max(0, Math.floor((target - new Date()) / 1000));
      const days = Math.floor(s / 86400); s %= 86400;
      const h = Math.floor(s / 3600); s %= 3600;
      const m = Math.floor(s / 60);
      el.innerHTML = `<div><strong>${days}</strong><span>dager</span></div><div><strong>${h}</strong><span>timer</span></div><div><strong>${m}</strong><span>min</span></div>`;
    };
    tick(); setInterval(tick, 30000);
  }

  /* ---------- Shared renderers ---------- */
  const newsItem = (n) => `<li><a class="news-item" href="artikkel.html?id=${n.id}">
      <time datetime="${n.date}">${fmtShort(n.date)}</time>
      <div><h3>${esc(n.title)}</h3><p>${esc(n.summary)}</p></div></a></li>`;

  function eventRow(e) {
    const x = d(e.start);
    const registered = regs().includes(e.id);
    const canRegister = e.level !== "internasjonal";
    return `<li id="${e.id}"><div class="event-row">
      <div class="date-block lvl-${e.level}" aria-hidden="true"><strong>${x.getDate()}</strong><span>${MON[x.getMonth()]}</span></div>
      <div>
        <h3>${esc(e.name)}</h3>
        <p><span class="tag ${e.level === "nasjonal" ? "tag-red" : e.level === "internasjonal" ? "tag-ink" : "tag-green"}">${LEVEL[e.level]}</span>${fmtRange(e.start, e.end)}, ${esc(e.place)}. Arrangør: ${esc(e.org)}.</p>
      </div>
      <div class="event-actions">
        ${canRegister ? (registered
          ? `<span class="btn btn-small btn-secondary" aria-disabled="true">Påmeldt</span>`
          : `<button class="btn btn-small btn-primary" data-register="${e.id}">Meld på<span class="visually-hidden"> ${esc(e.name)}</span></button>`) : ""}
        <button class="btn btn-small btn-secondary" data-ics="${e.id}">Legg i kalender<span class="visually-hidden">: ${esc(e.name)}</span></button>
      </div></div></li>`;
  }

  function downloadIcs(id) {
    const e = D.events.find((x) => x.id === id);
    const endPlus = d(e.end); endPlus.setDate(endPlus.getDate() + 1);
    const f = (dt) => dt.toISOString().slice(0, 10).replace(/-/g, "");
    const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//NDF//Terminliste//NO", "BEGIN:VEVENT",
      `UID:${e.id}@norgesdartsforbund.no`, `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`,
      `DTSTART;VALUE=DATE:${e.start.replace(/-/g, "")}`, `DTEND;VALUE=DATE:${f(endPlus)}`,
      `SUMMARY:${e.name}`, `LOCATION:${e.place}`, `DESCRIPTION:Arrangør: ${e.org}. Påmeldingsfrist ${fmtDate(e.deadline)}.`,
      "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    a.download = `${e.name.replace(/[^\wæøåÆØÅ]+/g, "-")}.ics`;
    document.body.appendChild(a); a.click(); a.remove();
    toast(`Kalenderfil for ${e.name} er lastet ned`);
  }

  function bindEventActions(root, rerender) {
    root.addEventListener("click", (ev) => {
      const ics = ev.target.closest("[data-ics]");
      if (ics) return downloadIcs(ics.dataset.ics);
      const reg = ev.target.closest("[data-register]");
      if (reg) {
        if (!user()) { location.href = `logg-inn.html?neste=${encodeURIComponent("terminliste.html#" + reg.dataset.register)}`; return; }
        const list = regs(); list.push(reg.dataset.register); store.set("regs", list);
        const e = D.events.find((x) => x.id === reg.dataset.register);
        toast(`Du er meldt på ${e.name}`);
        rerender();
      }
    });
  }

  function rankingTable(key, filter = "") {
    const rows = D.ranking[key]
      .map((r, i) => ({ pos: i + 1, name: r[0], club: r[1], pts: r[2], ev: r[3], mv: r[4] }))
      .filter((r) => !filter || (r.name + " " + r.club).toLowerCase().includes(filter.toLowerCase()));
    if (!rows.length) return `<div class="empty-state"><p>Ingen spillere matcher søket. Sjekk stavemåten eller søk på klubbnavn.</p></div>`;
    const mv = (n) => n > 0 ? `<span class="move-up">▲ ${n}<span class="visually-hidden"> plasser opp</span></span>`
      : n < 0 ? `<span class="move-down">▼ ${-n}<span class="visually-hidden"> plasser ned</span></span>`
      : `<span class="move-same">–<span class="visually-hidden"> uendret</span></span>`;
    return `<div class="table-wrap"><table>
      <thead><tr><th scope="col">Plass</th><th scope="col">Spiller</th><th scope="col" class="hide-sm">Klubb</th><th scope="col" class="num">Poeng</th><th scope="col" class="num hide-sm">Turneringer</th><th scope="col">Endring</th></tr></thead>
      <tbody>${rows.map((r) => `<tr><td class="pos">${r.pos}</td><th scope="row">${esc(r.name)}<span class="sub show-sm">${esc(r.club)}</span></th><td class="hide-sm">${esc(r.club)}</td><td class="num">${r.pts}</td><td class="num hide-sm">${r.ev}</td><td>${mv(r.mv)}</td></tr>`).join("")}</tbody>
    </table></div>`;
  }

  function initTabs(root, onChange) {
    const tabs = $$('[role="tab"]', root);
    const select = (t, focus) => {
      tabs.forEach((x) => { const on = x === t; x.setAttribute("aria-selected", on); x.tabIndex = on ? 0 : -1; });
      if (focus) t.focus();
      onChange(t.dataset.key);
    };
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => select(t));
      t.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") select(tabs[(i + 1) % tabs.length], true);
        if (e.key === "ArrowLeft") select(tabs[(i - 1 + tabs.length) % tabs.length], true);
      });
    });
  }

  /* ---------- Pages ---------- */
  const pages = {
    home() {
      initCountdown();
      $("#home-news").innerHTML = D.news.slice(0, 4).map(newsItem).join("");
      const upcoming = () => { $("#home-events").innerHTML = D.events.filter((e) => d(e.end) >= new Date()).slice(0, 4).map(eventRow).join(""); };
      upcoming(); bindEventActions($("#home-events"), upcoming);
      const panel = $("#home-ranking");
      let key = "herrer";
      const draw = () => {
        const top = D.ranking[key].slice(0, 5);
        panel.innerHTML = `<div class="table-wrap"><table><thead><tr><th scope="col">Plass</th><th scope="col">Spiller</th><th scope="col" class="num">Poeng</th></tr></thead><tbody>
          ${top.map((r, i) => `<tr><td class="pos">${i + 1}</td><th scope="row">${esc(r[0])}<span class="sub">${esc(r[1])}</span></th><td class="num">${r[2]}</td></tr>`).join("")}</tbody></table></div>`;
      };
      initTabs($("#home-ranking-tabs"), (k) => { key = k; draw(); });
      draw();
    },

    news() {
      const list = $("#news-list"), chips = $("#news-filter");
      const tags = ["Alle", ...new Set(D.news.map((n) => n.tag))];
      chips.innerHTML = `<legend>Tema</legend>` + tags.map((t, i) => `<label class="chip"><input type="radio" name="tag" value="${esc(t)}" ${i === 0 ? "checked" : ""}><span>${esc(t)}</span></label>`).join("");
      const draw = () => {
        const t = $('input[name="tag"]:checked', chips).value;
        list.innerHTML = D.news.filter((n) => t === "Alle" || n.tag === t).map(newsItem).join("");
      };
      chips.addEventListener("change", draw); draw();
    },

    article() {
      const id = Number(new URLSearchParams(location.search).get("id"));
      const n = D.news.find((x) => x.id === id) || D.news[0];
      document.title = `${n.title} – Norges Dartsforbund`;
      $("#article").innerHTML = `
        <nav class="breadcrumb" aria-label="Brødsmuler"><ol><li><a href="index.html">Forside</a></li><li><a href="nyheter.html">Nyheter</a></li><li aria-current="page">${esc(n.title)}</li></ol></nav>
        <h1>${esc(n.title)}</h1>
        <p class="meta"><span class="tag">${esc(n.tag)}</span> Publisert <time datetime="${n.date}">${fmtDate(n.date)}</time></p>
        ${n.body.map((p) => `<p>${esc(p)}</p>`).join("")}
        <div class="note"><p>Konseptversjon av saken. <a href="${n.source}">Les originalen på dagens nettside</a>.</p></div>
        <p><a href="nyheter.html">Alle nyheter</a></p>`;
    },

    calendar() {
      const list = $("#cal-list"), form = $("#cal-filters"), count = $("#cal-count");
      const months = [...new Set(D.events.map((e) => e.start.slice(0, 7)))];
      $("#cal-month").innerHTML = `<option value="">Hele året</option>` + months.map((m) => `<option value="${m}">${MONTHS[Number(m.slice(5)) - 1][0].toUpperCase() + MONTHS[Number(m.slice(5)) - 1].slice(1)} ${m.slice(0, 4)}</option>`).join("");
      const draw = () => {
        const lv = $$('input[name="level"]:checked', form).map((x) => x.value);
        const m = $("#cal-month").value, q = $("#cal-q").value.trim().toLowerCase();
        const rows = D.events.filter((e) => lv.includes(e.level) && (!m || e.start.startsWith(m)) && (!q || (e.name + e.place + e.org).toLowerCase().includes(q)));
        count.textContent = `${rows.length} ${rows.length === 1 ? "arrangement" : "arrangementer"}`;
        if (!rows.length) {
          list.innerHTML = `<div class="empty-state"><p>Ingen arrangementer passer filtrene. Prøv et annet nivå eller velg hele året.</p><button class="btn btn-secondary btn-small" type="button" id="cal-reset">Nullstill filtre</button></div>`;
          $("#cal-reset").onclick = () => { form.reset(); draw(); };
          return;
        }
        const byMonth = {};
        rows.forEach((e) => (byMonth[e.start.slice(0, 7)] ||= []).push(e));
        list.innerHTML = Object.entries(byMonth).map(([k, evs]) => {
          const mm = MONTHS[Number(k.slice(5)) - 1];
          return `<h2 class="month-heading">${mm[0].toUpperCase() + mm.slice(1)} ${k.slice(0, 4)}</h2><ul class="event-list">${evs.map(eventRow).join("")}</ul>`;
        }).join("");
        if (location.hash) { const t = $(location.hash); if (t) t.scrollIntoView({ block: "center" }); }
      };
      form.addEventListener("input", draw); form.addEventListener("submit", (e) => e.preventDefault());
      bindEventActions(list, draw); draw();
    },

    results() {
      const sel = $("#res-select"), out = $("#res-out");
      sel.innerHTML = D.results.map((r) => `<option value="${r.id}">${esc(r.name)}</option>`).join("");
      const draw = () => {
        const r = D.results.find((x) => x.id === sel.value);
        const match = (m) => {
          const [a, as, b, bs] = m, aw = as > bs;
          return `<li class="match"><div class="${aw ? "won" : ""}"><span>${esc(a)}</span><span>${as}</span></div><div class="${!aw ? "won" : ""}"><span>${esc(b)}</span><span>${bs}</span></div></li>`;
        };
        out.innerHTML = `
          <h2>${esc(r.name)}</h2>
          <p class="demo-flag">${fmtDate(r.date)}, ${esc(r.place)}</p>
          <h3>Pallen</h3>
          <ol class="podium">${r.podium.map((p, i) => `<li><span>${["1. plass", "2. plass", "3. plass"][i]}</span><strong>${esc(p[0])}</strong><span>${esc(p[1])}</span></li>`).join("")}</ol>
          <h3>Sluttspill</h3>
          <div class="bracket">${Object.entries(r.bracket).map(([round, ms]) => `<section class="round" aria-label="${round}"><h3>${round}</h3><ol>${ms.map(match).join("")}</ol></section>`).join("")}</div>`;
      };
      sel.addEventListener("change", draw); draw();
    },

    ranking() {
      let key = "herrer";
      const out = $("#rank-out"), q = $("#rank-q");
      const draw = () => { out.innerHTML = rankingTable(key, q.value.trim()); };
      initTabs($("#rank-tabs"), (k) => { key = k; draw(); });
      q.addEventListener("input", draw); draw();
    },

    clubs() {
      const sel = $("#club-krets"), q = $("#club-q"), out = $("#club-out"), count = $("#club-count"), nb = $("#club-new"), jr = $("#club-jr");
      sel.innerHTML = `<option value="">Alle kretser</option>` + D.kretser.map((k) => `<option>${esc(k)}</option>`).join("");
      const draw = () => {
        const s = q.value.trim().toLowerCase();
        const rows = D.clubs.filter((c) => (!sel.value || c.krets === sel.value) && (!s || (c.name + c.place).toLowerCase().includes(s)) && (!nb.checked || c.newcomers) && (!jr.checked || c.juniors));
        count.textContent = `${rows.length} ${rows.length === 1 ? "klubb" : "klubber"}`;
        out.innerHTML = rows.length ? `<ul class="club-grid">${rows.map((c) => `<li><article class="club">
            <h3>${esc(c.name)}</h3><p class="where">${esc(c.place)}, ${esc(c.krets)}</p>
            <dl><dt>Spillekvelder</dt><dd>${esc(c.nights)}</dd><dt>Nybegynnere</dt><dd>${c.newcomers ? "Ja, egen introkveld" : "Ta kontakt først"}</dd><dt>Junior</dt><dd>${c.juniors ? "Har juniorgruppe" : "Nei"}</dd></dl>
            <a class="btn btn-secondary btn-small" href="kontakt.html?klubb=${encodeURIComponent(c.name)}">Kontakt ${esc(c.name)}</a></article></li>`).join("")}</ul>`
          : `<div class="empty-state"><p>Fant ingen klubb med disse valgene. Velg «Alle kretser» eller ta kontakt, så hjelper vi deg å finne nærmeste klubb.</p><a class="btn btn-secondary btn-small" href="kontakt.html">Kontakt NDF</a></div>`;
      };
      [sel, q, nb, jr].forEach((el) => el.addEventListener("input", draw)); draw();
    },

    join() {
      $("#fees").innerHTML = D.fees.map(([k, v]) => `<tr><th scope="row">${esc(k)}</th><td>${kr(v)}</td></tr>`).join("");
    },

    about() {
      $("#board").innerHTML = D.board.map(([role, name, club, mail]) => `<li><span class="role">${role}</span><strong>${esc(name)}</strong><span class="club-name">${esc(club)}</span><a href="mailto:${mail}">${mail}</a></li>`).join("");
    },

    contact() {
      const klubb = new URLSearchParams(location.search).get("klubb");
      if (klubb) { $("#c-topic").value = "Finne en klubb"; $("#c-msg").value = `Hei! Jeg er interessert i å begynne i ${klubb}.`; }
      $("#contact-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const err = $("#c-error");
        if (!$("#c-name").value.trim() || !$("#c-email").value.includes("@")) { err.textContent = "Fyll inn navn og en gyldig e-postadresse."; $("#c-name").focus(); return; }
        err.textContent = "";
        e.target.reset();
        toast("Melding sendt (simulert i konseptet)");
      });
    },

    login() {
      const params = new URLSearchParams(location.search);
      const next = params.get("neste");
      const safeNext = next && /^[a-z-]+\.html(#[\w-]+)?$/.test(next) ? next : "min-side.html";
      if (user()) { location.replace(safeNext); return; }
      const finish = (name) => {
        store.set("user", { name, no: "NDF-104 233", club: "Fjordbyen DK", krets: "Oslo og Akershus", type: "Senior" });
        location.href = safeNext;
      };
      $("#login-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const id = $("#l-id"), pw = $("#l-pw"), err = $("#l-error");
        if (!id.value.trim() || !pw.value) { err.textContent = "Skriv inn e-post eller medlemsnummer og passord."; (id.value.trim() ? pw : id).focus(); return; }
        pw.value = ""; // never kept
        finish("Demo Spiller");
      });
      $$("[data-sso]").forEach((b) => b.addEventListener("click", () => finish("Demo Spiller")));
    },

    member() {
      const u = user();
      if (!u) { location.replace("logg-inn.html?neste=min-side.html"); return; }
      const paid = () => store.get("paid", false);
      const fee = 800;
      const draw = () => {
        $("#m-name").textContent = u.name;
        $("#m-status").innerHTML = paid()
          ? `<span class="status-dot ok" aria-hidden="true"></span><div><strong>Kontingent 2027 er betalt</strong><span class="sub">Du kan melde deg på alle NDF-turneringer.</span></div>`
          : `<span class="status-dot" aria-hidden="true"></span><div><strong>Kontingent 2027 er ikke betalt</strong><span class="sub">${u.type}: ${kr(fee)}. Forfall 31. januar 2027.</span></div><button class="btn btn-primary" id="pay-btn">Betal ${kr(fee)} med Vipps</button>`;
        $("#m-card").className = "member-card" + (paid() ? "" : " unpaid");
        $("#m-card-status").textContent = paid() ? "Gyldig medlem 2027" : "Ikke betalt for 2027";
        $("#m-card-name").textContent = u.name;
        $("#m-card-meta").textContent = `${u.no}, ${u.club}`;
        const mine = D.events.filter((e) => regs().includes(e.id));
        $("#m-regs").innerHTML = mine.length
          ? `<ul class="event-list">${mine.map((e) => `<li><div class="event-row"><div class="date-block lvl-${e.level}" aria-hidden="true"><strong>${d(e.start).getDate()}</strong><span>${MON[d(e.start).getMonth()]}</span></div><div><h3>${esc(e.name)}</h3><p>${fmtRange(e.start, e.end)}, ${esc(e.place)}</p></div><div class="event-actions"><button class="btn btn-small btn-secondary" data-unreg="${e.id}">Meld av<span class="visually-hidden"> ${esc(e.name)}</span></button></div></div></li>`).join("")}</ul>`
          : `<div class="empty-state"><p>Du er ikke påmeldt noen turneringer ennå.</p><a class="btn btn-secondary btn-small" href="terminliste.html">Finn en turnering</a></div>`;
        $("#m-profile").innerHTML = `<dt>Medlemsnummer</dt><dd>${u.no}</dd><dt>Medlemstype</dt><dd>${u.type}</dd><dt>Klubb</dt><dd>${u.club}</dd><dt>Krets</dt><dd>${u.krets}</dd>`;
        const pb = $("#pay-btn");
        if (pb) pb.onclick = () => $("#pay-dialog").showModal();
      };
      $("#m-regs").addEventListener("click", (e) => {
        const b = e.target.closest("[data-unreg]"); if (!b) return;
        store.set("regs", regs().filter((x) => x !== b.dataset.unreg));
        toast("Du er meldt av"); draw();
      });
      $("#pay-confirm").addEventListener("click", () => { store.set("paid", true); $("#pay-dialog").close(); toast("Kontingent 2027 er betalt"); draw(); });
      $("#pay-cancel").addEventListener("click", () => $("#pay-dialog").close());
      $("#logout").addEventListener("click", () => { store.del("user"); store.del("paid"); store.del("regs"); location.href = "index.html"; });
      draw();
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    initHeader();
    const p = document.body.dataset.page;
    if (pages[p]) pages[p]();
  });
})();
