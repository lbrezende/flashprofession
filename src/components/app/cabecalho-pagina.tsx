import type { ReactNode } from "react";
import { Icone } from "./icone";

type PropsCabecalhoPagina = {
  titulo: string;
  descricao?: string;
  /** Botões da página (colar, montar, ajustar…). Alinham à direita no desktop. */
  acoes?: ReactNode;
};

/**
 * O topo de toda página interna. Existe para que o `h1`, o espaçamento e a
 * linha divisória sejam idênticos em Início, Carreiras, Mapa e Progresso. É
 * consistência que ninguém precisa lembrar de reproduzir.
 */
export function CabecalhoPagina({
  titulo,
  descricao,
  acoes,
}: PropsCabecalhoPagina) {
  const icones: Record<string, string> = {
    Início: "inicio",
    Carreiras: "carreiras",
    Mapa: "mapa",
    Aprender: "aprender",
    Praticar: "praticar",
    Progresso: "progresso",
    Ranking: "ranking",
    Perfil: "perfil",
    Configurações: "settings",
    Diagnóstico: "grafico",
  };
  const chave = Object.keys(icones).find((item) => titulo.startsWith(item));

  return (
    <div className="app-page-header mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <div className="flex min-w-0 items-center gap-4">
        <span className="app-page-icon" aria-hidden="true">
          <Icone nome={chave ? icones[chave] : "gerar"} />
        </span>
        <div className="min-w-0">
          <p className="mb-1 text-[10px] font-semibold tracking-[0.18em] text-primary-accent uppercase">Seu espaço</p>
          <h1 className="text-3xl leading-none text-ink sm:text-4xl">{titulo}</h1>
          {descricao && (
            <p className="mt-2 max-w-[58ch] text-sm text-muted">{descricao}</p>
          )}
        </div>
      </div>

      {acoes && (
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {acoes}
        </div>
      )}
    </div>
  );
}
