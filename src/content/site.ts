/**
 * TODA a copy do produto mora aqui.
 *
 * Nenhum texto visível fica solto dentro de componente. Trocar uma palavra do
 * app inteiro é editar este arquivo, e não varrer quarenta arquivos atrás de
 * uma string. Junto com o `design-system.json`, é aqui que o app muda de cara
 * sem ninguém mexer em lógica.
 */

export const marca = {
  nome: "Vira Pergunta",
  tagline: "O conteúdo que você precisa estudar, em forma de pergunta",
  descricaoCurta:
    "Cole o material da matéria e receba as perguntas que a prova vai fazer.",
}

/**
 * O nome de cada coleção com o artigo junto.
 *
 * Não é camada de tradução: a pasta, a rota e o rótulo já falam esta mesma
 * palavra. O que mora aqui é gramática, pra frase montada em tempo de execução
 * sair em português correto ("3 perguntas", "o baralho", "a pergunta").
 */
export const palavras = {
  conteudo: { singular: "conteúdo", plural: "conteúdos", artigo: "o" },
  pergunta: { singular: "pergunta", plural: "perguntas", artigo: "a" },
  baralho: { singular: "baralho", plural: "baralhos", artigo: "o" },
  carta: { singular: "carta", plural: "cartas", artigo: "a" },
} as const

export const landing = {
  /** Barra fixa do topo do site. Os `href` com `#` apontam para as dobras. */
  cabecalho: {
    navegacao: "Navegação da página",
    irParaInicio: "Ir para o início",
    entrar: "Entrar",
    comoUsar: "Como usar",
    links: [
      { rotulo: "Como funciona", href: "#como-funciona" },
      { rotulo: "As cartas", href: "#amostra" },
      { rotulo: "O que muda", href: "#beneficios" },
    ],
  },

  /** Dobra 1: a promessa. */
  hero: {
    eyebrow: "Ferramenta interna da equipe",
    titulo: "Chegar na prova sabendo o que você já sabe",
    subtitulo:
      "Você cola o conteúdo da matéria e ele volta em perguntas, do jeito que a prova vai cobrar. Estudar deixa de ser reler e passa a ser responder.",
    ctaPrimario: "Começar a estudar",
    ctaSecundario: "Ver como funciona",
  },

  /**
   * A "foto do produto" do topo. É um app falso montado em HTML e CSS, sem
   * nenhum arquivo de imagem. Os rótulos vivem aqui porque mudar o produto tem
   * que mudar também o que aparece na prévia.
   *
   * A `descricao` é o texto alternativo: a prévia inteira é anunciada como uma
   * imagem só, então é a única frase que o leitor de tela vai ouvir dela.
   */
  mockup: {
    descricao:
      "Prévia do app: uma carta de estudo aberta, com a pergunta de História na frente e os botões de acertei e errei embaixo.",
    endereco: "vira-pergunta.app",
    titulo: "Prova de Humanas de sexta",
    contador: "Carta 2 de 5",
    pergunta: "O que foi o Terror, e quem conduziu esse período?",
    dica: "Responda de cabeça antes de virar",
    virar: "Ver a resposta",
    acertei: "Acertei",
    errei: "Ainda não",
    lista: {
      titulo: "Conteúdos da semana",
      itens: [
        { titulo: "Revolução Francesa: as três fases", disciplina: "História" },
        { titulo: "Fotossíntese e respiração celular", disciplina: "Biologia" },
        { titulo: "Função do segundo grau", disciplina: "Matemática" },
      ],
    },
  },

  /** Dobra 2: os três passos do uso. */
  comoFunciona: {
    titulo: "Do texto colado até a carta virada",
    subtitulo: "São três passos, e o primeiro leva menos de um minuto.",
    passos: [
      {
        numero: "01",
        titulo: "Cole o conteúdo da matéria",
        texto:
          "O resumo da aula, o trecho do livro, o material que o professor mandou. Você cola, diz de que disciplina é, e pronto.",
      },
      {
        numero: "02",
        titulo: "Ele volta em perguntas",
        texto:
          "Cada ponto importante do texto sai como uma pergunta, com a resposta guardada atrás dela.",
      },
      {
        numero: "03",
        titulo: "No dia da prova, o baralho pergunta",
        texto:
          "Uma carta por vez. Você responde de cabeça, vira, e marca se acertou. O que ficou errado continua aparecendo.",
      },
    ],
  },

  /** Dobra 3: a prova viva. Três cartas de verdade, do material de exemplo. */
  amostra: {
    titulo: "Três cartas que já estão lá dentro",
    subtitulo:
      "Elas saíram dos conteúdos que a equipe colou nesta semana. É assim que o baralho chega até você.",
    frente: "Pergunta",
    verso: "Resposta",
  },

  /** Dobra 4: o que cada pessoa ganha. */
  beneficios: {
    titulo: "O que muda pra quem estuda e pra quem ensina",
    itens: [
      {
        icone: "pergunta",
        titulo: "O conteúdo já chega perguntando",
        texto:
          "Colar o texto é o único trabalho. O que volta é a lista do que você precisa saber responder, e revisar deixa de começar do zero.",
      },
      {
        icone: "estudar",
        titulo: "Pouco tempo e ainda assim rende",
        texto:
          "Uma pergunta de cada vez, com a resposta atrás. Em minutos você descobre o que já sabe e o que ainda precisa olhar de novo.",
      },
      {
        icone: "conteudo",
        titulo: "O material da semana pronto sem virar noite",
        texto:
          "Quem prepara a aula deixa tudo separado por disciplina e por tema, e depois da prova ajusta o que não funcionou.",
      },
    ],
  },

  /**
   * DOBRA GUARDADA. Este app não é vendido: é ferramenta interna da equipe,
   * então não existe preço nem plano pra anunciar. O bloco continua no
   * projeto, vazio, esperando o dia em que houver o que dizer. Vazio aqui é
   * reserva, não é peça faltando.
   */
  precos: {
    titulo: "",
    subtitulo: "",
    selo: "",
    planos: [] as Array<{
      nome: string
      preco: string
      periodo: string
      descricao: string
      recursos: string[]
      cta: string
      destaque: boolean
    }>,
  },

  /** DOBRA GUARDADA, pelo mesmo motivo do bloco acima. */
  time: {
    titulo: "",
    subtitulo: "",
    pessoas: [] as Array<{ nome: string; cargo: string; bio: string; iniciais: string }>,
  },

  rodape: {
    texto: "Feito pra quem estuda com o tempo contado, e pra quem prepara o material.",
    navegacao: "Links do rodapé",
    links: [
      { rotulo: "Como usar", href: "/como-usar" },
      { rotulo: "Entrar", href: "/entrar" },
    ],
  },
}

