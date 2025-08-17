/* --- register plugins early --- */
(function ensureAnnotationPlugin(){
  try{
    const plug = window['chartjs-plugin-annotation'];
    if(plug && typeof Chart?.register === 'function'){
      if(!Chart.registry?.plugins?.get?.('annotation')) Chart.register(plug);
    }
  }catch(_e){}
})();
const cssVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim() || '';
const Cfg = () => ({
  ink: cssVar('--ink') || '#0b1220',
  muted: cssVar('--muted') || '#4b5563',
  accent: cssVar('--accent') || '#0369a1',
  ok: cssVar('--ok') || '#15803d',
  warn: cssVar('--warn') || '#ca8a04',
  bad: cssVar('--bad') || '#b91c1c',
  line: cssVar('--line') || '#e5e7eb',
  breakGreen: cssVar('--breakGreen') || '#bff2cf'
});
Chart.defaults.animation = false;
const perfMeter = {
  id:'perfMeter',
  beforeRender(chart){ chart.$t0 = performance.now(); },
  afterRender(chart){ const t=performance.now()-(chart.$t0||performance.now()); const {ctx,chartArea}=chart; if(!chartArea) return; const C=Cfg(); ctx.save(); ctx.font='10px ui-monospace'; ctx.textAlign='right'; ctx.textBaseline='top'; ctx.fillStyle=C.muted; ctx.fillText(`${Math.round(t)} ms`, chartArea.right-6, chartArea.top+4); ctx.restore();}
};

