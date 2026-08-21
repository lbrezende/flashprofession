"use client"

import { useId, useState } from "react"
import { Icone } from "@/components/app/icone"
import { Badge, Button, Card, type VarianteBadge } from "@/components/ui"
import { sistema } from "@/content/site"
import type { Pergunta, Resultado } from "@/lib/types"

const textos = sistema.perguntas

/** Errei é aviso, não erro do sistema: significa "volte aqui", e o amarelo diz isso. */
const VARIANTE_DO_RESULTADO: Record<Resultado, VarianteBadge> = {
  acertei: "sucesso",
  errei: "aviso",
}

export function SeloDoResultado({
  resultado,
  className,
}: {
  resultado: Resultado | null
  className?: string
}) {
  if (!resultado) {
    return (
      <Badge variante="neutra" className={className}>
        {textos.resultados.pendente}
      </Badge>
    )
  }

  return (
    <Badge variante={VARIANTE_DO_RESULTADO[resultado]} ponto className={className}>
      {textos.resultados[resultado]}
    </Badge>
  )
}

type PropsCartaoPergunta = {
  pergunta: Pergunta
  /** O título do conteúdo de onde ela saiu. Vazio quando a tela já filtra por um só. */
  conteudo?: string
  aoAjustar?: (pergunta: Pergunta) => void
}

/**
 * A pergunta com a resposta escondida.
 *
 * Esconder não é enfeite: ler a resposta junto com a pergunta é o jeito mais
 * rápido de achar que se sabe uma coisa que não se sabe. O botão obriga a
 * tentativa antes, que é a coisa toda que este app existe pra provocar.
 *
 * A resposta continua no HTML o tempo inteiro, só que oculta: quem usa leitor
 * de tela recebe o mesmo controle e o mesmo aviso de aberto ou fechado.
 */
export function CartaoPergunta({ pergunta, conteudo, aoAjustar }: PropsCartaoPergunta) {
  const [aberta, setAberta] = useState(false)
  const idResposta = useId()

  return (
    <Card className="flex h-full flex-col gap-3 p-5">
      {/* O selo e a origem ficam ACIMA da pergunta, e não ao lado dela: num
          cartão de coluna estreita, um selo ao lado espreme o enunciado até ele
          quebrar palavra por palavra. */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <SeloDoResultado resultado={pergunta.resultado} />

        {conteudo && (
          <span className="flex min-w-0 items-center gap-1.5 text-[13px] text-muted">
            <Icone nome="conteudo" className="size-3.5 shrink-0" />
            <span className="truncate">
              {textos.deQualConteudo} {conteudo}
            </span>
          </span>
        )}
      </div>

      <p className="font-display text-[15px] leading-snug text-balance text-ink">
        {pergunta.enunciado}
      </p>

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
        <Button
          variante="secundaria"
          tamanho="sm"
          onClick={() => setAberta((atual) => !atual)}
          aria-expanded={aberta}
          aria-controls={idResposta}
          iconeEsquerda={<Icone nome={aberta ? "esconder" : "virar"} />}
        >
          {aberta ? textos.esconderResposta : textos.verResposta}
        </Button>

        {aoAjustar && (
          <Button
            variante="fantasma"
            tamanho="sm"
            onClick={() => aoAjustar(pergunta)}
            aria-label={`${textos.editar}: ${pergunta.enunciado}`}
            iconeEsquerda={<Icone nome="paleta" />}
          >
            {textos.editar}
          </Button>
        )}
      </div>

      {/* `hidden` em vez de sair da árvore: o aria-controls acima precisa de um
          alvo que exista sempre, senão a relação some para o leitor de tela. */}
      <div
        id={idResposta}
        hidden={!aberta}
        className="rounded-ds-fine border border-hairline bg-elevated p-3"
      >
        <p className="text-[11px] font-medium tracking-wide text-muted uppercase">
          {textos.resposta}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-ink">{pergunta.resposta}</p>
      </div>
    </Card>
  )
}
