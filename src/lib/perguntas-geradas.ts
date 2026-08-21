/**
 * As perguntas que a geração automática devolve.
 *
 * ISTO NÃO É INTELIGÊNCIA ARTIFICIAL RODANDO. É conteúdo escrito à mão, aqui
 * dentro, para o botão "Gerar perguntas" funcionar de verdade desde o primeiro
 * minuto em vez de nascer como um "em breve" que ninguém clica. A tela diz isso
 * com todas as letras embaixo do resultado, e o modal ao lado ensina a ligar
 * uma API de verdade.
 *
 * COMO A ESCOLHA FUNCIONA. Cada conjunto tem PISTAS: palavras que costumam
 * aparecer num texto daquele assunto. Se o material colado tiver uma das pistas,
 * sai o conjunto daquele assunto, e a geração parece que leu o texto, porque
 * nesse caso ela leu mesmo, do jeito mais simples possível. Sem pista nenhuma,
 * sorteia entre os conjuntos que ainda não saíram nesta sessão, pra duas
 * colagens seguidas não devolverem a mesma coisa.
 *
 * Quando a chave da OpenAI entrar no `.env.local` e a rota de servidor for
 * escrita, é este módulo que sai e a resposta de verdade entra no lugar. As
 * telas não mudam: elas pedem perguntas e recebem perguntas.
 */

import { chaveDeBusca } from "./formato"

export type PerguntaGerada = {
  enunciado: string
  resposta: string
}

type Conjunto = {
  id: string
  pistas: string[]
  perguntas: PerguntaGerada[]
}

