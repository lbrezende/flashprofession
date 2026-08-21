"use client"

import { useMemo, useRef, useState } from "react"
import { CabecalhoPagina } from "@/components/app/cabecalho-pagina"
import { CartaoBaralho } from "@/components/app/baralhos/cartao-baralho"
import {
  FormularioBaralho,
  type ValoresBaralho,
} from "@/components/app/baralhos/formulario-baralho"
import { Icone } from "@/components/app/icone"
import { Button, Confirmar, EstadoVazio, Modal } from "@/components/ui"
import { sistema } from "@/content/site"
import { useDados } from "@/lib/store"
import type { Baralho } from "@/lib/types"

const textos = sistema.baralhos
const ID_FORMULARIO_NOVO = "formulario-novo-baralho"
const ID_FORMULARIO_EDITAR = "formulario-editar-baralho"

/**
 * A lista de baralhos, montada como fila de ação.
 *
 * Cada cartão tem uma ação principal só, revisar, porque é isso que a pessoa
 * veio fazer no dia da prova. O resto (montar, ajustar, remover) fica um passo
 * atrás, onde não disputa atenção com o botão que importa.
 */
export default function PaginaBaralhos() {
  const { dados, criarBaralho, atualizarBaralho, removerBaralho } = useDados()

  const [montando, setMontando] = useState(false)
  const [emAjuste, setEmAjuste] = useState<Baralho | null>(null)
  const [confirmandoRemocao, setConfirmandoRemocao] = useState(false)
  const refNomeNovo = useRef<HTMLInputElement>(null)
  const refNomeEditar = useRef<HTMLInputElement>(null)

  const porId = useMemo(
    () => new Map(dados.perguntas.map((pergunta) => [pergunta.id, pergunta])),
    [dados.perguntas]
  )

  /** Só as cartas que ainda existem contam: id órfão não é carta. */
  const contagens = useMemo(() => {
    const mapa = new Map<string, { cartas: number; acertadas: number }>()

    for (const baralho of dados.baralhos) {
      const vivas = baralho.perguntaIds
        .map((id) => porId.get(id))
        .filter((pergunta) => pergunta !== undefined)
      mapa.set(baralho.id, {
        cartas: vivas.length,
        acertadas: vivas.filter((pergunta) => pergunta.resultado === "acertei").length,
      })
    }

    return mapa
  }, [dados.baralhos, porId])

  const ordenados = useMemo(
    () => [...dados.baralhos].sort((a, b) => b.criadoEm.localeCompare(a.criadoEm)),
    [dados.baralhos]
  )

  const nenhumMontado = dados.baralhos.length === 0

  return (
    <>
      <CabecalhoPagina
        titulo={textos.titulo}
        descricao={textos.descricao}
        acoes={
          <Button onClick={() => setMontando(true)} iconeEsquerda={<Icone nome="mais" />}>
            {textos.novo}
          </Button>
        }
      />

      {nenhumMontado ? (
        <div className="superficie rounded-ds-surface border border-hairline">
          <EstadoVazio
            icone={<Icone nome="baralho" />}
            titulo={sistema.vazios.baralhos.titulo}
            texto={sistema.vazios.baralhos.texto}
            acao={
              <Button onClick={() => setMontando(true)} iconeEsquerda={<Icone nome="mais" />}>
                {sistema.vazios.baralhos.acao}
              </Button>
            }
          />
        </div>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {ordenados.map((baralho) => {
            const contagem = contagens.get(baralho.id)
            return (
              <li key={baralho.id}>
                <CartaoBaralho
                  baralho={baralho}
                  cartas={contagem?.cartas ?? 0}
                  acertadas={contagem?.acertadas ?? 0}
                  aoAjustar={setEmAjuste}
                />
              </li>
            )
          })}
        </ul>
      )}

      <Modal
        aberto={montando}
        aoFechar={() => setMontando(false)}
        titulo={textos.formulario.tituloCriar}
        descricao={textos.formulario.descricaoCriar}
        tamanho="lg"
        refFocoInicial={refNomeNovo}
        rodape={
          <>
            <Button variante="secundaria" onClick={() => setMontando(false)}>
              {sistema.acoes.cancelar}
            </Button>
            <Button type="submit" form={ID_FORMULARIO_NOVO}>
              {textos.formulario.criar}
            </Button>
          </>
        }
      >
        <FormularioBaralho
          id={ID_FORMULARIO_NOVO}
          refNome={refNomeNovo}
          perguntas={dados.perguntas}
          conteudos={dados.conteudos}
          aoEnviar={(valores: ValoresBaralho) => {
            criarBaralho(valores)
            setMontando(false)
          }}
        />
      </Modal>

      {emAjuste && (
        <Modal
          aberto
          aoFechar={() => setEmAjuste(null)}
          titulo={textos.formulario.tituloEditar}
          descricao={textos.formulario.descricaoEditar}
          tamanho="lg"
          refFocoInicial={refNomeEditar}
          rodape={
            <>
              <Button
                variante="fantasma"
                onClick={() => setConfirmandoRemocao(true)}
                iconeEsquerda={<Icone nome="remover" />}
                className="mr-auto text-danger hover:bg-danger/10 hover:text-danger"
              >
                {textos.remocao.acao}
              </Button>
              <Button variante="secundaria" onClick={() => setEmAjuste(null)}>
                {sistema.acoes.cancelar}
              </Button>
              <Button type="submit" form={ID_FORMULARIO_EDITAR}>
                {textos.formulario.salvar}
              </Button>
            </>
          }
        >
          <FormularioBaralho
            key={emAjuste.id}
            id={ID_FORMULARIO_EDITAR}
            baralho={emAjuste}
            refNome={refNomeEditar}
            perguntas={dados.perguntas}
            conteudos={dados.conteudos}
            aoEnviar={(valores: ValoresBaralho) => {
              atualizarBaralho(emAjuste.id, valores)
              setEmAjuste(null)
            }}
          />
        </Modal>
      )}

      <Confirmar
        aberto={confirmandoRemocao}
        titulo={textos.remocao.titulo}
        texto={textos.remocao.texto}
        rotuloConfirmar={textos.remocao.confirmar}
        aoCancelar={() => setConfirmandoRemocao(false)}
        aoConfirmar={() => {
          setConfirmandoRemocao(false)
          if (emAjuste) removerBaralho(emAjuste.id)
          setEmAjuste(null)
        }}
      />
    </>
  )
}
