# Decisões

O que foi decidido ao construir o Vira Pergunta, e por quê. Uma linha por
decisão, pra quem abrir o projeto depois não precisar adivinhar.

---

## O produto

**O nome.** Vira Pergunta. É literalmente o que o app faz, e é a palavra que
apareceu no briefing ("ele vira as perguntas que eu tenho que responder").

**Os momentos que ele resolve**, e as telas que saíram de cada um:

| Momento | Tela |
| --- | --- |
| Aluno, assim que abre o app: "ver as perguntas geradas a partir do conteúdo selecionado" | `/app/perguntas` |
| Professor, no início do planejamento semanal: "organizar o conteúdo de forma rápida e eficaz" | `/app/conteudos` |
| Aluno, no dia da prova: "revisar o conteúdo usando o baralho de cartões com perguntas" | `/app/baralhos` e `/app/baralhos/[id]` |
| Professor, após a correção de provas: "avaliar as respostas dos alunos e ajustar o conteúdo do app" | `/app/respostas` |

---

## As coleções e a forma de ver de cada uma

**conteúdo** (o conteúdo, os conteúdos). Campos: título, disciplina, tema, texto
colado e data de criação.
Forma escolhida: **lista curta agrupada por disciplina**, sem busca e sem filtro.
Serve o momento *"organizar o conteúdo de forma rápida e eficaz"*: quem prepara
aula pensa por matéria, e uma lista corrida faria a pessoa montar esse
agrupamento de cabeça toda vez que abrisse a tela.
Considerei e descartei: **tabela** (o uso acontece muito no celular, e tabela em
375 pixels vira rolagem horizontal); **lista com busca** (o volume declarado é de
poucos conteúdos por semana, e busca sobre doze cartões é enfeite ocupando o
lugar do que importa).

**pergunta** (a pergunta, as perguntas). Campos: enunciado, resposta, de qual
conteúdo veio, resultado da última revisão e data de criação.
Forma escolhida: **lista com a resposta escondida atrás de um botão**, com um
seletor de conteúdo no topo. Serve o momento *"ver as perguntas geradas a partir
do conteúdo selecionado"*, e o seletor é literalmente o "selecionado" da frase.
Esconder a resposta não é enfeite: ler a resposta junto com a pergunta é o jeito
mais rápido de achar que se sabe uma coisa que não se sabe.
Considerei e descartei: **galeria de cartões** (não há imagem, e o que
identifica uma pergunta é o texto dela); **quadro por etapas** (ver abaixo).

**baralho** (o baralho, os baralhos). Campos: nome e as perguntas escolhidas.
Forma escolhida: **fila de ação** na listagem, com uma ação principal só
(revisar), e **carta única** na revisão. Serve o momento *"revisar o conteúdo
usando o baralho de cartões com perguntas"*: no dia da prova a pessoa não quer
administrar baralho, quer começar.
Considerei e descartei: **lista com etiqueta** (seria "baralho" no nome e lista
no comportamento, que é o jeito mais rápido de entregar um app parecido com
todos os outros); **calendário** (não existe hora marcada em lugar nenhum deste
app).

**Os estados.** Só a pergunta tem, e são dois mais a ausência: `acertei`,
`errei` e nulo, que quer dizer "ainda não revisada". Eles saem do momento da
revisão e do "acompanhar o progresso de estudos" da lista de funcionalidades.
Nenhum deles foi batizado por mim: são o que a pessoa marca na carta.

**O portão do quadro por etapas reprovou**, e por isso não existe quadro, nem
arrastar cartão entre colunas, nem ícone de kanban no menu. O briefing não
nomeia nenhuma etapa dentro de um momento, e uma pergunta não fica parada dias
em cada estado: ela é respondida numa sessão de revisão inteira.

**O portão do painel de abertura reprovou duas vezes.** Nenhum momento é "olhar
o resumo pra decidir o que fazer", o volume declarado é de poucos itens por
semana, e a linha do que o briefing NÃO quer diz "não quero relatórios
detalhados, foco é na prática". Por isso não existe cartão de métrica, gráfico
nem contagem em destaque em lugar nenhum do app. Onde a informação de quantidade
é necessária (quantas continuam erradas num conteúdo), ela é uma frase, porque a
decisão que ela apoia é sobre a lista logo abaixo dela.

