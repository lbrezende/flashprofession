import type { Dados } from "./types"

/**
 * O material de exemplo que aparece no primeiro acesso.
 *
 * Existe por um motivo de uso: um app de estudo vazio na primeira abertura
 * parece quebrado, e ninguém entende o que é um baralho de perguntas sem ver um
 * baralho de perguntas. Com conteúdo dentro, dá pra abrir uma carta, responder
 * e entender o app em dez segundos.
 *
 * A quantidade é a de uma semana de verdade deste app: cinco conteúdos, as
 * perguntas que saíram deles e dois baralhos montados pra provas próximas. Na
 * tela de configurações tem um botão que devolve tudo a este estado, e outro
 * que limpa pra ver as telas vazias.
 */
export const SEED: Dados = {
  conteudos: [
    {
      id: "con-1",
      titulo: "Revolução Francesa: as três fases",
      disciplina: "História",
      tema: "Idade Contemporânea",
      texto:
        "A Revolução Francesa começa em 1789 com a convocação dos Estados Gerais e a queda da Bastilha em 14 de julho. A primeira fase, a Assembleia Nacional Constituinte, acaba com os privilégios feudais e aprova a Declaração dos Direitos do Homem e do Cidadão. A segunda fase é a Convenção Nacional, marcada pela execução de Luís XVI, pela República e pelo Terror conduzido por Robespierre e pelo Comitê de Salvação Pública. A terceira fase é o Diretório, governo de maioria girondina, corrupto e instável, derrubado pelo Golpe do 18 Brumário, em 1799, que leva Napoleão Bonaparte ao poder.",
      criadoEm: "2026-08-10T08:15:00.000Z",
    },
    {
      id: "con-2",
      titulo: "Fotossíntese e respiração celular",
      disciplina: "Biologia",
      tema: "Metabolismo energético",
      texto:
        "Na fotossíntese, a planta usa luz, gás carbônico e água para produzir glicose e liberar oxigênio. Ela acontece no cloroplasto e tem duas etapas: a fase clara, nos tilacoides, onde a luz quebra a molécula de água e forma ATP e NADPH; e a fase escura, no estroma, onde o ciclo de Calvin fixa o carbono e monta a glicose. A respiração celular faz o caminho contrário: quebra a glicose na presença de oxigênio e libera energia. Ela ocorre em três etapas, glicólise no citoplasma, ciclo de Krebs e cadeia respiratória na mitocôndria, e o saldo é de cerca de 30 a 32 moléculas de ATP por glicose.",
      criadoEm: "2026-08-11T13:40:00.000Z",
    },
    {
      id: "con-3",
      titulo: "Função do segundo grau",
      disciplina: "Matemática",
      tema: "Funções",
      texto:
        "Uma função do segundo grau tem a forma f(x) = ax² + bx + c, com a diferente de zero. O gráfico é uma parábola: ela abre para cima quando a é positivo e para baixo quando a é negativo. As raízes são os valores de x em que a função vale zero, e saem da fórmula de Bhaskara, com delta igual a b² menos 4ac. Se delta é maior que zero há duas raízes reais distintas; se é igual a zero há uma raiz dupla; se é menor que zero não há raiz real. O vértice fica em x igual a menos b sobre 2a, e é ele que dá o valor máximo ou mínimo da função.",
      criadoEm: "2026-08-12T09:05:00.000Z",
    },
    {
      id: "con-4",
      titulo: "Climas do Brasil",
      disciplina: "Geografia",
      tema: "Climatologia",
      texto:
        "O Brasil tem seis tipos climáticos principais. O equatorial, na Amazônia, é quente e úmido o ano inteiro, com chuva acima de 2000 mm. O tropical, no Centro-Oeste e em boa parte do Sudeste, tem verão chuvoso e inverno seco. O tropical de altitude aparece nas áreas mais altas do Sudeste e tem temperaturas mais amenas. O tropical atlântico acompanha o litoral e tem chuvas trazidas pela massa Tropical Atlântica. O semiárido, no sertão nordestino, tem chuva escassa e irregular. E o subtropical, no Sul, tem as quatro estações bem definidas e chuva distribuída o ano todo.",
      criadoEm: "2026-08-13T15:20:00.000Z",
    },
    {
      id: "con-5",
      titulo: "Modernismo brasileiro: a primeira geração",
      disciplina: "Português",
      tema: "Literatura",
      texto:
        "A primeira geração modernista vai de 1922, com a Semana de Arte Moderna, até 1930. É a fase mais radical, de ruptura com o parnasianismo e com a linguagem rebuscada: verso livre, humor, paródia e o português falado no Brasil entram na literatura. Mário de Andrade escreve Pauliceia Desvairada e Macunaíma; Oswald de Andrade lança o Manifesto Pau-Brasil e o Manifesto Antropófago, que propõe devorar a cultura estrangeira e transformá-la em algo brasileiro. Manuel Bandeira, com Libertinagem, e Alcântara Machado completam o grupo.",
      criadoEm: "2026-08-14T10:00:00.000Z",
    },
  ],

  perguntas: [
    {
      id: "per-1",
      conteudoId: "con-1",
      enunciado: "Que acontecimento de 14 de julho de 1789 virou o símbolo do início da Revolução Francesa?",
      resposta: "A queda da Bastilha, a prisão que representava o poder absoluto do rei.",
      resultado: "acertei",
      criadoEm: "2026-08-10T08:16:00.000Z",
    },
    {
      id: "per-2",
      conteudoId: "con-1",
      enunciado: "O que foi o Terror, e quem conduziu esse período?",
      resposta:
        "A fase mais dura da Convenção Nacional, com execuções em massa de opositores, conduzida por Robespierre à frente do Comitê de Salvação Pública.",
      resultado: "errei",
      criadoEm: "2026-08-10T08:16:00.000Z",
    },
    {
      id: "per-3",
      conteudoId: "con-1",
      enunciado: "Como termina o Diretório, e o que vem depois dele?",
      resposta: "Termina no Golpe do 18 Brumário, em 1799, que leva Napoleão Bonaparte ao poder.",
      resultado: null,
      criadoEm: "2026-08-10T08:16:00.000Z",
    },
    {
      id: "per-4",
      conteudoId: "con-2",
      enunciado: "Onde acontece a fase clara da fotossíntese, e o que sai dela?",
      resposta: "Nos tilacoides do cloroplasto. A luz quebra a água e a etapa produz ATP e NADPH, liberando oxigênio.",
      resultado: "acertei",
      criadoEm: "2026-08-11T13:41:00.000Z",
    },
    {
      id: "per-5",
      conteudoId: "con-2",
      enunciado: "Quais são as três etapas da respiração celular e onde cada uma ocorre?",
      resposta:
        "Glicólise, no citoplasma; ciclo de Krebs e cadeia respiratória, na mitocôndria.",
      resultado: "errei",
      criadoEm: "2026-08-11T13:41:00.000Z",
    },
    {
      id: "per-6",
      conteudoId: "con-2",
      enunciado: "Qual é o saldo aproximado de ATP na respiração celular de uma molécula de glicose?",
      resposta: "Cerca de 30 a 32 moléculas de ATP.",
      resultado: null,
      criadoEm: "2026-08-11T13:41:00.000Z",
    },
    {
      id: "per-7",
      conteudoId: "con-3",
      enunciado: "O que o sinal do coeficiente a diz sobre a parábola?",
      resposta: "Se a é positivo a parábola abre para cima; se a é negativo, abre para baixo.",
      resultado: "acertei",
      criadoEm: "2026-08-12T09:06:00.000Z",
    },
    {
      id: "per-8",
      conteudoId: "con-3",
      enunciado: "O que cada valor de delta indica sobre as raízes?",
      resposta:
        "Delta maior que zero: duas raízes reais distintas. Delta igual a zero: uma raiz dupla. Delta menor que zero: nenhuma raiz real.",
      resultado: "errei",
      criadoEm: "2026-08-12T09:06:00.000Z",
    },
    {
      id: "per-9",
      conteudoId: "con-3",
      enunciado: "Como se acha a coordenada x do vértice, e para que ela serve?",
      resposta: "x igual a menos b sobre 2a. É nela que a função atinge o valor máximo ou mínimo.",
      resultado: null,
      criadoEm: "2026-08-12T09:06:00.000Z",
    },
    {
      id: "per-10",
      conteudoId: "con-4",
      enunciado: "Qual clima brasileiro tem verão chuvoso e inverno seco, e onde ele predomina?",
      resposta: "O tropical, no Centro-Oeste e em boa parte do Sudeste.",
      resultado: null,
      criadoEm: "2026-08-13T15:21:00.000Z",
    },
    {
      id: "per-11",
      conteudoId: "con-4",
      enunciado: "O que caracteriza o clima semiárido e em que região ele aparece?",
      resposta: "Chuva escassa e irregular, no sertão nordestino.",
      resultado: null,
      criadoEm: "2026-08-13T15:21:00.000Z",
    },
    {
      id: "per-12",
      conteudoId: "con-4",
      enunciado: "Por que o Sul é o único lugar do país com as quatro estações bem definidas?",
      resposta:
        "Porque o clima de lá é o subtropical, com chuva distribuída o ano todo e variação clara de temperatura entre as estações.",
      resultado: null,
      criadoEm: "2026-08-13T15:21:00.000Z",
    },
    {
      id: "per-13",
      conteudoId: "con-5",
      enunciado: "Que marco abre a primeira geração modernista, e em que ano?",
      resposta: "A Semana de Arte Moderna, em 1922.",
      resultado: "acertei",
      criadoEm: "2026-08-14T10:01:00.000Z",
    },
    {
      id: "per-14",
      conteudoId: "con-5",
      enunciado: "O que o Manifesto Antropófago propõe?",
      resposta:
        "Devorar a cultura estrangeira e transformá-la em algo brasileiro, em vez de copiá-la.",
      resultado: "errei",
      criadoEm: "2026-08-14T10:01:00.000Z",
    },
  ],

  baralhos: [
    {
      id: "bar-1",
      nome: "Prova de Humanas de sexta",
      perguntaIds: ["per-1", "per-2", "per-3", "per-13", "per-14"],
      criadoEm: "2026-08-14T11:30:00.000Z",
    },
    {
      id: "bar-2",
      nome: "Recuperação de Biologia",
      perguntaIds: ["per-4", "per-5", "per-6"],
      criadoEm: "2026-08-15T09:00:00.000Z",
    },
  ],
}
