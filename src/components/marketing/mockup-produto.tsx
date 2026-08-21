import { Icone } from "@/components/app/icone"
import { Logo } from "@/components/app/logo"
import { landing, sistema } from "@/content/site"
import { cn } from "@/lib/cn"

/**
 * A imagem da dobra de abertura, montada em HTML.
 *
 * Não existe arquivo de imagem no projeto de propósito: um PNG de tela
 * envelhece na primeira mudança de design system, e aqui a prévia é pintada
 * pelos mesmos tokens do produto. Troque o `design-system.json` e ela troca junto.
 *
 * O que ela mostra é a tela que decide o produto: uma carta do baralho aberta,
 * com a pergunta na frente e os dois botões embaixo. Mostrar a lista de
 * conteúdos aqui seria mostrar o meio do caminho.
 *
 * A prévia inteira é anunciada como UMA imagem (`role="img"` + `aria-label`).
 * Por isso nada aqui dentro pode receber foco: seriam paradas de teclado sem
 * nome nenhum. Os itens do menu são `<li>`, não links.
 */
export function MockupProduto() {
  const { mockup } = landing

  return (
    <div
      role="img"
      aria-label={mockup.descricao}
      className="superficie-elevada overflow-hidden rounded-ds-surface border border-hairline"
    >
      {/* Moldura de janela: dá contexto de "isto é um software" em dois traços.
          Sem fundo próprio, de propósito. É nesta faixa que a luz de cima da
          `.superficie-elevada` aparece, na aresta superior da janela. */}
      <div className="flex h-9 items-center gap-2 border-b border-hairline px-3 lg:h-11">
        <span aria-hidden="true" className="flex shrink-0 gap-1.5">
          <span className="size-2 rounded-full bg-hairline" />
          <span className="size-2 rounded-full bg-hairline" />
          <span className="size-2 rounded-full bg-hairline" />
        </span>
        <span className="mx-auto truncate rounded-full border border-hairline bg-surface px-3 py-0.5 text-[10px] text-muted lg:text-xs">
          {mockup.endereco}
        </span>
        {/* Ocupa o mesmo espaço dos três pontos para o endereço ficar centrado. */}
        <span aria-hidden="true" className="w-[38px] shrink-0" />
      </div>

      {/* O corpo volta para `surface`: é a "página" do app falso, e as peças de
          dentro são `elevated`. Sem isso a moldura elevada engoliria as duas. */}
      <div className="flex bg-surface">
        <div className="hidden w-[150px] shrink-0 flex-col gap-3 border-r border-hairline p-3 sm:flex lg:w-[190px] lg:gap-4 lg:p-4">
          <Logo className="[&_svg]:size-5 [&_span]:text-xs lg:[&_svg]:size-6 lg:[&_span]:text-sm" />

          <ul className="flex flex-col gap-0.5">
            {sistema.nav.slice(0, 5).map((item, indice) => {
              // O terceiro item é Baralhos, que é onde a carta da prévia mora.
              const ativo = indice === 3

              return (
                <li
                  key={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-ds px-2 py-1.5 text-[11px] lg:gap-2.5 lg:text-[13px]",
                    ativo ? "bg-primary/10 font-medium text-ink" : "text-muted"
                  )}
                >
                  <Icone
                    nome={item.icone}
                    className={cn(
                      "size-3.5 shrink-0 lg:size-4",
                      ativo ? "text-primary-accent" : "text-muted"
                    )}
                  />
                  <span className="truncate">{item.rotulo}</span>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-3 p-3 sm:p-4 lg:gap-5 lg:p-6">
          <div className="flex items-center justify-between gap-3">
            <span className="truncate font-display text-sm text-ink lg:text-lg">
              {mockup.titulo}
            </span>
            <span className="shrink-0 rounded-full border border-hairline bg-elevated px-2.5 py-1 text-[10px] text-muted lg:text-xs">
              {mockup.contador}
            </span>
          </div>

          {/* A carta, do jeito que ela aparece na revisão de verdade. */}
          <div className="superficie-elevada flex min-h-[118px] flex-col justify-center gap-2 rounded-ds-surface border border-hairline p-4 lg:min-h-[164px] lg:p-6">
            <span className="text-[9px] font-medium tracking-wide text-muted uppercase lg:text-[10px]">
              {landing.amostra.frente}
            </span>
            <span className="font-display text-[13px] leading-snug text-balance text-ink lg:text-lg">
              {mockup.pergunta}
            </span>
            <span className="mt-0.5 flex items-center gap-1.5 text-[10px] text-muted lg:text-xs">
              <Icone nome="virar" className="size-3 lg:size-3.5" />
              {mockup.dica}
            </span>
          </div>

          <div className="flex gap-2">
            <span className="superficie flex flex-1 items-center justify-center gap-1.5 rounded-ds border border-hairline py-2 text-[10px] font-medium text-ink lg:text-xs">
              <Icone nome="errei" className="size-3 lg:size-3.5" />
              {mockup.errei}
            </span>
            <span className="preenchimento-acao flex flex-1 items-center justify-center gap-1.5 rounded-ds py-2 text-[10px] font-medium text-primary-ink lg:text-xs">
              <Icone nome="acertei" className="size-3 lg:size-3.5" />
              {mockup.acertei}
            </span>
          </div>

          <div className="hidden rounded-ds-surface border border-hairline bg-elevated p-3 sm:block lg:p-4">
            <span className="block truncate text-[11px] text-muted lg:text-sm">
              {mockup.lista.titulo}
            </span>

            <ul className="mt-2.5 flex flex-col gap-2 lg:mt-3 lg:gap-2.5">
              {mockup.lista.itens.map((item) => (
                <li key={item.titulo} className="flex items-center gap-2 lg:gap-2.5">
                  <span className="grid size-6 shrink-0 place-items-center rounded-ds-fine bg-primary/12 text-primary-accent lg:size-7">
                    <Icone nome="conteudo" className="size-3 lg:size-3.5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[11px] text-ink lg:text-[13px]">
                      {item.titulo}
                    </span>
                    <span className="block truncate text-[10px] text-muted lg:text-xs">
                      {item.disciplina}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