/* --- i18n (hanya label tabel RR yang berubah: kolom pertama menjadi "m/s²") --- */
const T = {
  en:{title:"Vibration Exposure Simulation A(8) (EU 2002/44/EC)",sub:"Formula: A(8) = aₕᵥ · √(T / 8), T in hours; normalized to 8 h",inputs:"Inputs",ahvlabel:"aₕᵥ (m/s²) – tool RMS",ahvhint:"Example: 2.50 m/s² (A(8) equals 2.5 if used for full 8 h)",targetlabel:"Target A(8) (m/s²)",targethint:"Recommended <= 2.50 as a safety margin",shiftlabel:"Shift duration (h)",shifthint:"Exposure time ≤ shift; A(8) normalized to 8 h",toolhlabel:"Tool hours/day (total)",toolhhint:"For minimum operators (rotation)",a8fulltxt:"If used continuously for the whole shift, A(8) = ",tmax8txt:"Max exposure for target (8-h basis): ",tmaxlimtxt:"Exposure limited by shift: ",perhourtxt:"Per-hour recommendation: ",opsneedtxt:"Operators needed (min): ",opts:"Schedule Options & A(8)",presethint:"Add row: Work′ + Break′ per hour. <b>Click a row to update the donut chart & curve.</b>",colScheme:"Per-hour scheme",colT:"T (h/day)",colStatus:"Status",dutydef:"Duty = work minutes per hour / 60. Effective T = duty × shift (≤ shift). A(8)=aₕᵥ·√(T/8).",chart1title:"Chart: Work vs Break per Hour",chart2title:"Chart: Risk Analysis of A(8) vs Shift Duration",chart2hint:"Curves from Calculated, Optimized (5′ step), and Selected duties.",sec2:"Worker Rotation",sec2p:"If the total workload exceeds the maximum exposure time per person, divide the work among several operators. Rotation is a very effective administrative control to reduce individual exposure. Minimum operators = ceil(Total Tool Hours / T<sub>max</sub>).",sec3:"Engineering Controls",sec3ul:["<b>Top Priority:</b> Use low-vibration tool models or anti-vibration handles.","Perform regular maintenance: balancing, alignment, replace worn components that cause vibration."],sec4:"Administrative Controls",sec4ul:["Implement work & break schedules (vibration breaks) to lower daily exposure (T).","Schedule high-vibration tasks at the start of the shift when workers are physically optimal."],sec5:"Training & Work Technique",sec5ul:["Grip the tool as lightly as possible (without losing control) to minimize vibration transmission.","Use good posture and avoid awkward positions that increase strain on hands and arms."],sec6:"PPE",sec6ul:["Use certified anti-vibration gloves (EN ISO 10819). Their effectiveness is limited at low frequencies.","PPE is not a substitute for engineering or administrative controls."],foot:"EU thresholds: EAV = 2.5 m/s² (action required); ELV = 5.0 m/s² (must not be exceeded). Control hierarchy: Engineering > Administrative > PPE.",pills:{below:"Below EAV",at:"At EAV",between:"Between EAV–ELV",above:"Above ELV!",target:"Target-based",shift:"Shift limit",duty:"Duty cycle",rot:"Rotation"},ann:{eav:"EAV: Action Level (2.5)",elv:"ELV: Limit Value (5.0)"},mode:{target:"target",selected:"selected"},rr:{cap:"Daily exposure duration →",mag:"m/s²"}},
  id:{title:"Simulasi Paparan Getaran A(8) (EU 2002/44/EC)",sub:"Rumus: A(8) = aₕᵥ · √(T / 8), T dalam jam; normalisasi ke 8 jam",inputs:"Input",ahvlabel:"aₕᵥ (m/s²) – RMS alat",ahvhint:"Contoh: 2.50 m/s² (A(8) = 2.5 jika 8 jam penuh)",targetlabel:"Target A(8) (m/s²)",targethint:"Disarankan <= 2,50 sebagai margin aman",shiftlabel:"Durasi shift (jam)",shifthint:"Paparan ≤ durasi shift; A(8) dinormalisasi ke 8 jam",toolhlabel:"Total jam alat/hari",toolhhint:"Untuk hitung operator minimum (rotasi)",a8fulltxt:"Jika dipakai terus sepanjang shift, A(8) = ",tmax8txt:"Durasi paparan maksimum (target, basis 8 jam): ",tmaxlimtxt:"Batas paparan dibatasi shift: ",perhourtxt:"Rekomendasi per jam: ",opsneedtxt:"Kebutuhan operator (min): ",opts:"Opsi Jadwal & A(8)",presethint:"Tambah baris: Work′ + Break′ per jam. <b>Klik baris untuk update chart.</b>",colScheme:"Skema per jam",colT:"T (jam/hari)",colStatus:"Status",dutydef:"Duty = menit kerja per jam / 60. T efektif = duty × durasi shift (≤ shift). A(8)=aₕᵥ·√(T/8).",chart1title:"Chart: Work vs Break per Jam",chart2title:"Chart: Analisis Risiko A(8) vs Durasi Shift",chart2hint:"Kurva dari duty Kalkulasi, Optimasi (kelipatan 5′), dan Terpilih.",sec2:"Rotasi Pekerja",sec2p:"Jika beban kerja total > T<sub>max</sub> per orang, bagi ke beberapa operator. Rotasi efektif menurunkan paparan.",sec3:"Kontrol Rekayasa",sec3ul:["Utamakan alat low-vibration atau pegangan anti-getaran.","Rawat berkala: balancing, alignment, ganti komponen aus."],sec4:"Kontrol Administratif",sec4ul:["Jadwal kerja & jeda menurunkan T.","Jadwalkan pekerjaan getaran tinggi di awal shift."],sec5:"Pelatihan & Teknik Kerja",sec5ul:["Pegang seringan mungkin tanpa kehilangan kontrol.","Gunakan postur baik; hindari posisi canggung."],sec6:"APD",sec6ul:["Sarung tangan anti-getaran (EN ISO 10819).","APD bukan pengganti kontrol lain."],foot:"Ambang EU: EAV = 2,5 m/s²; ELV = 5,0 m/s².",pills:{below:"Di bawah EAV",at:"Tepat EAV",between:"Antara EAV–ELV",above:"Di atas ELV!",target:"Berbasis target",shift:"Batas shift",duty:"Duty cycle",rot:"Rotasi"},ann:{eav:"EAV: Level Aksi (2.5)",elv:"ELV: Nilai Batas (5.0)"},mode:{target:"target",selected:"terpilih"},rr:{cap:"Durasi paparan harian →",mag:"m/s²"}}
};
let lang='en';

/* --- data/state --- */
const defaultPresets=[
  {work:60,break:0,labelID:"60′ kerja + 0′ jeda (kontinu)",labelEN:"60′ work + 0′ break (continuous)"},
  {work:50,break:10,labelID:"50′ kerja + 10′ jeda",labelEN:"50′ work + 10′ break"},
  {work:45,break:15,labelID:"45′ kerja + 15′ jeda",labelEN:"45′ work + 15′ break"},
  {work:30,break:30,labelID:"30′ kerja + 30′ jeda",labelEN:"30′ work + 30′ break"},
  {work:20,break:40,labelID:"20′ kerja + 40′ jeda",labelEN:"20′ work + 40′ break"}
];
let customPresets=[];
let chartWB, chartA8;
let activeDuty = 45/60;                // Selected (preset/slider/RR)
let lastOptimizedDuty = null;          // Optimized (5' step)
let yAxisManual = false, yAxisMin = 0, yAxisMax = 6;

