import { marca } from "@/content/site"
import { cn } from "@/lib/cn"

type PropsLogo = {
  className?: string
  /** Só o símbolo, sem o nome ao lado (o nome continua no leitor de tela). */
  somenteSimbolo?: boolean
}

/**
 * A marca é desenhada em SVG e pintada com `currentColor` para herdar o
 * `text-primary-accent`. Trocar o design system no JSON repinta o logo junto.
 *
 * O desenho é o que o app faz: uma folha de conteúdo, com as linhas do texto
 * colado, e o ponto de interrogação saindo dela. Duas formas, nenhuma imagem.
 */
export function Logo({ className, somenteSimbolo = false }: PropsLogo) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 32 32"
        className="size-7 shrink-0 text-primary-accent"
        aria-hidden="true"
        focusable="false"
      >
        {/* A folha do conteúdo colado. */}
        <rect
          x="4.5"
          y="3.5"
          width="16"
          height="21"
          rx="3"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeOpacity="0.35"
        />
        <path
          d="M9 10h7M9 14.5h7M9 19h4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeOpacity="0.55"
        />

        {/* A pergunta que sai da folha, cheia, porque é ela que importa. */}
        <circle cx="22" cy="21.5" r="7.5" fill="currentColor" />
        <path
          d="M19.9 19.2a2.15 2.15 0 1 1 2.9 2.02c-.5.2-.8.66-.8 1.2v.4"
          fill="none"
          stroke="var(--ds-primary-ink)"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <circle cx="22" cy="25.4" r="1.05" fill="var(--ds-primary-ink)" />
      </svg>

      {somenteSimbolo ? (
        <span className="sr-only">{marca.nome}</span>
      ) : (
        <span
          className="truncate font-display text-base text-ink"
          style={{ fontWeight: "var(--ds-display-weight)", letterSpacing: "var(--ds-tracking)" }}
        >
          {marca.nome}
        </span>
      )}
    </span>
  )
}
