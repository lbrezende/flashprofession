"use client"

import { useState } from "react"
import { Icone } from "@/components/app/icone"
import { BlocoCopiavel } from "@/components/auth/bloco-copiavel"
import { Button, Modal } from "@/components/ui"
import { palavras, sistema } from "@/content/site"
import { contar } from "@/lib/formato"
import { gerarPerguntas, type PerguntaGerada } from "@/lib/perguntas-geradas"

const copy = sistema.geracao

type PropsGeradorDePerguntas = {
  /** O texto que está no campo agora, e não o que foi salvo. */
  texto: string
  /** Recebe as perguntas aprovadas. Quem grava é a tela, não este bloco. */
  aoSalvar: (perguntas: PerguntaGerada[]) => void
}

/**
 * O botão que transforma o conteúdo colado em perguntas.
 *
 * Ele nasce funcionando: clicou, saiu resultado, dá pra revisar antes de
 * salvar. O que ainda não é de verdade é a inteligência artificial por trás,
 * e a tela diz isso embaixo do resultado, sem rodeio, com o caminho pra ligar
 * ao lado. Um botão que promete e não entrega é pior que um botão que entrega
 * exemplo e avisa que é exemplo.
 */
export function GeradorDePerguntas({ texto, aoSalvar }: PropsGeradorDePerguntas) {
  const [geradas, setGeradas] = useState<PerguntaGerada[] | null>(null)
  const [gerando, setGerando] = useState(false)
  const [modalAberto, setModalAberto] = useState(false)

  const temTexto = texto.trim().length > 0

  function gerar() {
    if (!temTexto) return
    setGerando(true)
    // Um respiro curto antes do resultado. Não é atraso decorativo: resposta
    // instantânea num botão que diz "gerar" faz a pessoa duvidar de que algo
    // aconteceu, e o spinner é o que amarra o clique ao resultado.
    window.setTimeout(() => {
      setGeradas(gerarPerguntas(texto))
      setGerando(false)
    }, 450)
  }

  function tirar(indice: number) {
    setGeradas((atuais) => (atuais ?? []).filter((_, i) => i !== indice))
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          onClick={gerar}
          carregando={gerando}
          disabled={!temTexto}
          iconeEsquerda={<Icone nome="gerar" />}
        >
          {gerando ? copy.gerando : copy.acao}
        </Button>

        {!temTexto && <p className="text-[13px] text-muted">{copy.vazio}</p>}
      </div>

      {geradas && (
        <div className="mt-4 rounded-ds-surface border border-hairline superficie p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h4 className="font-display text-sm text-ink">{copy.titulo}</h4>
            {/* Anunciado a cada geração: sem isso, quem usa leitor de tela
                clica no botão e não recebe notícia de que apareceu conteúdo. */}
            <p aria-live="polite" className="text-[13px] text-muted">
              {contar(geradas.length, palavras.pergunta.singular, palavras.pergunta.plural)}{" "}
              {copy.aviso}
            </p>
          </div>

          <p className="mt-1 text-[13px] text-muted">{copy.descricao}</p>

          <ul className="mt-4 flex flex-col gap-2">
            {geradas.map((pergunta, indice) => (
              <li
                key={pergunta.enunciado}
                className="superficie-elevada flex items-start gap-2 rounded-ds-fine border border-hairline px-3 py-2.5"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-ink">{pergunta.enunciado}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted">{pergunta.resposta}</p>
                </div>

                <Button
                  variante="fantasma"
                  tamanho="sm"
                  onClick={() => tirar(indice)}
                  aria-label={`${copy.remover}: ${pergunta.enunciado}`}
                  iconeEsquerda={<Icone nome="fechar" />}
                  className="shrink-0"
                />
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              onClick={() => {
                aoSalvar(geradas)
                setGeradas(null)
              }}
              disabled={geradas.length === 0}
              iconeEsquerda={<Icone nome="check" />}
            >
              {copy.salvar}
            </Button>
            <Button variante="secundaria" onClick={gerar}>
              {copy.refazer}
            </Button>
            <Button variante="fantasma" onClick={() => setGeradas(null)}>
              {copy.descartar}
            </Button>
          </div>

          {/* O aviso honesto. Ele fica sempre, e não só na primeira vez. */}
          <p className="mt-4 flex flex-wrap items-start gap-x-2 gap-y-1 border-t border-hairline pt-3 text-[12.5px] leading-relaxed text-muted">
            <Icone nome="alerta" className="mt-0.5 size-4 shrink-0 text-warning" />
            <span className="min-w-0 flex-1">{copy.simulado.texto}</span>
            <button
              type="button"
              onClick={() => setModalAberto(true)}
              className="shrink-0 rounded-ds font-medium text-primary-accent underline underline-offset-2 hover:text-ink"
            >
              {copy.simulado.link}
            </button>
          </p>
        </div>
      )}

      <Modal
        aberto={modalAberto}
        aoFechar={() => setModalAberto(false)}
        titulo={copy.modal.titulo}
        descricao={copy.modal.descricao}
        tamanho="lg"
        icone={<Icone nome="gerar" className="text-primary-accent" />}
        rodape={
          <Button variante="secundaria" onClick={() => setModalAberto(false)}>
            {copy.modal.fechar}
          </Button>
        }
      >
        <ol className="flex flex-col gap-6">
          {copy.modal.passos.map((passo, indice) => (
            <li key={passo.titulo} className="flex gap-3">
              {/* A numeração é decorativa: a ordem já vem da lista. */}
              <span
                aria-hidden="true"
                className="realce-interno grid size-7 shrink-0 place-items-center rounded-full bg-primary text-[12px] font-semibold text-primary-ink"
              >
                {indice + 1}
              </span>

              <div className="min-w-0 flex-1">
                <h3 className="font-display text-sm text-ink">{passo.titulo}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-muted">{passo.texto}</p>

                {"links" in passo && passo.links && (
                  <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                    {passo.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-ds text-[13px] font-medium text-primary-accent hover:text-ink"
                        >
                          {link.rotulo}
                          <Icone nome="link-externo" className="size-3.5" />
                        </a>
                      </li>
                    ))}
                  </ul>
                )}

                {"codigo" in passo && passo.codigo && (
                  <BlocoCopiavel
                    codigo={passo.codigo}
                    rotulo={"codigoRotulo" in passo ? passo.codigoRotulo : undefined}
                    className="mt-3"
                  />
                )}
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-6 flex gap-2.5 rounded-ds-surface border border-hairline bg-elevated p-4 text-[13px] leading-relaxed text-ink">
          <Icone nome="seguranca" className="mt-0.5 size-4 shrink-0 text-primary-accent" />
          <span>{copy.modal.regra}</span>
        </p>
      </Modal>
    </>
  )
}
