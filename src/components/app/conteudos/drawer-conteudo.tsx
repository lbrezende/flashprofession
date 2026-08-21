"use client"

import { useState, type ReactNode } from "react"
import { Icone } from "@/components/app/icone"
import { Button, Confirmar, Drawer } from "@/components/ui"
import { sistema } from "@/content/site"
import { formatarCarimbo } from "@/lib/formato"
import type { Conteudo, Pergunta } from "@/lib/types"
import type { PerguntaGerada } from "@/lib/perguntas-geradas"
import { FormularioConteudo, type ValoresConteudo } from "./formulario-conteudo"
import { GeradorDePerguntas } from "./gerador-de-perguntas"

const textos = sistema.conteudos
const ID_FORMULARIO = "formulario-editar-conteudo"

type PropsDrawerConteudo = {
  conteudo: Conteudo
  /** Já filtradas por `conteudoId`. O painel não sabe procurar, só mostrar. */
  perguntas: Pergunta[]
  aoFechar: () => void
  aoSalvar: (id: string, valores: ValoresConteudo) => void
  aoGerar: (id: string, geradas: PerguntaGerada[]) => void
  aoRemover: (id: string) => void
}

/**
 * Ajustar o conteúdo sem sair da lista, e gerar as perguntas dele ali mesmo.
 *
 * Os dois moram no mesmo painel porque são o mesmo movimento: quem acabou de
 * colar um texto quer ver as perguntas saindo dele agora, não numa segunda
 * tela. E a lista de perguntas que já existem fica à vista porque é ela que
 * decide se vale gerar mais.
 */
export function DrawerConteudo({
  conteudo,
  perguntas,
  aoFechar,
  aoSalvar,
  aoGerar,
  aoRemover,
}: PropsDrawerConteudo) {
  const [confirmandoRemocao, setConfirmandoRemocao] = useState(false)
  // O texto que está no campo agora. O gerador trabalha em cima do que a pessoa
  // está vendo, e não da última versão salva: colar e gerar sem salvar no meio
  // é o caminho mais curto, e é o que ela vai tentar.
  const [textoAtual, setTextoAtual] = useState(conteudo.texto)

  return (
    <Drawer
      aberto
      aoFechar={aoFechar}
      titulo={conteudo.titulo}
      descricao={[conteudo.disciplina, conteudo.tema].filter(Boolean).join(" · ") || undefined}
      largura="lg"
      rodape={
        <>
          <Button variante="secundaria" onClick={aoFechar}>
            {sistema.acoes.cancelar}
          </Button>
          <Button type="submit" form={ID_FORMULARIO}>
            {textos.formulario.salvar}
          </Button>
        </>
      }
    >
      <p className="text-[13px] text-muted">{formatarCarimbo(conteudo.criadoEm)}</p>

      <Secao titulo={textos.formulario.tituloEditar} icone="conteudo">
        {/* `key` no id: trocar de conteúdo tem que recarregar os campos, não mesclar. */}
        <FormularioConteudo
          key={conteudo.id}
          id={ID_FORMULARIO}
          conteudo={conteudo}
          aoEnviar={(valores) => aoSalvar(conteudo.id, valores)}
          aoMudarTexto={setTextoAtual}
        />
      </Secao>

      <Secao titulo={sistema.geracao.acao} icone="gerar">
        <GeradorDePerguntas
          texto={textoAtual}
          aoSalvar={(geradas) => aoGerar(conteudo.id, geradas)}
        />
      </Secao>

      <Secao titulo={textos.detalhe.perguntas} icone="pergunta" contagem={perguntas.length}>
        {perguntas.length === 0 ? (
          <p className="text-sm text-muted">{textos.detalhe.semPerguntas}</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {perguntas.map((pergunta) => (
              <li
                key={pergunta.id}
                className="superficie-elevada rounded-ds-fine border border-hairline px-3 py-2.5"
              >
                <p className="text-sm text-ink">{pergunta.enunciado}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-muted">{pergunta.resposta}</p>
              </li>
            ))}
          </ul>
        )}
      </Secao>

      <Secao titulo={textos.remocao.titulo} icone="alerta">
        <p className="text-sm leading-relaxed text-muted">{textos.remocao.aviso}</p>
        <Button
          variante="secundaria"
          onClick={() => setConfirmandoRemocao(true)}
          iconeEsquerda={<Icone nome="remover" />}
          className="mt-3 border-danger/30 text-danger hover:bg-danger/10"
        >
          {textos.remocao.acao}
        </Button>
      </Secao>

      <Confirmar
        aberto={confirmandoRemocao}
        titulo={textos.remocao.confirmarTitulo}
        texto={textos.remocao.confirmarTexto}
        rotuloConfirmar={textos.remocao.confirmar}
        aoCancelar={() => setConfirmandoRemocao(false)}
        aoConfirmar={() => {
          setConfirmandoRemocao(false)
          aoRemover(conteudo.id)
        }}
      />
    </Drawer>
  )
}

/**
 * Bloco do painel: título com ícone, contagem opcional e uma linha acima.
 *
 * Existe para as seções terem o mesmo ritmo. Quando o espaçamento é escrito à
 * mão em cada uma, uma delas sempre fica com 4px de diferença.
 */
function Secao({
  titulo,
  icone,
  contagem,
  children,
}: {
  titulo: string
  icone: string
  contagem?: number
  children: ReactNode
}) {
  return (
    <section className="mt-7 border-t border-hairline pt-5">
      <h3 className="mb-3 flex items-center gap-2 font-display text-sm text-ink">
        <Icone nome={icone} className="size-4 text-muted" />
        {titulo}
        {contagem !== undefined && contagem > 0 && (
          <span className="ml-auto text-[13px] font-normal text-muted">{contagem}</span>
        )}
      </h3>
      {children}
    </section>
  )
}
