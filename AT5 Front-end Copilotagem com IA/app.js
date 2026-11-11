import { mountSimulator } from './simulator.js';
import { mountChart } from './chart.js';
import { mountTheme } from './theme.js';
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
