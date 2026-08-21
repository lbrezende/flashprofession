"use client"

import { CabecalhoPagina } from "@/components/app/cabecalho-pagina"
import { CartaoModulo } from "@/components/app/inicio/cartao-modulo"
import { sistema } from "@/content/site"

const textos = sistema.inicio

/**
 * A primeira tela depois de entrar.
 *
 * Ela lista as áreas do sistema em cartões de mesmo tamanho, na ordem do menu.
 * Todo caminho do app sai daqui.
 */
export default function PaginaInicio() {
  return (
    <>
      <CabecalhoPagina titulo={textos.titulo} descricao={textos.descricao} />

      <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {textos.modulos.map((modulo) => (
          <li key={modulo.href}>
            <CartaoModulo
              icone={modulo.icone}
              titulo={modulo.titulo}
              texto={modulo.texto}
              href={modulo.href}
            />
          </li>
        ))}
      </ul>
    </>
  )
}
