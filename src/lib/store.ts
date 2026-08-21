"use client"

import { useCallback, useSyncExternalStore } from "react"
import { SEED } from "./seed"
import type { Baralho, Conteudo, Dados, Pergunta, Sessao } from "./types"

/**
 * A ÚNICA porta de dados do app. Nenhuma tela lê ou grava por fora daqui.
 *
 * Ela tem dois lados, e escolhe sozinha qual usar:
 *
 *   NAVEGADOR, o padrão. Sem configurar nada, tudo mora no localStorage. É o
 *   que faz `npm install && npm run dev` bastar: sem banco, sem conta em
 *   serviço nenhum, sem variável de ambiente.
 *
 *   BANCO. Quando a `DATABASE_URL` do Neon está no `.env.local`, a mesma porta
 *   passa a falar com o Postgres pela rota `/api/dados`. Os dados sobrevivem a
 *   trocar de computador e ficam iguais em todo lugar que abrir o app.
 *
 * Quem decide é o servidor, não um interruptor no código: na primeira carga o
 * app pergunta pra `/api/dados` se tem banco ligado e segue por ali. Ligar o
 * banco é colar uma linha no `.env.local`, e mais nada.
 *
 * O QUE AS TELAS VEEM disso tudo: nada. `useDados()` devolve os mesmos dados e
 * as mesmas funções nos dois modos. É por isso que a regra de nunca ler ou
 * gravar fora deste arquivo vale tanto: ela é o que transforma "ligar o banco"
 * numa linha de configuração em vez de uma reforma em vinte telas.
 */

const CHAVE_DADOS = "colo-o-conteudo-que-preciso:dados:v1"
const CHAVE_SESSAO = "colo-o-conteudo-que-preciso:sessao:v1"

const VAZIO: Dados = { conteudos: [], perguntas: [], baralhos: [] }

type Modo = "descobrindo" | "navegador" | "banco"

/** O que as telas recebem. Um objeto só, com identidade estável. */
export type EstadoDosDados = { dados: Dados; carregando: boolean }

// --- núcleo reativo -------------------------------------------------------

type Ouvinte = () => void
const ouvintes = new Set<Ouvinte>()

let modo: Modo = "descobrindo"

/**
 * O instantâneo atual. `useSyncExternalStore` compara por identidade, então
 * este objeto só pode ser trocado quando alguma coisa realmente mudou: montar
 * um novo a cada leitura faria o React re-renderizar em laço infinito.
 */
let instantaneo: EstadoDosDados = { dados: VAZIO, carregando: true }

/** Resposta do servidor durante a renderização. Constante, pelo mesmo motivo. */
const NO_SERVIDOR: EstadoDosDados = { dados: VAZIO, carregando: true }

function publicar(dados: Dados, carregando = false) {
  instantaneo = { dados, carregando }
  for (const o of ouvintes) o()
}

function lerInstantaneo(): EstadoDosDados {
  return instantaneo
}

// --- lado do navegador ----------------------------------------------------

function lerDoNavegador(): Dados {
  try {
    const bruto = window.localStorage.getItem(CHAVE_DADOS)
    if (!bruto) return SEED
    const salvo = JSON.parse(bruto) as Partial<Dados>
    // Tolerante a dados antigos ou corrompidos: cada coleção cai no seed.
    return {
      conteudos: Array.isArray(salvo.conteudos) ? salvo.conteudos : SEED.conteudos,
      perguntas: Array.isArray(salvo.perguntas) ? salvo.perguntas : SEED.perguntas,
      baralhos: Array.isArray(salvo.baralhos) ? salvo.baralhos : SEED.baralhos,
    }
  } catch {
    return SEED
  }
}

function gravarNoNavegador(dados: Dados) {
  try {
    window.localStorage.setItem(CHAVE_DADOS, JSON.stringify(dados))
  } catch {
    // Cota estourada ou modo privado: seguimos com o estado em memória.
  }
}

// --- lado do banco --------------------------------------------------------

async function pedir(metodo: string, corpo: unknown) {
  const resposta = await fetch("/api/dados", {
    method: metodo,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(corpo),
  })
  if (!resposta.ok) throw new Error(`/api/dados respondeu ${resposta.status}`)
}

/**
 * Manda a mudança pro banco depois de a tela já ter mudado.
 *
 * A tela não espera a rede: quem marcou uma carta como sabida vê o resultado na
 * hora. Se o banco recusar, a gente recarrega de lá e a tela volta pra verdade,
 * em vez de ficar mostrando uma mudança que não aconteceu.
 */
