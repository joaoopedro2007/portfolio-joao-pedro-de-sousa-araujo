import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
// Sem dependências: concatenar módulos locais em ordem explícita e remover só imports/exports.
// Não processa código remoto. O arquivo produzido permite abrir index.html por file://.
const root = dirname(fileURLToPath(import.meta.url));
const files = ['dom.js','scenarios.js','data.js','theme.js','simulator.js','chart.js','app.js'];
const code = files.map(name => {
  const source = readFileSync(join(root,name),'utf8');
  return `// SOURCE: ${name}\n` + source.replace(/^import .+ from ['"].+['"];?\r?\n/gm,'').replace(/^export /gm,'');
}).join('\n\n');
writeFileSync(join(root,'app.bundle.js'),`/* Gerado por node build.mjs. Editar os módulos de origem. */\n(()=>{\n'use strict';\n${code}\n})();\n`);
console.log('app.bundle.js atualizado.');
