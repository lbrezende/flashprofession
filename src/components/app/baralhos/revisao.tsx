"use client"

import { useCallback, useMemo, useState } from "react"
import { Icone } from "@/components/app/icone"
import { BotaoLink } from "@/components/marketing/botao-link"
import { Button, Card, EstadoVazio } from "@/components/ui"
import { sistema } from "@/content/site"
import { useDados } from "@/lib/store"
import type { Baralho, Pergunta, Resultado } from "@/lib/types"

const textos = sistema.baralhos.revisao

type PropsRevisao = {
  baralho: Baralho
  /** As cartas que ainda existem, na ordem do baralho. */
  cartas: Pergunta[]
}

/**
 * A revisão carta a carta: o momento do dia da prova.
 *
 * Uma pergunta de cada vez, em tela cheia, sem menu de opção do lado. Mostrar a
 * lista inteira aqui devolveria à pessoa o trabalho de escolher qual olhar,
 * bem na hora em que ela tem menos vontade de decidir qualquer coisa.
 *
 * VIRAR A CARTA é uma rotação de meia volta, e não um bloco que aparece
 * embaixo: a resposta estava atrás da pergunta o tempo todo, que é como um
 * baralho de estudo funciona no papel. Só `transform` no caminho da animação,
 * então ela roda no compositor. Quem pediu menos movimento recebe a troca
 * instantânea, pela regra global do globals.css, e não perde conteúdo nenhum.
 */