function enviar(metodo: string, corpo: unknown) {
  pedir(metodo, corpo).catch((erro) => {
    console.error("[dados] gravação falhou, recarregando do banco", erro)
    void recarregarDoBanco()
  })
}

async function recarregarDoBanco() {
  try {
    const resposta = await fetch("/api/dados", { cache: "no-store" })
    const corpo = (await resposta.json()) as { ligado: boolean; dados: Dados | null }
    if (corpo.ligado && corpo.dados) publicar(corpo.dados)
  } catch (erro) {
    console.error("[dados] leitura falhou", erro)
  }
}

// --- descoberta do modo ---------------------------------------------------

let descoberta: Promise<void> | null = null

/**
 * Pergunta uma vez, no primeiro componente que monta, se existe banco ligado.
 *
 * Enquanto a resposta não chega, `carregando` fica ligado e a casca do app
 * mostra o esqueleto. É de propósito: mostrar os dados de exemplo primeiro e
 * trocar depois pelos de verdade seria piscar conteúdo falso na cara de quem
 * está usando.
 */
function descobrirModo() {
  if (descoberta) return descoberta

  descoberta = (async () => {
    try {
      const resposta = await fetch("/api/dados", { cache: "no-store" })
      const corpo = (await resposta.json()) as { ligado: boolean; dados: Dados | null }
      if (corpo.ligado && corpo.dados) {
        modo = "banco"
        publicar(corpo.dados)
        return
      }
    } catch {
      // Rota fora do ar ou resposta estranha: o navegador dá conta sozinho.
    }
    modo = "navegador"
    publicar(lerDoNavegador())
  })()

  return descoberta
}

function inscrever(o: Ouvinte) {
  ouvintes.add(o)
  void descobrirModo()
  return () => {
    ouvintes.delete(o)
  }
}

/**
 * Aplica a mudança nos dois lados: primeiro na tela, depois onde ela mora.
 *
 * `local` grava no navegador e `remoto` fala com o banco. Cada operação escreve
 * as duas versões da mesma intenção, lado a lado, porque a alternativa (traduzir
 * uma na outra) é onde os dois lados começam a divergir sem ninguém perceber.
 */
function aplicar(proximo: (atual: Dados) => Dados, remoto: () => void) {
  const dados = proximo(instantaneo.dados)
  publicar(dados)
  if (modo === "banco") remoto()
  else gravarNoNavegador(dados)
}

export function novoId(prefixo: string) {
  return `${prefixo}-${Math.random().toString(36).slice(2, 9)}`
}

// --- hook público ---------------------------------------------------------