/** Rótulos do sistema. Renomeie aqui e o menu, os títulos e os vazios acompanham. */
export const sistema = {
  nav: [
    { rotulo: "Início", href: "/app", icone: "inicio" },
    { rotulo: "Perguntas", href: "/app/perguntas", icone: "pergunta" },
    { rotulo: "Conteúdos", href: "/app/conteudos", icone: "conteudo" },
    { rotulo: "Baralhos", href: "/app/baralhos", icone: "baralho" },
    { rotulo: "Respostas", href: "/app/respostas", icone: "respostas" },
    { rotulo: "Configurações", href: "/app/configuracoes", icone: "settings" },
    // O último item é o convite do desafio, e o tour de boas-vindas para nele.
    { rotulo: "Desafio de UX", href: "/app/desafio", icone: "desafio", tour: "desafio" },
  ] as Array<{ rotulo: string; href: string; icone: string; tour?: string }>,

  /**
   * Textos da casca da área logada (menu, topo, estados de carregamento).
   * A maioria vira nome acessível de botão só-ícone. Se apagar, o leitor de
   * tela fica sem saber o que o botão faz.
   */
  casca: {
    navegacao: "Navegação principal",
    abrirMenu: "Abrir menu",
    fecharMenu: "Fechar menu",
    pularParaConteudo: "Pular para o conteúdo",
    carregando: "Carregando o app",
    sair: "Sair",
  },

  vazios: {
    conteudos: {
      titulo: "Nenhum conteúdo colado ainda",
      texto: "Cole o texto da primeira matéria e as perguntas saem dele na hora.",
      acao: "Colar conteúdo",
    },
    perguntas: {
      titulo: "Nenhuma pergunta por aqui ainda",
      texto: "As perguntas nascem do conteúdo colado. Cole um material e elas aparecem.",
      acao: "Colar conteúdo",
    },
    baralhos: {
      titulo: "Nenhum baralho montado",
      texto: "Junte as perguntas que caem na prova e revise todas de uma vez.",
      acao: "Montar baralho",
    },
    respostas: {
      titulo: "Nada respondido ainda",
      texto: "Abra um baralho e revise. O que for marcado aparece aqui pra ser ajustado.",
      acao: "Ir para os baralhos",
    },
  },

  /** A tela de abertura do app. */
  inicio: {
    titulo: "Início",
    descricao: "As áreas do Vira Pergunta.",
    modulos: [
      {
        icone: "pergunta",
        titulo: "Perguntas",
        texto: "As perguntas geradas a partir de cada conteúdo.",
        href: "/app/perguntas",
      },
      {
        icone: "conteudo",
        titulo: "Conteúdos",
        texto: "O material colado, separado por disciplina e tema.",
        href: "/app/conteudos",
      },
      {
        icone: "baralho",
        titulo: "Baralhos",
        texto: "As cartas organizadas para revisar antes da prova.",
        href: "/app/baralhos",
      },
      {
        icone: "respostas",
        titulo: "Respostas",
        texto: "O que foi acertado e o que continua errado.",
        href: "/app/respostas",
      },
      {
        icone: "settings",
        titulo: "Configurações",
        texto: "Visual, dados de exemplo e perfil.",
        href: "/app/configuracoes",
      },
      {
        icone: "desafio",
        titulo: "Desafio de UX",
        texto: "O guia de refinamento deste app.",
        href: "/app/desafio",
      },
    ],
  },

  /** Tela de Perguntas: o momento do aluno assim que abre o app. */
  perguntas: {
    titulo: "Perguntas",
    descricao: "Escolha o conteúdo e responda de cabeça antes de ver a resposta.",
    seletor: "Conteúdo",
    todosOsConteudos: "Todos os conteúdos",
    verResposta: "Ver a resposta",
    esconderResposta: "Esconder a resposta",
    resposta: "Resposta",
    deQualConteudo: "De",
    editar: "Ajustar pergunta",
    semResultado: {
      titulo: "Este conteúdo ainda não tem pergunta",
      texto: "Abra ele em Conteúdos e gere as perguntas a partir do texto colado.",
      acao: "Ver todos os conteúdos",
    },
    /** Selo curto: ele mora no canto de um cartão estreito e não pode empurrar o texto. */
    resultados: {
      acertei: "Acertei",
      errei: "Errei",
      pendente: "Sem revisão",
    },
  },

  /** Tela de Conteúdos: o momento do professor no começo da semana. */
  conteudos: {
    titulo: "Conteúdos",
    descricao: "O material colado, separado por disciplina e por tema.",
    novo: "Colar conteúdo",
    semDisciplina: "Sem disciplina",
    abrir: "Abrir conteúdo",
    verPerguntas: "Ver as perguntas",
    perguntasGeradas: "perguntas geradas",
    semPerguntas: "Sem pergunta nenhuma ainda",

    formulario: {
      tituloCriar: "Colar conteúdo",
      descricaoCriar:
        "Cole o texto da matéria. Depois de salvar, dá pra gerar as perguntas com um toque.",
      tituloEditar: "Ajustar conteúdo",
      descricaoEditar: "Corrija o texto ou mude onde ele fica guardado.",
      criar: "Salvar conteúdo",
      salvar: "Salvar alterações",
      campos: {
        titulo: "Título",
        disciplina: "Disciplina",
        tema: "Tema",
        texto: "Conteúdo colado",
      },
      exemploTitulo: "Ex.: Revolução Francesa: as três fases",
      exemploDisciplina: "Ex.: História",
      exemploTema: "Ex.: Idade Contemporânea",
      exemploTexto: "Cole aqui o resumo da aula, o trecho do livro ou o material que você recebeu.",
      ajudaDisciplina: "É por ela que os conteúdos ficam agrupados na lista.",
      ajudaTexto: "Quanto mais completo o texto, melhores as perguntas que saem dele.",
      erros: {
        titulo: "Dê um nome ao conteúdo.",
        disciplina: "Informe a disciplina.",
        texto: "Cole o conteúdo. Sem texto não sai pergunta.",
      },
    },

    detalhe: {
      texto: "Conteúdo colado",
      perguntas: "Perguntas deste conteúdo",
      semPerguntas: "Ainda não saiu nenhuma pergunta deste conteúdo.",
    },

    remocao: {
      titulo: "Remoção",
      aviso: "Apaga o conteúdo junto com as perguntas que saíram dele.",
      acao: "Remover conteúdo",
      confirmarTitulo: "Remover este conteúdo?",
      confirmarTexto:
        "O texto e as perguntas geradas a partir dele vão embora juntos, e as cartas saem dos baralhos. Não dá para desfazer.",
      confirmar: "Remover",
    },
  },

  /** A geração automática de perguntas, que hoje é simulada. */
  geracao: {
    acao: "Gerar perguntas",
    gerando: "Gerando…",
    titulo: "Perguntas geradas do texto",
    descricao: "Confira antes de salvar. Dá pra apagar o que não serve.",
    contagem: "Saíram",
    salvar: "Salvar as perguntas",
    descartar: "Descartar",
    refazer: "Gerar de novo",
    remover: "Tirar esta pergunta",
    /** Anunciado por leitor de tela quando a geração termina. */
    aviso: "perguntas geradas a partir do conteúdo",
    vazio: "Cole o conteúdo primeiro. As perguntas saem do texto.",

    /** O aviso honesto, que nunca some da tela. */
    simulado: {
      texto:
        "A inteligência artificial não está rodando de verdade: estas perguntas são um resultado de exemplo. Pra valer, falta a sua chave de API.",
      link: "Como",
    },

    modal: {
      titulo: "Como ligar a inteligência artificial de verdade",
      descricao:
        "São três coisas: pegar uma chave, guardar ela no lugar certo e pedir pro seu assistente escrever a chamada. Nenhuma delas leva mais que alguns minutos.",
      passos: [
        {
          titulo: "Pegue uma chave de API",
          texto:
            "Na OpenAI, a chave sai em platform.openai.com, no menu API keys. Na Anthropic, em console.anthropic.com, também em API keys. As duas pedem cartão e cobram por uso, e um app deste tamanho gasta centavos por mês.",
          links: [
            { rotulo: "platform.openai.com", href: "https://platform.openai.com/api-keys" },
            { rotulo: "console.anthropic.com", href: "https://console.anthropic.com/settings/keys" },
          ],
        },
        {
          titulo: "Guarde a chave fora do código",
          texto:
            "A chave mora no arquivo .env.local, na raiz do projeto, e o nome dela já está documentado sem valor nenhum no .env.example. O .env.local não vai pro GitHub, e o .gitignore já cuida disso.",
          codigo: "OPENAI_API_KEY=cole-aqui-a-sua-chave",
          codigoRotulo: ".env.local",
        },
        {
          titulo: "Peça a chamada numa rota de servidor",
          texto:
            "Este é o pedido pro seu assistente, e a parte que não pode faltar é a última frase. Chave de API escrita no código do navegador é chave vazada: qualquer pessoa abre o inspetor e copia.",
          codigo:
            "Crie a rota src/app/api/gerar-perguntas/route.ts que recebe o texto colado, chama a API da OpenAI no servidor lendo a chave de process.env.OPENAI_API_KEY, e devolve as perguntas em JSON. A chave nunca aparece no navegador e nunca é escrita no código.",
          codigoRotulo: "Peça assim",
        },
      ],
      regra:
        "A regra da casa, e ela vale pra qualquer chave: variável de ambiente no .env.local, chamada saindo de uma rota em src/app/api, e nada de chave escrita no código do navegador nem enviada pro repositório.",
      fechar: "Entendi",
      copiar: "Copiar",
      copiado: "Copiado!",
      falhaCopia: "Não deu para copiar automaticamente. Selecione o texto acima e use Ctrl+C (ou Cmd+C).",
    },
  },

  /** Tela de Baralhos: o momento do aluno no dia da prova. */
  baralhos: {
    titulo: "Baralhos",
    descricao: "Junte as perguntas que caem na prova e revise todas de uma vez.",
    novo: "Montar baralho",
    revisar: "Revisar",
    editar: "Ajustar baralho",
    cartas: "cartas",
    semCarta: "Nenhuma carta ainda",
    progresso: "já acertadas",

    formulario: {
      tituloCriar: "Montar baralho",
      descricaoCriar: "Dê um nome e marque as perguntas que entram nele.",
      tituloEditar: "Ajustar baralho",
      descricaoEditar: "Mude o nome ou troque as cartas que entram.",
      criar: "Montar",
      salvar: "Salvar alterações",
      nome: "Nome do baralho",
      exemploNome: "Ex.: Prova de Humanas de sexta",
      escolher: "Perguntas que entram",
      ajudaEscolher: "Marque quantas quiser. Elas aparecem na ordem em que estão aqui.",
      selecionadas: "marcadas",
      semPerguntas: "Cole um conteúdo primeiro. Sem pergunta não dá pra montar baralho.",
      erros: {
        nome: "Dê um nome ao baralho.",
        perguntas: "Marque pelo menos uma pergunta.",
      },
    },

    remocao: {
      acao: "Remover",
      titulo: "Remover este baralho?",
      texto: "As perguntas continuam onde estão. Só a seleção some, e não dá para desfazer.",
      confirmar: "Remover baralho",
    },

    /** A revisão em cartas, uma de cada vez. */
    revisao: {
      voltar: "Voltar para os baralhos",
      contador: "Carta {atual} de {total}",
      dica: "Responda de cabeça antes de virar",
      virar: "Ver a resposta",
      voltarCarta: "Ver a pergunta de novo",
      frente: "Pergunta",
      verso: "Resposta",
      acertei: "Acertei",
      errei: "Ainda não",
      anterior: "Carta anterior",
      /** Anunciado por leitor de tela a cada carta marcada. */
      aviso: "Marcada como",
      fim: {
        titulo: "Baralho revisado",
        acertos: "Você acertou {acertos} de {total}.",
        semErro: "Nenhuma ficou pra trás. Pode fechar o app tranquilo.",
        comErro: "As que ficaram pra trás continuam marcadas em Respostas.",
        refazer: "Revisar de novo",
        soAsErradas: "Revisar só as que errei",
        sair: "Voltar para os baralhos",
      },
      vazio: {
        titulo: "Este baralho está sem carta",
        texto: "As perguntas dele foram removidas. Ajuste o baralho e escolha outras.",
        acao: "Ajustar baralho",
      },
    },
  },

  /** Tela de Respostas: o momento do professor depois da correção. */
  respostas: {
    titulo: "Respostas",
    descricao: "O que a turma marcou nas revisões, para você ajustar o que não funcionou.",
    aindaErrada: "ainda errada",
    aindaErradas: "ainda erradas",
    jaAcertadas: "já acertadas",
    naoRevisadas: "sem revisão",
    resumoDoConteudo: "{erradas} de {total} continuam erradas",
    tudoCerto: "Todas as {total} já foram acertadas",
    ajustar: "Ajustar pergunta",
    zerar: "Zerar as marcações",
    confirmarZerar: {
      titulo: "Zerar as marcações deste conteúdo?",
      texto:
        "Todas as perguntas dele voltam para sem revisão, e a turma recomeça do zero. Não dá para desfazer.",
      confirmar: "Zerar",
    },
    abrirConteudo: "Abrir o conteúdo",
  },

  /** O formulário de uma pergunta, usado nas telas que ajustam ela. */
  pergunta: {
    formulario: {
      tituloEditar: "Ajustar pergunta",
      descricaoEditar: "Corrija o enunciado ou a resposta. Vale em todos os baralhos que usam esta carta.",
      salvar: "Salvar alterações",
      campos: {
        enunciado: "Pergunta",
        resposta: "Resposta",
      },
      exemploEnunciado: "Ex.: O que foi o Terror, e quem conduziu esse período?",
      exemploResposta: "Ex.: A fase mais dura da Convenção Nacional, conduzida por Robespierre.",
      ajudaResposta: "É o que aparece atrás da carta. Curta e direta funciona melhor.",
      erros: {
        enunciado: "Escreva a pergunta.",
        resposta: "Escreva a resposta.",
      },
    },
    remocao: {
      acao: "Remover pergunta",
      titulo: "Remover esta pergunta?",
      texto: "Ela sai dos baralhos junto, e não dá para desfazer.",
      confirmar: "Remover",
    },
  },

  /**
   * Microcopy dos primitivos de UI (botão fechar, busca, confirmação…).
   *
   * Fica aqui pelo mesmo motivo do resto: nenhum texto solto dentro de
   * componente. Trocar "Cancelar" por "Voltar" é uma linha, não uma varredura.
   */
  acoes: {
    fechar: "Fechar",
    cancelar: "Cancelar",
    confirmar: "Confirmar",
    limpar: "Limpar",
    buscar: "Buscar",
    selecione: "Selecione…",
  },

  /**
   * Tela de configurações.
   *
   * É onde a pessoa troca o design system, zera os dados para estudar os
   * estados vazios e ajusta o próprio nome. Os textos aqui explicam MUITO, e é
   * de propósito: metade dessa tela é material de aula.
   */
  configuracoes: {
    titulo: "Configurações",
    descricao:
      "O visual, os dados e o seu perfil. Tudo o que muda o app sem você escrever uma linha de código.",

    tema: {
      titulo: "Design system",
      descricao:
        "71 identidades prontas, tiradas de produtos reais. Clique em uma e o app inteiro se repinta na hora.",
      rotuloBusca: "Buscar design system",
      placeholderBusca: "Buscar por nome…",
      sufixoContagem: "sistemas",
      rotuloGrade: "Design systems disponíveis",
      selo: { claro: "Claro", escuro: "Escuro" },
      emUso: "Em uso",
      previaAtual: "Prévia aplicada:",
      previaPadrao: "Você está vendo o visual padrão do projeto.",
      voltarPadrao: "Voltar ao padrão",
      vazio: {
        titulo: "Nenhum sistema com esse nome",
        texto: "Tente só um pedaço: “stri” acha o Stripe, “ver” acha o Vercel e o The Verge.",
      },
      aviso: {
        titulo: "Isto aqui é uma prévia",
        texto:
          "A troca vale só neste navegador e some se você limpar os dados do site. Pra ele valer no projeto inteiro (site, sistema e Storybook), cole o JSON abaixo no design-system.json da raiz.",
      },
      json: {
        titulo: "O JSON deste sistema",
        texto:
          "Substitua o conteúdo do design-system.json na raiz do projeto por este. As cores que faltavam no catálogo já vêm calculadas.",
        rotuloBloco: "Conteúdo do design-system.json",
        copiar: "Copiar JSON",
        copiado: "Copiado!",
        erro: "Não deu para copiar. Selecione o texto e use Ctrl+C.",
      },
    },

    dados: {
      titulo: "Dados de exemplo",
      descricao:
        "O app guarda tudo no seu navegador, sem servidor. Estes dois botões mexem em tudo de uma vez.",
      restaurar: "Restaurar exemplos",
      limpar: "Limpar tudo",
      dicaVazios:
        "Limpar tudo deixa o app zerado. É assim que você vê os estados vazios de cada tela. Eles costumam ser a parte mais esquecida de um produto e a mais interessante de redesenhar.",
      confirmarRestaurar: {
        titulo: "Restaurar os dados de exemplo?",
        texto:
          "Os conteúdos, perguntas e baralhos que você criou ou editou somem, e os originais voltam.",
        confirmar: "Restaurar",
      },
      confirmarLimpar: {
        titulo: "Apagar todos os dados?",
        texto:
          "As três listas ficam vazias. Dá para trazer os exemplos de volta depois, mas o que você editou não volta.",
        confirmar: "Apagar tudo",
      },
    },

    perfil: {
      titulo: "Perfil",
      descricao:
        "O nome que aparece no topo do app. Não existe conta nem servidor por trás disso: é uma sessão guardada no seu navegador.",
      nome: "Nome",
      email: "E-mail",
      ajudaEmail: "Fica só no seu navegador. Nada é enviado para lugar nenhum.",
      salvar: "Salvar alterações",
      salvo: "Perfil atualizado.",
      sair: "Sair da sessão",
      erros: {
        nome: "Escreva pelo menos duas letras.",
        email: "Escreva um e-mail válido, como voce@exemplo.com.",
      },
    },
  },
}

