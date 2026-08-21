<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Vira Pergunta: as regras deste produto

Este projeto **é o app**, e não material de aula genérico. Quem mexe aqui trata
o código como produto.

## O que o app faz

Alguém cola o conteúdo que precisa estudar, ele vira perguntas, e essas
perguntas são revisadas carta a carta antes da prova. Duas pessoas usam:
o aluno (estuda e revisa) e o professor (organiza o material e ajusta depois da
correção). É ferramenta interna de uma equipe, com volume de poucos conteúdos
por semana. Não é produto vendido: não existe preço, plano nem depoimento.

## O modelo de dados

Três coleções, em `src/lib/types.ts`, e o vocabulário delas em `src/lib/modelo.ts`:

- **conteúdo**: o texto colado, com disciplina e tema.
- **pergunta**: nasce de um conteúdo, tem enunciado, resposta e o resultado da
  última revisão (`acertei`, `errei` ou nulo, que é "ainda não revisada").
- **baralho**: uma seleção nomeada de perguntas, pra revisar de uma vez.

Remover um conteúdo leva as perguntas dele junto, e as cartas somem dos
baralhos. Isso está escrito nos dois lados: `src/lib/store.ts` e `src/lib/banco.ts`.

## As regras da casa

1. **Nenhum componente lê ou grava dado por fora do `src/lib/store.ts`.** É essa
   regra que faz "ligar o banco" ser uma linha no `.env.local` em vez de uma
   reforma em vinte telas.
2. **Nenhum texto visível dentro de componente.** Toda copy mora em
   `src/content/site.ts`. Título de tela, rótulo de botão, mensagem de erro,
   nome acessível: tudo lá.
3. **Nenhuma cor escrita à mão.** Cor sai de `var(--ds-*)` ou de `color-mix` em
   cima delas. A única exceção é o ícone do Google, que é marca de terceiro.
4. **Nenhuma sombra externa.** A profundidade deste app é borda de 1px em
   `--ds-hairline`, gradiente curto e sombra interna. Nada de `shadow-md`,
   `drop-shadow` ou `box-shadow` com deslocamento.
5. **Três raios, não um.** `rounded-ds` na peça pequena (botão, campo, selo),
   `rounded-ds-surface` na superfície larga (cartão, modal, gaveta, área de
   texto) e `rounded-ds-fine` na peça miúda que mora dentro de outra.
6. **Sem travessão.** Vírgula, dois-pontos ou ponto. E sem emoji, em lugar
   nenhum.
7. **Ícone sempre pelo mapa** de `src/components/app/icone.tsx`, e sempre do
   lucide. Ilustração é SVG inline herdando `currentColor`.
8. **Acessibilidade não é opcional**: rótulo amarrado ao controle, erro em
   `role="alert"`, mudança silenciosa anunciada em `aria-live` ou `role="status"`,
   alvo de 44 pixels em ponteiro grosso, e tudo alcançável pelo teclado.
9. **Chave de API nunca no código do navegador.** Ela mora no `.env.local`,
   documentada sem valor no `.env.example`, e a chamada sai de uma rota em
   `src/app/api`.

## O que não se apaga

`.storybook`, `n8n`, `src/app/api`, a tela de configurações, o tour de
`src/components/onboarding`, o site da raiz, a tela de entrar e a página
`/como-usar`. Cada uma delas é o encaixe de alguma coisa que ainda vai ser
ligada.

## A geração de perguntas

Hoje ela é simulada: as respostas moram em `src/lib/perguntas-geradas.ts` e a
tela avisa isso, com o caminho pra ligar a API de verdade ao lado. Quando a
`OPENAI_API_KEY` entrar, é esse módulo que sai e uma rota de servidor entra no
lugar. As telas não mudam: elas pedem perguntas e recebem perguntas.
