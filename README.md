# Vira Pergunta

Cole o conteúdo que você precisa estudar e ele volta em forma de pergunta.

O aluno cola o texto da matéria, recebe as perguntas que a prova vai cobrar e
revisa carta a carta no dia da prova. O professor organiza o material por
disciplina e tema, e depois da correção ajusta o que não funcionou.

É uma ferramenta interna: o site da raiz apresenta ela para quem chega na
equipe, e o sistema fica atrás da tela de entrar.

---

## Rodar na sua máquina

Precisa do Node 20 ou mais novo.

```bash
npm install
npm run dev
```

Abra http://localhost:3000. O app já vem com uma semana de conteúdo dentro, e
não precisa de banco, de conta em serviço nenhum nem de variável de ambiente
para funcionar.

## O catálogo de componentes

```bash
npm run storybook
```

Abre em http://localhost:6006, com os tokens do design system aplicados e
auditoria de acessibilidade em cada componente.

## Publicar

```bash
npx vercel --prod --yes
```

---

## Como ligar depois

O app nasce sem login de verdade e sem banco, e isso é o que faz ele rodar em
dois comandos. Mas os dois já estão escritos e testados aqui dentro: ligar cada
um é preencher linha no `.env.local`, não programar.

### Login com Google

Crie um ID de cliente OAuth em https://console.cloud.google.com/apis/credentials
(a tela de entrar tem o passo a passo completo dentro do botão do Google) e cole
no `.env.local`:

```
GOOGLE_CLIENT_ID=o-seu-client-id
GOOGLE_CLIENT_SECRET=o-seu-client-secret
AUTH_SECRET=um-texto-aleatorio-de-32-caracteres-ou-mais
```

Reinicie o servidor. O botão passa a autenticar de verdade, sem nenhuma tela
mudar. O código está em `src/lib/google.ts`, `src/lib/sessao-servidor.ts` e nas
três rotas de `src/app/api/auth`.

### Banco de dados no Neon

Crie um projeto Postgres em https://neon.com (tem plano gratuito), copie a
connection string e cole no `.env.local`:

```
DATABASE_URL=postgresql://usuario:senha@servidor/banco?sslmode=require
```

Reinicie o servidor. O mesmo app passa a gravar no Postgres, e a tabela é criada
sozinha na primeira chamada. Nenhuma tela fica sabendo da diferença. O código
está em `src/lib/banco.ts`, na rota `src/app/api/dados` e nos dois lados de
`src/lib/store.ts`. Conexão errada não derruba a tela: o app volta pro navegador
sozinho.

### Gerar as perguntas com inteligência artificial

Hoje o botão "Gerar perguntas" funciona com um resultado de exemplo, e a tela
avisa isso. Para ligar de verdade, pegue uma chave em
https://platform.openai.com/api-keys e cole no `.env.local`:

```
OPENAI_API_KEY=sk-a-sua-chave
```

Depois peça ao seu assistente a rota `src/app/api/gerar-perguntas/route.ts`, que
lê a chave de `process.env` no servidor. A chave nunca é escrita no código do
navegador.

O resto das conexões (envio de e-mail, WhatsApp, automações com n8n) está em
`PROXIMOS-PASSOS.md`, e a versão navegável dessa lista é a página `/como-usar`.

---

## As telas

| Endereço | O que resolve |
| --- | --- |
| `/` | O site que apresenta a ferramenta pra quem chega na equipe |
| `/entrar` | A porta do sistema, com Google, usuário e senha |
| `/como-usar` | O que já funciona, o que falta ligar e onde cada coisa encaixa |
| `/app` | A tela inicial, com as áreas do sistema |
| `/app/perguntas` | O aluno escolhe o conteúdo e responde antes de ver a resposta |
| `/app/conteudos` | O professor cola o material e gera as perguntas dele |
| `/app/baralhos` | Os baralhos montados, e a revisão carta a carta |
| `/app/respostas` | O que continuou errado, pra ajustar a pergunta ou o material |
| `/app/desafio` | O guia de refinamento deste app |
| `/app/configuracoes` | Design system, dados de exemplo e perfil |

---

## A árvore de pastas

```
.claude/launch.json          configuração do servidor de desenvolvimento
.storybook/                  o catálogo de componentes, com os tokens injetados
banco/schema.sql             o desenho da tabela que o app cria sozinho no Neon
n8n/                         o n8n pronto pra subir, com dois exemplos no README
public/                      arquivos públicos do projeto
design-system.json           cor, tipografia e raio. Muda aqui, muda tudo
.env.example                 o modelo comentado das chaves, sem valor nenhum

src/app/
  page.tsx                   o site da raiz
  entrar/                    a porta do sistema
  como-usar/                 o mapa do que já funciona e do que falta ligar
  app/                       tudo que fica atrás da sessão
    layout.tsx               a casca: menu, botão de sair e trava de sessão
    page.tsx                 o início
    perguntas/               responder antes de ver a resposta
    conteudos/               colar o material e gerar as perguntas
    baralhos/                os baralhos e a revisão carta a carta
    respostas/               o que continuou errado
    desafio/                 o guia de refinamento
    configuracoes/           design system, dados de exemplo e perfil
  api/                       as rotas de servidor: sessão, dados e diagnóstico
  globals.css                os tokens em CSS e a camada de acabamento

src/components/
  ui/                        os treze primitivos, escritos à mão, com stories
  app/                       os componentes de cada tela do sistema
  marketing/                 as dobras do site, uma por arquivo
  auth/                      a tela de entrar e o passo a passo do Google
  como-usar/                 os blocos da página Como usar
  onboarding/                o tour da primeira visita

src/content/
  site.ts                    TODA a copy do produto, num arquivo só
  tour.ts                    as cinco paradas do tour

src/lib/
  types.ts                   o modelo de dados
  modelo.ts                  o vocabulário do modelo, num lugar só
  store.ts                   a única porta de dados: navegador ou Postgres
  seed.ts                    o material de exemplo
  perguntas-geradas.ts       as perguntas que a geração devolve hoje
  banco.ts                   a conversa com o Postgres, desligada
  google.ts                  o fluxo OAuth inteiro, desligado
  sessao-servidor.ts         o cookie assinado da sessão
  design-system.ts           os tokens do JSON viram variáveis CSS
  design-systems.json        o catálogo de 71 identidades da tela de ajustes
  tema.ts                    a prévia de tema, derivando o que falta no catálogo
  contraste.ts               o cálculo de contraste WCAG
  formato.ts                 data, hora e texto em pt-BR, sem erro de fuso
  semente.ts                 o hash do nome que decide o cenário do site
  cn.ts                      o merge de classe que conhece os três raios
```
