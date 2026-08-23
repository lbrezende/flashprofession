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
  colecao    text        NOT NULL,   -- 'jornadas', 'evidencias', 'sessoes'
  id         text        NOT NULL,   -- o mesmo id que o app já usa (jor-a1b2c3)
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
-- hoje nada impede uma evidência apontar pra uma jornada que não existe, e
-- "quantas horas por semana cada pessoa estudou" vira uma consulta feia.
--
-- Quando fizer sentido trocar, o desenho é este. Repare no que ele ganha: o
-- REFERENCES não deixa evidência órfã existir, o ON DELETE CASCADE apaga as
-- filhas sozinho, e cada campo ganha tipo de verdade.
--
-- CREATE TABLE jornadas (
--   id           text PRIMARY KEY,
--   profissao_id text,
--   etapa        text NOT NULL DEFAULT 'novo',
--   resultado    jsonb,               -- nível, confiança, domínio por competência
--   publico      jsonb,               -- opt-in de ranking e visibilidade
--   criado_em    timestamptz NOT NULL DEFAULT now()
-- );
--
-- CREATE TABLE evidencias (
--   id          text PRIMARY KEY,
--   jornada_id  text REFERENCES jornadas(id) ON DELETE CASCADE,
--   desafio_id  text,
--   origem      text NOT NULL,        -- autodeclaração, teste, tarefa, revisão humana
--   estado      text NOT NULL DEFAULT 'rascunho',
--   artefato    jsonb,
--   criado_em   timestamptz NOT NULL DEFAULT now()
-- );
--
-- CREATE TABLE sessoes (
--   id         text PRIMARY KEY,
--   jornada_id text REFERENCES jornadas(id) ON DELETE CASCADE,
--   tipo       text NOT NULL,         -- video, avaliacao, pratica
--   minutos    integer NOT NULL,
--   data       date NOT NULL
-- );