/* --- RR --- */
const rrTimesMin = [5,15,30,60,120,180,240,300,360,480,600];
const rrMags = [1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,7,8,9,10,11,12,13,14,15,16,18,19,20,25,30,40];
const formatTimeLabel = (m)=> m<60?`${m}m`:(m%60===0?`${m/60}h`:`${(m/60).toFixed(1)}h`);
const rrPoints = (a, m)=> 2 * a * a * (m/60);
const classifyPts = (p)=> p>=400?'pv-bad' : (p>=100?'pv-warn':'pv-ok');

/* --- utils --- */
function pillText(a8){ const P=T[lang].pills; if(!isFinite(a8))return{text:"—",cls:"pill"}; if(a8<2.5)return{text:P.below,cls:"pill ok"}; if(Math.abs(a8-2.5)<1e-9)return{text:P.at,cls:"pill warn"}; if(a8>5.0)return{text:P.above,cls:"pill bad"}; return{text:P.between,cls:"pill warn"}}
function fmt(x,d=2){if(!isFinite(x))return"—";return Number(x).toFixed(d)}

/* --- persist --- */
const saveState = () => {
  const state = {
    ahv:+document.getElementById('ahv').value,
    targetA:+document.getElementById('targetA').value,
    shiftH:+document.getElementById('shiftH').value,
    toolHours:+document.getElementById('toolHours').value,
    lang, theme:document.documentElement.getAttribute('data-theme'),
    presets:customPresets, activeDuty, lastOptimizedDuty,
    yAxisManual, yAxisMin, yAxisMax
  };
  localStorage.setItem('a8sim.state', JSON.stringify(state));
  return state;
};
const loadState = () => { try{ return JSON.parse(localStorage.getItem('a8sim.state')||'null') }catch{return null} };
const applyState = (s) => {
  if(!s) return;
  document.getElementById('ahv').value = s.ahv ?? 2.5;
  document.getElementById('targetA').value = s.targetA ?? 2.5;
  document.getElementById('shiftH').value = s.shiftH ?? 8;
  document.getElementById('toolHours').value = s.toolHours ?? 8;
  if(s.lang){ lang=s.lang; setLang(lang); }
  customPresets = Array.isArray(s.presets)? s.presets : [];
  activeDuty = typeof s.activeDuty==='number'? s.activeDuty : activeDuty;
  lastOptimizedDuty = typeof s.lastOptimizedDuty==='number'? s.lastOptimizedDuty : lastOptimizedDuty;
  if(s.theme) setTheme(s.theme);
  yAxisManual=!!s.yAxisManual; yAxisMin=+s.yAxisMin||0; yAxisMax=+s.yAxisMax||6;
  document.getElementById('yManual').checked=yAxisManual;
  document.getElementById('yMin').value=yAxisMin; document.getElementById('yMax').value=yAxisMax;
};

/* --- theme --- */
function setTheme(theme){
  document.documentElement.setAttribute('data-theme', theme);
  document.getElementById('themeLabel').textContent = theme==='dark'?'Dark':'Light';
  applyChartTheme();
  saveState();
}

