# AUDITORIA_IA — três fichas completas de auditoria

**Projeto:** Margem Humana — trabalho de frontend sobre decisões críticas no uso de IA no ambiente profissional.  
**Registro técnico original:** 28/10/2026. **Organização e conferência das evidências:** 03/11/2026.  
**Ferramenta informada no histórico do projeto:** ChatGPT; 

## Verificação objetiva do requisito

**Sim. Este arquivo contém três fichas**, cada uma com as quatro partes exigidas — **Prompt, Resposta, Diagnóstico e Refatoração** — e seus arquivos de evidência.

| **Ficha**     | **Prompt** | **Resposta inicial**        | **Diagnóstico**                              | **Refatoração verificável** |
| ------------- | ---------- | --------------------------- | -------------------------------------------- | --------------------------- |
| 1 — Simulador | Abaixo     | `auditoria-v1-simulator.js` | Ausência de progresso na conclusão           | `simulator.js`           |
| 2 — Gráfico   | Abaixo     | `auditoria-v1-chart.js`     | Layout rígido e falha de criação não tratada | `chart.js`               |
| 3 — Tema      | Abaixo     | `auditoria-v1-theme.js`     | Texto pouco eficiente no botão de navegação  | `theme.js`               |

**Como ler as evidências:** em cada ficha, o bloco de *Resposta* é um trecho literal da versão inicial; o arquivo completo está preservado em `auditoria-v1-*.js`. O bloco de *Refatoração* contém o diff extraído dos arquivos efetivamente presentes neste projeto, e não uma alteração hipotética. A versão distribuída do JavaScript também aparece em `app.bundle.js`, gerada por `build.mjs`.

## Origem dos prompts e responsabilidade

Os pedidos literais registrados no histórico anterior do projeto foram: “Faça exatamente oq se pede baseado em um tema profissional e critivo q n seja generico” e “faça essa parte para mim por favor”. A descrição técnica apresentada como **Prompt** nas fichas foi elaborada pelo assistente para decompor esses pedidos; **não é a transcrição de três prompts independentes enviados pelos estudantes**. Não há registro confiável de três mensagens originais separadas, e elas não são inventadas aqui.

As respostas iniciais, análises e refatorações documentadas foram executadas **com IA**, não manualmente pela dupla. O professor também exige intervenção crítica e contribuição manual dos integrantes; esta documentação, por si só, não comprova essa etapa. Os relatos de revisão manual informados pelos integrantes aparecem ao fim de cada ficha. As datas, os resultados detalhados e eventuais correções próprias devem ser conferidos no `REGISTRO_DA_DUPLA.md`.

**Ressalva sobre autoria:** HTML, CSS, integração com Bootstrap e ajustes de interface também foram gerados com apoio de IA, conforme a continuidade do trabalho. 

## Ficha 1/3 — Simulador: conclusão e progresso

### Prompt

**Origem:** especificação técnica formulada pelo assistente a partir dos pedidos reais acima.

> Refinar a microaplicação Vanilla mantendo os quatro cenários, feedback acessível e exportação. Conferir bloqueio sem resposta, reinício e representação de progresso até a conclusão. Não transformar a pontuação didática em diagnóstico.

**Objetivo verificável:** ao terminar quatro cenários, indicar 4/4 concluídos e permitir reiniciar; manter feedback, foco e exportação.

### Resposta

**Artefato inicial gerado por IA:** `auditoria-v1-simulator.js` (versão completa preservada). Trecho do início da implementação:

```javascript
import { scenarios, evaluate, buildProtocol } from './scenarios.js';
import { element, focusHeading } from './dom.js';

export function mountSimulator(root) {
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
```

### Diagnóstico

A implementação inicial criava uma barra `<progress>` durante as etapas, porém `finish()` substituía o conteúdo pela tela final sem apresentar essa barra. Assim, ao concluir os quatro cenários, faltava uma indicação persistente de **4/4 concluídos**. Também havia um elemento `section` para o feedback sem título próprio, substituído por `div` na revisão sem perda do aviso `aria-live`.