/**
 * O modal que aparece uma vez por sessão quando o ponteiro sai da janela pela
 * borda de cima, no computador. No celular ele não existe.
 */
export const saida = {
  titulo: "Antes de fechar, uma pergunta sobre você",
  texto:
    "Você quer entender o que pode fazer pra crescer na carreira? Acabou de ver que dá pra criar um aplicativo inteiro. Agora tem um desafio de UX pronto pra você executar, resolvendo os problemas que existem neste produto que você acabou de ver.",
  primario: "Ver o desafio",
  secundario: "Agora não",
}

/**
 * A porta de entrada (`/entrar`).
 *
 * O passo a passo do Google mora aqui, e não dentro do modal, pelo mesmo motivo
 * do resto do arquivo: trocar de provedor (ou traduzir o tutorial) é editar
 * texto, não abrir componente.
 */
export const entrada = {
  voltar: "Voltar para o site",

  titulo: "Bem-vindo à equipe. Entra que eu te mostro",
  subtitulo:
    "Esta é a ferramenta que a gente usa aqui pra transformar conteúdo em pergunta. Entre com a conta da equipe ou use a entrada rápida enquanto o login não está ligado.",

  google: {
    botao: "Continuar com Google",
    /** Fica abaixo do botão quando as chaves NÃO estão no ambiente. */
    ajuda: "Ainda não está conectado. O botão mostra o passo a passo de configuração.",
    /** E este quando estão: aí o botão faz login de verdade. */
    ajudaLigado: "Você vai para o Google escolher a conta e volta para cá já dentro do app.",

    /**
     * O que aparece quando uma volta do Google não deu certo. A chave é o
     * `?google=` do endereço, escrito pelas rotas de `src/app/api/auth`.
     * Motivo que não estiver nesta lista não vira mensagem nenhuma: o endereço
     * é editável por qualquer pessoa, e texto vindo de lá não entra na tela.
     */
    avisos: {
      cancelado: "Você fechou a tela do Google antes de escolher a conta. Pode tentar de novo.",
      expirado: "A tentativa demorou demais e expirou por segurança. Clique de novo no botão.",
      incompleto: "O Google devolveu uma resposta incompleta. Tente mais uma vez.",
      falhou:
        "O Google recusou as credenciais deste app. Confira o Client ID, o Client Secret e o endereço de retorno cadastrado.",
      indisponivel:
        "O login com Google ainda não está configurado neste app. Use a entrada rápida por enquanto.",
    },
  },

  separador: "ou",

  campos: {
    usuario: {
      rotulo: "Seu nome ou e-mail da equipe",
      placeholder: "voce@equipe.com.br",
      ajuda: "É o nome que aparece no topo do app.",
      erro: "Escreva o seu nome ou o e-mail da equipe.",
    },
    senha: {
      rotulo: "Senha",
      placeholder: "Sua senha",
      ajuda: "Ela fica só neste navegador. Não é enviada para lugar nenhum.",
      erro: "Escreva a sua senha.",
    },
  },

  entrarDireto: "Entrar",
  aviso:
    "A senha não sai deste navegador e nada é enviado para servidor nenhum. Ligar o login de verdade é o próximo passo, e ele está explicado na página Como usar.",

  modalGoogle: {
    titulo: "Como conectar o Google de verdade",
    descricao:
      "São sete passos no Google Cloud Console. Você faz uma vez, guarda as duas chaves no projeto e o botão passa a funcionar.",

    passos: [
      {
        titulo: "Abra o Google Cloud Console",
        texto:
          "É o painel onde o Google guarda as credenciais dos seus projetos. Entre com a mesma conta que você já usa no dia a dia.",
        link: {
          rotulo: "Abrir o Console do Google",
          href: "https://console.cloud.google.com/apis/credentials",
        },
        codigo: "https://console.cloud.google.com/apis/credentials",
        codigoRotulo: "Endereço",
      },
      {
        titulo: "Crie um projeto",
        texto:
          "No seletor de projetos, no topo da página, escolha “Novo projeto”. O nome é só pra você se achar depois, então pode ser o nome do seu app.",
        codigo: "Vira Pergunta",
        codigoRotulo: "Nome sugerido",
      },
      {
        titulo: "Crie um ID do cliente OAuth",
        texto:
          "No menu lateral, siga o caminho abaixo. Se o Google pedir para configurar a tela de consentimento antes, escolha “Externo” e preencha só o nome do app e o seu e-mail de contato.",
        codigo: "Credenciais → Criar credenciais → ID do cliente OAuth",
        codigoRotulo: "Caminho no menu",
      },
      {
        titulo: "Escolha o tipo de aplicativo",
        texto:
          "No campo “Tipo de aplicativo”, selecione a opção abaixo. É ela que libera os dois campos dos próximos passos.",
        codigo: "Aplicativo da Web",
        codigoRotulo: "Tipo de aplicativo",
      },
      {
        titulo: "Autorize o endereço do seu app",
        texto:
          "Em “Origens JavaScript autorizadas”, clique em “Adicionar URI” e cole o endereço abaixo. É o endereço do app rodando na sua máquina.",
        codigo: "http://localhost:3000",
        codigoRotulo: "Origens JavaScript autorizadas",
      },
      {
        titulo: "Autorize o endereço de retorno",
        texto:
          "Em “URIs de redirecionamento autorizados”, clique em “Adicionar URI” e cole o endereço abaixo. É para onde o Google devolve a pessoa depois do login, e precisa bater caractere por caractere.",
        codigo: "http://localhost:3000/api/auth/callback/google",
        codigoRotulo: "URIs de redirecionamento autorizados",
      },
      {
        titulo: "Guarde as duas chaves no projeto",
        texto:
          "Ao salvar, o Google mostra o Client ID e o Client Secret. Crie um arquivo chamado .env.local na raiz do projeto e cole as três linhas abaixo, trocando o texto depois do “=” pelos valores que apareceram. A terceira é sua, e não vem do Google: é o segredo que assina a sua sessão, e pode ser qualquer texto embaralhado com 32 letras ou mais (no terminal, openssl rand -base64 32 gera um). Depois pare o servidor e rode npm run dev de novo.",
        codigo:
          "GOOGLE_CLIENT_ID=cole-aqui-o-seu-client-id\nGOOGLE_CLIENT_SECRET=cole-aqui-o-seu-client-secret\nAUTH_SECRET=cole-aqui-um-texto-aleatorio-longo",
        codigoRotulo: ".env.local",
      },
    ],

    nota: "O .env.local não vai para o Git, e não deve ir. O Client Secret é uma senha: se ele vazar, gere outro no mesmo lugar em que criou.",

    aviso:
      "Assim que as três linhas estiverem no .env.local, este botão passa a fazer login de verdade, sem você mexer em código nenhum. Enquanto isso, use os campos abaixo pra entrar.",

    fechar: "Entendi",
    copiar: "Copiar",
    copiado: "Copiado!",
    falhaCopia: "Não deu para copiar automaticamente. Selecione o texto acima e use Ctrl+C (ou Cmd+C).",
  },
}