/* --- charts --- */
function buildCharts(){
  const C=Cfg();
  chartWB=new Chart(document.getElementById('chartWB').getContext('2d'),{
    type:'doughnut',
    data:{labels:[lang==='id'?'Kerja':'Work',lang==='id'?'Jeda':'Break'],
      datasets:[{data:[45,15],backgroundColor:[C.accent+'b3', C.breakGreen],borderColor:[C.accent, C.breakGreen],borderWidth:1}]},
    options:{responsive:true,maintainAspectRatio:false,parsing:false,plugins:{legend:{position:'bottom',labels:{color: C.ink}}}},
    plugins:[perfMeter]
  });

  chartA8=new Chart(document.getElementById('chartA8').getContext('2d'),{
    type:'line',
    data:{labels:[],datasets:[]},
    options:{
      responsive:true,maintainAspectRatio:false,parsing:false,
      elements:{line:{borderJoinStyle:'round'}},
      interaction:{mode:'index',intersect:false},
      plugins:{
        legend:{display:true,position:'top',labels:{color:Cfg().ink}},
        decimation:{enabled:true,algorithm:'lttb',samples:90},
        annotation:{annotations:{}},
        tooltip:{
          callbacks:{
            title(items){ if(!items?.length) return ''; const m=+items[0].label; return (lang==='id'?`Shift: ${m} menit (${(m/60).toFixed(1)} jam)`:`Shift: ${m} min (${(m/60).toFixed(1)} h)`); },
            label(ctx){ const a8=+ctx.parsed.y; return `${ctx.dataset.label}: ${a8.toFixed(2)} m/s²`; },
            afterLabel(ctx){
              const EAV=2.5, ELV=5.0, a8=+ctx.parsed.y, mins=+ctx.label, duty = ctx.dataset._duty ?? 0;
              const T = duty*(mins/60);
              const m = (x,th)=>((x/th)-1)*100, s=(v)=> (v>=0?'+':'')+v.toFixed(1)+'%';
              return [`EAV 2.50: ${s(m(a8,EAV))}`,`ELV 5.00: ${s(m(a8,ELV))}`, (lang==='id'?`T: ${T.toFixed(2)} jam`:`T: ${T.toFixed(2)} h`)];
            }
          }
        }
      },
      scales:{
        x:{title:{display:true,text: lang==='id'?'Durasi Shift (menit)':'Shift Duration (minutes)'},grid:{color: C.line},ticks:{color: C.muted}},
        y:{title:{display:true,text:'A(8) (m/s²)'},min:0,grid:{color: C.line},ticks:{color: C.muted}}
      }
    },
    plugins:[perfMeter]
  });
  applyChartTheme(); applyYAxis();
}

/* Buat dataset kurva dari duty */
function buildCurveDataset(label, duty, color){
  const ahv=+document.getElementById('ahv').value;
  const xs=[],ys=[];
  for(let m=60;m<=720;m+=10){
    const T = duty*(m/60);
    const a8 = ahv*Math.sqrt(T/8);
    xs.push(m); ys.push(+a8.toFixed(3));
  }
  return {
    label, data:ys, _duty:duty, tension:0.25, pointRadius:0, spanGaps:true, borderWidth:2,
    borderColor:color, backgroundColor:color+'33'
  };
}

/* Terapkan tema + anotasi */
function applyChartTheme(){
  if(!chartA8||!chartWB) return; const C=Cfg();
  chartWB.options.plugins.legend.labels.color = C.ink;
  chartWB.data.datasets[0].backgroundColor=[C.accent+'b3', C.breakGreen];
  chartWB.data.datasets[0].borderColor=[C.accent, C.breakGreen];
  chartWB.update('none');

  chartA8.options.scales.x.title.color=C.muted; chartA8.options.scales.x.ticks.color=C.muted; chartA8.options.scales.x.grid.color=C.line;
  chartA8.options.scales.y.title.color=C.muted; chartA8.options.scales.y.ticks.color=C.muted; chartA8.options.scales.y.grid.color=C.line;
  const L=T[lang];
  chartA8.options.plugins.annotation.annotations = {
    eavBand:{type:'box',yMin:2.5,yMax:5.0,backgroundColor:C.warn+'26',borderColor:C.warn+'4d',borderWidth:1},
    elvBand:{type:'box',yMin:5.0,yMax:999,backgroundColor:C.bad+'26',borderColor:C.bad+'4d',borderWidth:1},
    eavLine:{type:'line',yMin:2.5,yMax:2.5,borderColor:C.warn,borderWidth:1.5,borderDash:[6,6],label:{content:L.ann.eav,position:'start',enabled:true,font:{size:10},color:C.warn,backgroundColor:'rgba(0,0,0,0.55)'}},
    elvLine:{type:'line',yMin:5.0,yMax:5.0,borderColor:C.bad,borderWidth:1.5,label:{content:L.ann.elv,position:'start',enabled:true,font:{size:10},color:C.bad,backgroundColor:'rgba(0,0,0,0.55)'}}
  };
  chartA8.update('none');
}

