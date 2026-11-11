# Levantamento de falhas reais (28/10/2026)

**Autoria:** feito pelo assistente de IA, com medições em Chromium real (390 px de largura, temas claro e escuro), leitura dos módulos JS e conferência das fontes. **Não é registro de intervenção da dupla** e não deve ser copiado para a seção 5 do `AUDITORIA_IA.md`. Serve como lista de pontos para vocês reproduzirem, decidirem, corrigirem à mão e só então registrarem.

## Conferido e correto
- Dados do gráfico batem com as fontes: QJE (15% na média, cerca de 30% no grupo menos experiente, 5.172 agentes); Deloitte 2025 (89% e 92% para propósito, 74% e 77% para expectativa sobre IA, 14.751 Gen Z, 8.731 millennials, 44 países).
- O hash SRI do Bootstrap CSS no `index.html` é igual ao da cópia local (mesma versão 5.3.8).

## Falhas e fragilidades encontradas

| # | Onde | O que acontece | Como reproduzir | Ideia de correção (decisão de vocês) |
|---|---|---|---|---|
| 1 | `js/scenarios.js` (simulador) | A opção de 2 pontos é sempre a mais longa (4 de 4 cenários) e fica na última posição em 3 de 4. Dá para acertar sem ler o caso. | Comparar o tamanho e a posição das opções em cada cenário. | Embaralhar a ordem e equilibrar o tamanho das opções. |
| 2 | `css/styles.css` (tipografia) | 24 trechos de texto com menos de 12 px; o menor é 8 px (etiqueta "REVISAR"), seguido de 8,6 px ("UM CHAMADO. DUAS POSSIBILIDADES."). | DevTools > Elements > Computed > font-size, ou Lighthouse, em largura de celular. | Definir mínimo de 0,75rem para textos. |
| 3 | `css/styles.css` (`.btn-primary`) | No tema escuro, o botão "Analisar decisão" desabilitado fica com texto branco sobre verde-claro (contraste cerca de 1,6:1). Habilitado fica correto. | Ativar tema escuro, ir ao Laboratório e olhar o botão antes de escolher uma opção. | O CSS redefine `--bs-btn-disabled-bg`, mas não `--bs-btn-disabled-color`; acrescentar essa variável. |
| 4 | `js/chart.js` | O limite do eixo Y depende do nome do indicador (`select.value==='produtividade'?40:100`). Um indicador novo exige editar o gráfico. | Ler a linha do `scales.y.max`. | Guardar o `max` em cada item de `data.js`. |
| 5 | `js/theme.js` | Usa `media.addEventListener('change')`, que navegadores antigos (Safari anterior ao 14) não suportam. Não testei isso. | Testar em Safari antigo ou verificar a compatibilidade no MDN. | Tratar a ausência do método ou aceitar o limite e documentá-lo. |
| 6 | `index.html` (carregamento) | Bootstrap CSS e as fontes são carregados duas vezes (cópia local e CDN). | Aba Network do DevTools. | Manter só o CDN com fallback ou justificar a duplicidade no README. |
| 7 | Alvos de toque | Link da marca no rodapé com 33 px de altura (abaixo de 44 px). Os rádios têm 18 px, mas o rótulo inteiro é clicável. | DevTools > modo dispositivo, medir os elementos. | Aumentar a altura mínima do link. |

## Como usar isto na auditoria
Para cada falha que vocês decidirem corrigir, a ficha precisa dos dados reais de vocês: quem reproduziu e quando, o prompt que realmente enviaram a uma IA (se enviaram), a alteração feita à mão, o commit e o que aprenderam. Se não fizerem a correção, não registrem como feita.