/**
 * A tela do Desafio de UX, dentro do app.
 *
 * Ela é o gabarito do treino: conta o que dá pra refinar neste produto, como
 * medir a melhora e onde isso vira carreira. Nada aqui é dado pessoal de
 * ninguém: o texto fala do APP, não de quem construiu ele.
 */
export const desafio = {
  titulo: "Desafio de UX",
  descricao: "Um guia de refinamento pra levar este app pra perto de um produto de verdade.",

  abertura: {
    texto:
      "Este aplicativo foi construído com inteligência artificial, a partir de um prompt do método do Design Engineer. Se você quiser o seu, é de graça e sai com app e desafio junto.",
    link: {
      rotulo: "Pegar o meu prompt",
      href: "https://guiadeinstalacao.vercel.app/acelerador",
    },
  },

  refinar: {
    titulo: "O que refinar neste app",
    intro:
      "Todo produto que nasce rápido nasce cru, e refinar é o trabalho de verdade de quem faz produto. Este é o guia pra levar o Vira Pergunta pra perto de um produto real, pronto pra uso. Começa por um ponto só, e ele está às claras aqui embaixo.",

    ponto: {
      titulo: "O ponto a refinar, do jeito que ele está hoje",
      texto:
        "A primeira tela depois de entrar é um painel genérico de módulos, todos com o mesmo peso, sem nenhuma indicação do que fazer primeiro e sem atalho pra primeira ação de valor: a informação de por onde começar simplesmente não existe. Quem explora encontra tudo e completa qualquer coisa. Nada disso impede a tarefa, só ninguém guia.",
    },

    solucao: {
      titulo: "O caminho da solução",
      itens: [
        "Definir qual é a primeira ação de valor e desenhar a tela inteira em volta dela",
        "Substituir a tela inicial vazia por um estado que já ensina o caminho",
        "Reduzir o primeiro formulário ao mínimo. O resto pode vir depois",
        "Mostrar progresso quando houver mais de um passo",
        "Deixar pular qualquer tour, e não repetir para quem já passou",
      ],
    },

    teste: {
      titulo: "Como testar",
      intro:
        "Chame 5 pessoas parecidas com quem usaria isso de verdade, peça a tarefa principal sem ajudar, e observe:",
      itens: [
        "O que a pessoa faz nos primeiros 30 segundos, e se ela hesita",
        "Se ela pergunta “e agora?” em voz alta",
        "Quanto tempo até a primeira ação que gera valor de verdade",
        "Se ela encontra sozinha a função principal do produto",
      ],
    },

    metrica: {
      titulo: "O número que prova",
      nome: "Adoção",
      definicao:
        "Adoção é a pessoa conseguir usar uma funcionalidade pela primeira vez: descobrir que ela existe, entender pra que serve e chegar até o fim sem ninguém explicar.",
      comoMedir:
        "Percentual de pessoas que chegam à primeira ação de valor sem ajuda, e em quanto tempo.",
      meta: "De 45% em 4 minutos para 80% em 90 segundos, medindo com 5 pessoas antes e outras 5 depois.",
      fecho:
        "O antes se mede com o ponto a refinar ainda no lugar, e o depois com o refinamento feito. Os dois números juntos, com os prints das duas versões, são o seu case.",
      rotulos: {
        metrica: "Métrica",
        comoMedir: "Como medir",
        meta: "A meta",
      },
    },

    armadilha: {
      titulo: "A armadilha a evitar",
      texto:
        "Resolver com um tour de 5 balõezinhos. Tour é curativo: a pessoa clica em “pular” e o problema continua. Melhor é a tela se explicar sozinha.",
    },
  },

  carreira: {
    titulo: "O que isso tem a ver com carreira",
    paragrafos: [
      "O que separa quem desenha tela de quem faz produto é resolver o problema certo, entender a jornada de quem usa e melhorar uma métrica de verdade.",
      "Um antes e depois medido com gente real vale mais num portfólio do que qualquer tela bonita.",
    ],
    /**
     * O último parágrafo vem partido porque tem link no meio dele. Montar isso
     * como uma string com HTML dentro seria pior de traduzir e de auditar.
     */
    fecho: {
      antes: "E é exatamente esse ciclo, achar o problema, corrigir, medir e contar, que se aprende nas formações do Design Engineer: o ",
      link1: { rotulo: "UX Unicórnio", href: "https://www.designengineer.com.br/matriculas" },
      meio: " e a ",
      link2: {
        rotulo: "Pós/MBA em Inovação orientada a IA e UX",
        href: "https://leandrorezende.unifast.com.br/mba-em-inovacao-orientada-a-ia-e-ux-vc/",
      },
      depois: ".",
    },
  },

  fecho: {
    primario: {
      rotulo: "Ver o meu desafio de design",
      href: "https://guiadeinstalacao.vercel.app/desafio/hMwsBomPC1vAPpj6AUCY05wXbeoBAjxdsNoFD4ToGNTc2mj2ArSg0_BGi7H5lWdAPBoXd4CF7marN0noqzG-xg",
    },
    secundario: {
      rotulo: "Garantir meu ingresso do workshop",
      href: "https://www.designengineer.com.br/primeiroapp",
    },
    linkedin: {
      rotulo: "Quer conversar? Vamos conversar no LinkedIn",
      href: "https://www.linkedin.com/in/lbrezende/",
    },
  },
}