/* Bahasa */
function setLang(newLang){
  lang=newLang; const L=T[lang]; if(!L) return;
  const set=(id,txt)=>{const el=document.getElementById(id);if(el){if(Array.isArray(txt)){el.innerHTML=txt.map(li=>`<li>${li}</li>`).join('')}else{el.innerHTML=txt}}};
  set('t_title',L.title); set('t_sub',L.sub);
  set('t_inputs',L.inputs); set('t_ahvlabel',L.ahvlabel); set('t_ahvhint',L.ahvhint);
  set('t_targetlabel',L.targetlabel); set('t_targethint',L.targethint);
  set('t_shiftlabel',L.shiftlabel); set('t_shifthint',L.shifthint);
  set('t_toolhlabel',L.toolhlabel); set('t_toolhhint',L.toolhhint);
  set('t_a8fulltxt',`${L.a8fulltxt}<b id="a8full">—</b>`);
  set('t_tmax8txt',`${L.tmax8txt}<b id="tmax8">—</b> ${lang==='id'?'jam':'h'}`);
  set('t_tmaxlimtxt',`${L.tmaxlimtxt}<b id="tmaxLimited">—</b> ${lang==='id'?'jam':'h'}`);
  set('t_perhourtxt',`${L.perhourtxt}<b id="perHour">—</b> (${lang==='id'?'kerja + jeda':'work + break'})`);
  set('t_opsneedtxt',`${L.opsneedtxt}<b id="opsNeeded">—</b>`);
  set('t_opts',L.opts); set('t_presethint',L.presethint); set('t_colScheme',L.colScheme); set('t_colT',L.colT); set('t_colStatus',L.colStatus);
  set('t_dutydef',L.dutydef); set('t_chart1title',L.chart1title); set('t_chart2title',L.chart2title); set('t_chart2hint',L.chart2hint);
  set('t_foot',L.foot); set('rrCap',L.rr.cap);

  // RR header rebuild (kolom pertama => "m/s²")
  buildRR(true);

  // legend & axis label
  if(chartWB){ chartWB.data.labels=[lang==='id'?'Kerja':'Work',lang==='id'?'Jeda':'Break']; chartWB.update('none'); }
  if(chartA8){ chartA8.options.scales.x.title.text = (lang==='id'?'Durasi Shift (menit)':'Shift Duration (minutes)'); chartA8.update('none'); }

  // toggle tombol bahasa
  const enBtn=document.getElementById('btnEN'), idBtn=document.getElementById('btnID');
  enBtn.classList.toggle('active', lang==='en'); enBtn.setAttribute('aria-pressed', lang==='en'?'true':'false');
  idBtn.classList.toggle('active', lang==='id'); idBtn.setAttribute('aria-pressed', lang==='id'?'true':'false');

  applyChartTheme();
  recalc();
  saveState();
}

/* Highlight rekomendasi */
function updateContextualHighlights(a8){
  const cards={eng:document.getElementById('card-engineering'),rot:document.getElementById('card-rotation'),admin:document.getElementById('card-administrative'),tech:document.getElementById('card-technique')};
  Object.values(cards).forEach(card=>card.classList.remove('highlight-warn','highlight-bad'));
  if(a8>5.0){cards.eng.classList.add('highlight-bad');cards.rot.classList.add('highlight-bad')}
  else if(a8>=2.5){cards.admin.classList.add('highlight-warn');cards.tech.classList.add('highlight-warn')}
}

