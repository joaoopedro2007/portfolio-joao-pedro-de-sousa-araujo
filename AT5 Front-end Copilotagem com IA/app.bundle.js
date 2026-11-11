/* Gerado por node build.mjs. Editar os módulos de origem. */
(()=>{
'use strict';
// SOURCE: dom.js
// Texto sempre via textContent. Não interpretar respostas ou fontes como HTML.
function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}
function focusHeading(node) {
  node.tabIndex = -1;
  node.focus();
}


// SOURCE: scenarios.js
// Situações fictícias de aprendizagem; não são relatos de participantes da pesquisa.
const scenarios = [
  {
    id: 'prazo', title: '01 · A promessa que o sistema não sustenta',
    context: 'Você está no primeiro mês de atendimento de uma plataforma de cursos. A IA sugere prometer um estorno em 24 horas, mas a política interna fictícia informa até cinco dias úteis.',
    suggestion: 'Seu dinheiro estará na conta amanhã. Pode ficar tranquilo!',
    options: [
      {id:'enviar', label:'Enviar para cumprir a meta de tempo.', points:0, feedback:'A rapidez não compensa uma promessa sem respaldo. A meta precisa permitir a consulta à política.', action:'Conferir prazos em uma fonte interna atualizada antes de enviar.'},
      {id:'revisar', label:'Revisar o prazo, explicar o processo e registrar a divergência.', points:2, feedback:'Você mantém a conversa resolutiva e torna o erro da IA visível para a equipe.', action:'Registrar sugestões incorretas sem incluir dados pessoais do cliente.'},
      {id:'transferir', label:'Transferir imediatamente, sem explicar a divergência.', points:1, feedback:'Encaminhar pode proteger contra erro, mas uma dúvida solucionável na política pede contexto e responsabilidade.', action:'Encaminhar dúvidas com contexto e uma pergunta objetiva para a supervisão.'}
    ]
  },
  {
    id:'excecao', title:'02 · A regra e a história por trás do chamado',
    context:'Uma cliente perdeu o prazo de cancelamento por um imprevisto e pede análise. A IA recomenda encerrar o chamado. Neste cenário, somente a supervisão pode autorizar exceções.',
    suggestion:'O prazo acabou. Não existe mais nada que possamos fazer.',
    options:[
      {id:'fechar',label:'Encerrar usando a resposta sugerida.',points:0,feedback:'A resposta transforma uma sugestão em decisão final e ignora o fluxo de análise disponível.',action:'Verificar caminhos de análise antes de tratar uma resposta automática como definitiva.'},
      {id:'prometer',label:'Prometer uma exceção para acolher a cliente.',points:1,feedback:'Acolher não autoriza prometer um resultado fora da sua alçada. Isso pode criar uma nova frustração.',action:'Acolher o contexto sem garantir uma decisão que depende de outra pessoa.'},
      {id:'encaminhar',label:'Acolher, explicar os limites e encaminhar para análise.',points:2,feedback:'Empatia e responsabilidade coexistem: você reconhece a situação e explicita quem decide.',action:'Combinar critérios de encaminhamento e informar o próximo passo ao cliente.'}
    ]
  },
  {
    id:'metrica',title:'03 · Quando revisar parece prejudicar o ranking',
    context:'Seu painel valoriza a quantidade de chamados encerrados. Revisar a IA aumenta o tempo médio. Você identifica o mesmo tipo de erro em várias sugestões.',
    suggestion:'Use a resposta pronta para reduzir o tempo de atendimento.',
    options:[
      {id:'aceitar',label:'Aceitar todas as sugestões para subir no ranking.',points:0,feedback:'O ranking passa a premiar velocidade mesmo quando ela reduz a qualidade. A responsabilidade não deve recair só no iniciante.',action:'Propor métricas que incluam retrabalho e resolução efetiva, além da velocidade.'},
      {id:'ocultar',label:'Corrigir sozinho e evitar comentar para não parecer lento.',points:1,feedback:'A correção protege este chamado, mas o silêncio mantém o problema e torna o esforço de revisão invisível.',action:'Reservar uma conversa de mentoria para discutir erros recorrentes e tempo de revisão.'},
      {id:'discutir',label:'Revisar, registrar padrões sem dados pessoais e discutir a meta.',points:2,feedback:'Você transforma um erro recorrente em aprendizagem coletiva. A equipe deve oferecer espaço seguro para essa discussão.',action:'Criar uma revisão periódica de erros da IA com liderança e atendentes.'}
    ]
  },
  {
    id:'aprender',title:'04 · Resolver agora e conseguir explicar depois',
    context:'A IA sugere uma solução técnica plausível. Você ainda não entende o procedimento, e há uma base interna para verificá-lo antes de orientar o cliente.',
    suggestion:'Peça ao cliente que redefina toda a configuração da conta.',
    options:[
      {id:'copiar',label:'Copiar a solução sem verificar os efeitos.',points:0,feedback:'Uma resposta plausível pode produzir consequências indesejadas. Concordância automática não substitui verificação.',action:'Conferir efeitos e limites do procedimento antes de recomendá-lo.'},
      {id:'abandonar',label:'Deixar de usar IA em qualquer chamado.',points:1,feedback:'Recusar toda assistência evita este risco, mas também pode descartar apoio útil. É possível usar a ferramenta com critérios.',action:'Definir quais sugestões exigem consulta à base e quais exigem supervisão.'},
      {id:'explicar',label:'Verificar a base e explicar a solução com suas palavras.',points:2,feedback:'O apoio vira aprendizagem quando você consegue justificar a decisão e reconhecer seus limites.',action:'Manter encontros de mentoria para explicar casos, e não apenas repetir respostas.'}
    ]
  }
];

function evaluate(answers) {
  if (!Array.isArray(answers) || answers.length !== scenarios.length) {
    throw new TypeError('Responda aos quatro cenários.');
  }
  const choices = scenarios.map((scenario, i) => {
    const choice = scenario.options.find(option => option.id === answers[i]);
    if (!choice) throw new TypeError(`Resposta inválida no cenário ${i + 1}.`);
    return choice;
  });
  const points = choices.reduce((total, choice) => total + choice.points, 0);
  return {
    points, maximum: scenarios.length * 2,
    title: points === 8 ? 'Decisões justificadas nos quatro cenários' : 'Há decisões para revisar neste exercício',
    actions: choices.map(choice => choice.action),
    notice: 'Pontuação didática de 0 a 8, criada para estes casos. Não mede personalidade, saúde mental ou competência profissional.'
  };
}

function buildProtocol(result) {
  return ['MARGEM HUMANA — Protocolo de revisão de IA',
    `${result.points}/${result.maximum} pontos no exercício fictício`, result.notice,
    '', ...result.actions.map((action,i)=>`${i+1}. ${action}`), '',
    'Acordos para a equipe: tempo de revisão, canal de escalonamento, mentoria e métricas de qualidade.',
    'As condições organizacionais não podem ser substituídas pelo esforço individual.'
  ].join('\n');
}


// SOURCE: data.js
// Dados descritivos publicados. Não combinar populações nem inferir causalidade entre estudos.
const datasets = {
  produtividade: {
    title:'Ganho de produtividade com assistência de IA',
    unit:'Variação percentual de problemas resolvidos por hora',
    labels:['Média da amostra','Menor experiência e habilidade'], values:[15,30],
    population:'5.172 agentes de suporte de uma empresa. O segundo grupo integra a amostra; não são grupos independentes.',
    source:'Brynjolfsson, Li e Raymond · QJE, 2025',
    url:'https://academic.oup.com/qje/article/140/2/889/7990658',
    note:'Resumo dos resultados da versão publicada (introdução). Experiência profissional não equivale a geração. Os números não medem saúde mental.'
  },
  proposito: {
    title:'Propósito importante para satisfação e bem-estar no trabalho',
    unit:'Percentual de respondentes', labels:['Geração Z','Millennials'], values:[89,92],
    population:'Pesquisa global de 2025: 14.751 respondentes da Geração Z e 8.731 millennials, em 44 países.',
    source:'Deloitte · Gen Z and Millennial Survey, 2025',
    url:'https://www.deloitte.com/global/en/about/press-room/deloitte-2025-gen-z-and-millennial-survey.html',
    note:'Autorrelato de populações geracionais; não é uma amostra específica de atendentes brasileiros. Não demonstra efeito da IA sobre bem-estar.'
  },
  impacto: {
    title:'Expectativa de que a IA generativa impacte o trabalho no ano seguinte',
    unit:'Percentual de respondentes', labels:['Geração Z','Millennials'], values:[74,77],
    population:'Mesma pesquisa global Deloitte de 2025; a expectativa se refere ao horizonte perguntado naquela edição.',
    source:'Deloitte · Gen Z and Millennial Survey, 2025',
    url:'https://www.deloitte.com/global/en/about/press-room/deloitte-2025-gen-z-and-millennial-survey.html',
    note:'Expectativa declarada, não ocorrência comprovada. Não apresentar este indicador como previsão feita hoje.'
  }
};
function getDataset(key) {
  if (!Object.hasOwn(datasets,key)) throw new TypeError('Indicador desconhecido.');
  return structuredClone(datasets[key]);
}


// SOURCE: theme.js
const KEY = 'margem-humana-theme';
function readPreference(storage) {
  try { const value = storage.getItem(KEY); return ['dark','light'].includes(value) ? value : null; }
  catch { return null; }
}
function writePreference(storage,value) {
  try { storage.setItem(KEY,value); return true; } catch { return false; }
}
function mountTheme(button) {
  // O próprio acesso à propriedade localStorage pode lançar SecurityError.
  let storage;
  try { storage = window.localStorage; } catch { storage = null; }
  const media = matchMedia('(prefers-color-scheme: dark)');
  let preference = readPreference(storage);
  function apply(value) {
    document.documentElement.classList.toggle('theme-dark',value==='dark');
    document.documentElement.setAttribute('data-bs-theme',value);
    button.setAttribute('aria-pressed',String(value==='dark'));
    button.textContent = value==='dark' ? 'Tema claro' : 'Tema escuro';
    button.setAttribute('aria-label', value==='dark' ? 'Tema escuro ativado. Mudar para tema claro' : 'Tema escuro desativado. Mudar para tema escuro');
    document.dispatchEvent(new CustomEvent('mh:theme'));
  }
  apply(preference ?? (media.matches?'dark':'light'));
  button.addEventListener('click',()=>{
    preference = document.documentElement.classList.contains('theme-dark') ? 'light' : 'dark';
    const persisted = writePreference(storage,preference);
    button.title = persisted ? 'Preferência salva neste navegador.' : 'Tema alterado nesta sessão; armazenamento indisponível.';
    apply(preference);
  });
  media.addEventListener('change',event=>{if (!preference) apply(event.matches?'dark':'light');});
}


// SOURCE: simulator.js

function mountSimulator(root) {
  let index = 0;
  let selected = null;
  let revealed = false;
  const answers = Array(scenarios.length).fill(null);
  function draw(moveFocus = false) {
    root.replaceChildren();
    if (index === scenarios.length) return finish();
    const scenario = scenarios[index];
    const progressLabel = element('p', `Cenário ${index+1} de ${scenarios.length} · ${index} concluído(s)`);
    const progress = element('progress');
    progress.max = scenarios.length;
    progress.value = index;
    progress.setAttribute('aria-label', 'Cenários concluídos');
    const heading = element('h3', scenario.title);
    const context = element('p', scenario.context);
    const suggestion = element('blockquote', `Sugestão fictícia da IA: “${scenario.suggestion}”`,'border-start border-4 ps-3');
    const fieldset = element('fieldset');
    fieldset.append(element('legend', 'Qual decisão você tomaria?', 'fs-6 fw-bold'));
    for (const option of scenario.options) {
      const label = element('label', undefined,'d-flex gap-2 align-items-start p-3 border rounded mb-2');
      const radio = element('input');
      radio.type = 'radio'; radio.name = 'decision'; radio.value = option.id;
      radio.checked = selected === option.id; radio.disabled = revealed;
      radio.addEventListener('change', () => { selected = option.id; confirm.disabled = false; });
      label.append(radio, element('span', option.label)); fieldset.append(label);
    }
    const confirm = element('button', revealed ? (index === scenarios.length-1 ? 'Ver protocolo' : 'Próximo cenário') : 'Analisar decisão','btn btn-primary');
    confirm.type = 'button'; confirm.disabled = !selected;
    const feedback = element('div');
    feedback.setAttribute('aria-live','polite');
    if (revealed) {
      const choice = scenario.options.find(option=>option.id===selected);
      feedback.append(element('h4','Por que essa decisão importa','fs-6'), element('p',choice.feedback));
    }
    confirm.addEventListener('click', () => {
      if (!selected) return;
      if (!revealed) { answers[index] = selected; revealed = true; draw(); focusHeading(root.querySelector('h4')); }
      else { index++; selected = null; revealed = false; draw(true); }
    });
    root.append(progressLabel, progress, heading, context, suggestion, fieldset, feedback, confirm);
    if (moveFocus) focusHeading(heading);
  }
  function finish() {
    const result = evaluate(answers);
    const heading = element('h3', result.title);
    const score = element('p',`${result.points}/${result.maximum} pontos no exercício`,'fs-4 fw-bold');
    const list = element('ol');
    for (const action of result.actions) list.append(element('li',action,'mb-2'));
    const download = element('button','Baixar protocolo (.txt)','btn btn-primary me-2');
    download.type = 'button';
    download.addEventListener('click', () => {
      const url = URL.createObjectURL(new Blob([buildProtocol(result)], {type:'text/plain;charset=utf-8'}));
      const anchor = element('a'); anchor.href = url; anchor.download = 'protocolo-margem-humana.txt';
      document.body.append(anchor); anchor.click(); anchor.remove();
      setTimeout(()=>URL.revokeObjectURL(url),1000);
    });
    const restart = element('button','Refazer cenários','btn btn-outline-secondary');
    restart.type = 'button';
    restart.addEventListener('click',()=>{index=0;selected=null;revealed=false;answers.fill(null);draw(true);});
    const completed = element('progress');
    completed.max = scenarios.length; completed.value = scenarios.length;
    completed.setAttribute('aria-label', 'Todos os quatro cenários concluídos');
    root.append(completed,heading,score,element('p',result.notice),list,
      element('p','A equipe precisa garantir tempo de revisão, mentoria e espaço para questionar sugestões. O esforço individual não substitui essas condições.'),download,restart);
    focusHeading(heading);
  }
  draw();
}


// SOURCE: chart.js
function mountChart(root) {
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


// SOURCE: app.js
// Fonte modular. O HTML carrega a versão clássica gerada por build.mjs para permitir file://.
const theme = document.querySelector('#theme-toggle');
const simulator = document.querySelector('#simulator-root');
const chart = document.querySelector('#chart-root');
if (theme) mountTheme(theme);
if (simulator) mountSimulator(simulator);
if (chart) mountChart(chart);

// Se o JS do CDN falhar, preservar menu e accordion com controles nativos.
if (!globalThis.bootstrap) {
  document.querySelectorAll('[data-bs-toggle="collapse"]').forEach(button => {
    button.addEventListener('click', () => {
      const target = document.querySelector(button.dataset.bsTarget);
      if (!target) return;
      const open = !target.classList.contains('show');
      if (target.dataset.bsParent && open) {
        document.querySelector(target.dataset.bsParent)?.querySelectorAll('.accordion-collapse.show').forEach(panel => {
          panel.classList.remove('show');
          const control = document.querySelector(`[aria-controls="${panel.id}"]`);
          control?.setAttribute('aria-expanded', 'false');
          control?.classList.add('collapsed');
        });
      }
      target.classList.toggle('show', open);
      button.classList.toggle('collapsed', !open);
      button.setAttribute('aria-expanded', String(open));
    });
  });
}
// Fechar o menu móvel depois de uma escolha, preservando a navegação por âncoras.
document.querySelectorAll('#main-nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => {
    if (!matchMedia('(max-width: 991px)').matches) return;
    const menu = document.querySelector('#main-nav');
    if (globalThis.bootstrap) globalThis.bootstrap.Collapse.getOrCreateInstance(menu, {toggle:false}).hide();
    else { menu.classList.remove('show'); document.querySelector('.navbar-toggler').setAttribute('aria-expanded','false'); }
  });
});

})();
