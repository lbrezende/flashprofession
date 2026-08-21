"use client"

import { useRef, useState, type FormEvent, type RefObject } from "react"
import { Input, Textarea } from "@/components/ui"
import { sistema } from "@/content/site"
import type { Pergunta } from "@/lib/types"

const textos = sistema.pergunta.formulario

/** O que o formulário devolve. O resultado da revisão não se edita à mão. */
export type ValoresPergunta = Pick<Pergunta, "enunciado" | "resposta">

type Erros = Partial<Record<keyof ValoresPergunta, string>>

function validar(valores: ValoresPergunta): Erros {
  const erros: Erros = {}
  if (!valores.enunciado.trim()) erros.enunciado = textos.erros.enunciado
  if (!valores.resposta.trim()) erros.resposta = textos.erros.resposta
  return erros
}

type PropsFormularioPergunta = {
  /** Id do `<form>`, para o botão de enviar morar no rodapé do diálogo. */
  id: string
  pergunta: Pergunta
  aoEnviar: (valores: ValoresPergunta) => void
  refEnunciado?: RefObject<HTMLInputElement | null>
}

export function FormularioPergunta({
  id,
  pergunta,
  aoEnviar,
  refEnunciado,
}: PropsFormularioPergunta) {
  const [valores, setValores] = useState<ValoresPergunta>(() => ({
    enunciado: pergunta.enunciado,
    resposta: pergunta.resposta,
  }))
  const [erros, setErros] = useState<Erros>({})
  const [jaTentou, setJaTentou] = useState(false)

  const refEnunciadoInterno = useRef<HTMLInputElement>(null)
  const refResposta = useRef<HTMLTextAreaElement>(null)
  const refDoEnunciado = refEnunciado ?? refEnunciadoInterno

  function mudar<Campo extends keyof ValoresPergunta>(campo: Campo, valor: string) {
    const proximos = { ...valores, [campo]: valor }
    setValores(proximos)
    // Antes do primeiro envio ninguém é corrigido no meio da digitação.
    if (jaTentou) setErros(validar(proximos))
  }

  function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    setJaTentou(true)

    const encontrados = validar(valores)
    setErros(encontrados)

    if (encontrados.enunciado || encontrados.resposta) {
      // Sem levar o foco, quem navega por teclado fica sem saber para onde voltar.
      const primeiro = encontrados.enunciado ? refDoEnunciado : refResposta
      primeiro.current?.focus()
      return
    }

    aoEnviar({ enunciado: valores.enunciado.trim(), resposta: valores.resposta.trim() })
  }

  return (
    <form id={id} onSubmit={enviar} noValidate className="flex flex-col gap-4">
      <Input
        ref={refDoEnunciado}
        rotulo={textos.campos.enunciado}
        obrigatorio
        erro={erros.enunciado}
        value={valores.enunciado}
        onChange={(evento) => mudar("enunciado", evento.target.value)}
        placeholder={textos.exemploEnunciado}
      />

      <Textarea
        ref={refResposta}
        rotulo={textos.campos.resposta}
        obrigatorio
        erro={erros.resposta}
        ajuda={textos.ajudaResposta}
        value={valores.resposta}
        onChange={(evento) => mudar("resposta", evento.target.value)}
        placeholder={textos.exemploResposta}
        rows={4}
      />
    </form>
  )
}
