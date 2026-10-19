import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Check, Sparkles } from "lucide-react";
import { marca } from "@/content/site";
import { v2 } from "@/content/site-v2";
import "./v2.css";

const fotos = {
  hero: "/images/leandro/campaign-hero.jpg",
  retrato: "/images/leandro/campaign-authority.jpg",
  clareza: "/images/leandro/career-clarity-v2.jpg",
  evolucao: "/images/leandro/campaign-evolution.jpg",
  pratica: "/images/leandro/campaign-practice.jpg",
  conquista: "/images/leandro/campaign-achievement.jpg",
  repertorio: "/images/leandro/campaign-repertoire.jpg",
};

export function PaginaV2() {
  return (
    <div className="dimension-page min-h-dvh overflow-hidden bg-canvas text-ink">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-black"
      >
        Pular para o conteúdo
      </a>
      <Cabecalho />
      <main id="conteudo" tabIndex={-1}>
        <Heroi />
        <Manifesto />
        <ComoFunciona />
        <Caminho />
        <Prova />
        <ChamadaFinal />
      </main>
      <Rodape />
    </div>
  );
}

function Cabecalho() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
      <nav
        aria-label={v2.nav.navegacao}
        className="glass-nav mx-auto flex max-w-[1180px] items-center justify-between rounded-[20px] px-3 py-2"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-full px-2 py-1"
        >
          <span className="flex size-8 items-center justify-center rounded-full bg-white text-sm text-black">
            F
          </span>
          <span className="text-sm font-medium text-white">
            FlashProfession
          </span>
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {v2.nav.links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.rotulo}
            </a>
          ))}
        </div>
        <Link
          href="/entrar"
          data-tour="entrar"
          className="button-white h-10 px-4 text-sm"
        >
          Começar agora <ArrowRight className="size-4" />
        </Link>
      </nav>
    </header>
  );
}

