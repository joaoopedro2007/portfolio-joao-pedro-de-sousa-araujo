// Situações fictícias de aprendizagem; não são relatos de participantes da pesquisa.
export const scenarios = [
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

export function evaluate(answers) {
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

export function buildProtocol(result) {
  return ['MARGEM HUMANA — Protocolo de revisão de IA',
    `${result.points}/${result.maximum} pontos no exercício fictício`, result.notice,
    '', ...result.actions.map((action,i)=>`${i+1}. ${action}`), '',
    'Acordos para a equipe: tempo de revisão, canal de escalonamento, mentoria e métricas de qualidade.',
    'As condições organizacionais não podem ser substituídas pelo esforço individual.'
  ].join('\n');
}