export function Revisao({ baralho, cartas }: PropsRevisao) {
  const { atualizarPergunta } = useDados()

  const [indice, setIndice] = useState(0)
  const [virada, setVirada] = useState(false)
  const [aviso, setAviso] = useState("")
  // O que foi marcado nesta passada. O store guarda o resultado de verdade;
  // isto aqui é só pra fechar a conta do fim sem reler o store no meio.
  const [marcadas, setMarcadas] = useState<Record<string, Resultado>>({})
  // Quando a pessoa pede pra revisar só as que errou, a fila encolhe para
  // estes ids. `null` quer dizer o baralho inteiro.
  const [somenteIds, setSomenteIds] = useState<string[] | null>(null)

  const fila = useMemo(
    () => (somenteIds ? cartas.filter((carta) => somenteIds.includes(carta.id)) : cartas),
    [cartas, somenteIds]
  )

  const total = fila.length
  const carta = fila[indice]
  const terminou = indice >= total

  const acertos = useMemo(
    () => Object.values(marcadas).filter((resultado) => resultado === "acertei").length,
    [marcadas]
  )

  const marcar = useCallback(
    (resultado: Resultado) => {
      if (!carta) return
      atualizarPergunta(carta.id, { resultado })
      setMarcadas((atuais) => ({ ...atuais, [carta.id]: resultado }))
      setAviso(`${textos.aviso} ${resultado === "acertei" ? textos.acertei : textos.errei}`)
      setVirada(false)
      setIndice((atual) => atual + 1)
    },
    [carta, atualizarPergunta]
  )

  /** Volta pro começo. `ids` presente encolhe a fila; ausente devolve o baralho inteiro. */
  const recomecar = useCallback((ids: string[] | null) => {
    setSomenteIds(ids)
    setMarcadas({})
    setVirada(false)
    setAviso("")
    setIndice(0)
  }, [])

  if (total === 0) {
    return (
      <div className="superficie rounded-ds-surface border border-hairline">
        <EstadoVazio
          icone={<Icone nome="baralho" />}
          titulo={textos.vazio.titulo}
          texto={textos.vazio.texto}
          acao={
            <BotaoLink href="/app/baralhos" variante="secundaria">
              {textos.vazio.acao}
            </BotaoLink>
          }
        />
      </div>
    )
  }

  if (terminou) {
    const idsErrados = Object.entries(marcadas)
      .filter(([, resultado]) => resultado === "errei")
      .map(([id]) => id)
    const errou = idsErrados.length

    return (
      <Card className="mx-auto flex max-w-[560px] flex-col items-center gap-3 p-8 text-center">
        <span
          aria-hidden="true"
          className="superficie-elevada grid size-12 place-items-center rounded-full border border-hairline text-primary-accent"
        >
          <Icone nome="acertei" className="size-5" />
        </span>

        <h2 className="font-display text-xl text-ink">{textos.fim.titulo}</h2>
        <p className="text-sm leading-relaxed text-muted">
          {textos.fim.acertos.replace("{acertos}", String(acertos)).replace("{total}", String(total))}{" "}
          {errou === 0 ? textos.fim.semErro : textos.fim.comErro}
        </p>

        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {errou > 0 && (
            <Button
              onClick={() => recomecar(idsErrados)}
              iconeEsquerda={<Icone nome="errei" />}
            >
              {textos.fim.soAsErradas}
            </Button>
          )}
          <Button
            variante={errou > 0 ? "secundaria" : "primaria"}
            onClick={() => recomecar(null)}
            iconeEsquerda={<Icone nome="restaurar" />}
          >
            {textos.fim.refazer}
          </Button>
          <BotaoLink href="/app/baralhos" variante="secundaria">
            {textos.fim.sair}
          </BotaoLink>
        </div>
      </Card>
    )
  }

  return (
    <div className="mx-auto flex w-full max-w-[560px] flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted">
          {textos.contador
            .replace("{atual}", String(indice + 1))
            .replace("{total}", String(total))}
        </p>

        {indice > 0 && (
          <Button
            variante="fantasma"
            tamanho="sm"
            onClick={() => {
              setVirada(false)
              setIndice((atual) => atual - 1)
            }}
            iconeEsquerda={<Icone nome="anterior" />}
          >
            {textos.anterior}
          </Button>
        )}
      </div>

      {/* A barra de andamento é decorativa: o contador acima já diz o mesmo em
          texto, e repetir isso no leitor de tela só atrasa quem está ouvindo. */}
      <div aria-hidden="true" className="h-1.5 w-full overflow-hidden rounded-full bg-elevated">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-300"
          style={{ width: `${Math.round((indice / total) * 100)}%` }}
        />
      </div>

      <div className={virada ? "carta carta-virada" : "carta"}>
        <button
          type="button"
          onClick={() => setVirada((atual) => !atual)}
          aria-pressed={virada}
          aria-label={virada ? textos.voltarCarta : textos.virar}
          className="carta-giro superficie-elevada block w-full rounded-ds-surface border border-hairline text-left"
        >
          <span className="carta-frente flex min-h-[240px] flex-col justify-center gap-3 p-6 sm:min-h-[280px] sm:p-8">
            <span className="text-[11px] font-medium tracking-wide text-muted uppercase">
              {textos.frente}
            </span>
            <span className="font-display text-lg leading-snug text-balance text-ink sm:text-xl">
              {carta.enunciado}
            </span>
            <span className="mt-1 flex items-center gap-1.5 text-[13px] text-muted">
              <Icone nome="virar" className="size-4" />
              {textos.dica}
            </span>
          </span>

          <span className="carta-verso flex flex-col justify-center gap-3 overflow-y-auto p-6 sm:p-8">
            <span className="text-[11px] font-medium tracking-wide text-muted uppercase">
              {textos.verso}
            </span>
            <span className="text-base leading-relaxed text-pretty text-ink">{carta.resposta}</span>
          </span>
        </button>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button
          variante="secundaria"
          tamanho="lg"
          larguraTotal
          onClick={() => marcar("errei")}
          iconeEsquerda={<Icone nome="errei" />}
        >
          {textos.errei}
        </Button>
        <Button
          tamanho="lg"
          larguraTotal
          onClick={() => marcar("acertei")}
          iconeEsquerda={<Icone nome="acertei" />}
        >
          {textos.acertei}
        </Button>
      </div>

      {/* Marcar a carta troca a tela inteira sem barulho nenhum. Esta região é
          o que conta pra quem não está olhando. */}
      <p role="status" className="sr-only">
        {aviso}
      </p>
    </div>
  )
}
