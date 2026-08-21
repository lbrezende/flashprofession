import { Icone } from "@/components/app/icone"
import { Card, CardConteudo } from "@/components/ui"
import { landing } from "@/content/site"
import { SEED } from "@/lib/seed"

/**
 * Dobra 3. A dobra viva: três cartas de verdade, tiradas do próprio material de
 * exemplo do app.
 *
 * Nada aqui é texto de vitrine escrito pra vender: são as mesmas perguntas e as
 * mesmas respostas que estão dentro do sistema. Explicar o que é uma carta de
 * estudo custa um parágrafo; mostrar três custa uma olhada.
 *
 * Aqui a resposta aparece junto com a pergunta, e é de propósito: dentro do app
 * ela fica escondida pra provocar a tentativa, mas quem está no site ainda não
 * está estudando, e precisa ver os dois lados pra entender o produto.
 */
export function Amostra() {
  // Uma carta por conteúdo, e não as três primeiras da lista: as três primeiras
  // saem todas do mesmo texto, e a dobra ficaria parecendo que o app só sabe
  // fazer pergunta de uma matéria.
  const cartas = SEED.conteudos
    .slice(0, 3)
    .map((conteudo) => SEED.perguntas.find((pergunta) => pergunta.conteudoId === conteudo.id))
    .filter((pergunta) => pergunta !== undefined)

  const disciplinaDoConteudo = new Map(SEED.conteudos.map((c) => [c.id, c.disciplina]))

  return (
    <section id="amostra" aria-labelledby="amostra-titulo" className="scroll-mt-20">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <h2
            id="amostra-titulo"
            className="text-2xl leading-tight text-balance text-ink sm:text-3xl lg:text-4xl"
          >
            {landing.amostra.titulo}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
            {landing.amostra.subtitulo}
          </p>
        </div>

        <ul className="mt-10 grid gap-4 md:grid-cols-3 md:gap-5 lg:mt-12">
          {cartas.map((carta) => (
            <li key={carta.id} className="h-full">
              <Card className="h-full">
                <CardConteudo className="flex h-full flex-col gap-3 p-6">
                  <span className="flex items-center gap-2 text-[11px] font-medium tracking-wide text-muted uppercase">
                    <Icone nome="pergunta" className="size-3.5 text-primary-accent" />
                    {disciplinaDoConteudo.get(carta.conteudoId)}
                  </span>

                  <p className="font-display text-base leading-snug text-ink">{carta.enunciado}</p>

                  <div className="mt-auto border-t border-hairline pt-3">
                    <p className="text-[11px] font-medium tracking-wide text-muted uppercase">
                      {landing.amostra.verso}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{carta.resposta}</p>
                  </div>
                </CardConteudo>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
