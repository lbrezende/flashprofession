<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Rumo: as regras deste produto

Este projeto **é o app**, e não material de aula genérico. Quem mexe aqui trata
o código como produto. O comportamento esperado segue o documento de requisitos
da plataforma de preparação de carreira (os códigos ONB, CAR, DIA, MAP, APR,
PRA, PRO, RNK e RB citados nos comentários vêm dele).

## O que o app faz

Ajuda um adulto a trocar de carreira sabendo onde pisa: escolhe a profissão,
descobre o nível real num diagnóstico em duas partes (autoavaliação + teste),
enxerga o caminho completo em cinco níveis, aprende com validação no fim,
pratica em desafios que viram cases e acompanha progresso e ranking com
consentimento. O loop central: diagnóstico → lacuna → prioridade → aprendizado
→ validação → atualização do diagnóstico. Consumir conteúdo NUNCA sobe nível
sozinho (regra RB-02).

## O modelo de dados

Duas metades que não se misturam:

- **Catálogo** (`src/lib/catalogo.ts`): áreas, profissões, os cinco níveis,
  competências, habilidades, questões, módulos e desafios. É conteúdo de
  demonstração (RB-08), constante, fora do store. A profissão do teste ponta a
  ponta é UX/UI Designer.
- **Estado do usuário** (`src/lib/store.ts`): três coleções em
  `src/lib/types.ts` com vocabulário em `src/lib/modelo.ts`:
  - **jornada**: profissão objetivo, etapa, respostas do diagnóstico, resultado,
    conclusões, retomada e visibilidade pública (um registro vivo).
  - **evidência**: o que a pessoa produziu num desafio, com estado
    (rascunho → enviada → avaliada → case) e consentimento.
  - **sessão de estudo**: blocos de tempo ativo que alimentam horas e sequência.

As contas derivadas (horas, sequência, estados de nó, próxima ação, score)
moram em `src/lib/jornada.ts`, num lugar só.

## As regras da casa

1. **Nenhum componente lê ou grava dado por fora do `src/lib/store.ts`.** É essa
   regra que faz "ligar o banco" ser uma linha no `.env.local` em vez de uma
   reforma em vinte telas.
2. **Nenhum texto visível dentro de componente.** Toda copy mora em
   `src/content/site.ts`.
3. **Nenhuma cor escrita à mão.** Cor sai de `var(--ds-*)` ou de `color-mix`.
   A única exceção é o ícone do Google, que é marca de terceiro.
4. **Nenhuma sombra externa.** A profundidade é borda de 1px em `--ds-hairline`,
   gradiente curto e sombra interna.
5. **Três raios, e o botão é pílula**: todo botão (e link com cara de botão)
   usa `rounded-full`, decisão de design da casa. Fora do botão, `rounded-ds`
   na peça pequena, `rounded-ds-surface` na superfície larga e
   `rounded-ds-fine` na peça miúda dentro de outra.
6. **Sem travessão e sem emoji**, em lugar nenhum.
7. **Ícone sempre pelo mapa** de `src/components/app/icone.tsx`, do lucide.
8. **Acessibilidade não é opcional**: estado nunca é só cor (MAP-04), o mapa em
   React Flow tem alternativa em lista, rótulo amarrado, erro em `role="alert"`,
   mudança silenciosa anunciada, alvo de 44px em ponteiro grosso.
9. **Chave de API nunca no navegador**: `.env.local` + rota em `src/app/api`.
10. **Toda tela central mostra UMA próxima ação clara** (regra RB-10): quem
    decide qual é `proximaAcao()` em `src/lib/jornada.ts`.

## O que não se apaga

`.storybook`, `n8n`, `src/app/api`, a tela de configurações, o tour de
`src/components/onboarding`, o site da raiz, a tela de entrar, a página
`/como-usar`, a tela `/app/desafio` e o exemplo em `/exemplo`. Cada uma é o
encaixe de alguma coisa que ainda vai ser ligada.

## O React Flow

`@xyflow/react` entrou porque o requisito MAP-02 pede ele pelo nome. Ele é
importado num arquivo só (`src/components/app/mapa/fluxo.tsx`) e chega por
import adiado: o resto do app não paga pelo peso dele.

## Componente novo entra no Storybook

Primitivo novo em `src/components/ui` nasce com a story ao lado, no mesmo
padrão dos outros (`barra-progresso.stories.tsx` é o exemplo mais novo).
