"use client"

import Link from "next/link"
import { use, useMemo } from "react"
import { Icone } from "@/components/app/icone"
import { Revisao } from "@/components/app/baralhos/revisao"
import { BotaoLink } from "@/components/marketing/botao-link"
import { EstadoVazio } from "@/components/ui"
import { sistema } from "@/content/site"
import { useDados } from "@/lib/store"

const textos = sistema.baralhos.revisao

/**
 * A tela de revisar um baralho.
 *
 * Ela é fina de propósito: acha o baralho, monta a fila de cartas e entrega
 * pro componente de revisão. A carta que aponta pra uma pergunta que não existe
 * mais é pulada aqui, e não lá dentro, porque isso é conserto de dado, não é
 * assunto de quem desenha a interação.
 */
export default function PaginaRevisarBaralho({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const { dados, carregando } = useDados()

  const baralho = dados.baralhos.find((atual) => atual.id === id) ?? null

  const cartas = useMemo(() => {
    if (!baralho) return []
    const porId = new Map(dados.perguntas.map((pergunta) => [pergunta.id, pergunta]))
    return baralho.perguntaIds
      .map((perguntaId) => porId.get(perguntaId))
      .filter((pergunta) => pergunta !== undefined)
  }, [baralho, dados.perguntas])

  if (!baralho) {
    // Enquanto o store carrega, ninguém some: só depois que os dados chegaram é
    // que "não achei" quer dizer alguma coisa.
    if (carregando) return null

    return (
      <div className="superficie rounded-ds-surface border border-hairline">
        <EstadoVazio
          icone={<Icone nome="baralho" />}
          titulo={textos.vazio.titulo}
          texto={textos.vazio.texto}
          acao={
            <BotaoLink href="/app/baralhos" variante="secundaria">
              {textos.voltar}
            </BotaoLink>
          }
        />
      </div>
    )
  }

  return (
    <>
      <div className="mb-6 flex flex-col gap-2 border-b border-hairline pb-5">
        <Link
          href="/app/baralhos"
          className="-mx-2 inline-flex w-fit items-center gap-1.5 rounded-ds px-2 py-1.5 text-[13px] text-muted transition-colors hover:text-ink pointer-coarse:min-h-11"
        >
          <Icone nome="seta-esquerda" className="size-4" />
          {textos.voltar}
        </Link>

        <h1 className="text-xl text-ink sm:text-2xl">{baralho.nome}</h1>
      </div>

      <Revisao baralho={baralho} cartas={cartas} />
    </>
  )
}
