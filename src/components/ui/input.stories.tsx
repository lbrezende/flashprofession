import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FileText, Tag } from "lucide-react"
import { sistema } from "@/content/site"
import { Input } from "./input"

const campos = sistema.conteudos.formulario

const meta = {
  title: "Primitivos/Input",
  component: Input,
  parameters: { layout: "padded" },
  argTypes: {
    rotulo: { control: "text" },
    ajuda: { control: "text" },
    erro: { control: "text" },
    obrigatorio: { control: "boolean" },
    ocultarRotulo: { control: "boolean" },
    disabled: { control: "boolean" },
    iconeEsquerda: { control: false },
    iconeDireita: { control: false },
  },
  args: {
    rotulo: campos.campos.titulo,
    placeholder: campos.exemploTitulo,
    obrigatorio: false,
    ocultarRotulo: false,
    disabled: false,
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {}

export const Obrigatorio: Story = {
  args: { obrigatorio: true },
}

/** A ajuda some quando aparece um erro. Duas mensagens ao mesmo tempo viram ruído. */
export const ComAjuda: Story = {
  args: {
    rotulo: campos.campos.texto,
    placeholder: campos.exemploTexto,
    ajuda: campos.ajudaDisciplina,
    iconeEsquerda: <FileText />,
  },
}

export const ComErro: Story = {
  args: {
    rotulo: campos.campos.tema,
    placeholder: campos.exemploTema,
    erro: campos.erros.disciplina,
    defaultValue: "Histó",
    iconeEsquerda: <Tag />,
  },
}

export const ComIcone: Story = {
  args: {
    rotulo: campos.campos.tema,
    placeholder: campos.exemploTema,
    iconeEsquerda: <Tag />,
  },
}

export const Desabilitado: Story = {
  args: {
    disabled: true,
    defaultValue: "Revolução Francesa: as três fases",
  },
}

/** Os três estados juntos: é assim que se compara altura, cor e espaçamento. */
export const Estados: Story = {
  render: (args) => (
    <div className="flex flex-col gap-5">
      <Input {...args} rotulo={campos.campos.titulo} placeholder={campos.exemploTitulo} />
      <Input
        {...args}
        rotulo={campos.campos.texto}
        placeholder={campos.exemploTexto}
        ajuda={campos.ajudaDisciplina}
      />
      <Input
        {...args}
        rotulo={campos.campos.tema}
        defaultValue="Histó"
        erro={campos.erros.disciplina}
      />
      <Input
        {...args}
        rotulo={campos.campos.disciplina}
        defaultValue="História"
        disabled
      />
    </div>
  ),
}