export function useDados() {
  const { dados, carregando } = useSyncExternalStore(
    inscrever,
    lerInstantaneo,
    () => NO_SERVIDOR
  )

  const criarConteudo = useCallback((c: Omit<Conteudo, "id" | "criadoEm">) => {
    const novo: Conteudo = { ...c, id: novoId("con"), criadoEm: new Date().toISOString() }
    aplicar(
      (d) => ({ ...d, conteudos: [novo, ...d.conteudos] }),
      () => enviar("POST", { colecao: "conteudos", item: novo })
    )
    return novo
  }, [])

  const atualizarConteudo = useCallback((id: string, patch: Partial<Conteudo>) => {
    aplicar(
      (d) => ({ ...d, conteudos: d.conteudos.map((c) => (c.id === id ? { ...c, ...patch } : c)) }),
      () => enviar("PATCH", { colecao: "conteudos", id, patch })
    )
  }, [])

  /**
   * Tira o conteúdo e tudo que só existia por causa dele.
   *
   * As perguntas daquele conteúdo vão junto, porque pergunta sem o material de
   * origem não dá pra corrigir nem pra estudar. E as cartas que essas perguntas
   * ocupavam saem dos baralhos: um baralho com carta fantasma travaria a
   * revisão bem no dia da prova, que é o pior momento possível.
   */
  const removerConteudo = useCallback((id: string) => {
    aplicar(
      (d) => {
        const orfas = new Set(
          d.perguntas.filter((p) => p.conteudoId === id).map((p) => p.id)
        )
        return {
          conteudos: d.conteudos.filter((c) => c.id !== id),
          perguntas: d.perguntas.filter((p) => p.conteudoId !== id),
          baralhos: d.baralhos.map((b) => ({
            ...b,
            perguntaIds: b.perguntaIds.filter((pid) => !orfas.has(pid)),
          })),
        }
      },
      // O banco faz a mesma limpeza do lado de lá, numa chamada só.
      () => enviar("DELETE", { colecao: "conteudos", id })
    )
  }, [])

  const criarPergunta = useCallback((p: Omit<Pergunta, "id" | "criadoEm">) => {
    const nova: Pergunta = { ...p, id: novoId("per"), criadoEm: new Date().toISOString() }
    aplicar(
      (d) => ({ ...d, perguntas: [nova, ...d.perguntas] }),
      () => enviar("POST", { colecao: "perguntas", item: nova })
    )
    return nova
  }, [])

  /** Várias de uma vez: é o que sai de um conteúdo colado, em um movimento só. */
  const criarPerguntas = useCallback((novas: Array<Omit<Pergunta, "id" | "criadoEm">>) => {
    const agora = new Date().toISOString()
    const criadas: Pergunta[] = novas.map((p) => ({
      ...p,
      id: novoId("per"),
      criadoEm: agora,
    }))
    aplicar(
      (d) => ({ ...d, perguntas: [...criadas, ...d.perguntas] }),
      () => {
        for (const item of criadas) enviar("POST", { colecao: "perguntas", item })
      }
    )
    return criadas
  }, [])

  const atualizarPergunta = useCallback((id: string, patch: Partial<Pergunta>) => {
    aplicar(
      (d) => ({ ...d, perguntas: d.perguntas.map((p) => (p.id === id ? { ...p, ...patch } : p)) }),
      () => enviar("PATCH", { colecao: "perguntas", id, patch })
    )
  }, [])

  /** A carta sai dos baralhos junto, pelo mesmo motivo da remoção do conteúdo. */
  const removerPergunta = useCallback((id: string) => {
    aplicar(
      (d) => ({
        ...d,
        perguntas: d.perguntas.filter((p) => p.id !== id),
        baralhos: d.baralhos.map((b) => ({
          ...b,
          perguntaIds: b.perguntaIds.filter((pid) => pid !== id),
        })),
      }),
      () => enviar("DELETE", { colecao: "perguntas", id })
    )
  }, [])

  const criarBaralho = useCallback((b: Omit<Baralho, "id" | "criadoEm">) => {
    const novo: Baralho = { ...b, id: novoId("bar"), criadoEm: new Date().toISOString() }
    aplicar(
      (d) => ({ ...d, baralhos: [novo, ...d.baralhos] }),
      () => enviar("POST", { colecao: "baralhos", item: novo })
    )
    return novo
  }, [])

  const atualizarBaralho = useCallback((id: string, patch: Partial<Baralho>) => {
    aplicar(
      (d) => ({ ...d, baralhos: d.baralhos.map((b) => (b.id === id ? { ...b, ...patch } : b)) }),
      () => enviar("PATCH", { colecao: "baralhos", id, patch })
    )
  }, [])

  /** O baralho é só uma seleção: desfazer ele não apaga pergunta nenhuma. */
  const removerBaralho = useCallback((id: string) => {
    aplicar(
      (d) => ({ ...d, baralhos: d.baralhos.filter((b) => b.id !== id) }),
      () => enviar("DELETE", { colecao: "baralhos", id })
    )
  }, [])

  const trocarTudo = useCallback((novos: Dados) => {
    aplicar(
      () => novos,
      () => enviar("PUT", { dados: novos })
    )
  }, [])

  const restaurarExemplos = useCallback(() => trocarTudo(SEED), [trocarTudo])
  const limparTudo = useCallback(() => trocarTudo(VAZIO), [trocarTudo])

  return {
    dados,
    /** Ligado até saber onde os dados moram. A casca do app espera nele. */
    carregando,
    criarConteudo,
    atualizarConteudo,
    removerConteudo,
    criarPergunta,
    criarPerguntas,
    atualizarPergunta,
    removerPergunta,
    criarBaralho,
    atualizarBaralho,
    removerBaralho,
    restaurarExemplos,
    limparTudo,
  }
}

// --- sessão ---------------------------------------------------------------

/**
 * A sessão também tem dois lados, pelo mesmo motivo dos dados.
 *
 * SEM GOOGLE CONFIGURADO, o `entrar()` aqui embaixo só guarda um nome no
 * navegador. Isso NÃO é autenticação: não protege nada, e some quando a pessoa
 * limpa os dados do site. É simulação, pras telas terem estado de logado.
 *
 * COM GOOGLE CONFIGURADO (as duas chaves e o AUTH_SECRET no `.env.local`), quem
 * manda é o cookie assinado que o servidor gravou depois do login de verdade.
 * Na primeira carga o app pergunta pro servidor quem está logado, e a resposta
 * ganha da simulação. Ver `src/lib/google.ts` e `src/lib/sessao-servidor.ts`.
 */

