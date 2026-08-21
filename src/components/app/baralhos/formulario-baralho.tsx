"use client"

import { useRef, useState, type FormEvent, type RefObject } from "react"
import { Input } from "@/components/ui"
import { sistema } from "@/content/site"
import type { Baralho, Conteudo, Pergunta } from "@/lib/types"

const textos = sistema.baralhos.formulario

export type ValoresBaralho = Pick<Baralho, "nome" | "perguntaIds">

type Erros = Partial<Record<"nome" | "perguntas", string>>

function validar(valores: ValoresBaralho): Erros {
  const erros: Erros = {}
  if (!valores.nome.trim()) erros.nome = textos.erros.nome
  if (valores.perguntaIds.length === 0) erros.perguntas = textos.erros.perguntas
  return erros
}

type PropsFormularioBaralho = {
  id: string
  baralho?: Baralho
  /** Tudo que existe pra escolher, com o conteúdo de origem de cada uma. */
  perguntas: Pergunta[]
  conteudos: Conteudo[]
  aoEnviar: (valores: ValoresBaralho) => void
  refNome?: RefObject<HTMLInputElement | null>
}

/**
 * Nome do baralho e as cartas que entram nele.
 *
 * As perguntas aparecem agrupadas pelo conteúdo de origem, com caixa de marcar
 * nativa: é uma escolha múltipla sobre uma lista curta, e caixa de marcar é
 * exatamente o controle que o teclado, o leitor de tela e o dedo já conhecem.
 * Uma lista de arrastar aqui seria mais bonita e pior de usar.
 */
export function FormularioBaralho({
  id,
  baralho,
  perguntas,
  conteudos,
  aoEnviar,
  refNome,
}: PropsFormularioBaralho) {
  const [valores, setValores] = useState<ValoresBaralho>(() => ({
    nome: baralho?.nome ?? "",
    perguntaIds: baralho?.perguntaIds ?? [],
  }))
  const [erros, setErros] = useState<Erros>({})
  const [jaTentou, setJaTentou] = useState(false)

  const refNomeInterno = useRef<HTMLInputElement>(null)
  const refDoNome = refNome ?? refNomeInterno

  const marcadas = new Set(valores.perguntaIds)

  const grupos = conteudos
    .map((conteudo) => ({
      conteudo,
      perguntas: perguntas.filter((pergunta) => pergunta.conteudoId === conteudo.id),
    }))
    .filter((grupo) => grupo.perguntas.length > 0)

  function trocar(proximos: ValoresBaralho) {
    setValores(proximos)
    if (jaTentou) setErros(validar(proximos))
  }

  function alternar(perguntaId: string) {
    const proximos = marcadas.has(perguntaId)
      ? valores.perguntaIds.filter((atual) => atual !== perguntaId)
      : [...valores.perguntaIds, perguntaId]
    trocar({ ...valores, perguntaIds: proximos })
  }

  function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    setJaTentou(true)

    const encontrados = validar(valores)
    setErros(encontrados)

    if (encontrados.nome) {
      refDoNome.current?.focus()
      return
    }
    if (encontrados.perguntas) return

    aoEnviar({ nome: valores.nome.trim(), perguntaIds: valores.perguntaIds })
  }

  if (grupos.length === 0) {
    return (
      <form id={id} onSubmit={(evento) => evento.preventDefault()} noValidate>
        <p className="text-sm leading-relaxed text-muted">{textos.semPerguntas}</p>
      </form>
    )
  }

  return (
    <form id={id} onSubmit={enviar} noValidate className="flex flex-col gap-5">
      <Input
        ref={refDoNome}
        rotulo={textos.nome}
        obrigatorio
        erro={erros.nome}
        value={valores.nome}
        onChange={(evento) => trocar({ ...valores, nome: evento.target.value })}
        placeholder={textos.exemploNome}
      />

      <fieldset className="flex flex-col gap-1.5">
        <legend className="text-[13px] font-medium text-ink">{textos.escolher}</legend>

        {erros.perguntas ? (
          <p role="alert" className="text-[13px] text-danger">
            {erros.perguntas}
          </p>
        ) : (
          <p className="text-[13px] leading-relaxed text-muted">{textos.ajudaEscolher}</p>
        )}

        <div className="mt-1.5 flex flex-col gap-4">
          {grupos.map((grupo) => (
            <div key={grupo.conteudo.id}>
              <p className="mb-1.5 text-[11px] font-medium tracking-wide text-muted uppercase">
                {grupo.conteudo.titulo}
              </p>

              <ul className="flex flex-col gap-1.5">
                {grupo.perguntas.map((pergunta) => (
                  <li key={pergunta.id}>
                    <label className="superficie-elevada flex cursor-pointer items-start gap-2.5 rounded-ds-fine border border-hairline px-3 py-2.5 text-sm text-ink transition-colors hover:border-primary/40 has-[:focus-visible]:border-primary pointer-coarse:min-h-11">
                      <input
                        type="checkbox"
                        checked={marcadas.has(pergunta.id)}
                        onChange={() => alternar(pergunta.id)}
                        className="mt-0.5 size-4 shrink-0 accent-[var(--ds-primary)]"
                      />
                      <span className="min-w-0">{pergunta.enunciado}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Anunciado a cada marcação: sem isso, quem usa leitor de tela marca
            cinco cartas e não sabe em quantas está. */}
        <p aria-live="polite" className="mt-1 text-[13px] text-muted">
          {valores.perguntaIds.length} {textos.selecionadas}
        </p>
      </fieldset>
    </form>
  )
}