**Duas coisas pedidas moram na mesma tela**, e está anotado aqui como o passo 6
manda: a funcionalidade *"acompanhar o progresso de estudos e revisar o conteúdo
respondido"* e o momento *"avaliar as respostas dos alunos e ajustar o conteúdo
do app"* são a mesma tela, `/app/respostas`. As duas olham o mesmo dado (o que
ficou marcado nas revisões) e levam ao mesmo lugar (ajustar a pergunta ou o
material). Separar em duas telas criaria duas portas para o mesmo cômodo.

**A funcionalidade *"organizar conteúdos de acordo com as disciplinas e temas"*
não virou tela própria**: ela é a forma da tela de conteúdos. Organizar aqui é o
agrupamento, não uma ferramenta de organizar.

---

## As dobras do site, e o que cada uma carrega

| Dobra | O que ela carrega |
| --- | --- |
| Abertura | A promessa: *"Chegar na prova sabendo o que você já sabe"*, com a prévia do app ao lado |
| Como funciona | Os três passos, tirados dos momentos: colar o conteúdo, receber as perguntas, revisar no dia da prova |
| As cartas | A dobra viva: três cartas de verdade, tiradas do próprio material de exemplo do app |
| O que muda | Os três benefícios do briefing, um por cartão |

**O arranjo da dobra de abertura é o de duas colunas** (promessa à esquerda,
prévia à direita), e não o centralizado. Motivo: a promessa deste produto é
curta e a prova dele é uma CARTA, que só convence sendo vista. Lado a lado, quem
chega lê a frase e vê a carta no mesmo golpe de vista. No celular a coluna
colapsa, com a promessa antes da imagem.

**Duas dobras ficaram guardadas**, com os arquivos no projeto e sem ninguém
importando: `planos.tsx` e `time.tsx`. Este app é ferramenta interna da equipe,
então não existe preço, plano nem sócio pra apresentar. As chaves delas
continuam em `src/content/site.ts`, vazias e com o tipo declarado, porque o
TypeScript checa arquivo órfão e uma chave removida embaixo deles viraria erro de
build. Vazio ali é reserva, não é peça faltando, e nenhuma delas tem texto
inventado escrito dentro.

**Nada de prova social.** O briefing não deu número de aluno, depoimento, nota
nem logo, então nenhuma dessas coisas aparece no site. Prova social inventada é
mentira publicada com o nome de quem publicou.

---

## O cenário da dobra de abertura

**Ele é derivado, não escolhido.** `src/lib/semente.ts` calcula um hash djb2 do
nome do produto e usa pedaços diferentes dele pra decidir a família do desenho e
os parâmetros dela. Para "Vira Pergunta" o hash é 3931383165, e o que saiu foi:
família **pontilhado**, espaçamento de 32 pixels, ponto de 1,1 pixel, giro de 18
graus e 16% de tinta. Outro nome sairia com outro fundo; este nome sai sempre com
este.

**As quatro famílias são CSS puro**, sem canvas e sem three.js. A regra do
briefing permite trocar three.js por canvas quando a biblioteca pesa demais pro
que a cena pede, e aqui ela pesaria: o cenário é um plano de fundo discreto atrás
de um título, e o site é a primeira coisa que alguém abre. Consequência prática:
zero JavaScript, zero laço de render, nada que precise parar quando a dobra sai
da tela, e o título legível antes de qualquer coisa carregar.

**O tom acompanha o tema.** O design system é roxo vivo sobre fundo quase branco,
que é cor quente e amigável, então o fundo é leve e contido, com a máscara
radial apagando o padrão antes de ele chegar no texto.

---

## As animações, uma linha cada

**Virar a carta na revisão (320ms, `transform`).** Ensina que a resposta estava
atrás da pergunta o tempo todo, que é como um baralho de estudo funciona no
papel. Só `transform` no caminho crítico, então roda no compositor. Com
`prefers-reduced-motion` a troca é instantânea e o conteúdo continua inteiro.

