// Dados descritivos publicados. Não combinar populações nem inferir causalidade entre estudos.
export const datasets = {
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
export function getDataset(key) {
  if (!Object.hasOwn(datasets,key)) throw new TypeError('Indicador desconhecido.');
  return structuredClone(datasets[key]);
}
