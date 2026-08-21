"use client"

import { useMemo, useRef, useState } from "react"
import { CabecalhoPagina } from "@/components/app/cabecalho-pagina"
import { CartaoConteudo } from "@/components/app/conteudos/cartao-conteudo"
import { DrawerConteudo } from "@/components/app/conteudos/drawer-conteudo"
import { FormularioConteudo } from "@/components/app/conteudos/formulario-conteudo"
import { Icone } from "@/components/app/icone"
import { Button, EstadoVazio, Modal } from "@/components/ui"
import { palavras, sistema } from "@/content/site"
import { chaveDeBusca, contar } from "@/lib/formato"
import { useDados } from "@/lib/store"
import type { Conteudo } from "@/lib/types"

const textos = sistema.conteudos
const ID_FORMULARIO_NOVO = "formulario-novo-conteudo"

/**
 * A tela do começo da semana: o material inteiro à vista, separado por
 * disciplina.
 *
 * Agrupar é a forma, e não uma decoração: quem prepara aula pensa por matéria,
 * e uma lista corrida obrigaria a pessoa a montar esse agrupamento de cabeça a
 * cada vez que abrisse a tela. Não tem busca nem filtro aqui de propósito: o
 * volume declarado deste app é de poucos conteúdos por semana, e uma caixa de
 * busca sobre doze cartões é enfeite ocupando o lugar do que importa.
 */
export default function PaginaConteudos() {
  const { dados, criarConteudo, atualizarConteudo, criarPerguntas, removerConteudo } = useDados()

  const [cadastrando, setCadastrando] = useState(false)
  const [idAberto, setIdAberto] = useState<string | null>(null)
  const refTituloNovo = useRef<HTMLInputElement>(null)

  /** Disciplina por disciplina, em ordem alfabética, e o mais novo primeiro dentro dela. */
  const grupos = useMemo(() => {
    const mapa = new Map<string, Conteudo[]>()

    for (const conteudo of dados.conteudos) {
      const chave = conteudo.disciplina.trim() || textos.semDisciplina
      const lista = mapa.get(chave) ?? []
      lista.push(conteudo)
      mapa.set(chave, lista)
    }

    return [...mapa.entries()]
      .sort((a, b) => chaveDeBusca(a[0]).localeCompare(chaveDeBusca(b[0])))
      .map(([disciplina, lista]) => ({
        disciplina,
        conteudos: [...lista].sort((a, b) => b.criadoEm.localeCompare(a.criadoEm)),
      }))
  }, [dados.conteudos])

  /** Quantas perguntas cada conteúdo tem, e quantas continuam erradas. */
  const contagens = useMemo(() => {
    const mapa = new Map<string, { total: number; erradas: number }>()

    for (const pergunta of dados.perguntas) {
      const atual = mapa.get(pergunta.conteudoId) ?? { total: 0, erradas: 0 }
      atual.total += 1
      if (pergunta.resultado === "errei") atual.erradas += 1
      mapa.set(pergunta.conteudoId, atual)
    }

    return mapa
  }, [dados.perguntas])

  // Lido do store a cada render, não copiado para o estado: salvar no painel
  // atualiza o que está na tela sem uma segunda cópia para sincronizar.
  const aberto = idAberto ? (dados.conteudos.find((c) => c.id === idAberto) ?? null) : null
  const nenhumCadastrado = dados.conteudos.length === 0

  return (
    <>
      <CabecalhoPagina
        titulo={textos.titulo}
        descricao={textos.descricao}
        acoes={
          <Button onClick={() => setCadastrando(true)} iconeEsquerda={<Icone nome="colar" />}>
            {textos.novo}
          </Button>
        }
      />

      {nenhumCadastrado ? (
        <div className="superficie rounded-ds-surface border border-hairline">
          <EstadoVazio
            icone={<Icone nome="conteudo" />}
            titulo={sistema.vazios.conteudos.titulo}
            texto={sistema.vazios.conteudos.texto}
            acao={
              <Button onClick={() => setCadastrando(true)} iconeEsquerda={<Icone nome="colar" />}>
                {sistema.vazios.conteudos.acao}
              </Button>
            }
          />
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {grupos.map((grupo) => (
            <section key={grupo.disciplina} aria-labelledby={`disciplina-${chaveDeBusca(grupo.disciplina)}`}>
              <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2
                  id={`disciplina-${chaveDeBusca(grupo.disciplina)}`}
                  className="font-display text-base text-ink"
                >
                  {grupo.disciplina}
                </h2>
                <p className="text-[13px] text-muted">
                  {contar(
                    grupo.conteudos.length,
                    palavras.conteudo.singular,
                    palavras.conteudo.plural
                  )}
                </p>
              </div>

              <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {grupo.conteudos.map((conteudo) => {
                  const contagem = contagens.get(conteudo.id)
                  return (
                    <li key={conteudo.id}>
                      <CartaoConteudo
                        conteudo={conteudo}
                        perguntas={contagem?.total ?? 0}
                        erradas={contagem?.erradas ?? 0}
                        aoAbrir={(escolhido) => setIdAberto(escolhido.id)}
                      />
                    </li>
                  )
                })}
              </ul>
            </section>
          ))}
        </div>
      )}

      <Modal
        aberto={cadastrando}
        aoFechar={() => setCadastrando(false)}
        titulo={textos.formulario.tituloCriar}
        descricao={textos.formulario.descricaoCriar}
        tamanho="lg"
        refFocoInicial={refTituloNovo}
        rodape={
          <>
            <Button variante="secundaria" onClick={() => setCadastrando(false)}>
              {sistema.acoes.cancelar}
            </Button>
            <Button type="submit" form={ID_FORMULARIO_NOVO}>
              {textos.formulario.criar}
            </Button>
          </>
        }
      >
        <FormularioConteudo
          id={ID_FORMULARIO_NOVO}
          refTitulo={refTituloNovo}
          aoEnviar={(valores) => {
            const novo = criarConteudo(valores)
            setCadastrando(false)
            // Abre o painel do conteúdo recém-colado: é lá que fica o botão de
            // gerar as perguntas, que é o que a pessoa veio fazer.
            setIdAberto(novo.id)
          }}
        />
      </Modal>

      {aberto && (
        <DrawerConteudo
          conteudo={aberto}
          perguntas={dados.perguntas.filter((pergunta) => pergunta.conteudoId === aberto.id)}
          aoFechar={() => setIdAberto(null)}
          aoSalvar={(id, valores) => atualizarConteudo(id, valores)}
          aoGerar={(id, geradas) =>
            criarPerguntas(
              geradas.map((gerada) => ({
                conteudoId: id,
                enunciado: gerada.enunciado,
                resposta: gerada.resposta,
                resultado: null,
              }))
            )
          }
          aoRemover={(id) => {
            setIdAberto(null)
            removerConteudo(id)
          }}
        />
      )}
    </>
  )
}
