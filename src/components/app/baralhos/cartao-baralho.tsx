import { Icone } from "@/components/app/icone"
import { BotaoLink } from "@/components/marketing/botao-link"
import { Button, Card, CardTitulo } from "@/components/ui"
import { palavras, sistema } from "@/content/site"
import { contar } from "@/lib/formato"
import type { Baralho } from "@/lib/types"

const textos = sistema.baralhos

type PropsCartaoBaralho = {
  baralho: Baralho
  /** Quantas cartas dele ainda existem, e quantas já foram acertadas. */
  cartas: number
  acertadas: number
  aoAjustar: (baralho: Baralho) => void
}

/**
 * Cartão grande com uma ação só: revisar.
 *
 * O momento que esta lista serve é o dia da prova, e nesse dia a pessoa não
 * quer administrar baralho nenhum: quer começar. Por isso o botão de revisar é
 * o único destaque, e ajustar fica como ação secundária ao lado.
 *
 * A barra de progresso é desenhada com dois retângulos e uma largura em
 * porcentagem, sem biblioteca nenhuma, e o número que ela representa está
 * escrito em texto logo acima: quem não enxerga a barra não perde nada.
 */
export function CartaoBaralho({ baralho, cartas, acertadas, aoAjustar }: PropsCartaoBaralho) {
  const proporcao = cartas > 0 ? Math.round((acertadas / cartas) * 100) : 0

  return (
    <Card className="flex h-full flex-col gap-4 p-5">
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="superficie-elevada grid size-10 shrink-0 place-items-center rounded-full border border-hairline text-primary-accent"
        >
          <Icone nome="baralho" className="size-[18px]" />
        </span>

        <div className="min-w-0 flex-1">
          <CardTitulo como="h3" className="text-[15px] leading-snug">
            {baralho.nome}
          </CardTitulo>
          <p className="mt-0.5 text-sm text-muted">
            {cartas > 0
              ? contar(cartas, palavras.carta.singular, palavras.carta.plural)
              : textos.semCarta}
          </p>
        </div>
      </div>

      {cartas > 0 && (
        <div>
          <p className="text-[13px] text-muted">
            {acertadas} de {cartas} {textos.progresso}
          </p>
          <div
            aria-hidden="true"
            className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-elevated"
          >
            <div className="h-full rounded-full bg-primary" style={{ width: `${proporcao}%` }} />
          </div>
        </div>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
        <BotaoLink
          href={`/app/baralhos/${baralho.id}`}
          iconeEsquerda={<Icone nome="comecar" />}
          aria-label={`${textos.revisar}: ${baralho.nome}`}
        >
          {textos.revisar}
        </BotaoLink>

        <Button
          variante="fantasma"
          onClick={() => aoAjustar(baralho)}
          aria-label={`${textos.editar}: ${baralho.nome}`}
          iconeEsquerda={<Icone nome="paleta" />}
        >
          {textos.editar}
        </Button>
      </div>
    </Card>
  )
}
