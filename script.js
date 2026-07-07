// ── PAGE SWITCHING ──
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  document.querySelectorAll('.nav-link').forEach(l => {
    if (l.textContent.toLowerCase().trim() === id) l.classList.add('active');
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (id === 'results') setTimeout(initCharts, 100);
}

// ── TICKER ──
const tdata = [
  ['Dataset', 'World Energy Consumption'],
  ['Peak demand', '116,816 GWh (2021)'],
  ['Best model', 'ARIMA (1,1,1)'],
  ['RMSE cut', '18%'],
  ['Forecast', '122,800 GWh by 2030'],
  ['DISCOs', '10 Pakistan zones'],
  ['Validated', 'NEPRA Report 2022-23'],
  ['Train', '1991–2016'],
  ['Test', '2017–2022'],
  ['Models', 'LR vs ARIMA'],
];
const tk = document.getElementById('ticker');
const th = [...tdata, ...tdata].map(([l, v]) => `<div class="ti">${l} <em>${v}</em></div>`).join('');
tk.innerHTML = th + th;

// ── COUNTER ANIMATION ──
function animateCounters() {
  document.querySelectorAll('[data-t]').forEach(el => {
    const t = +el.dataset.t, s = el.dataset.s || '';
    let n = 0, step = t / 55;
    const tm = setInterval(() => {
      n = Math.min(n + step, t);
      el.textContent = Math.floor(n) + s;
      if (n >= t) clearInterval(tm);
    }, 28);
  });
}
setTimeout(animateCounters, 350);

// ── CHARTS ──
let inited = false;

function initCharts() {
  if (inited) return;
  inited = true;

  const gc = 'rgba(255,255,255,0.05)', tc = '#4e4d49';
  const base = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { color: gc }, ticks: { color: tc, font: { size: 11 }, maxTicksLimit: 8 } },
      y: { grid: { color: gc }, ticks: { color: tc, font: { size: 11 }, callback: v => (v / 1000).toFixed(0) + 'K' } }
    }
  };

  const yrs = [1991,1993,1995,1997,1999,2001,2003,2005,2007,2009,2011,2013,2015,2017,2019,2021,2022];
  const dem = [31534,35200,39800,44100,48200,51000,54800,60200,66500,72300,80100,88400,95200,102800,108400,116816,110647];
  const ra = (d, w) => d.map((_, i) => i < w - 1 ? null : Math.round(d.slice(i - w + 1, i + 1).reduce((a, b) => a + b, 0) / w));

  // Chart 1 — Demand trend
  new Chart(document.getElementById('c1'), {
    type: 'line',
    data: {
      labels: yrs,
      datasets: [
        { data: dem, borderColor: '#2a78d6', backgroundColor: 'rgba(42,120,214,0.06)', borderWidth: 2.5, pointRadius: 3.5, pointBackgroundColor: '#2a78d6', fill: true, tension: 0.35 },
        { data: ra(dem, 5), borderColor: '#eda100', borderWidth: 1.5, borderDash: [6, 3], pointRadius: 0, fill: false, tension: 0.35 }
      ]
    },
    options: { ...base }
  });

  // Chart 2 — Model comparison
  new Chart(document.getElementById('c2'), {
    type: 'line',
    data: {
      labels: [2017, 2019, 2021, 2022],
      datasets: [
        { data: [102800,108400,116816,110647], borderColor: '#eeecea', borderWidth: 2.5, pointRadius: 5, pointBackgroundColor: '#eeecea', fill: false },
        { data: [99800,105600,113200,114800], borderColor: '#e34948', borderWidth: 2, borderDash: [5, 3], pointRadius: 4, pointBackgroundColor: '#e34948', fill: false },
        { data: [103200,109100,115700,111300], borderColor: '#1baf7a', borderWidth: 2, borderDash: [3, 2], pointRadius: 4, pointBackgroundColor: '#1baf7a', fill: false }
      ]
    },
    options: { ...base, scales: { ...base.scales, x: { ...base.scales.x, ticks: { ...base.scales.x.ticks, maxTicksLimit: 4 } } } }
  });

  // Chart 3 — Forecast 2030
  const allY = [2017,2019,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030];
  new Chart(document.getElementById('c3'), {
    type: 'line',
    data: {
      labels: allY,
      datasets: [
        { data: [102800,108400,116816,110647,null,null,null,null,null,null,null,null], borderColor: '#2a78d6', backgroundColor: 'rgba(42,120,214,0.06)', borderWidth: 2.5, pointRadius: 4, pointBackgroundColor: '#2a78d6', fill: true, tension: 0.3, spanGaps: false },
        { data: [null,null,null,110647,108000,109500,111200,113100,115200,117500,120000,122800], borderColor: '#e34948', borderWidth: 2.5, borderDash: [7, 3], pointRadius: 5, pointBackgroundColor: '#e34948', fill: false, tension: 0.3, spanGaps: false },
        { data: [null,null,null,110647,118800,120450,122320,124410,126720,129250,132000,135080], borderColor: 'transparent', backgroundColor: 'rgba(227,73,72,0.08)', fill: '+1', pointRadius: 0, tension: 0.3, spanGaps: false },
        { data: [null,null,null,110647,97200,98550,100080,101790,103680,105750,108000,110520], borderColor: 'transparent', backgroundColor: 'rgba(227,73,72,0.08)', fill: false, pointRadius: 0, tension: 0.3, spanGaps: false }
      ]
    },
    options: { ...base }
  });

  // Chart 4 — Generation mix
  new Chart(document.getElementById('c4'), {
    type: 'bar',
    data: {
      labels: [1995, 2000, 2005, 2010, 2015, 2020, 2022],
      datasets: [
        { label: 'Fossil', data: [28000,34000,41000,55000,68000,80000,72000], backgroundColor: 'rgba(227,73,72,0.78)', borderRadius: 3, borderSkipped: false },
        { label: 'Hydro', data: [9500,11000,14000,19000,23000,26000,24000], backgroundColor: 'rgba(42,120,214,0.78)', borderRadius: 3, borderSkipped: false },
        { label: 'Renewables', data: [500,800,1200,2000,4000,8500,10000], backgroundColor: 'rgba(27,175,122,0.78)', borderRadius: 3, borderSkipped: false }
      ]
    },
    options: {
      ...base,
      scales: {
        x: { stacked: true, grid: { display: false }, ticks: { color: tc, font: { size: 11 } } },
        y: { stacked: true, grid: { color: gc }, ticks: { color: tc, font: { size: 11 }, callback: v => (v / 1000).toFixed(0) + 'K' } }
      }
    }
  });

  // DISCO cards
  const discos = [
    { name: 'LESCO (Lahore)', s: 22, c: '#2a78d6' },
    { name: 'MEPCO (Multan)', s: 14, c: '#e34948' },
    { name: 'FESCO (Faisalabad)', s: 13, c: '#eda100' },
    { name: 'IESCO (Islamabad)', s: 12, c: '#1baf7a' },
    { name: 'PESCO (Peshawar)', s: 10, c: '#8b5cf6' },
    { name: 'GEPCO (Gujranwala)', s: 10, c: '#eb6834' },
    { name: 'HESCO (Hyderabad)', s: 7, c: '#2a78d6' },
    { name: 'SEPCO (Sukkur)', s: 5, c: '#1baf7a' },
    { name: 'QESCO (Quetta)', s: 4, c: '#eda100' },
    { name: 'TESCO (Tribal)', s: 3, c: '#e34948' },
  ];
  const g = document.getElementById('discoGrid');
  discos.forEach(d => {
    g.innerHTML += `<div class="dc">
      <div class="dn2">${d.name}</div>
      <div class="dv">${d.s}%</div>
      <div class="dbb"><div class="dbf" style="width:${Math.round(d.s / 22 * 100)}%;background:${d.c}"></div></div>
    </div>`;
  });
}
