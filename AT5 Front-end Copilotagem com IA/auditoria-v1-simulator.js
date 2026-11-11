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
    const feedback = element('section');
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
    root.append(heading,score,element('p',result.notice),list,
      element('p','A equipe precisa garantir tempo de revisão, mentoria e espaço para questionar sugestões. O esforço individual não substitui essas condições.'),download,restart);
    focusHeading(heading);
  }
  draw();
}
