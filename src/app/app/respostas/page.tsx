"use client"

import { useMemo, useRef, useState } from "react"
import { CabecalhoPagina } from "@/components/app/cabecalho-pagina"
import { Icone } from "@/components/app/icone"
import {
  FormularioPergunta,
  type ValoresPergunta,
} from "@/components/app/perguntas/formulario-pergunta"
import { GrupoDeRespostas } from "@/components/app/respostas/grupo-de-respostas"
import { BotaoLink } from "@/components/marketing/botao-link"
import { Button, Confirmar, EstadoVazio, Modal } from "@/components/ui"
import { sistema } from "@/content/site"
import { useDados } from "@/lib/store"
import type { Pergunta } from "@/lib/types"

const textos = sistema.respostas
const ID_FORMULARIO = "formulario-ajustar-resposta"

/**
 * A tela de depois da correção: o que a turma marcou e o que ainda dá pra
 * ajustar.
 *
 * Ela é agrupada por conteúdo porque a decisão que se toma aqui é sobre o
 * MATERIAL: se três perguntas do mesmo texto continuam erradas, o problema
 * provavelmente está no texto, não em quem respondeu. Uma lista corrida de
 * perguntas esconderia justamente esse padrão.
 *
 * O que ficou errado vem primeiro dentro de cada grupo, e os grupos com erro
 * vêm antes dos que estão limpos: quem abre esta tela veio atrás do que falta.
 */
export default function PaginaRespostas() {
  const { dados, atualizarPergunta, removerPergunta } = useDados()

  const [emAjuste, setEmAjuste] = useState<Pergunta | null>(null)
  const [confirmandoRemocao, setConfirmandoRemocao] = useState(false)
  const refEnunciado = useRef<HTMLInputElement>(null)

  const grupos = useMemo(() => {
    return dados.conteudos
      .map((conteudo) => ({
        conteudo,
        perguntas: dados.perguntas
          .filter((pergunta) => pergunta.conteudoId === conteudo.id)
          .sort((a, b) => peso(a) - peso(b) || a.criadoEm.localeCompare(b.criadoEm)),
      }))
      .filter((grupo) => grupo.perguntas.length > 0)
      .sort((a, b) => erradas(b) - erradas(a) || a.conteudo.titulo.localeCompare(b.conteudo.titulo))
  }, [dados.conteudos, dados.perguntas])

  function zerar(conteudoId: string) {
    for (const pergunta of dados.perguntas) {
      if (pergunta.conteudoId === conteudoId && pergunta.resultado !== null) {
        atualizarPergunta(pergunta.id, { resultado: null })
      }
    }
  }

  return (
    <>
      <CabecalhoPagina titulo={textos.titulo} descricao={textos.descricao} />

      {grupos.length === 0 ? (
        <div className="superficie rounded-ds-surface border border-hairline">
          <EstadoVazio
            icone={<Icone nome="respostas" />}
            titulo={sistema.vazios.respostas.titulo}
            texto={sistema.vazios.respostas.texto}
            acao={
              <BotaoLink href="/app/baralhos" iconeEsquerda={<Icone nome="baralho" />}>
                {sistema.vazios.respostas.acao}
              </BotaoLink>
            }
          />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {grupos.map((grupo) => (
            <GrupoDeRespostas
              key={grupo.conteudo.id}
              conteudo={grupo.conteudo}
              perguntas={grupo.perguntas}
              aoAjustar={setEmAjuste}
              aoZerar={zerar}
            />
          ))}
        </div>
      )}

      {emAjuste && (
        <Modal
          aberto
          aoFechar={() => setEmAjuste(null)}
          titulo={sistema.pergunta.formulario.tituloEditar}
          descricao={sistema.pergunta.formulario.descricaoEditar}
          refFocoInicial={refEnunciado}
          rodape={
            <>
              <Button
                variante="fantasma"
                onClick={() => setConfirmandoRemocao(true)}
                iconeEsquerda={<Icone nome="remover" />}
                className="mr-auto text-danger hover:bg-danger/10 hover:text-danger"
              >
                {sistema.pergunta.remocao.acao}
              </Button>
              <Button variante="secundaria" onClick={() => setEmAjuste(null)}>
                {sistema.acoes.cancelar}
              </Button>
              <Button type="submit" form={ID_FORMULARIO}>
                {sistema.pergunta.formulario.salvar}
              </Button>
            </>
          }
        >
          <FormularioPergunta
            key={emAjuste.id}
            id={ID_FORMULARIO}
            pergunta={emAjuste}
            refEnunciado={refEnunciado}
            aoEnviar={(valores: ValoresPergunta) => {
              atualizarPergunta(emAjuste.id, valores)
              setEmAjuste(null)
            }}
          />
        </Modal>
      )}

      <Confirmar
        aberto={confirmandoRemocao}
        titulo={sistema.pergunta.remocao.titulo}
        texto={sistema.pergunta.remocao.texto}
        rotuloConfirmar={sistema.pergunta.remocao.confirmar}
        aoCancelar={() => setConfirmandoRemocao(false)}
        aoConfirmar={() => {
          setConfirmandoRemocao(false)
          if (emAjuste) removerPergunta(emAjuste.id)
          setEmAjuste(null)
        }}
      />
    </>
  )
}

/** Errada primeiro, sem revisão depois, acertada por último. */
function peso(pergunta: Pergunta) {
  if (pergunta.resultado === "errei") return 0
  if (pergunta.resultado === null) return 1
  return 2
}

function erradas(grupo: { perguntas: Pergunta[] }) {
  return grupo.perguntas.filter((pergunta) => pergunta.resultado === "errei").length
}
