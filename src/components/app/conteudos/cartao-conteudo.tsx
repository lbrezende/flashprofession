import { Icone } from "@/components/app/icone"
import { Badge, Card, CardTitulo } from "@/components/ui"
import { palavras, sistema } from "@/content/site"
import { contar, formatarCarimbo } from "@/lib/formato"
import type { Conteudo } from "@/lib/types"

const textos = sistema.conteudos

type PropsCartaoConteudo = {
  conteudo: Conteudo
  /** Quantas perguntas saíram deste conteúdo, e quantas continuam erradas. */
  perguntas: number
  erradas: number
  aoAbrir: (conteudo: Conteudo) => void
}

/**
 * Cartão em vez de linha de tabela: em 375px uma tabela vira rolagem
 * horizontal, e aqui o tema, a contagem e o começo do texto empilham sem
 * apertar nada.
 *
 * Só o título é botão, e o `after:inset-0` estica a área de clique para o
 * cartão inteiro. Envolver tudo num `<button>` seria mais curto e pior: o
 * leitor de tela anunciaria o cartão inteiro como se fosse o nome do botão.
 */
export function CartaoConteudo({ conteudo, perguntas, erradas, aoAbrir }: PropsCartaoConteudo) {
  return (
    <Card
      interativo
      className="relative flex h-full flex-col gap-3 p-5 has-[:focus-visible]:border-primary/40"
    >
      <div className="min-w-0">
        <CardTitulo como="h3" className="text-[15px] leading-snug text-balance">
          <button
            type="button"
            onClick={() => aoAbrir(conteudo)}
            aria-label={`${textos.abrir}: ${conteudo.titulo}`}
            className="text-left after:absolute after:inset-0"
          >
            {conteudo.titulo}
          </button>
        </CardTitulo>

        {/* O tema e o aviso ficam ABAIXO do título, e não ao lado: num cartão de
            coluna estreita, um selo ao lado espreme o título até ele quebrar
            palavra por palavra. */}
        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
          {conteudo.tema && <span className="truncate text-sm text-muted">{conteudo.tema}</span>}

          {erradas > 0 && (
            <Badge variante="aviso" ponto>
              {contar(erradas, sistema.respostas.aindaErrada, sistema.respostas.aindaErradas)}
            </Badge>
          )}
        </div>
      </div>

      {/* Três linhas do texto colado: o suficiente pra reconhecer o material
          sem abrir, e pouco o bastante pra o cartão não virar parágrafo. */}
      <p className="line-clamp-3 text-[13px] leading-relaxed text-muted">{conteudo.texto}</p>

      <p className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-hairline pt-3 text-[13px] text-muted">
        <Icone nome="pergunta" className="size-4 shrink-0" />
        {perguntas > 0
          ? contar(perguntas, palavras.pergunta.singular, palavras.pergunta.plural)
          : textos.semPerguntas}
        <span aria-hidden="true">·</span>
        <span>{formatarCarimbo(conteudo.criadoEm)}</span>
      </p>
    </Card>
  )
}
