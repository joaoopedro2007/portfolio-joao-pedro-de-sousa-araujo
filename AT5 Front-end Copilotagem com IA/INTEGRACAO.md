# Arquitetura e manutenção

A versão completa inclui a interface e a integração dos recursos. Toda a implementação foi feita com assistência de IA; não representa autoria manual da dupla.

## Estrutura visual

O design usa superfícies claras, verde escuro e terracota. Manrope organiza os títulos; DM Sans, o texto e os controles. Ambas são fontes externas Google Fonts, com fallback sans-serif. Os tokens de cores, fontes, espaçamentos e superfícies estão no :root de styles.css. A classe theme-dark substitui os tokens.

A interface utiliza Grid no hero, nas evidências, no laboratório e nos acordos. Flexbox organiza navegação, ações e rodapé. Os cards empregam o grid Bootstrap de 12 colunas, com classes sm, md, lg e xl. As media queries tratam os formatos estreitos sem remover conteúdo.

## Carregamento

1. Google Fonts e Bootstrap CSS 5.3.8.
2. fonts.css, Bootstrap local, styles.css e advanced.css.
3. Bootstrap JS Bundle 5.3.8, seu fallback local, Chart.js 4.4.8, seu fallback local e app.bundle.js, todos com defer e nessa ordem. Os fallbacks não executam uma biblioteca já carregada.

As URLs CDN e os hashes SRI de Bootstrap estão em index.html. Ao trocar uma versão de Bootstrap, usar o hash correspondente da documentação oficial. Chart.js está fixado no build UMD 4.4.8.

## Fontes e arquivo distribuído

O código-fonte permanece em ES Modules dentro de js/. O HTML carrega somente app.bundle.js, um script clássico gerado por build.mjs, para permitir a abertura direta por file://. O script de build concatena os módulos numa ordem fixa e remove seus imports/exports locais. Não é um bundler genérico: não adicionar importações de pacotes sem adaptar esse processo.

Após editar os módulos, executar `node build.mjs`. Não editar o bundle manualmente. A publicação não exige executar build no GitHub porque o bundle está incluído.

## Contratos DOM

| ID | Elemento | Responsabilidade |
|---|---|---|
| theme-toggle | button | Estado de tema e alternância |
| simulator-root | section | Conteúdo dinâmico do exercício |
| chart-root | section | Seletor, gráfico, tabela e fonte |
| main-nav | section colapsável | Menu responsivo |
| debates | section accordion | Grupos de perguntas |

Cada ID ocorre uma vez. Os módulos do simulador e gráfico criam h3 dentro de seções que já têm h2. Não inserir conteúdo estático obrigatório nos pontos de montagem, pois replaceChildren o substituirá.

## Acessibilidade e resiliência

Há link para pular ao conteúdo, controles nativos, fieldset/legend, foco visível, foco no feedback/resultado e tabela que reproduz os valores do gráfico. O tema mantém classe, data-bs-theme e estado acessível do botão coerentes. A preferência de movimento reduzido elimina as animações. O resultado mostra progresso 4/4.

Se Chart.js estiver ausente ou a criação do gráfico falhar, a tabela permanece. Se o JS do Bootstrap não carregar, o app aplica comportamentos mínimos de collapse ao menu e accordion. Esses comportamentos alternativos não são uma cópia de todos os componentes Bootstrap. Se o JavaScript inteiro estiver desativado, a página apresenta aviso e mantém o conteúdo editorial.

O arquivo styles.css contém utilitários mínimos para preservar a leitura caso o CSS do CDN esteja indisponível. A fonte do sistema substitui Google Fonts sem impedir o uso. Cópias locais de Bootstrap, Chart.js e das fontes em assets preservam a apresentação sem internet. As referências externas continuam exigindo conexão.

## Dados e privacidade

As escolhas do simulador ficam somente na memória da página. O localStorage armazena apenas a preferência de tema. Bloqueios de armazenamento não impedem a alternância na sessão. O protocolo é um Blob local, baixado sem envio das respostas a servidor.

A página ainda faz requisições de bibliotecas/fontes a provedores externos. Não há cadastro, coleta de nome, analytics ou chamada a API de IA. Não inserir dados de clientes nos cenários.

## Verificações antes de uma alteração

Executar testes de lógica e de DOM. Se mudar a interface, revisar também em navegador, em ambos os temas e em tela pequena. Não declarar conformidade integral WCAG 2.1 AA só pela presença de ARIA. A publicação final deve ser testada no endereço público, especialmente os caminhos relativos.