/* Recalc & AUTO plotting (Calculated, Optimized, Selected) */
function recalc(){
  const ahv=parseFloat(document.getElementById('ahv').value),
        targetA=parseFloat(document.getElementById('targetA').value)||2.5,
        shiftH=parseFloat(document.getElementById('shiftH').value),
        toolHours=parseFloat(document.getElementById('toolHours').value);

  const a8full=ahv*Math.sqrt(shiftH/8),pill=pillText(a8full);
  document.getElementById('a8full').textContent=fmt(a8full,2);
  const pillEl=document.getElementById('statusPill');pillEl.textContent=pill.text;pillEl.className=pill.cls;

  const Tmax8=8*Math.pow(targetA/ahv,2),TmaxLimited=Math.min(Tmax8,shiftH);
  document.getElementById('tmax8').textContent=fmt(Tmax8,2);
  document.getElementById('tmaxLimited').textContent=fmt(TmaxLimited,2);

  const dutyTarget=(shiftH>0)?(TmaxLimited/shiftH):0;

  // Optimized: bulatkan ke kelipatan 5 menit/jam, tidak melebihi target
  const dutyRaw = (8*Math.pow(targetA/ahv,2))/shiftH || 0;
  const workOpt = Math.max(0, Math.min(60, Math.floor(dutyRaw*60/5)*5));
  lastOptimizedDuty = workOpt/60;

  const workMin=Math.round(60*dutyTarget),breakMin=60-workMin;
  document.getElementById('perHour').textContent=`${workMin}′ + ${breakMin}′`;

  let opsNeeded="—";if(isFinite(toolHours)&&toolHours>0&&TmaxLimited>0)opsNeeded=Math.ceil(toolHours/TmaxLimited);
  document.getElementById('opsNeeded').textContent=opsNeeded;

  // table preset
  const rows=[...defaultPresets,...customPresets],tbody=document.querySelector('#schedTable tbody');tbody.innerHTML="";
  rows.forEach((p,idx)=>{
    const dutyRow=p.work/60,T=dutyRow*shiftH,A8=ahv*Math.sqrt(T/8),st=pillText(A8);
    const label=(lang==='id'?(p.labelID||`${p.work}′+${p.break}′`):(p.labelEN||`${p.work}′+${p.break}′`));
    const tr=document.createElement('tr'); tr.dataset.work=p.work; tr.dataset.break=p.break;
    if(activeDuty!==null && Math.abs(activeDuty-dutyRow)<1e-9) tr.classList.add('active');
    tr.innerHTML=`<td>${label}</td><td>${Math.round(dutyRow*100)}%</td><td>${fmt(T,2)}</td><td>${fmt(A8,2)}</td><td><span class="${st.cls}">${st.text}</span></td><td>${idx>=defaultPresets.length?`<button class="btn btn-del small" data-idx="${idx}" title="${lang==='id'?'Hapus':'Delete'}">🗑</button>`:''}</td>`;
    tbody.appendChild(tr)
  });

  // donut -> gunakan selected bila ada, else kalkulasi
  if(!chartWB.updatedFromTable){
    const w = activeDuty!==null ? Math.round(activeDuty*60) : workMin;
    chartWB.data.datasets[0].data=[w,60-w];
    chartWB.update('none');
  }
  chartWB.updatedFromTable=false;

  // ----- AUTO SET DATASETS -----
  const C=Cfg();
  const labels = Array.from({length: (720-60)/10+1}, (_,i)=>60+i*10);
  chartA8.data.labels = labels;
  const ds = [];
  ds.push(buildCurveDataset(lang==='id'?'Kalkulasi':'Calculated', dutyTarget, C.ok));
  ds.push(buildCurveDataset(lang==='id'?'Optimasi (5′)':'Optimized (5′)', lastOptimizedDuty, C.warn));
  if(activeDuty!==null) ds.push(buildCurveDataset(lang==='id'?'Terpilih':'Selected', activeDuty, C.accent));
  chartA8.data.datasets = ds;
  chartA8.update('none');

  // HSE points untuk scenario "Selected" jika ada, else kalkulasi
  const dutyForPts = (activeDuty!==null)?activeDuty:dutyTarget;
  const Tcur = dutyForPts*shiftH;
  const pts = rrPoints(ahv, Tcur*60);
  document.getElementById('pointsNow').textContent = Math.round(pts);
  const pcls = pts>=400?'pill bad':(pts>=100?'pill warn':'pill ok');
  const ptxt = pts>=400?(lang==='id'?'Di atas ELV!':'Above ELV!'):(pts>=100?(lang==='id'?'Antara EAV–ELV':'Between EAV–ELV'):(lang==='id'?'Di bawah EAV':'Below EAV'));
  const pp=document.getElementById('pointsPill'); pp.className=pcls; pp.textContent=ptxt;

  highlightRR(ahv, Tcur);
  // document.getElementById('dutyMode').textContent = (activeDuty===null? T[lang].mode.target : T[lang].mode.selected);
  applyYAxis();
  updateContextualHighlights(a8full);
  saveState();
}