**Impacto:** comunicação de estado e semântica de interface; não se tratava de erro no cálculo da pontuação. **Critério de correção:** após a quarta decisão, o elemento `#simulator-root progress` deve ter `value=4` e `max=4`, e o reinício deve voltar a 0.

### Refatoração

Foi acrescentada uma barra final com valor máximo alcançado e rótulo acessível; o contêiner de feedback foi ajustado. **Diff real** entre `auditoria-v1-simulator.js` e `simulator.js`:

```diff
--- auditoria-v1-simulator.js
+++ simulator.js
@@ -30,7 +30,7 @@
     }
     const confirm = element('button', revealed ? (index === scenarios.length-1 ? 'Ver protocolo' : 'Próximo cenário') : 'Analisar decisão','btn btn-primary');
     confirm.type = 'button'; confirm.disabled = !selected;
-    const feedback = element('section');
+    const feedback = element('div');
     feedback.setAttribute('aria-live','polite');
     if (revealed) {
       const choice = scenario.options.find(option=>option.id===selected);
@@ -61,7 +61,10 @@
     const restart = element('button','Refazer cenários','btn btn-outline-secondary');
     restart.type = 'button';
     restart.addEventListener('click',()=>{index=0;selected=null;revealed=false;answers.fill(null);draw(true);});
-    root.append(heading,score,element('p',result.notice),list,
+    const completed = element('progress');
+    completed.max = scenarios.length; completed.value = scenarios.length;
+    completed.setAttribute('aria-label', 'Todos os quatro cenários concluídos');
+    root.append(completed,heading,score,element('p',result.notice),list,
       element('p','A equipe precisa garantir tempo de revisão, mentoria e espaço para questionar sugestões. O esforço individual não substitui essas condições.'),download,restart);
     focusHeading(heading);
   }
```

**Evidência de teste já registrada no projeto:** `ui.test.cjs`, caso `quatro cenários completos, foco, progresso final e reinício`. Para reproduzir, executar `npm install` e `npm run test:ui` no diretório do projeto. A execução de testes automatizados nesta versão precisa ser registrada separadamente.

**Revisão manual informada pela dupla:** Revisão manual realizada por Pedro Henrique Teixeira De Lima. Foram testados os quatro cenários, as decisões, os feedbacks, a pontuação e a exportação do protocolo. Os resultados e eventuais problemas foram documentados no REGISTRO_DA_DUPLA.md.

---

## Ficha 2/3 — Gráfico: layout responsivo e recuperação de erro

### Prompt

**Origem:** especificação técnica formulada pelo assistente, não prompt literal da dupla.

> Integrar Chart.js 4.4.8 a um painel responsivo com seletor, tabela, fonte e limites. Evitar instâncias acumuladas, adaptar cores ao tema e preservar os dados se o gráfico não puder renderizar.

**Objetivo verificável:** selecionar indicadores sem acumular gráficos e manter a tabela funcional quando a visualização não estiver disponível.

### Resposta

**Artefato inicial gerado por IA:** `auditoria-v1-chart.js` (versão completa preservada). Trecho do início da implementação:

```javascript
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
  const canvas = element('canvas');
  canvas.setAttribute('role','img'); canvas.setAttribute('aria-describedby','mh-chart-summary');
  const summary = element('figcaption'); summary.id = 'mh-chart-summary';
  frame.append(canvas,summary);
  const table = element('table',undefined,'table');
  const caption = element('caption','Valores do indicador selecionado');
  const head = element('thead'); const row = element('tr');
  for (const text of ['Grupo','Valor (%)']) { const th = element('th',text); th.scope='col'; row.append(th); }
```

### Diagnóstico

O código inicial usava `aspectRatio: 1.8` para a área gráfica, sem um contêiner próprio de altura controlada. Além disso, verificava se Chart.js estava ausente, mas não envolvia a construção `new Chart(...)` em tratamento de exceção. Uma falha na inicialização poderia interromper o fluxo de renderização sem fornecer mensagem de contingência específica.

