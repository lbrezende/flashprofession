import { Icone } from "@/components/app/icone"
import { BotaoLink } from "@/components/marketing/botao-link"
import { sistema } from "@/content/site"
import type { Dados, Jornada, Profissao } from "@/lib/types"

/** O que ainda falta pra tela ter conteúdo, na ordem em que a jornada se monta. */
export type FaltaNaJornada = "profissao" | "nivel" | "curso"

/**
 * Decide qual dos três vazios do onboarding a tela deve mostrar.
 *
 * A ordem importa: sem profissão não existe nivelamento, e sem nivelamento
 * não existe curso. Cada tela diz até onde ela precisa que a jornada tenha
 * chegado (`ate`), e recebe de volta a PRIMEIRA coisa que falta, que é a única
 * que a pessoa consegue resolver agora.
 */
export function faltaNaJornada(
  jornada: Jornada | null,
  profissao: Profissao | null | undefined,
  ate: FaltaNaJornada,
  dados?: Dados
): FaltaNaJornada | null {
  if (!jornada || !jornada.profissaoId || !profissao) return "profissao"
  if (ate === "profissao") return null
  if (!jornada.resultado) return "nivel"
  if (ate === "nivel") return null
  const comecou =
    jornada.conteudosVistos.length > 0 ||
    jornada.competenciasConcluidas.length > 0 ||
    (dados?.sessoes.length ?? 0) > 0
  return comecou ? null : "curso"
}

export type EstadoDaJornadaProps = {
  falta: FaltaNaJornada
  /** O ícone da tela, pra pessoa saber onde está mesmo com a tela vazia. */
  icone: string
  profissao?: Profissao | null
  /** O `data-tour` da tela, pro onboarding guiado continuar apontando certo. */
  tour?: string
}

/**
 * O estado vazio de quem ainda está montando a jornada.
 *
 * Vazio aqui não é erro nem "nada encontrado": é a primeira tela que a
 * pessoa vê depois de entrar, e ela precisa dizer UMA coisa, a próxima
 * (regra RB-10). O componente é um só pra Mapa, Aprender, Praticar, Progresso
 * e Ranking dizerem a mesma coisa com as mesmas palavras.
 */
export function EstadoDaJornada({ falta, icone, profissao, tour }: EstadoDaJornadaProps) {
  const copy = sistema.vazios.jornada[falta]
  const texto = copy.texto.replace("{profissao}", profissao?.nome ?? "")
  const etapas = [
    { id: "profissao", rotulo: "Escolher carreira", icone: "carreiras" },
    { id: "nivel", rotulo: "Descobrir nível", icone: "grafico" },
    { id: "curso", rotulo: "Começar trilha", icone: "comecar" },
  ] as const
  const atual = etapas.findIndex((etapa) => etapa.id === falta)

  return (
    <div className="journey-empty superficie overflow-hidden rounded-ds-surface border border-hairline" data-tour={tour}>
      <div className="grid gap-0 lg:grid-cols-[1fr_1.05fr]">
        <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
          <span className="journey-empty-icon"><Icone nome={icone} /></span>
          <p className="mt-6 text-[11px] font-semibold tracking-[.14em] text-primary-accent uppercase">Seu próximo passo</p>
          <h2 className="mt-2 max-w-md text-2xl leading-tight text-ink sm:text-3xl">{copy.titulo}</h2>
          <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-muted">{texto}</p>
          <div className="mt-7">
            <BotaoLink href={copy.href} comChip iconeDireita={<Icone nome="seta-direita" />}>
              {copy.acao}
            </BotaoLink>
          </div>
        </div>
        <div className="journey-steps flex flex-col justify-center gap-3 border-t border-white/10 p-6 sm:p-9 lg:border-t-0 lg:border-l">
          {etapas.map((etapa, indice) => {
            const concluida = indice < atual
            const ativa = indice === atual
            return (
              <div key={etapa.id} className={`journey-step ${ativa ? "is-active" : ""} ${concluida ? "is-done" : ""}`}>
                <span className="journey-step-icon"><Icone nome={concluida ? "check" : etapa.icone} /></span>
                <span className="flex-1">
                  <span className="block text-sm font-medium text-ink">{etapa.rotulo}</span>
                  <span className="block text-[12px] text-muted">{concluida ? "Concluído" : ativa ? "Agora" : "Depois"}</span>
                </span>
                <span className="text-xs font-semibold tabular-nums text-muted">0{indice + 1}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
