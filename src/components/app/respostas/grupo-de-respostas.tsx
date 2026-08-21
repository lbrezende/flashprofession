"use client"

import Link from "next/link"
import { useState } from "react"
import { Icone } from "@/components/app/icone"
import { SeloDoResultado } from "@/components/app/perguntas/cartao-pergunta"
import { Button, Card, Confirmar } from "@/components/ui"
import { sistema } from "@/content/site"
import type { Conteudo, Pergunta } from "@/lib/types"

const textos = sistema.respostas

type PropsGrupoDeRespostas = {
  conteudo: Conteudo
  /** As perguntas deste conteúdo, já ordenadas com as erradas na frente. */
  perguntas: Pergunta[]
  aoAjustar: (pergunta: Pergunta) => void
  aoZerar: (conteudoId: string) => void
}

/**
 * Um conteúdo com o retrato do que a turma respondeu.
 *
 * O resumo é uma frase, e não um cartão de número grande: o que decide o que
 * fazer aqui é "quais perguntas continuam erradas", e a resposta pra isso é a
 * lista logo abaixo. Um indicador em cima dela seria o mesmo dado contado duas
 * vezes, ocupando o lugar do que se lê de verdade.
 */
export function GrupoDeRespostas({
  conteudo,
  perguntas,
  aoAjustar,
  aoZerar,
}: PropsGrupoDeRespostas) {
  const [confirmandoZerar, setConfirmandoZerar] = useState(false)

  const erradas = perguntas.filter((pergunta) => pergunta.resultado === "errei").length
  const temMarcacao = perguntas.some((pergunta) => pergunta.resultado !== null)

  return (
    <Card className="flex flex-col gap-4 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-display text-[15px] leading-snug text-ink">{conteudo.titulo}</h2>
          <p className="mt-1 text-sm text-muted">
            {erradas > 0
              ? textos.resumoDoConteudo
                  .replace("{erradas}", String(erradas))
                  .replace("{total}", String(perguntas.length))
              : textos.tudoCerto.replace("{total}", String(perguntas.length))}
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <Link
            href="/app/conteudos"
            className="-mx-2 inline-flex items-center gap-1.5 rounded-ds px-2 py-1.5 text-[13px] text-muted transition-colors hover:text-ink pointer-coarse:min-h-11"
          >
            <Icone nome="conteudo" className="size-4" />
            {textos.abrirConteudo}
          </Link>

          {temMarcacao && (
            <Button
              variante="fantasma"
              tamanho="sm"
              onClick={() => setConfirmandoZerar(true)}
              aria-label={`${textos.zerar}: ${conteudo.titulo}`}
              iconeEsquerda={<Icone nome="restaurar" />}
            >
              {textos.zerar}
            </Button>
          )}
        </div>
      </div>

      <ul className="flex flex-col gap-2">
        {perguntas.map((pergunta) => (
          <li
            key={pergunta.id}
            className="superficie-elevada flex flex-wrap items-start gap-x-3 gap-y-2 rounded-ds-fine border border-hairline px-3 py-2.5"
          >
            <div className="min-w-[14rem] flex-1">
              <p className="text-sm text-ink">{pergunta.enunciado}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-muted">{pergunta.resposta}</p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <SeloDoResultado resultado={pergunta.resultado} />
              <Button
                variante="fantasma"
                tamanho="sm"
                onClick={() => aoAjustar(pergunta)}
                aria-label={`${textos.ajustar}: ${pergunta.enunciado}`}
                iconeEsquerda={<Icone nome="paleta" />}
              >
                {textos.ajustar}
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <Confirmar
        aberto={confirmandoZerar}
        titulo={textos.confirmarZerar.titulo}
        texto={textos.confirmarZerar.texto}
        rotuloConfirmar={textos.confirmarZerar.confirmar}
        aoCancelar={() => setConfirmandoZerar(false)}
        aoConfirmar={() => {
          setConfirmandoZerar(false)
          aoZerar(conteudo.id)
        }}
      />
    </Card>
  )
}