const ouvintesDaSessao = new Set<Ouvinte>()

/** Cache do valor cru do localStorage: o snapshot precisa de identidade estável. */
let sessaoCrua: string | null = null
let sessaoLida = false

function avisarSessao() {
  for (const o of ouvintesDaSessao) o()
}

function gravarSessaoLocal(sessao: Sessao | null) {
  try {
    if (sessao) window.localStorage.setItem(CHAVE_SESSAO, JSON.stringify(sessao))
    else window.localStorage.removeItem(CHAVE_SESSAO)
  } catch {
    // Modo privado: a sessão vale só enquanto a aba estiver aberta.
  }
  sessaoCrua = sessao ? JSON.stringify(sessao) : null
  sessaoLida = true
  avisarSessao()
}

let perguntaDeSessao: Promise<void> | null = null

/**
 * Pergunta uma vez ao servidor se tem sessão assinada.
 *
 * Se tiver, ela substitui o que estiver guardado no navegador: o login de
 * verdade ganha da simulação, sempre.
 *
 * Se NÃO tiver, a sessão local fica onde está. Apagar ela aqui seria o
 * caminho "mais seguro" que quebra a tela: enquanto a entrada sem senha existir
 * como botão em `/entrar`, quem clica nela tem que continuar dentro do app na
 * próxima carga. Segurança de verdade não vem de derrubar essa sessão, vem de
 * cada rota de servidor exigir a sessão assinada antes de entregar dado, que é
 * o passo do workshop.
 */
function perguntarSessaoAoServidor() {
  if (perguntaDeSessao) return perguntaDeSessao

  perguntaDeSessao = (async () => {
    try {
      const resposta = await fetch("/api/auth/sessao", { cache: "no-store" })
      const corpo = (await resposta.json()) as { sessao: Sessao | null }
      if (corpo.sessao) gravarSessaoLocal(corpo.sessao)
    } catch {
      // Sem resposta do servidor, fica valendo o que o navegador tem.
    }
  })()

  return perguntaDeSessao
}

export function lerSessao(): Sessao | null {
  if (typeof window === "undefined") return null
  try {
    const bruto = window.localStorage.getItem(CHAVE_SESSAO)
    return bruto ? (JSON.parse(bruto) as Sessao) : null
  } catch {
    return null
  }
}

/**
 * A entrada sem senha, que continua existindo enquanto o Google não estiver
 * ligado.
 *
 * Repare no que NÃO entra aqui: a senha. Ela é digitada na tela de entrar e
 * morre lá, no estado do componente. Não chega nesta função, não vai pro
 * localStorage e não sai do navegador. Guardar senha em texto puro no
 * armazenamento do navegador seria ensinar errado dentro de um projeto que
 * existe pra ensinar, e a autenticação de verdade é o login do Google, que já
 * está escrito e só espera as chaves.
 */
export function entrar(nome = "Visitante", email = "voce@exemplo.com"): Sessao {
  const s: Sessao = { nome, email, entrouEm: new Date().toISOString() }
  if (typeof window !== "undefined") gravarSessaoLocal(s)
  return s
}

export function sair() {
  if (typeof window === "undefined") return
  gravarSessaoLocal(null)
  // O cookie do servidor precisa cair junto: sem isso, a próxima carga
  // perguntaria ao servidor, ele responderia a sessão antiga, e a pessoa
  // voltaria logada depois de clicar em sair.
  void fetch("/api/auth/sessao", { method: "DELETE" }).catch(() => {})
}

function inscreverSessao(o: Ouvinte) {
  ouvintesDaSessao.add(o)
  // Outra aba do mesmo app fez login ou logout.
  window.addEventListener("storage", avisarSessao)
  void perguntarSessaoAoServidor()
  return () => {
    ouvintesDaSessao.delete(o)
    window.removeEventListener("storage", avisarSessao)
  }
}

function lerSessaoCrua() {
  if (!sessaoLida) {
    try {
      sessaoCrua = window.localStorage.getItem(CHAVE_SESSAO)
    } catch {
      sessaoCrua = null
    }
    sessaoLida = true
  }
  return sessaoCrua
}

/** Lê a sessão só depois da hidratação, evitando divergência com o SSR. */
export function useSessao() {
  const sessao = useSyncExternalStore(inscreverSessao, lerSessaoCrua, () => null)

  try {
    return sessao ? (JSON.parse(sessao) as Sessao) : null
  } catch {
    return null
  }
}
