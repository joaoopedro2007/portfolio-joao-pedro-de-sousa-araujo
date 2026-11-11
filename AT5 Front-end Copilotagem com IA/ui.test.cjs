const test = require('node:test');
const assert = require('node:assert/strict');
const {readFileSync}=require('node:fs');
const {resolve}=require('node:path');
const {JSDOM}=require('jsdom');
const cssTree=require('css-tree');
const root=__dirname;
const html=readFileSync(resolve(root,'index.html'),'utf8');
const bundle=readFileSync(resolve(root,'app.bundle.js'),'utf8');
function setup({chart=false,file=false}={}) {
 const dom=new JSDOM(html,{url:file?'file:///margem-humana/index.html':'https://example.test/margem-humana/',runScripts:'outside-only'});
 const w=dom.window;
 w.structuredClone=global.structuredClone; // API real do navegador ainda ausente no JSDOM.
 w.matchMedia=query=>({matches:false,addEventListener(){},removeEventListener(){}});
 if(chart==='throw') {
  w.Chart=class {constructor(){throw new Error('Falha controlada do canvas');}static getChart(){return null;}};
 } else if(chart) {
  w.Chart=class {static count=0;constructor(canvas,config){this.config=config;this.canvas=canvas;w.Chart.count++;}destroy(){w.Chart.count--;}};
 }
 w.eval(bundle);
 return {dom,w,d:w.document};
}
function choose(d,id){const radio=d.querySelector(`input[value="${id}"]`);radio.checked=true;radio.dispatchEvent(new d.defaultView.Event('change'));}
function action(d,text){const button=[...d.querySelectorAll('#simulator-root button')].find(b=>b.textContent===text);assert.ok(button,`Botão ${text}`);button.click();}
test('HTML tem hierarquia base, IDs únicos, âncoras e arquivos locais válidos',()=>{
 const {existsSync}=require('node:fs');const d=new JSDOM(html).window.document;
 assert.equal(d.documentElement.lang,'pt-BR');assert.equal(d.querySelectorAll('h1').length,1);
 const ids=[...d.querySelectorAll('[id]')].map(n=>n.id);assert.equal(new Set(ids).size,ids.length);
 for(const a of d.querySelectorAll('a[href^="#"]'))assert.ok(d.querySelector(a.getAttribute('href')));
 for(const n of d.querySelectorAll('[src],[href]')){const url=n.getAttribute('src')||n.getAttribute('href');if(!url.startsWith('#')&&!/^(https?:|data:)/.test(url))assert.ok(existsSync(resolve(root,url)),url);}
 for(const tag of ['header','nav','main','section','article','aside','footer'])assert.ok(d.querySelector(tag));
});
test('CSS passa pelo parser e pelas gramáticas de propriedades conhecidas',()=>{
 const errors=[];const css=readFileSync(resolve(root,'styles.css'),'utf8');
 const ast=cssTree.parse(css,{onParseError:e=>errors.push(e.message)});
 cssTree.walk(ast,{visit:'Declaration',enter(node){if(node.property.startsWith('--'))return;const value=cssTree.generate(node.value);if(/(?:var|clamp)\(/.test(value))return; // Gramática matemática moderna conferida pelo navegador.
 const result=cssTree.lexer.matchProperty(node.property,node.value);if(result.error && !result.error.message.startsWith('Unknown property'))errors.push(`${node.property}: ${value} — ${result.error.message}`);}});
 assert.deepEqual(errors,[]);
});
test('quatro cenários completos, foco, progresso final e reinício',()=>{
 const {dom,d}=setup();
 assert.equal(d.querySelector('#simulator-root button').disabled,true);
 for(const [i,id] of ['revisar','encaminhar','discutir','explicar'].entries()){
  choose(d,id);action(d,'Analisar decisão');assert.equal(d.activeElement.tagName,'H4');
  action(d,i===3?'Ver protocolo':'Próximo cenário');
 }
 assert.match(d.querySelector('#simulator-root').textContent,/8\/8 pontos/);
 assert.equal(d.querySelector('#simulator-root progress').value,4);
 assert.equal(d.activeElement.tagName,'H3');
 action(d,'Refazer cenários');assert.equal(d.querySelector('#simulator-root progress').value,0);
 assert.equal(d.querySelector('#simulator-root button').disabled,true);dom.window.close();
});
test('ausência de Chart.js preserva tabela e troca de indicador',()=>{
 const {dom,w,d}=setup();assert.equal(d.querySelector('canvas').hidden,true);
 const select=d.querySelector('#mh-dataset');select.value='proposito';select.dispatchEvent(new w.Event('change'));
 assert.match(d.querySelector('#chart-root tbody').textContent,/89%/);
 assert.match(d.querySelector('#chart-root [role=status]').textContent,/não carregou/);dom.window.close();
});
test('falha na criação do gráfico mantém a tabela e informa indisponibilidade',()=>{
 const {dom,w,d}=setup({chart:'throw'});
 assert.equal(d.querySelector('#chart-root canvas').hidden,true);
 assert.match(d.querySelector('#chart-root [role=status]').textContent,/indisponível/);
 assert.match(d.querySelector('#chart-root tbody').textContent,/15%/);
 const select=d.querySelector('#mh-dataset');select.value='proposito';
 select.dispatchEvent(new w.Event('change'));
 assert.match(d.querySelector('#chart-root tbody').textContent,/89%/);
 dom.window.close();
});
test('trocar dados ou tema não acumula instâncias do gráfico',()=>{
 const {dom,w,d}=setup({chart:true});const select=d.querySelector('#mh-dataset');
 for(const key of ['proposito','impacto','produtividade']){select.value=key;select.dispatchEvent(new w.Event('change'));assert.equal(w.Chart.count,1);}
 d.querySelector('#theme-toggle').click();assert.equal(w.Chart.count,1);dom.window.close();
});
test('tema persiste e funciona por file:// mesmo sem storage',()=>{
 for(const file of [false,true]){const {dom,w,d}=setup({file});d.querySelector('#theme-toggle').click();
 assert.equal(d.documentElement.classList.contains('theme-dark'),true);
 assert.equal(d.querySelector('#theme-toggle').getAttribute('aria-pressed'),'true');
 if(!file)assert.equal(w.localStorage.getItem('margem-humana-theme'),'dark');
 d.querySelector('#theme-toggle').click();assert.equal(d.documentElement.dataset.bsTheme,'light');dom.window.close();}
});
test('menu e accordion continuam acessíveis sem JS do Bootstrap',()=>{
 const {dom,d}=setup();const menu=d.querySelector('.navbar-toggler');menu.click();assert.equal(menu.getAttribute('aria-expanded'),'true');
 const second=d.querySelector('[aria-controls="debate-2"]');second.click();
 assert.equal(second.getAttribute('aria-expanded'),'true');assert.equal(d.querySelector('#debate-1').classList.contains('show'),false);
 second.click();assert.equal(second.getAttribute('aria-expanded'),'false');dom.window.close();
});
