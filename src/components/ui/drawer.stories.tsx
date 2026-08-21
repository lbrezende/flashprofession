import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useEffect, useState } from "react"
import { fn } from "storybook/test"
import { sistema } from "@/content/site"
import { Badge } from "./badge"
import { Button } from "./button"
import { Drawer, type DrawerProps, type LarguraDrawer } from "./drawer"
import { EstadoVazio } from "./estado-vazio"
import { Input } from "./input"
import { Select } from "./select"

/** Mesmo motivo do modal: aberto por padrão cobriria a documentação inteira. */
function DrawerComGatilho({ aberto, aoFechar, ...props }: DrawerProps) {
  const [visivel, setVisivel] = useState(aberto)

  useEffect(() => setVisivel(aberto), [aberto])

  return (
    <>
      <Button variante="secundaria" onClick={() => setVisivel(true)}>
        {props.titulo}
      </Button>

      <Drawer
        {...props}
        aberto={visivel}
        aoFechar={() => {
          setVisivel(false)
          aoFechar()
        }}
      />
    </>
  )
}

const LARGURAS: LarguraDrawer[] = ["sm", "md", "lg"]

const formulario = sistema.conteudos.formulario
const detalhe = sistema.conteudos.detalhe

const meta = {
  title: "Primitivos/Drawer",
  component: Drawer,
  parameters: { layout: "centered" },
  argTypes: {
    largura: { control: "inline-radio", options: LARGURAS },
    mostrarFechar: { control: "boolean" },
    fecharNoOverlay: { control: "boolean" },
    titulo: { control: "text" },
    descricao: { control: "text" },
    aberto: { control: "boolean" },
    rodape: { control: false },
    children: { control: false },
    refFocoInicial: { control: false },
  },
  args: {
    aberto: false,
    aoFechar: fn(),
    titulo: "Revolução Francesa: as três fases",
    descricao: "História · Idade Contemporânea",
    largura: "md",
    mostrarFechar: true,
    fecharNoOverlay: true,
  },
  render: (args) => <DrawerComGatilho {...args} />,
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

/** O painel lateral existe para editar sem perder a lista de vista. */
export const Padrao: Story = {
  args: {
    children: (
      <div className="flex flex-col gap-6">
        <section className="flex flex-col gap-3">
          <h3 className="font-display text-sm text-ink">{detalhe.texto}</h3>
          <dl className="grid gap-3 text-sm">
            <div className="flex items-center justify-between gap-3">
              <dt className="text-muted">{formulario.campos.tema}</dt>
              <dd className="text-ink">Idade Contemporânea</dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-muted">{formulario.campos.texto}</dt>
              <dd className="text-ink">A Revolução Francesa começa em 1789…</dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-muted">{formulario.campos.disciplina}</dt>
              <dd>
                <Badge variante="sucesso" ponto>
                  {sistema.perguntas.resultados.acertei}
                </Badge>
              </dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-muted">{detalhe.texto}</dt>
              <dd className="text-ink">10/08/2026</dd>
            </div>
          </dl>
        </section>

        <section className="flex flex-col gap-3">
          <h3 className="font-display text-sm text-ink">{detalhe.perguntas}</h3>
          <div className="rounded-ds border border-hairline bg-elevated">
            <EstadoVazio tamanho="sm" titulo={detalhe.semPerguntas} />
          </div>
        </section>
      </div>
    ),
    rodape: (
      <>
        <Button variante="perigo">{sistema.conteudos.remocao.acao}</Button>
        <Button>{formulario.salvar}</Button>
      </>
    ),
  },
}

export const ComFormulario: Story = {
  args: {
    titulo: formulario.tituloCriar,
    descricao: formulario.descricaoCriar,
    children: (
      <div className="flex flex-col gap-4">
        <Input rotulo={formulario.campos.titulo} placeholder={formulario.exemploTitulo} obrigatorio />
        <Input rotulo={formulario.campos.disciplina} placeholder={formulario.exemploDisciplina} />
        <Input
          rotulo={formulario.campos.tema}
          placeholder={formulario.exemploTema}
          type="email"
          obrigatorio
        />
        <Input
          rotulo={formulario.campos.texto}
          placeholder={formulario.exemploTexto}
          ajuda={formulario.ajudaDisciplina}
        />
        <Select
          rotulo={formulario.campos.disciplina}
          opcoes={[
            { valor: "ativo", rotulo: sistema.perguntas.resultados.acertei },
            { valor: "pendente", rotulo: sistema.perguntas.resultados.pendente },
            { valor: "inativo", rotulo: sistema.perguntas.resultados.errei },
          ]}
          defaultValue="ativo"
        />
      </div>
    ),
    rodape: (
      <>
        <Button variante="secundaria">{sistema.acoes.cancelar}</Button>
        <Button>{formulario.criar}</Button>
      </>
    ),
  },
}

export const Larguras: Story = {
  parameters: { layout: "padded" },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {LARGURAS.map((largura) => (
        <DrawerComGatilho
          key={largura}
          {...args}
          largura={largura}
          titulo={largura}
          descricao={sistema.conteudos.descricao}
        >
          <p className="text-sm leading-relaxed text-muted">{sistema.conteudos.descricao}</p>
        </DrawerComGatilho>
      ))}
    </div>
  ),
}

export const SemRodape: Story = {
  args: {
    titulo: detalhe.texto,
    descricao: undefined,
    children: (
      <p className="text-sm leading-relaxed text-muted">{sistema.conteudos.descricao}</p>
    ),
  },
}