/* --- Ready-Reckoner build & hooks --- */
function buildRR(relabelOnly=false){
  const head=document.getElementById('rrHead'), body=document.getElementById('rrBody');
  if(!relabelOnly){ head.innerHTML=''; body.innerHTML=''; }
  head.innerHTML = `<th style="min-width:72px">${T[lang].rr.mag}</th>` + rrTimesMin.map(m=>`<th data-min="${m}">${formatTimeLabel(m)}</th>`).join('');
  if(relabelOnly) return;
  rrMags.forEach(a=>{
    const tr=document.createElement('tr');
    tr.innerHTML = `<td class="small"><b>${a}</b></td>` + rrTimesMin.map(m=>{
      const pts = Math.round(rrPoints(a,m));
      const cls = classifyPts(pts);
      return `<td data-a="${a}" data-min="${m}" class="${cls}" title="${pts} pts">${pts}</td>`;
    }).join('');
    body.appendChild(tr);
  });
  body.addEventListener('click', e=>{
    const td = e.target.closest('td[data-a][data-min]'); if(!td) return;
    const a = parseFloat(td.getAttribute('data-a'));
    const m = parseFloat(td.getAttribute('data-min'));
    const shiftH = parseFloat(document.getElementById('shiftH').value)||8;
    document.getElementById('ahv').value = a;
    const duty = Math.max(0, Math.min(1, (m/60)/shiftH));
    activeDuty = duty;
    const w = Math.round(duty*60); chartWB.data.datasets[0].data=[w,60-w]; chartWB.updatedFromTable=true; chartWB.update('none');
    recalc();
    document.querySelectorAll('#rrBody td.sel').forEach(el=>el.classList.remove('sel'));
    td.classList.add('sel');
  });
}
function highlightRR(a_now, T_now_h){
  const aIdx = rrMags.reduce((bi,_i,idx)=> (Math.abs(rrMags[idx]-a_now)<Math.abs(rrMags[bi]-a_now)?idx:bi),0);
  const mins = T_now_h*60;
  const cIdx = rrTimesMin.reduce((bi,_m,idx)=> (Math.abs(rrTimesMin[idx]-mins)<Math.abs(rrTimesMin[bi]-mins)?idx:bi),0);
  document.querySelectorAll('#rrBody td.sel').forEach(el=>el.classList.remove('sel'));
  const row = document.querySelector(`#rrBody tr:nth-child(${aIdx+1})`);
  if(row){
    const td = row.querySelector(`td[data-min="${rrTimesMin[cIdx]}"]`);
    if(td) td.classList.add('sel');
  }
}

/* --- Y axis --- */
function applyYAxis(){
  const yMan=document.getElementById('yManual'), yMinEl=document.getElementById('yMin'), yMaxEl=document.getElementById('yMax');
  if(!chartA8||!yMan) return;
  yMinEl.disabled=yMaxEl.disabled=!yMan.checked;
  if(yMan.checked){
    const ymin=parseFloat(yMinEl.value), ymax=parseFloat(yMaxEl.value);
    if(isFinite(ymin)&&isFinite(ymax)&&ymax>ymin){ chartA8.options.scales.y.min=ymin; chartA8.options.scales.y.max=ymax; yAxisManual=true; yAxisMin=ymin; yAxisMax=ymax; }
  }else{ chartA8.options.scales.y.min=0; chartA8.options.scales.y.max=undefined; yAxisManual=false; }
  chartA8.update('none'); saveState();
}

/* --- share --- */
function stateToQuery(){
  const s = saveState();
  const q = new URLSearchParams({
    ahv:String(s.ahv), targetA:String(s.targetA), shiftH:String(s.shiftH),
    toolHours:String(s.toolHours), lang:s.lang, theme:s.theme, duty: s.activeDuty??'',
    y:s.yAxisManual?'1':'0', ymin:String(s.yAxisMin??''), ymax:String(s.yAxisMax??'')
  });
  return `${location.origin}${location.pathname}?${q.toString()}`
}
function loadFromQuery(){
  const q = new URLSearchParams(location.search);
  if(!q.has('ahv')) return;
  const s = {
    ahv:+q.get('ahv'), targetA:+q.get('targetA'), shiftH:+q.get('shiftH'), toolHours:+q.get('toolHours'),
    lang:q.get('lang')||'en', theme:q.get('theme')||'light',
    presets:[], activeDuty: q.get('duty')? +q.get('duty') : activeDuty,
    yAxisManual: q.get('y')==='1', yAxisMin: +q.get('ymin')||0, yAxisMax: +q.get('ymax')||6
  };
  applyState(s);
}

