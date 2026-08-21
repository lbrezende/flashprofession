import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { sistema } from "@/content/site"
import { SEED } from "@/lib/seed"
import { Select, type OpcaoSelect } from "./select"

const situacoes: OpcaoSelect[] = [
  { valor: "ativo", rotulo: sistema.perguntas.resultados.acertei },
  { valor: "pendente", rotulo: sistema.perguntas.resultados.pendente },
  { valor: "inativo", rotulo: sistema.perguntas.resultados.errei },
]

/** Os conteúdos de exemplo do próprio app: opção de verdade, não texto inventado. */
const conteudos: OpcaoSelect[] = SEED.conteudos
  .slice(0, 3)
  .map((conteudo) => ({ valor: conteudo.id, rotulo: conteudo.titulo }))

const meta = {
  title: "Primitivos/Select",
  component: Select,
  parameters: { layout: "padded" },
  argTypes: {
    rotulo: { control: "text" },
    ajuda: { control: "text" },
    erro: { control: "text" },
    placeholder: { control: "text" },
    obrigatorio: { control: "boolean" },
    disabled: { control: "boolean" },
    opcoes: { control: false },
  },
  args: {
    rotulo: sistema.perguntas.seletor,
    opcoes: situacoes,
    defaultValue: "",
    obrigatorio: false,
    disabled: false,
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

/** Começa no placeholder: nada escolhido é diferente de "Ativo" por acidente. */
export const Padrao: Story = {}

export const ComValor: Story = {
  args: { defaultValue: "ativo" },
}

export const ComErro: Story = {
  args: {
    rotulo: sistema.perguntas.seletor,
    erro: sistema.baralhos.formulario.erros.perguntas,
    obrigatorio: true,
  },
}

export const ComAjuda: Story = {
  args: {
    rotulo: sistema.conteudos.formulario.campos.disciplina,
    opcoes: conteudos,
    defaultValue: "media",
    ajuda: sistema.conteudos.formulario.ajudaDisciplina,
  },
}

/** Sem placeholder quando toda escolha é válida e uma já vem marcada. */
export const SemPlaceholder: Story = {
  args: {
    rotulo: sistema.perguntas.seletor,
    opcoes: situacoes,
    placeholder: null,
    defaultValue: "pendente",
  },
}

export const Desabilitado: Story = {
  args: { disabled: true, defaultValue: "inativo" },
}