**Impacto:** responsividade e robustez. **Critério de correção:** a área do gráfico deve adaptar a altura pelo CSS, o gráfico deve ser substituído sem instâncias acumuladas, e os valores devem continuar legíveis na tabela mesmo após falha da biblioteca.

### Refatoração

A revisão passou a usar `div.chart-area` com `role=group` e `aria-label`, `maintainAspectRatio: false`, paletas específicas para tema claro/escuro e `try/catch` para falha na criação do gráfico. A altura é definida em `styles.css`. **Diff real** entre `auditoria-v1-chart.js` e `chart.js`:

```diff
--- auditoria-v1-chart.js
+++ chart.js
@@ -9,10 +9,13 @@
   }
   const heading = element('h3');
   const frame = element('figure');
+  const chartArea = element('div', undefined, 'chart-area');
+  chartArea.setAttribute('role', 'group'); chartArea.setAttribute('aria-label', 'Área do gráfico');
   const canvas = element('canvas');
   canvas.setAttribute('role','img'); canvas.setAttribute('aria-describedby','mh-chart-summary');
   const summary = element('figcaption'); summary.id = 'mh-chart-summary';
-  frame.append(canvas,summary);
+  chartArea.append(canvas);
+  frame.append(chartArea,summary);
   const table = element('table',undefined,'table');
   const caption = element('caption','Valores do indicador selecionado');
   const head = element('thead'); const row = element('tr');
@@ -41,15 +44,22 @@
     const dark = document.documentElement.classList.contains('theme-dark');
     const textColor = dark ? '#edf2f5' : '#152630';
     const gridColor = dark ? '#53646c' : '#c3cdd2';
+    try {
     chart = new globalThis.Chart(canvas,{
       type:'bar',data:{labels:data.labels,datasets:[{label:data.unit,data:data.values,
-        backgroundColor:['#087f74','#a95822'],borderWidth:0,borderRadius:6}]},
-      options:{responsive:true,aspectRatio:1.8,animation:!matchMedia('(prefers-reduced-motion: reduce)').matches,
+        backgroundColor:dark ? ['#87c9b0','#edb78b'] : ['#267363','#ad572d'],borderWidth:0,borderRadius:6}]},
+      options:{responsive:true,maintainAspectRatio:false,animation:!matchMedia('(prefers-reduced-motion: reduce)').matches,
         plugins:{legend:{display:false},tooltip:{callbacks:{label:context=>`${context.parsed.y}%`}}},
         scales:{y:{beginAtZero:true,max:select.value==='produtividade'?40:100,
           ticks:{color:textColor,callback:value=>`${value}%`},grid:{color:gridColor}},
           x:{ticks:{color:textColor},grid:{display:false}}}}
     });
+    } catch {
+      const broken = globalThis.Chart.getChart?.(canvas);
+      broken?.destroy();
+      canvas.hidden = true;
+      status.textContent = 'A visualização está indisponível. Consulte os valores na tabela.';
+    }
   }
   select.addEventListener('change',render);
   document.addEventListener('mh:theme',render);
```

**Evidência de teste já registrada no projeto:** `ui.test.cjs`, casos `ausência de Chart.js preserva tabela e troca de indicador` e `trocar dados ou tema não acumula instâncias do gráfico`. Eles verificam a contingência sem a biblioteca e o descarte de gráficos simulados. **Complemento de teste no pacote de 02/11/2026:** foi acrescentado a `ui.test.cjs` o caso `falha na criação do gráfico mantém a tabela e informa indisponibilidade`, que simula uma exceção no construtor e verifica a tabela e a mensagem. **A execução deste teste DOM depende de `npm install`; a execução em navegador público não é comprovada apenas por esse teste.** O layout em navegador real permanece uma verificação manual.

**Revisão manual informada pela dupla:** Revisão manual realizada por João Pedro De Souza. Foram verificados os três indicadores, a apresentação dos dados, a responsividade e o funcionamento do gráfico no navegador. Os resultados foram documentados no REGISTRO_DA_DUPLA.md.

---

## Ficha 3/3 — Tema: texto do controle e acessibilidade

### Prompt

**Origem:** especificação técnica formulada pelo assistente, não prompt literal da dupla.