/* --- events --- */
document.addEventListener('click',e=>{
  if(e.target.classList.contains('btn-del')){
    const idx=parseInt(e.target.getAttribute('data-idx'),10), customIdx=idx-defaultPresets.length;
    if(customIdx>=0&&customIdx<customPresets.length){
      customPresets.splice(customIdx,1);
      if(customPresets.length===0) activeDuty=null;
      recalc()
    }
  }
});
document.querySelector('#schedTable tbody').addEventListener('click',e=>{
  const row=e.target.closest('tr'); if(!row) return;
  const work=parseFloat(row.dataset.work),breakVal=parseFloat(row.dataset.break);
  if(!isNaN(work)&&!isNaN(breakVal)){
    chartWB.data.datasets[0].data=[work,breakVal]; chartWB.updatedFromTable=true; chartWB.update('none');
    activeDuty = work/60;
    document.querySelectorAll('#schedTable tbody tr').forEach(tr=>tr.classList.remove('active'));
    row.classList.add('active');
    recalc();
  }
});
document.getElementById('btnPrint').addEventListener('click',()=>window.print());
document.getElementById('btnCalc').addEventListener('click',recalc);
document.getElementById('btnAddPreset').addEventListener('click',()=>{
  const w=prompt(lang==='id'?'Menit kerja per jam (0–60)':'Work minutes per hour (0–60)','45'),
        b=prompt(lang==='id'?'Menit jeda per jam (0–60)':'Break minutes per hour (0–60)','15');
  if(w===null||b===null)return;
  const wi=Math.max(0,Math.min(60,parseFloat(w)||0)), bi=Math.max(0,Math.min(60,parseFloat(b)||0));
  if(wi+bi===0){alert(lang==='id'?'Tidak valid':'Invalid');return}
  customPresets.push({work:wi,break:bi}); activeDuty = wi/60; recalc();
});
document.getElementById('btnOptimize').addEventListener('click', ()=>{
  // hanya memicu recalculation; lastOptimizedDuty dihitung di recalc
  recalc();
});
document.getElementById('btnResetSel').addEventListener('click',()=>{activeDuty=null; recalc()});
document.getElementById('btnTheme').addEventListener('click',()=>{ setTheme(document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark'); });
document.getElementById('btnCopy').addEventListener('click',async()=>{
  const url = stateToQuery();
  try{ await navigator.clipboard.writeText(url); alert(lang==='id'?'Tautan disalin.':'Link copied.'); }
  catch{ prompt(lang==='id'?'Salin tautan berikut:':'Copy this link:', url) }
});
document.getElementById('btnEN').addEventListener('click',()=>setLang('en'));
document.getElementById('btnID').addEventListener('click',()=>setLang('id'));
document.getElementById('yManual').addEventListener('change',applyYAxis);
document.getElementById('btnApplyY').addEventListener('click',applyYAxis);
['yMin','yMax'].forEach(id=>{
  document.getElementById(id).addEventListener('keydown',e=>{ if(e.key==='Enter'){ e.preventDefault(); applyYAxis(); } });
});
const quick = document.getElementById('quickWork');
const quickBadge = document.getElementById('quickBadge');
const syncQuick = () => { const w=+quick.value; quickBadge.textContent = (lang==='id'?`${w}′ kerja + ${60-w}′ jeda`:`${w}′ work + ${60-w}′ break`); };
quick.addEventListener('input', syncQuick);
document.getElementById('btnUseQuick').addEventListener('click',()=>{
  const w=+quick.value, b=60-w; activeDuty = w/60;
  chartWB.data.datasets[0].data=[w,b]; chartWB.updatedFromTable=true; chartWB.update('none');
  recalc();
});

/* --- init --- */
document.addEventListener('DOMContentLoaded',()=>{
  buildCharts();
  buildRR(false);
  loadFromQuery();
  const local = loadState();
  if(local && !location.search) applyState(local);
  setTheme(document.documentElement.getAttribute('data-theme') || 'light');
  setLang(lang || 'en');
  const w=+document.getElementById('quickWork').value, b=60-w;
  activeDuty = w/60;
  chartWB.data.datasets[0].data=[w,b]; chartWB.update('none');
  document.getElementById('btnEN').classList.add('active'); document.getElementById('btnEN').setAttribute('aria-pressed','true');
  syncQuick();
  recalc();
});