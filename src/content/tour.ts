/**
 * O texto do tour de boas-vindas.
 *
 * Ele roda uma vez, na primeira visita, e ATRAVESSA PÁGINAS: começa no site,
 * continua dentro do app e termina na tela do desafio. A última parada é de
 * propósito: ela conta que o tour inteiro é código do projeto e pode ser mudado
 * ou removido a pedido, porque quem abriu este app tem que sair sabendo que
 * manda nele.
 *
 * `pagina` é o endereço onde a parada acontece, e ele vale também pras telas de
 * dentro dele: "/app" acontece em "/app/perguntas" também. Vazio significa
 * "onde a pessoa estiver". As paradas seguem a ordem desta lista, então elas
 * são também o roteiro da jornada: site, depois app, depois o desafio.
 *
 * `alvo` é um seletor de CSS. Parada sem alvo aparece no centro da tela. Se o
 * alvo não existir na página (você renomeou a tela, tirou o menu), a parada é
 * PULADA em vez de quebrar o tour: veja `tour.tsx`.
 */

export const tour = {
  /** Nome dos controles do próprio tour. */
  proximo: "Próximo",
  anterior: "Voltar",
  fechar: "Fechar",
  /** Aparece no fim de cada trecho, então serve tanto pra continuar quanto pra fechar. */
  concluir: "Entendi",

  /** Botão que existe na tela de configurações pra rodar o tour de novo. */
  rever: {
    titulo: "Rever as boas-vindas",
    texto: "Roda de novo aquele passo a passo que apareceu na primeira vez que você entrou.",
    acao: "Ver de novo",
  },

  paradas: [
    {
      pagina: "/",
      alvo: "[data-tour='entrar']",
      titulo: "Essa é a sua página",
      texto: "Quer ver o sistema por dentro? Clica em entrar, que eu continuo lá.",
    },
    {
      pagina: "/app",
      alvo: "[data-tour='desafio']",
      titulo: "Esse é o seu sistema",
      texto:
        "Clicando aqui você abre um desafio de design que eu preparei pra você refinar este app.",
    },
    {
      pagina: "/app/desafio",
      alvo: "[data-tour='conteudo']",
      titulo: "Esse é o seu desafio",
      texto:
        "Agora você pode pedir o que quiser pro seu assistente, do mesmo jeito que criou o app inteiro, e pedir as melhorias pra treinar.",
    },
    {
      pagina: "/app/desafio",
      alvo: "[data-tour='desafio-fecho']",
      titulo: "Depois de melhorar, publique de novo",
      texto:
        "O próximo passo é pedir pro seu assistente atualizar o seu link público, pra melhoria aparecer pra quem abrir.",
    },
    {
      pagina: "/app/desafio",
      alvo: null,
      titulo: "E este passo a passo também é seu",
      texto:
        "Você pode inclusive pedir pra ele remover este onboarding, e o seu sistema fica mais limpo.",
    },
  ],
}
