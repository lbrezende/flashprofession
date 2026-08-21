import { Amostra } from "@/components/marketing/amostra"
import { Beneficios } from "@/components/marketing/beneficios"
import { CabecalhoMarketing } from "@/components/marketing/cabecalho-marketing"
import { ComoFunciona } from "@/components/marketing/como-funciona"
import { Divisor } from "@/components/marketing/divisor"
import { Heroi } from "@/components/marketing/heroi"
import { RodapeMarketing } from "@/components/marketing/rodape-marketing"
import { Tour } from "@/components/onboarding/tour"

/**
 * O site do Vira Pergunta, na raiz.
 *
 * Ele é 100% servidor: nenhuma dobra tem estado, então nada aqui carrega
 * JavaScript para o navegador além do que o Next já manda. As âncoras do
 * cabeçalho e o link "Ver como funciona" são navegação nativa. Sem hook, sem
 * listener, sem piscar. Até o cenário da dobra de abertura é CSS.
 *
 * Cada dobra vive em `src/components/marketing/`, uma por arquivo: para mexer
 * nas cartas de amostra você abre `amostra.tsx` e não precisa entender o resto
 * da página.
 *
 * A separação entre dobras é o `Divisor`, e não uma borda na própria seção: o
 * fio some nas duas pontas em vez de riscar a página de lado a lado. Ele fica
 * aqui, entre as dobras, porque separar é assunto de quem monta a página, não
 * de quem escreve a dobra.
 */
export default function PaginaInicial() {
  return (
    <div className="flex min-h-dvh flex-col">
      <CabecalhoMarketing />

      {/* A primeira parada do tour de boas-vindas mora aqui, ancorada no botão
          de entrar. Da segunda em diante, quem retoma é a casca do app. */}
      <Tour />

      {/* `tabIndex={-1}` é o que faz o "Pular para o conteúdo" realmente mover
          o foco para cá, e não só rolar a página. */}
      <main id="conteudo" tabIndex={-1} className="flex-1">
        <Heroi />
        <Divisor />
        <ComoFunciona />
        <Divisor />
        <Amostra />
        <Divisor />
        <Beneficios />
      </main>

      <RodapeMarketing />
    </div>
  )
}