const CONJUNTOS: Conjunto[] = [
  {
    id: "revolucao-francesa",
    pistas: ["revolução francesa", "bastilha", "robespierre", "napoleão", "estados gerais"],
    perguntas: [
      {
        enunciado: "Que grupo social convocado em 1789 estava sem voz proporcional nos Estados Gerais?",
        resposta: "O Terceiro Estado, que era a maioria da população e tinha o mesmo peso de voto dos outros dois.",
      },
      {
        enunciado: "O que a Declaração dos Direitos do Homem e do Cidadão estabeleceu?",
        resposta: "Liberdade, igualdade perante a lei e direito de propriedade como princípios do novo regime.",
      },
      {
        enunciado: "Por que o período do Terror recebeu esse nome?",
        resposta: "Pelas execuções em massa de opositores durante a Convenção Nacional, sob o Comitê de Salvação Pública.",
      },
      {
        enunciado: "Qual golpe encerra o Diretório e abre a era napoleônica?",
        resposta: "O Golpe do 18 Brumário, em novembro de 1799.",
      },
    ],
  },
  {
    id: "fotossintese",
    pistas: ["fotossíntese", "cloroplasto", "mitocôndria", "atp", "respiração celular", "krebs"],
    perguntas: [
      {
        enunciado: "Quais são os reagentes e os produtos da fotossíntese?",
        resposta: "Entram gás carbônico, água e luz. Saem glicose e oxigênio.",
      },
      {
        enunciado: "Qual é a diferença entre a fase clara e a fase escura?",
        resposta: "A fase clara depende de luz e ocorre nos tilacoides; a fase escura fixa o carbono no estroma, pelo ciclo de Calvin.",
      },
      {
        enunciado: "Onde acontece a glicólise?",
        resposta: "No citoplasma, antes de o piruvato entrar na mitocôndria.",
      },
      {
        enunciado: "Por que a respiração celular é chamada de processo inverso da fotossíntese?",
        resposta: "Porque ela quebra a glicose usando oxigênio e libera gás carbônico, água e energia.",
      },
    ],
  },
  {
    id: "funcao-quadratica",
    pistas: ["função", "parábola", "bhaskara", "delta", "equação", "vértice", "raízes"],
    perguntas: [
      {
        enunciado: "O que acontece com a parábola quando o coeficiente a é negativo?",
        resposta: "Ela abre para baixo, e o vértice passa a ser o ponto de máximo da função.",
      },
      {
        enunciado: "Como se calcula o delta, e o que ele informa?",
        resposta: "Delta é b² menos 4ac, e o sinal dele diz quantas raízes reais a equação tem.",
      },
      {
        enunciado: "Onde a parábola corta o eixo y?",
        resposta: "No ponto em que x vale zero, ou seja, no valor do coeficiente c.",
      },
      {
        enunciado: "Como se encontra o vértice da parábola?",
        resposta: "A coordenada x é menos b sobre 2a, e a coordenada y é o valor da função nesse ponto.",
      },
    ],
  },
  {
    id: "climas",
    pistas: ["clima", "chuva", "massa de ar", "semiárido", "amazônia", "relevo", "vegetação"],
    perguntas: [
      {
        enunciado: "Por que o clima equatorial é úmido o ano inteiro?",
        resposta: "Pela alta incidência solar constante e pela evapotranspiração da floresta, que devolve umidade para a atmosfera.",
      },
      {
        enunciado: "O que diferencia o tropical do tropical de altitude?",
        resposta: "A altitude derruba a temperatura média, então o segundo tem verões mais amenos e invernos mais frios.",
      },
      {
        enunciado: "Que característica da chuva define o semiárido?",
        resposta: "Ela é escassa e, principalmente, irregular: pode concentrar o ano inteiro em poucos dias.",
      },
      {
        enunciado: "Qual clima brasileiro tem as quatro estações bem marcadas?",
        resposta: "O subtropical, no Sul do país.",
      },
    ],
  },
  {
    id: "modernismo",
    pistas: ["modernismo", "semana de arte", "oswald", "mário de andrade", "manifesto", "verso livre"],
    perguntas: [
      {
        enunciado: "Contra o que a primeira geração modernista se rebelou?",
        resposta: "Contra o parnasianismo e a linguagem rebuscada, trocando a métrica fixa pelo verso livre e pela fala brasileira.",
      },
      {
        enunciado: "Qual é a ideia central do Manifesto Antropófago?",
        resposta: "Devorar a cultura estrangeira e digeri-la em algo próprio, em vez de imitá-la.",
      },
      {
        enunciado: "Que obra de Mário de Andrade é considerada a rapsódia do herói sem nenhum caráter?",
        resposta: "Macunaíma.",
      },
      {
        enunciado: "Que ano marca o fim da primeira geração e o começo da segunda?",
        resposta: "1930.",
      },
    ],
  },
  {
    id: "brasil-republica",
    pistas: ["república", "getúlio", "vargas", "estado novo", "ditadura", "1964", "constituição"],
    perguntas: [
      {
        enunciado: "O que foi a política do café com leite?",
        resposta: "O revezamento na presidência entre as oligarquias de São Paulo e de Minas Gerais durante a República Velha.",
      },
      {
        enunciado: "Que medidas trabalhistas marcaram o governo Vargas?",
        resposta: "A carteira de trabalho, o salário mínimo, a jornada de oito horas e a consolidação das leis do trabalho.",
      },
      {
        enunciado: "O que caracterizou o Estado Novo?",
        resposta: "Um regime autoritário, com censura, fechamento do Congresso e concentração de poder no Executivo.",
      },
      {
        enunciado: "Qual foi o papel dos Atos Institucionais depois de 1964?",
        resposta: "Eles suspenderam direitos políticos e deram poderes excepcionais ao governo militar, fora da Constituição.",
      },
    ],
  },
  {
    id: "quimica-geral",
    pistas: ["átomo", "ligação", "molécula", "reação", "mol", "tabela periódica", "iônica"],
    perguntas: [
      {
        enunciado: "O que diferencia uma ligação iônica de uma covalente?",
        resposta: "Na iônica há transferência de elétrons entre os átomos; na covalente eles são compartilhados.",
      },
      {
        enunciado: "O que a massa molar representa?",
        resposta: "A massa, em gramas, de um mol da substância, ou seja, de 6,02 × 10²³ entidades dela.",
      },
      {
        enunciado: "Como o número atômico organiza a tabela periódica?",
        resposta: "Os elementos ficam em ordem crescente de prótons, o que faz as propriedades se repetirem em períodos.",
      },
      {
        enunciado: "O que balancear uma equação química garante?",
        resposta: "Que a quantidade de átomos de cada elemento seja a mesma antes e depois da reação.",
      },
    ],
  },
  {
    id: "gramatica",
    pistas: ["oração", "sujeito", "predicado", "crase", "concordância", "verbo", "sintaxe"],
    perguntas: [
      {
        enunciado: "Quando ocorre crase?",
        resposta: "Na fusão da preposição a com o artigo a, ou com o a inicial dos pronomes aquele, aquela e aquilo.",
      },
      {
        enunciado: "O que é uma oração subordinada substantiva?",
        resposta: "Aquela que exerce, dentro do período, a função de um substantivo: sujeito, objeto ou complemento.",
      },
      {
        enunciado: "Qual é a regra de concordância do verbo com sujeito composto posposto?",
        resposta: "O verbo pode ir para o plural ou concordar com o núcleo mais próximo.",
      },
      {
        enunciado: "Como se identifica o sujeito de uma oração?",
        resposta: "Perguntando quem pratica ou sofre a ação expressa pelo verbo, e conferindo a concordância.",
      },
    ],
  },
]

/**
 * Os conjuntos que já saíram nesta sessão.
 *
 * Fica em memória de propósito: recarregar a página é começar de novo, e
 * gravar isso no navegador seria guardar um detalhe de simulação como se fosse
 * dado da pessoa.
 */
const jaSairam = new Set<string>()

/**
 * Devolve um punhado de perguntas para o texto colado.
 *
 * Primeiro procura assunto: se o texto fala de fotossíntese, saem perguntas de
 * fotossíntese. Sem assunto reconhecido, sorteia entre os que ainda não
 * apareceram, e só recomeça quando todos já tiverem saído uma vez.
 */
export function gerarPerguntas(texto: string): PerguntaGerada[] {
  const chave = chaveDeBusca(texto)

  const porAssunto = CONJUNTOS.find((conjunto) =>
    conjunto.pistas.some((pista) => chave.includes(chaveDeBusca(pista)))
  )
  if (porAssunto) {
    jaSairam.add(porAssunto.id)
    return porAssunto.perguntas
  }

  const disponiveis = CONJUNTOS.filter((conjunto) => !jaSairam.has(conjunto.id))
  const fila = disponiveis.length > 0 ? disponiveis : CONJUNTOS
  if (disponiveis.length === 0) jaSairam.clear()

  const escolhido = fila[Math.floor(Math.random() * fila.length)]
  jaSairam.add(escolhido.id)
  return escolhido.perguntas
}
