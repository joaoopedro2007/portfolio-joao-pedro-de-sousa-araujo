import { datasets, getDataset } from './data.js';
import { element } from './dom.js';
export function mountChart(root) {
  const label = element('label','Escolha um indicador','form-label');
  const select = element('select',undefined,'form-select mb-3');
  select.id = 'mh-dataset'; label.htmlFor = select.id;
  for (const [key,data] of Object.entries(datasets)) {
    const option = element('option',data.title); option.value = key; select.append(option);
  }
  const heading = element('h3');
  const frame = element('figure');
  const chartArea = element('div', undefined, 'chart-area');
  chartArea.setAttribute('role', 'group'); chartArea.setAttribute('aria-label', 'Área do gráfico');
  const canvas = element('canvas');
  canvas.setAttribute('role','img'); canvas.setAttribute('aria-describedby','mh-chart-summary');
  const summary = element('figcaption'); summary.id = 'mh-chart-summary';
  chartArea.append(canvas);
  frame.append(chartArea,summary);
  const table = element('table',undefined,'table');
  const caption = element('caption','Valores do indicador selecionado');
  const head = element('thead'); const row = element('tr');
  for (const text of ['Grupo','Valor (%)']) { const th = element('th',text); th.scope='col'; row.append(th); }
  head.append(row); const body = element('tbody'); table.append(caption,head,body);
  const note = element('p'); const source = element('a');
  const status = element('p'); status.setAttribute('role','status');
  root.replaceChildren(label,select,heading,frame,table,note,source,status);
  let chart;
  function render() {
    const data = getDataset(select.value);
    chart?.destroy(); chart = null;
    heading.textContent = data.title;
    summary.textContent = `${data.unit}. ${data.population}`;
    note.textContent = data.note; source.textContent = `Fonte: ${data.source}`; source.href = data.url;
    canvas.setAttribute('aria-label',`${data.title}: ${data.labels.map((v,i)=>`${v}: ${data.values[i]}%`).join('; ')}.`);
    body.replaceChildren();
    data.labels.forEach((name,i)=>{
      const tr = element('tr'); const th = element('th',name); th.scope = 'row';
      tr.append(th,element('td',`${data.values[i]}%`)); body.append(tr);
    });
    if (typeof globalThis.Chart !== 'function') {
      canvas.hidden = true; status.textContent = 'O gráfico não carregou. Todos os valores continuam disponíveis na tabela.'; return;
    }
    canvas.hidden = false; status.textContent = '';
    const dark = document.documentElement.classList.contains('theme-dark');
    const textColor = dark ? '#edf2f5' : '#152630';
    const gridColor = dark ? '#53646c' : '#c3cdd2';
    try {
    chart = new globalThis.Chart(canvas,{
      type:'bar',data:{labels:data.labels,datasets:[{label:data.unit,data:data.values,
        backgroundColor:dark ? ['#87c9b0','#edb78b'] : ['#267363','#ad572d'],borderWidth:0,borderRadius:6}]},
      options:{responsive:true,maintainAspectRatio:false,animation:!matchMedia('(prefers-reduced-motion: reduce)').matches,
        plugins:{legend:{display:false},tooltip:{callbacks:{label:context=>`${context.parsed.y}%`}}},
        scales:{y:{beginAtZero:true,max:select.value==='produtividade'?40:100,
          ticks:{color:textColor,callback:value=>`${value}%`},grid:{color:gridColor}},
          x:{ticks:{color:textColor},grid:{display:false}}}}
    });
    } catch {
      const broken = globalThis.Chart.getChart?.(canvas);
      broken?.destroy();
      canvas.hidden = true;
      status.textContent = 'A visualização está indisponível. Consulte os valores na tabela.';
    }
  }
  select.addEventListener('change',render);
  document.addEventListener('mh:theme',render);
  render();
}
