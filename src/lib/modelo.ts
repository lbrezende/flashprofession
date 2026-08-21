import type { Resultado } from "./types"

/**
 * O vocabulário do modelo, num lugar só.
 *
 * Nenhum componente escreve "acertei" ou "errei" na mão. Quando um resultado
 * novo aparecer (ou um sumir), um nome solto dentro de um filtro não daria
 * erro nenhum: o app só passaria a contar errado, calado. Aqui ele dá erro de
 * tipo na hora.
 */

/** As coleções que o app guarda. A ordem é a ordem em que elas aparecem. */
export const COLECOES = ["conteudos", "perguntas", "baralhos"] as const
export type NomeDeColecao = (typeof COLECOES)[number]

/** Lista aberta: um resultado novo entra aqui e o resto do app acompanha. */
export const RESULTADOS = ["acertei", "errei"] as const

/** O resultado que significa "essa eu já sei", ou seja, revisão encerrada. */
export const RESULTADO_QUE_ENCERRA: Resultado = "acertei"

/** A forma de ver escolhida pra cada coleção. Decidida no DECISOES.md. */
export const FORMA_DE_VER = {
  conteudos: "lista-agrupada-por-disciplina",
  perguntas: "lista-com-resposta-revelavel",
  baralhos: "fila-de-acao-e-carta-unica",
} as const

/** Uma pergunta ainda não respondida. É o estado de quase toda pergunta nova. */
export function aindaNaoRevisada(resultado: Resultado | null) {
  return resultado === null
}