function Heroi() {
  return (
    <section className="hero-horizon relative min-h-[900px] px-4 pt-28 pb-20 md:px-8 md:pt-36">
      <div className="noise" aria-hidden="true" />
      <div className="relative z-10 mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div className="max-w-2xl">
          <p className="eyebrow">
            <Sparkles className="size-3.5" /> Inteligência para a sua próxima
            carreira
          </p>
          <h1 className="mt-7 text-[clamp(3.35rem,7vw,6.6rem)] leading-[.92] font-medium tracking-[-.06em] text-white">
            Sua carreira,
            <br />
            sem andar
            <br />
            <span className="text-white/50">no escuro.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-white/70 md:text-lg">
            Descubra seu nível real, enxergue o caminho inteiro e saiba
            exatamente o que fazer agora para chegar mais longe.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/entrar" className="button-white h-12 px-6">
              Descobrir meu nível <ArrowRight className="size-4" />
            </Link>
            <a href="#como-funciona" className="button-ghost h-12 px-6">
              Ver como funciona <ArrowDown className="size-4" />
            </a>
          </div>
          <p className="mt-5 text-xs tracking-wide text-white/50">
            15 MINUTOS · SEM CARTÃO · PROGRESSO SALVO
          </p>
        </div>
        <div className="hero-visual relative mx-auto h-[560px] w-full max-w-[650px] md:h-[650px]">
          <div className="photo-frame absolute inset-x-4 top-0 h-[570px] overflow-hidden rounded-[42px] md:inset-x-0 md:h-[650px]">
            <Image
              src={fotos.hero}
              alt="Leandro em um estúdio visualizando uma trajetória profissional"
              fill
              priority
              sizes="(max-width:1024px) 92vw,55vw"
              className="object-cover object-[50%_38%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-white/5" />
          </div>
          <div className="glass-panel absolute -left-1 top-14 w-52 rounded-3xl p-4 md:-left-12 md:top-20 md:w-60">
            <div className="flex justify-between text-[10px] tracking-[.16em] text-white/50">
              <span>DIAGNÓSTICO</span>
              <span>02/05</span>
            </div>
            <p className="mt-5 text-sm text-white">Seu nível hoje</p>
            <p className="mt-1 text-3xl font-medium tracking-tight text-white">
              Fundamentos
            </p>
            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
              <span className="block h-full w-[42%] rounded-full bg-white" />
            </div>
          </div>
          <div className="glass-panel absolute right-0 bottom-2 w-[260px] rounded-3xl p-4 md:-right-8 md:bottom-8 md:w-[300px]">
            <p className="text-[10px] tracking-[.16em] text-white/50">
              PRÓXIMA AÇÃO
            </p>
            <p className="mt-3 text-lg leading-tight text-white">
              Conduzindo sem contaminar
            </p>
            <div className="mt-5 flex items-center justify-between">
              <span className="text-xs text-white/50">12 min · Pesquisa</span>
              <span className="flex size-9 items-center justify-center rounded-full bg-white text-black">
                <ArrowRight className="size-4" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="relative px-4 py-24 md:px-8 md:py-36">
      <div className="spotlight" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-[1180px] gap-14 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
        <div>
          <p className="section-index">01 — CLAREZA</p>
          <h2 className="section-title mt-5">
            Talento sem direção custa tempo.
          </h2>
        </div>
        <p className="max-w-2xl text-2xl leading-[1.35] tracking-[-.025em] text-white/55 md:text-4xl">
          Você não precisa de mais conteúdo. Precisa saber{" "}
          <span className="text-white">onde está, o que falta</span> e qual
          movimento muda o jogo agora.
        </p>
      </div>
      <div className="mx-auto mt-20 grid max-w-[1180px] gap-4 md:grid-cols-12">
        <FotoCard
          src={fotos.clareza}
          alt="Leandro visualizando uma trajetória profissional em cinco etapas"
          className="h-[510px] md:col-span-7"
          label="Direção com clareza"
        />
        <div className="glass-card flex min-h-[420px] flex-col justify-between rounded-[36px] p-7 md:col-span-5 md:p-10">
          <span className="text-xs tracking-[.2em] text-white/40">
            FLASH / 01
          </span>
          <div>
            <p className="text-6xl font-medium tracking-[-.06em] text-white">
              5
            </p>
            <h3 className="mt-5 text-2xl text-white">níveis sempre à vista</h3>
            <p className="mt-3 leading-7 text-white/50">
              Da primeira descoberta até a liderança, com critérios objetivos
              para avançar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ComoFunciona() {
  return (
    <section id="como-funciona" className="px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1180px]">
        <p className="section-index">02 — COMO FUNCIONA</p>
        <div className="mt-5 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="section-title max-w-2xl">
            Do primeiro clique ao próximo nível.
          </h2>
          <p className="max-w-sm text-white/50">
            Três passos. O primeiro leva menos de quinze minutos.
          </p>
        </div>
        <ol className="mt-16 divide-y divide-white/10 border-y border-white/10">
          {v2.comoFunciona.passos.map((passo) => (
            <li
              key={passo.numero}
              className="step-row grid gap-5 py-8 md:grid-cols-[80px_1fr_1fr] md:items-center md:py-10"
            >
              <span className="text-sm text-white/35">{passo.numero}</span>
              <h3 className="text-2xl tracking-[-.03em] text-white md:text-3xl">
                {passo.titulo}
              </h3>
              <p className="max-w-md leading-7 text-white/50">{passo.texto}</p>
            </li>
          ))}
        </ol>
        <Link href="/entrar" className="button-white mt-10 h-12 px-6">
          Quero comprar agora <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}

function Caminho() {
  const niveis = [
    "Iniciante",
    "Fundamentos",
    "Execução",
    "Estratégia",
    "Liderança",
  ];
  return (
    <section id="caminho" className="px-4 py-24 md:px-8 md:py-36">
      <div className="mx-auto grid max-w-[1180px] gap-5 lg:grid-cols-2">
        <FotoCard
          src={fotos.evolucao}
          alt="Leandro avançando por uma sequência de cinco portais iluminados"
          className="min-h-[680px]"
          label="Evolução visível"
        />
        <div className="glass-card rounded-[40px] p-7 md:p-11">
          <p className="section-index">03 — O CAMINHO</p>
          <h2 className="mt-6 text-4xl leading-[1.02] tracking-[-.05em] text-white md:text-6xl">
            O destino fica mais perto quando o mapa está aberto.
          </h2>
          <ol className="mt-12">
            {niveis.map((nivel, i) => (
              <li
                key={nivel}
                className="flex items-center gap-4 border-t border-white/10 py-4"
              >
                <span
                  className={`flex size-8 items-center justify-center rounded-full text-xs ${i < 2 ? "bg-white text-black" : "border border-white/15 text-white/35"}`}
                >
                  {i < 2 ? <Check className="size-3.5" /> : i + 1}
                </span>
                <span className={i < 2 ? "text-white" : "text-white/45"}>
                  {nivel}
                </span>
                {i === 1 && (
                  <span className="ml-auto rounded-full border border-white/15 px-3 py-1 text-[10px] tracking-wider text-white/55">
                    VOCÊ ESTÁ AQUI
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Prova() {
  return (
    <section className="px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-10 md:grid-cols-2 md:items-end">
          <div>
            <p className="section-index">04 — AUTORIDADE</p>
            <h2 className="section-title mt-5">Aprender, aplicar e provar.</h2>
          </div>
          <p className="max-w-lg text-lg leading-8 text-white/50">
            Conhecimento só vira carreira quando aparece no trabalho. Cada
            desafio concluído se transforma em evidência e case para o seu
            perfil.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-4">
          <FotoCard
            src={fotos.retrato}
            alt="Retrato profissional de Leandro"
            className="col-span-2 h-[480px] md:col-span-4 md:h-[620px]"
            label="Presença"
          />
          <FotoCard
            src={fotos.pratica}
            alt="Leandro desenvolvendo um projeto em um estúdio de criação"
            className="h-[360px] md:col-span-5 md:h-[620px]"
            label="Prática"
          />
          <div className="grid gap-3 md:col-span-3 md:gap-4">
            <FotoCard
              src={fotos.conquista}
              alt="Leandro diante de um projeto concluído"
              className="h-[220px] md:h-auto"
              label="Conquista"
            />
            <FotoCard
              src={fotos.repertorio}
              alt="Leandro explorando materiais e referências em um estúdio"
              className="h-[220px] md:h-auto"
              label="Repertório"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ChamadaFinal() {
  return (
    <section className="px-4 py-10 md:px-8 md:py-20">
      <div className="final-horizon relative mx-auto max-w-[1180px] overflow-hidden rounded-[42px] px-6 py-20 text-center md:px-12 md:py-28">
        <div className="noise" aria-hidden="true" />
        <p className="relative text-xs tracking-[.2em] text-white/60">
          SEU PRÓXIMO NÍVEL COMEÇA AQUI
        </p>
        <h2 className="relative mx-auto mt-6 max-w-4xl text-[clamp(3rem,7vw,6rem)] leading-[.94] tracking-[-.06em] text-white">
          Pare de adivinhar.
          <br />
          Comece a avançar.
        </h2>
        <p className="relative mx-auto mt-6 max-w-xl text-white/60">
          Quinze minutos. Um nível real. Uma próxima ação clara.
        </p>
        <Link href="/entrar" className="button-white relative mt-9 h-12 px-7">
          Descobrir meu nível <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}

function FotoCard({
  src,
  alt,
  className,
  label,
}: {
  src: string;
  alt: string;
  className: string;
  label: string;
}) {
  return (
    <figure
      className={`photo-card group relative overflow-hidden rounded-[36px] ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width:768px) 100vw,50vw"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
      <figcaption className="absolute right-5 bottom-5 left-5 flex justify-between text-xs tracking-[.18em] text-white/70">
        <span>{label.toUpperCase()}</span>
        <span>↗</span>
      </figcaption>
    </figure>
  );
}

function Rodape() {
  return (
    <footer className="mx-auto flex max-w-[1180px] flex-col gap-3 px-4 py-12 text-xs text-white/35 md:flex-row md:justify-between md:px-8">
      <span>© 2026 {marca.nome}</span>
      <span>Clareza para construir uma carreira que cresce.</span>
    </footer>
  );
}