> Integrar a alternância de tema ao cabeçalho responsivo sem perder estado acessível, persistência tolerante a falhas e sincronização do gráfico. Manter preferência explícita acima da preferência do sistema.

**Objetivo verificável:** apresentar um botão curto na navegação com ação clara para usuários visuais e descrição do estado para leitores de tela.

### Resposta

**Artefato inicial gerado por IA:** `auditoria-v1-theme.js` (versão completa preservada). Trecho do início da implementação:

```javascript
const KEY = 'margem-humana-theme';
export function readPreference(storage) {
  try { const value = storage.getItem(KEY); return ['dark','light'].includes(value) ? value : null; }
  catch { return null; }
}
export function writePreference(storage,value) {
  try { storage.setItem(KEY,value); return true; } catch { return false; }
}
export function mountTheme(button) {
  // O próprio acesso à propriedade localStorage pode lançar SecurityError.
  let storage;
  try { storage = window.localStorage; } catch { storage = null; }
  const media = matchMedia('(prefers-color-scheme: dark)');
  let preference = readPreference(storage);
  function apply(value) {
    document.documentElement.classList.toggle('theme-dark',value==='dark');
    document.documentElement.setAttribute('data-bs-theme',value);
    button.setAttribute('aria-pressed',String(value==='dark'));
    button.textContent = value==='dark' ? 'Tema escuro: ativado' : 'Tema escuro: desativado';
```

### Diagnóstico

A versão inicial usava o texto `Tema escuro: ativado` ou `Tema escuro: desativado` no botão, ocupando espaço na navegação, sobretudo em larguras menores. O rótulo descrevia um estado, mas não explicitava de maneira curta a ação seguinte. Era possível melhorar o texto sem perder `aria-pressed`, a preferência salva nem a sincronização com o gráfico.

**Impacto:** legibilidade do menu e clareza de operação. **Critério de correção:** o botão deve indicar a ação de alternar o tema, enquanto o nome acessível descreve o estado presente e a próxima ação.

### Refatoração

O texto visível foi reduzido para `Tema claro`/`Tema escuro` (a próxima opção); o `aria-label` passou a explicitar estado e ação. Permanecem `aria-pressed`, `data-bs-theme` e o disparo do evento `mh:theme`. **Diff real** entre `auditoria-v1-theme.js` e `theme.js`:

```diff
--- auditoria-v1-theme.js
+++ theme.js
@@ -16,7 +16,8 @@
     document.documentElement.classList.toggle('theme-dark',value==='dark');
     document.documentElement.setAttribute('data-bs-theme',value);
     button.setAttribute('aria-pressed',String(value==='dark'));
-    button.textContent = value==='dark' ? 'Tema escuro: ativado' : 'Tema escuro: desativado';
+    button.textContent = value==='dark' ? 'Tema claro' : 'Tema escuro';
+    button.setAttribute('aria-label', value==='dark' ? 'Tema escuro ativado. Mudar para tema claro' : 'Tema escuro desativado. Mudar para tema escuro');
     document.dispatchEvent(new CustomEvent('mh:theme'));
   }
   apply(preference ?? (media.matches?'dark':'light'));
```

**Evidência de teste já registrada no projeto:** `ui.test.cjs`, caso `tema persiste e funciona por file:// mesmo sem storage`; o teste verifica a classe do tema, `aria-pressed`, persistência onde disponível e retorno ao tema claro. **Limite:** esse teste não constitui avaliação completa com leitor de tela.

**Revisão manual informada pela dupla:** Revisão realizada por Pedro Henrique e João Pedro. Foram testados os modos claro e escuro, a legibilidade dos elementos e a persistência da preferência após atualizar a página.

---

## Checklist de entrega da auditoria