**A barra de andamento da revisão (300ms, `width`).** Ensina que a fila está
encolhendo. É a única propriedade de layout animada no projeto, e ela mede 6
pixels de altura, então o recálculo é irrelevante. O mesmo número está escrito em
texto logo acima, no contador de cartas.

**Entrada e saída de modal e gaveta (200ms, `transform` e `opacity`).** Vêm do
andaime e ensinam de onde a peça veio e pra onde ela volta.

**Reação a toque e cursor (150ms, cor e brilho).** Vêm do andaime.

Nada roda sozinho em laço. O único `animate-` que existe no projeto é o
esqueleto de carregamento da casca e o giro do botão em estado de carregando, e
os dois somem quando a coisa carrega.

---

## O que foi pedido e a régua desaconselhava

**A geração automática de perguntas nasce funcionando, e é simulada.** O
briefing pede "colar texto e gerar perguntas automaticamente", então o botão não
podia nascer como "em breve". As respostas moram em
`src/lib/perguntas-geradas.ts`, são oito conjuntos escritos à mão sobre assuntos
de escola, e a escolha entre eles procura palavras do texto colado antes de
sortear. A tela avisa, embaixo do resultado e sempre, que a inteligência
artificial não está rodando de verdade, e o link ao lado abre o passo a passo pra
ligar. Isso não instalou biblioteca nenhuma e não chama rede nenhuma: é conteúdo,
não integração.

**O seletor de conteúdo na tela de perguntas é um filtro, e ele existe.** A régua
do tamanho desaconselha filtro num volume pequeno, mas o momento escrito no
briefing é "ver as perguntas geradas a partir do conteúdo **selecionado**": o
seletor é o pedido, não um acréscimo. Ele é um `select` nativo, mostra tudo por
padrão, anuncia a contagem em `aria-live` e tem os dois estados vazios (nunca
cadastrei nada; este conteúdo ainda não tem pergunta).

**Não existe busca em lugar nenhum**, porque ela não foi pedida e o volume
declarado é de cinco alunos por semana com um ou dois usuários.

---

## Dependências

**Nenhuma biblioteca nova entrou.** A capacidade que o briefing pede (transformar
texto em perguntas) é conteúdo hoje e vira uma chamada de rede depois, e as duas
coisas o projeto já sabe fazer com o que tem. Considerei e descartei: biblioteca
de gráfico (não existe gráfico neste app), biblioteca de animação (a única
animação que importa é uma rotação de meia volta, que é uma linha de CSS),
biblioteca de arrastar e soltar (não existe nada pra arrastar aqui).

**O brilho que segue o cursor foi considerado e descartado.** Ele custaria o
único listener do site e acenderia uma grade de cartões que já se separa bem pela
borda. Sem cursor se movendo ele não faz nada, e num site de quatro dobras curtas
o ganho não paga o JavaScript.

---

## Ajustes no motor do design system

O `PASSO 9` do briefing pede três raios e a cor de marca como tinta
(`primaryAccent`). Isso custou linhas em três arquivos que normalmente não se
tocam:

- `src/lib/design-system.ts`: os campos `primaryAccent`, `radiusSurface`,
  `radiusFine` e o bloco `layout` no tipo, e as variáveis correspondentes na
  conversão.
- `src/lib/cn.ts`: os cinco grupos de `rounded` passaram a conhecer
  `ds-surface` e `ds-fine`, senão dois cantos diferentes sobreviveriam no mesmo
  elemento.
- `src/app/globals.css`: as variáveis novas no `:root` e as utilities
  correspondentes no `@theme inline`.
- `src/lib/tema.ts`: a prévia dos 71 sistemas do catálogo agora deriva o accent
  (puxando a primária até 3:1 contra a página e contra o cartão) e a escala de
  raio, porque o catálogo traz um raio só.

**A sombra externa saiu do projeto inteiro.** A profundidade aqui é borda de 1px
em `--ds-hairline`, gradiente curto entre `surface` e `surface-elevated`, e
sombra interna. As definições de `.brilho-marca`, `.brilho-suave` e as variantes
por `filter` continuam no `globals.css` sem ninguém chamando: elas não pintam
nada, e apagar CSS do andaime não era o pedido.