/**
 * A página Como usar (`/como-usar`).
 *
 * Ela é escrita pra quem é dono deste app e pra quem for ver ele por cima do
 * ombro: o que já funciona, o que falta ligar e onde cada peça encaixa.
 */
export const comoUsar = {
  titulo: "Como usar o Vira Pergunta",
  subtitulo:
    "O que já está de pé, o que ainda falta conectar e onde cada coisa encaixa no projeto. Sem termo técnico solto: cada bloco diz o que você ganha.",
  voltar: "Voltar para o site",
  entrar: "Entrar no app",

  pronto: {
    titulo: "O que este app já faz hoje",
    subtitulo: "Tudo abaixo funciona agora, sem configurar nada.",
    itens: [
      {
        icone: "inicio",
        titulo: "O site na frente",
        texto:
          "O endereço da raiz abre uma página que explica o produto para quem chega na equipe, com a prévia do app desenhada em HTML, sem arquivo de imagem nenhum.",
      },
      {
        icone: "usuario",
        titulo: "A tela de entrar",
        texto:
          "Botão do Google com o passo a passo de configuração dentro, campo de usuário, campo de senha e o botão de entrar. A sessão fica no seu navegador.",
      },
      {
        icone: "pergunta",
        titulo: "Perguntas",
        texto:
          "Você escolhe o conteúdo e vê as perguntas que saíram dele, com a resposta escondida até você pedir. É a tela de quem abre o app pra estudar.",
      },
      {
        icone: "conteudo",
        titulo: "Conteúdos",
        texto:
          "O material colado, agrupado por disciplina e por tema, com o botão que gera as perguntas a partir do texto.",
      },
      {
        icone: "baralho",
        titulo: "Baralhos",
        texto:
          "As cartas escolhidas pra revisar de uma vez, e a revisão carta a carta: você responde de cabeça, vira e marca se acertou.",
      },
      {
        icone: "respostas",
        titulo: "Respostas",
        texto:
          "O que continua errado depois das revisões, agrupado por conteúdo, com o caminho pra ajustar a pergunta ou o material.",
      },
      {
        icone: "dados",
        titulo: "Dados de exemplo",
        texto:
          "O app já nasce com uma semana de conteúdo dentro, e a tela de configurações tem um botão que restaura e outro que limpa tudo.",
      },
      {
        icone: "paleta",
        titulo: "Design system aplicado e celular resolvido",
        texto:
          "Cor, tipografia e raio saem de um arquivo só, e toda tela funciona em 375 pixels de largura, com alvo de toque de 44 pixels.",
      },
    ],
  },

  conectar: {
    titulo: "O que ainda falta conectar, e onde cada coisa encaixa",
    subtitulo:
      "Cada item diz o que é, o que muda no app quando ligar, e o arquivo do projeto onde ele já está esperando.",
    itens: [
      {
        icone: "email",
        titulo: "Envio de e-mail",
        texto:
          "Confirmação, lembrete de prova e aviso de baralho novo. A chave já tem lugar reservado no modelo de variáveis, e a rota nasce ao lado das que já existem.",
        onde: ".env.example → RESEND_API_KEY, e src/app/api",
      },
      {
        icone: "dados",
        titulo: "Backend e banco de dados",
        texto:
          "Hoje os dados ficam no navegador de quem usa. O caminho pro banco já nasceu escrito e testado: ligar o Neon é colar a string de conexão no .env.local, e a partir dali o mesmo app grava no Postgres. Zero linha de código, nenhuma tela mudando. Isso é o desenho do projeto, não é sorte.",
        onde: "src/lib/banco.ts, src/app/api/dados e src/lib/store.ts",
      },
      {
        icone: "seguranca",
        titulo: "Login com Google",
        texto:
          "O caminho inteiro já está montado e desligado: o botão na tela de entrar, o passo a passo dentro dele e as rotas prontas. Colou GOOGLE_CLIENT_ID e GOOGLE_CLIENT_SECRET no .env.local, ligou.",
        onde: "src/lib/google.ts, src/lib/sessao-servidor.ts e src/app/api/auth",
      },
      {
        icone: "gerar",
        titulo: "A API da OpenAI",
        texto:
          "É ela que troca as perguntas de exemplo pelas perguntas de verdade, lidas do texto que você colou. E serve também pra resumir, classificar e conversar dentro do app. A chave tem grupo próprio no modelo de variáveis, e a rota nasce no servidor, nunca no navegador.",
        onde: ".env.example → OPENAI_API_KEY, e src/app/api",
      },
      {
        icone: "telefone",
        titulo: "WhatsApp",
        texto:
          "Avisar quem usa o app pelo canal que a pessoa realmente lê: o baralho da prova de sexta chega no celular na quinta à noite.",
        onde: ".env.example → WHATSAPP_TOKEN",
      },
      {
        icone: "restaurar",
        titulo: "Automações",
        texto:
          "O n8n já está no projeto, com o arquivo pronto pra subir e um guia com dois exemplos desenhados. É por ele que passam WhatsApp, e-mail, planilha e agendamento sem escrever código.",
        onde: "n8n/docker-compose.yml e n8n/README.md",
      },
      {
        icone: "paleta",
        titulo: "Storybook",
        texto:
          "O catálogo de componentes deste app, já configurado, com os tokens aplicados e auditoria de acessibilidade em cada componente. É o que transforma o projeto numa biblioteca que dá pra mostrar.",
        onde: ".storybook e os arquivos .stories.tsx ao lado de cada componente",
      },
    ],
    ondeRotulo: "Onde encaixa",
  },

  workshop: {
    titulo: "Onde tudo isso se aprende",
    texto:
      "Tudo o que está na lista acima é ensinado no workshop. Não é pesquisa solta na internet, não é tentativa e erro: é ao vivo, passo a passo, em cima deste projeto aqui, que já veio com todos os encaixes prontos justamente pra isso.",
    acao: "Garantir meu ingresso do workshop",
    href: "https://www.designengineer.com.br/primeiroapp",
  },

  caminhos: {
    titulo: "Os dois caminhos depois disso",
    itens: [
      {
        icone: "formacao",
        titulo: "Pós-graduação e MBA",
        paraQuem: "Pra quem já é designer e quer liderança com IA",
        texto:
          "Inteligência artificial em processos, em research ops e em design ops, com o repertório de quem vai conduzir o time.",
        acao: "Conhecer a Pós/MBA",
        href: "https://leandrorezende.unifast.com.br/mba-em-inovacao-orientada-a-ia-e-ux-vc/",
      },
      {
        icone: "ideia",
        titulo: "Formação IA/UX Designer",
        paraQuem: "Pra quem já é designer mas ainda não aplica IA no dia a dia",
        texto: "O caminho pra sair usando, do primeiro prompt ao produto entregue.",
        acao: "Conhecer a formação",
        href: "https://www.designengineer.com.br/matriculas",
      },
    ],
    paraQuemRotulo: "Pra quem é",
  },

  proximos: {
    titulo: "Os meus próximos passos",
    itens: [
      "Usar o app com conteúdo de verdade por uma semana",
      "Anotar tudo o que incomodar, mesmo o que parecer detalhe",
      "Escrever o caso pro portfólio contando o problema e a decisão",
      "Entrar no workshop pra ligar backend, login e envio",
      "Publicar o caso na lista de portfólios do UX Unicórnio",
    ],
  },
}
