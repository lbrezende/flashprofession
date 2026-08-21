import Link from "next/link"
import { Icone } from "@/components/app/icone"
import { Card, CardTitulo } from "@/components/ui"

type PropsCartaoModulo = {
  icone: string
  titulo: string
  texto: string
  href: string
}

/**
 * Um módulo do sistema.
 *
 * Ícone num disco com relevo, título e uma linha explicando o que tem lá
 * dentro. O cartão inteiro é clicável pelo `after:inset-0`, e quem chega pelo
 * teclado ouve só o título como nome do link, não o cartão todo.
 */
export function CartaoModulo({ icone, titulo, texto, href }: PropsCartaoModulo) {
  return (
    <Card
      interativo
      className="relative flex h-full flex-col gap-3 p-5 has-[:focus-visible]:border-primary/40"
    >
      <span
        aria-hidden="true"
        className="superficie-elevada grid size-11 place-items-center rounded-full border border-hairline text-primary-accent"
      >
        <Icone nome={icone} className="size-5" />
      </span>

      <CardTitulo como="h2" className="text-[15px] leading-snug">
        <Link href={href} className="after:absolute after:inset-0">
          {titulo}
        </Link>
      </CardTitulo>

      <p className="text-sm leading-relaxed text-muted">{texto}</p>
    </Card>
  )
}
