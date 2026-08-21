/**
 * O modelo de dados do Vira Pergunta.
 *
 * Ele sai dos momentos do dia de quem usa o app, e de mais nada:
 *
 *   O CONTEÚDO é o material que a pessoa cola pra estudar, guardado com a
 *   disciplina e o tema a que ele pertence. É o que o professor organiza no
 *   começo da semana.
 *
 *   A PERGUNTA nasce de um conteúdo e é o que o aluno responde. Ela guarda o
 *   resultado da última revisão, e é esse resultado que vira o progresso do
 *   aluno e o que o professor olha depois da prova pra ajustar o material.
 *
 *   O BARALHO é um punhado de perguntas escolhidas pra revisar de uma vez, no
 *   dia da prova. Ele aponta pras perguntas em vez de copiá-las: corrigir o
 *   enunciado num lugar conserta em todos os baralhos que usam aquela carta.
 *
 * A SESSÃO é a única coisa aqui que não é do assunto do app: ela existe porque
 * a tela de entrada e o botão de sair existem em qualquer produto.
 */

/**
 * O que aconteceu na última vez que a pergunta apareceu numa revisão.
 *
 * `null` é o terceiro estado e é o mais comum de todos: a pergunta existe e
 * ninguém respondeu ela ainda. Ele é ausência de dado de propósito, e não um
 * valor com nome, pra ninguém precisar "zerar" nada ao criar uma pergunta.
 */
export type Resultado = "acertei" | "errei"

export type Conteudo = {
  id: string
  titulo: string
  disciplina: string
  tema: string
  /** O texto colado, inteiro. É dele que as perguntas saem. */
  texto: string
  criadoEm: string
}

export type Pergunta = {
  id: string
  conteudoId: string
  enunciado: string
  resposta: string
  resultado: Resultado | null
  criadoEm: string
}

export type Baralho = {
  id: string
  nome: string
  /** As cartas, na ordem em que aparecem na revisão. */
  perguntaIds: string[]
  criadoEm: string
}

export type Dados = {
  conteudos: Conteudo[]
  perguntas: Pergunta[]
  baralhos: Baralho[]
}

export type Sessao = {
  nome: string
  email: string
  entrouEm: string
}
