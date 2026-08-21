"use client"

import { useRef, useState, type FormEvent, type RefObject } from "react"
import { Input, Textarea } from "@/components/ui"
import { sistema } from "@/content/site"
import type { Conteudo } from "@/lib/types"

const textos = sistema.conteudos.formulario

/** O que o formulário devolve. `id` e `criadoEm` são do store, não da pessoa. */
export type ValoresConteudo = Omit<Conteudo, "id" | "criadoEm">

type CampoComErro = "titulo" | "disciplina" | "texto"
type Erros = Partial<Record<CampoComErro, string>>

const EM_BRANCO: ValoresConteudo = {
  titulo: "",
  disciplina: "",
  tema: "",
  texto: "",
}

/**
 * Validação num lugar só, rodando tanto no envio quanto na correção.
 *
 * O tema é o único campo opcional: nem toda matéria se divide em tema, e travar
 * o cadastro por causa disso atrasaria justamente quem está com pressa.
 */
function validar(valores: ValoresConteudo): Erros {
  const erros: Erros = {}

  if (!valores.titulo.trim()) erros.titulo = textos.erros.titulo
  if (!valores.disciplina.trim()) erros.disciplina = textos.erros.disciplina
  if (!valores.texto.trim()) erros.texto = textos.erros.texto

  return erros
}

type PropsFormularioConteudo = {
  /**
   * Id do `<form>`. É o que permite ao botão de enviar morar no rodapé do modal
   * ou do drawer, fora da árvore do formulário, via `<button form={id}>`.
   */
  id: string
  /** Ausente = conteúdo novo. Presente = edição, com os campos preenchidos. */
  conteudo?: Conteudo
  aoEnviar: (valores: ValoresConteudo) => void
  /** Avisa a tela de fora do texto colado agora, pra ela poder gerar em cima dele. */
  aoMudarTexto?: (texto: string) => void
  /** Para o diálogo abrir com o cursor já no primeiro campo. */
  refTitulo?: RefObject<HTMLInputElement | null>
}

export function FormularioConteudo({
  id,
  conteudo,
  aoEnviar,
  aoMudarTexto,
  refTitulo,
}: PropsFormularioConteudo) {
  const [valores, setValores] = useState<ValoresConteudo>(() =>
    conteudo
      ? {
          titulo: conteudo.titulo,
          disciplina: conteudo.disciplina,
          tema: conteudo.tema,
          texto: conteudo.texto,
        }
      : EM_BRANCO
  )
  const [erros, setErros] = useState<Erros>({})
  const [jaTentou, setJaTentou] = useState(false)

  const refTituloInterno = useRef<HTMLInputElement>(null)
  const refDisciplina = useRef<HTMLInputElement>(null)
  const refTexto = useRef<HTMLTextAreaElement>(null)
  const refDoTitulo = refTitulo ?? refTituloInterno

  function mudar<Campo extends keyof ValoresConteudo>(campo: Campo, valor: ValoresConteudo[Campo]) {
    const proximos = { ...valores, [campo]: valor }
    setValores(proximos)
    if (campo === "texto") aoMudarTexto?.(String(valor))

    // Antes do primeiro envio ninguém é corrigido no meio da digitação. Depois
    // dele, o erro sai no instante em que o campo fica válido. Esperar o próximo
    // envio pra dizer "agora está certo" é castigar quem já corrigiu.
    if (jaTentou) setErros(validar(proximos))
  }

  function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    setJaTentou(true)

    const encontrados = validar(valores)
    setErros(encontrados)

    if (encontrados.titulo || encontrados.disciplina || encontrados.texto) {
      // Mensagem na tela não basta: sem levar o foco, quem navega por teclado
      // fica sem saber para onde voltar.
      const primeiro = encontrados.titulo
        ? refDoTitulo
        : encontrados.disciplina
          ? refDisciplina
          : refTexto
      primeiro.current?.focus()
      return
    }

    aoEnviar({
      titulo: valores.titulo.trim(),
      disciplina: valores.disciplina.trim(),
      tema: valores.tema.trim(),
      texto: valores.texto.trim(),
    })
  }

  return (
    // `noValidate`: a validação é nossa, em português e por campo. Sem isso o
    // navegador interrompe antes com a bolha dele, que não segue o tema nem o texto.
    <form id={id} onSubmit={enviar} noValidate className="grid gap-4 sm:grid-cols-2">
      <Input
        ref={refDoTitulo}
        rotulo={textos.campos.titulo}
        obrigatorio
        erro={erros.titulo}
        value={valores.titulo}
        onChange={(evento) => mudar("titulo", evento.target.value)}
        placeholder={textos.exemploTitulo}
        classeCampo="sm:col-span-2"
      />

      <Input
        ref={refDisciplina}
        rotulo={textos.campos.disciplina}
        obrigatorio
        erro={erros.disciplina}
        ajuda={textos.ajudaDisciplina}
        value={valores.disciplina}
        onChange={(evento) => mudar("disciplina", evento.target.value)}
        placeholder={textos.exemploDisciplina}
      />

      <Input
        rotulo={textos.campos.tema}
        value={valores.tema}
        onChange={(evento) => mudar("tema", evento.target.value)}
        placeholder={textos.exemploTema}
      />

      <Textarea
        ref={refTexto}
        rotulo={textos.campos.texto}
        obrigatorio
        erro={erros.texto}
        ajuda={textos.ajudaTexto}
        value={valores.texto}
        onChange={(evento) => mudar("texto", evento.target.value)}
        placeholder={textos.exemploTexto}
        rows={8}
        classeCampo="sm:col-span-2"
      />
    </form>
  )
}
