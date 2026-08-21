"use client"

import Link from "next/link"
import { useMemo, useRef, useState } from "react"
import { CabecalhoPagina } from "@/components/app/cabecalho-pagina"
import { Icone } from "@/components/app/icone"
import { CartaoPergunta } from "@/components/app/perguntas/cartao-pergunta"
import {
  FormularioPergunta,
  type ValoresPergunta,
} from "@/components/app/perguntas/formulario-pergunta"
import { BotaoLink } from "@/components/marketing/botao-link"
import { Button, Confirmar, EstadoVazio, Modal, Select, type OpcaoSelect } from "@/components/ui"
import { palavras, sistema } from "@/content/site"
import { contar } from "@/lib/formato"
import { useDados } from "@/lib/store"
import type { Pergunta } from "@/lib/types"

const textos = sistema.perguntas
const ID_FORMULARIO = "formulario-ajustar-pergunta"

/**
 * A tela de quem abre o app pra estudar.
 *
 * Escolhe o conteúdo, vê as perguntas dele e responde de cabeça antes de virar.
 * O seletor no topo é o filtro inteiro desta tela: com poucos conteúdos por
 * semana, uma caixa de busca por cima disso seria um segundo caminho pro mesmo
 * lugar, e um a mais pra pessoa decidir.
 */
export default function PaginaPerguntas() {
  const { dados, atualizarPergunta, removerPergunta } = useDados()

  const [conteudoId, setConteudoId] = useState("todos")
  const [emAjuste, setEmAjuste] = useState<Pergunta | null>(null)
  const [confirmandoRemocao, setConfirmandoRemocao] = useState(false)
  const refEnunciado = useRef<HTMLInputElement>(null)

  const opcoes: OpcaoSelect[] = useMemo(
    () => [
      { valor: "todos", rotulo: textos.todosOsConteudos },
      ...[...dados.conteudos]
        .sort((a, b) => a.titulo.localeCompare(b.titulo))
        .map((conteudo) => ({ valor: conteudo.id, rotulo: conteudo.titulo })),
    ],
    [dados.conteudos]
  )

  const tituloPorId = useMemo(
    () => new Map(dados.conteudos.map((conteudo) => [conteudo.id, conteudo.titulo])),
    [dados.conteudos]
  )

  const visiveis = useMemo(
    () =>
      dados.perguntas
        .filter((pergunta) => conteudoId === "todos" || pergunta.conteudoId === conteudoId)
        // As que ficaram erradas vêm primeiro: é o que a pessoa precisa olhar
        // de novo, e deixar isso pra ela procurar seria devolver o trabalho.
        .sort((a, b) => peso(a) - peso(b) || b.criadoEm.localeCompare(a.criadoEm)),
    [dados.perguntas, conteudoId]
  )

  const nenhumaCadastrada = dados.perguntas.length === 0
  const filtrando = conteudoId !== "todos"

  return (
    <>
      <CabecalhoPagina titulo={textos.titulo} descricao={textos.descricao} />

      {nenhumaCadastrada ? (
        <div className="superficie rounded-ds-surface border border-hairline">
          <EstadoVazio
            icone={<Icone nome="pergunta" />}
            titulo={sistema.vazios.perguntas.titulo}
            texto={sistema.vazios.perguntas.texto}
            acao={
              <BotaoLink href="/app/conteudos" iconeEsquerda={<Icone nome="colar" />}>
                {sistema.vazios.perguntas.acao}
              </BotaoLink>
            }
          />
        </div>
      ) : (
        <>
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Select
              rotulo={textos.seletor}
              opcoes={opcoes}
              placeholder={null}
              value={conteudoId}
              onChange={(evento) => setConteudoId(evento.target.value)}
              classeCampo="sm:min-w-0 sm:max-w-sm sm:flex-1"
            />

            {/* Anunciado a cada troca do seletor: sem isso, quem usa leitor de
                tela muda o conteúdo e não recebe notícia de quantas sobraram. */}
            <p aria-live="polite" className="text-sm text-muted sm:ml-auto">
              {contar(visiveis.length, palavras.pergunta.singular, palavras.pergunta.plural)}
            </p>
          </div>

          {visiveis.length === 0 ? (
            <div className="superficie rounded-ds-surface border border-hairline">
              <EstadoVazio
                icone={<Icone nome="pergunta" />}
                titulo={textos.semResultado.titulo}
                texto={textos.semResultado.texto}
                acao={
                  <Button variante="secundaria" onClick={() => setConteudoId("todos")}>
                    {textos.semResultado.acao}
                  </Button>
                }
              />
            </div>
          ) : (
            // Duas colunas no máximo: pergunta é texto, e três colunas
            // quebrariam o enunciado palavra por palavra.
            <ul className="grid gap-3 lg:grid-cols-2">
              {visiveis.map((pergunta) => (
                <li key={pergunta.id}>
                  <CartaoPergunta
                    pergunta={pergunta}
                    conteudo={filtrando ? undefined : tituloPorId.get(pergunta.conteudoId)}
                    aoAjustar={setEmAjuste}
                  />
                </li>
              ))}
            </ul>
          )}
        </>
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

      {/* O link de saída fica fora do estado vazio pra existir também quando a
          lista está cheia: quem terminou de estudar quer colar mais material. */}
      {!nenhumaCadastrada && (
        <p className="mt-8 border-t border-hairline pt-5 text-sm text-muted">
          <Link
            href="/app/conteudos"
            className="inline-flex items-center gap-1.5 rounded-ds font-medium text-primary-accent hover:text-ink"
          >
            <Icone nome="colar" className="size-4" />
            {sistema.conteudos.novo}
          </Link>
        </p>
      )}
    </>
  )
}

/** Errada primeiro, sem revisão depois, acertada por último. */
function peso(pergunta: Pergunta) {
  if (pergunta.resultado === "errei") return 0
  if (pergunta.resultado === null) return 1
  return 2
}
