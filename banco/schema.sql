-- =============================================================================
-- O QUE O APP CRIA SOZINHO NO NEON
-- =============================================================================
--
-- Você NÃO precisa rodar este arquivo. Na primeira vez que o app fala com o
-- banco, ele executa exatamente isto (veja `preparar()` em src/lib/banco.ts).
-- O arquivo existe pra você poder LER o desenho sem caçar dentro do código, e
-- pra rodar na mão se um dia quiser recriar o banco do zero.
--
-- Como rodar na mão, se quiser: abra o SQL Editor no painel do Neon
-- (https://console.neon.tech), cole tudo e execute.
-- =============================================================================

CREATE TABLE IF NOT EXISTS registros (
  colecao    text        NOT NULL,   -- 'conteudos', 'perguntas', 'baralhos'
  id         text        NOT NULL,   -- o mesmo id que o app já usa (con-a1b2c3)
  dados      jsonb       NOT NULL,   -- o registro inteiro, do jeito que a tela lê
  criado_em  timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (colecao, id)
);

CREATE INDEX IF NOT EXISTS registros_colecao_criado_em
  ON registros (colecao, criado_em DESC);


-- =============================================================================
-- O PRÓXIMO DESENHO, QUANDO VOCÊ QUISER IR ALÉM
-- =============================================================================
--
-- Uma tabela com jsonb aguenta o app inteiro e sobrevive a você trocar os
-- campos de ideia. O que ela não te dá é o banco conferindo as suas regras:
-- hoje nada impede uma pergunta apontar pra um conteúdo que não existe, e
-- "quantas perguntas de Biologia continuam erradas" vira uma consulta feia.
--
-- Quando fizer sentido trocar, o desenho é este. Repare no que ele ganha: o
-- REFERENCES não deixa pergunta órfã existir, o ON DELETE CASCADE apaga as
-- filhas sozinho (hoje isso é código nosso, em dois lugares), e cada campo
-- ganha tipo de verdade.
--
-- CREATE TABLE conteudos (
--   id         text PRIMARY KEY,
--   titulo     text NOT NULL,
--   disciplina text NOT NULL DEFAULT '',
--   tema       text NOT NULL DEFAULT '',
--   texto      text NOT NULL DEFAULT '',
--   criado_em  timestamptz NOT NULL DEFAULT now()
-- );
--
-- CREATE TABLE perguntas (
--   id          text PRIMARY KEY,
--   conteudo_id text NOT NULL REFERENCES conteudos(id) ON DELETE CASCADE,
--   enunciado   text NOT NULL,
--   resposta    text NOT NULL DEFAULT '',
--   resultado   text,                 -- 'acertei', 'errei' ou nulo (não revisada)
--   criado_em   timestamptz NOT NULL DEFAULT now()
-- );
--
-- CREATE TABLE baralhos (
--   id        text PRIMARY KEY,
--   nome      text NOT NULL,
--   criado_em timestamptz NOT NULL DEFAULT now()
-- );
--
-- -- A carta é a ligação entre um baralho e uma pergunta, com a ordem dentro do
-- -- baralho. Hoje isso é o array `perguntaIds` dentro do próprio baralho.
-- CREATE TABLE cartas (
--   baralho_id  text NOT NULL REFERENCES baralhos(id)  ON DELETE CASCADE,
--   pergunta_id text NOT NULL REFERENCES perguntas(id) ON DELETE CASCADE,
--   posicao     integer NOT NULL DEFAULT 0,
--   PRIMARY KEY (baralho_id, pergunta_id)
-- );
