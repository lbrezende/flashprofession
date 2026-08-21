import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FileText, Layers, MessageCircleQuestionMark, Plus, SearchX } from "lucide-react"
import { sistema } from "@/content/site"
import { cn } from "@/lib/cn"
import { Button } from "./button"
import { EstadoVazio } from "./estado-vazio"

const meta = {
  title: "Primitivos/EstadoVazio",
  component: EstadoVazio,
  parameters: { layout: "padded" },
  argTypes: {
    titulo: { control: "text" },
    texto: { control: "text" },
    tamanho: { control: "inline-radio", options: ["sm", "md"] },
    icone: { control: false },
    acao: { control: false },
  },
  args: {
    titulo: sistema.vazios.conteudos.titulo,
    texto: sistema.vazios.conteudos.texto,
    tamanho: "md",
  },
  decorators: [
    // O vazio nunca aparece solto na página: ele mora dentro de uma superfície.
    // A largura acompanha o tamanho, porque `sm` existe justamente para caber
    // numa coluna estreita, dentro de um cartão.
    (Story, contexto) => (
      <div
        className={cn(
          "w-full rounded-ds border border-hairline bg-surface",
          contexto.args.tamanho === "sm" ? "max-w-[280px]" : "max-w-2xl"
        )}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EstadoVazio>

export default meta
type Story = StoryObj<typeof meta>

/** Vazio sem saída é beco: todo estado vazio de lista carrega a ação que o resolve. */
export const Conteudos: Story = {
  args: {
    icone: <FileText />,
    acao: <Button iconeEsquerda={<Plus />}>{sistema.vazios.conteudos.acao}</Button>,
  },
}

export const Perguntas: Story = {
  args: {
    titulo: sistema.vazios.perguntas.titulo,
    texto: sistema.vazios.perguntas.texto,
    icone: <MessageCircleQuestionMark />,
    acao: <Button iconeEsquerda={<Plus />}>{sistema.vazios.perguntas.acao}</Button>,
  },
}

export const Baralhos: Story = {
  args: {
    titulo: sistema.vazios.baralhos.titulo,
    texto: sistema.vazios.baralhos.texto,
    icone: <Layers />,
    acao: <Button iconeEsquerda={<Plus />}>{sistema.vazios.baralhos.acao}</Button>,
  },
}

/**
 * Busca sem resultado é outro vazio: existe cadastro, o filtro é que esconde.
 * Por isso a saída aqui é limpar o filtro, e não cadastrar de novo.
 */
export const SemResultado: Story = {
  args: {
    titulo: sistema.perguntas.semResultado.titulo,
    texto: sistema.perguntas.semResultado.texto,
    icone: <SearchX />,
    acao: <Button variante="secundaria">{sistema.acoes.limpar}</Button>,
  },
}

/** `sm` para vazios apertados: dentro de um cartão ou de um painel lateral. */
export const Pequeno: Story = {
  args: {
    tamanho: "sm",
    titulo: sistema.conteudos.semPerguntas,
    texto: undefined,
    icone: <MessageCircleQuestionMark />,
  },
}

export const SemAcao: Story = {
  args: {
    titulo: sistema.conteudos.detalhe.semPerguntas,
    texto: undefined,
    tamanho: "sm",
  },
}