- **Três fichas identificadas** (simulador, gráfico e tema).
- **Prompt documentado** em cada ficha, com origem declarada e sem atribuição fictícia aos alunos.
- **Resposta inicial** de cada ficha com trecho e arquivo completo preservado.
- **Diagnóstico** específico e impacto descrito para cada implementação.
- **Refatoração** de cada ficha evidenciada por diff entre os arquivos do projeto.
- **Rastreabilidade** para o código atual e testes correspondentes.
- **Revisão crítica humana** relatada pela dupla, com identificação dos integrantes; datas, resultados e possíveis correções próprias devem estar registrados em `REGISTRO_DA_DUPLA.md`.
- **Commits, execução manual em navegador e publicação** documentados pelos estudantes, se exigidos no enunciado.

## Integração e limites

A versão clássica `app.bundle.js` permite abrir `index.html` por `file://`; os módulos JavaScript na raiz são as fontes de manutenção. Para atualizar o bundle após mudanças no JS modular, executar `npm run build`. O projeto contém controles alternativos para a navegação, cópias locais de dependências e ajustes de layout móvel.

**Validação e autoria:** os casos automatizados estão em `core.test.js` e `ui.test.cjs`. Os testes manuais declarados pela dupla estão em `REGISTRO_DA_DUPLA.md`; um registro documental não comprova, isoladamente, a execução. Esta auditoria foi organizada com assistência de IA sem simular autoria estudantil ou um novo deploy.

## Rechecagem desta organização — 11/02/2026

- Conferidas **3 fichas** e **3 ocorrências de cada título** obrigatório: Prompt, Resposta, Diagnóstico e Refatoração.
- Conferido que os três diffs documentados correspondem às versões iniciais `auditoria-v1-*.js` e aos módulos finais `simulator.js`, `chart.js` e `theme.js` incluídos neste pacote.
- `npm test` executado nesta edição: **4 testes aprovados, 0 falhas**.
- `npm run test:ui` **não foi reexecutado nesta edição**, pois as dependências de desenvolvimento não estão instaladas neste ambiente de trabalho. Os resultados desta execução devem ser registrados sem confundi-los com os relatos manuais da dupla.
- Nenhum arquivo de comportamento da aplicação foi alterado nesta edição; somente o documento de auditoria foi reorganizado e corrigido.

## Conferência complementar do pacote — 11/02/2026

Nesta preparação para a entrega foi incluído em `ui.test.cjs` um caso para simular erro de construção de gráfico, mas sua execução por `jsdom` ainda depende da instalação das dependências de desenvolvimento. Como conferência adicional, o mesmo cenário foi **executado em Chromium headless** com os scripts locais incorporados: a tabela e o aviso de indisponibilidade continuaram funcionando e não houve exceção de JavaScript. O fluxo de quatro cenários, o download, os três indicadores e a alternância de tema também funcionaram em Chromium por esse método, com zero mensagens de Console do tipo `error`. Naquela conferência técnica (11/02/2026), o acesso real ao GitHub Pages e às CDNs **não foi verificado**. A publicação posterior está registrada na atualização abaixo.

Esta conferência adicional foi feita pelo assistente. **Não substitui intervenção manual dos integrantes, autoria acadêmica exigida ou commits próprios.**

## Atualização posterior — publicação e revisão da dupla

Após a conferência técnica de 11/02/2026, o projeto foi publicado e os integrantes informaram ter realizado revisões manuais do simulador, dos gráficos e do tema. Os procedimentos e resultados declarados devem ser confrontados com `REGISTRO_DA_DUPLA.md`; esta seção não substitui capturas, logs ou outras evidências de execução.

- **Repositório público:** https://github.com/henriquepedro500/Margem-Humana
- **GitHub Pages:** https://henriquepedro500.github.io/Margem-Humana/
- **Pedro Henrique Teixeira De Lima — commit de documentação:** https://github.com/henriquepedro500/Margem-Humana/commit/a3ae0a62b52ef8ec1e224b488f722745d2d746a7
- **João Pedro De Souza — commit de documentação:** https://github.com/henriquepedro500/Margem-Humana/commit/618a448a0fb835c015831fe1ff887f74f8ed6943

Os commits acima comprovam edições documentais atribuídas aos integrantes, mas não comprovam, isoladamente, a execução de todos os testes nem a autoria manual das refatorações originalmente produzidas por IA. Os caminhos deste documento foram alinhados ao formato com arquivos na raiz do repositório.
