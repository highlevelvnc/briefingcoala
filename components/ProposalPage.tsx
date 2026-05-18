"use client";

import { useEffect, useRef, useState } from "react";
import type { Proposal } from "@/lib/proposals";
import { initScrollReveal } from "@/lib/scrollReveal";

export default function ProposalPage({ proposal }: { proposal: Proposal }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showFab, setShowFab] = useState(false);
  const [heroOffset, setHeroOffset] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  // Scroll reveal init
  useEffect(() => {
    const cleanup = initScrollReveal();
    return cleanup;
  }, []);

  // Hero parallax + floating WhatsApp visibility
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setHeroOffset(y * 0.25);
        setShowFab(y > 600);
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const haptic = (ms = 8) => {
    try {
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        (navigator as any).vibrate?.(ms);
      }
    } catch {}
  };

  return (
    <main className="min-h-screen pb-32 bg-[#fafaf7]">
      {/* Hero */}
      <header
        ref={heroRef}
        className="hero-bg text-white px-5 pt-14 pb-14 md:px-8 md:pt-20 md:pb-20 pt-safe relative overflow-hidden"
      >
        <div
          className="orb"
          style={{
            width: 320,
            height: 320,
            background: "#f59e0b",
            top: -80,
            right: -60,
            transform: `translate(0, ${heroOffset * 0.4}px)`,
          }}
        />
        <div
          className="orb"
          style={{
            width: 260,
            height: 260,
            background: "#8b5cf6",
            bottom: -100,
            left: -60,
            animationDelay: "1.5s",
            transform: `translate(0, ${heroOffset * -0.3}px)`,
          }}
        />

        <div
          className="max-w-2xl mx-auto relative"
          style={{ transform: `translateY(${heroOffset * 0.3}px)` }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur mb-6"
            data-reveal
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <p className="text-[10px] font-semibold tracking-[0.2em] text-gray-200">
              PROPOSTA COMERCIAL · {new Date().getFullYear()}
            </p>
          </div>
          <h1
            className="text-4xl md:text-6xl font-semibold mb-4 leading-[1.02] tracking-tight"
            data-reveal
          >
            Marketing 360°
            <br />
            <span className="bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 bg-clip-text text-transparent">
              para a {proposal.clientName}
            </span>
          </h1>
          <p
            className="text-gray-300 text-base md:text-lg mb-7 leading-relaxed max-w-xl"
            data-reveal
          >
            {proposal.intro}
          </p>
          <div className="flex flex-wrap items-center gap-3" data-reveal>
            <a
              href="#planos"
              onClick={() => haptic(8)}
              className="tap-scale inline-flex items-center gap-2 bg-white text-gray-900 font-semibold px-5 py-3 rounded-xl text-sm hover:bg-gray-100 transition-colors"
            >
              Ver investimento <span aria-hidden>↓</span>
            </a>
            <a
              href={proposal.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => haptic(8)}
              className="tap-scale inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-5 py-3 rounded-xl text-sm transition-colors backdrop-blur"
            >
              Falar agora
            </a>
          </div>
          <p className="text-xs text-gray-500 mt-8" data-reveal>
            {proposal.clientCity} · Preparado por {proposal.agencyName}
          </p>
        </div>

        {/* Bottom strip — scrolling values */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 overflow-hidden h-9 flex items-center">
          <div className="marquee-track flex gap-12 whitespace-nowrap text-[11px] text-gray-400 font-medium px-5">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex gap-12 whitespace-nowrap">
                <span>◆ Branding completo de cortesia</span>
                <span>◆ Tráfego pago personalizado</span>
                <span>◆ Atendimento direto</span>
                <span>◆ Branding completo de cortesia</span>
                <span>◆ Cronograma transparente</span>
                <span>◆ Sem letra miúda</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-5 md:px-8 py-12 space-y-14">
        {/* Diagnóstico */}
        <section data-reveal>
          <SectionHeader eyebrow="DIAGNÓSTICO" title={proposal.diagnostic.title} />
          <div className="space-y-3">
            {proposal.diagnostic.points.map((p, i) => (
              <div
                key={i}
                data-reveal
                style={{ transitionDelay: `${i * 80}ms` }}
                className="bg-white border border-gray-200 rounded-2xl p-4 md:p-5 flex gap-4 items-start section-card"
              >
                <span className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-50 to-white flex items-center justify-center text-2xl ring-1 ring-black/5 shadow-sm">
                  {p.icon}
                </span>
                <div className="min-w-0">
                  <h3 className="font-semibold text-[15px] mb-1 tracking-tight">
                    {p.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Objetivos */}
        <section data-reveal>
          <SectionHeader eyebrow="OBJETIVO" title="3 frentes em paralelo" />
          <div className="grid grid-cols-1 gap-3">
            {proposal.goals.map((g, i) => (
              <div
                key={i}
                data-reveal
                style={{ transitionDelay: `${i * 100}ms` }}
                className="relative bg-white border border-gray-200 rounded-2xl p-5 section-card overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-100/40 to-transparent rounded-full blur-2xl pointer-events-none" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{g.icon}</span>
                    <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent" />
                    <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 tabular-nums">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-1 tracking-tight">
                    {g.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{g.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Planos */}
        <section id="planos" className="scroll-mt-6" data-reveal>
          <SectionHeader eyebrow="INVESTIMENTO" title="Escolhe o teu plano" />
          <div className="space-y-5">
            {proposal.plans.map((plan, idx) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                whatsappUrl={proposal.whatsappUrl}
                delay={idx * 120}
                onTap={() => haptic(10)}
              />
            ))}
          </div>

          {/* Comparison hint */}
          <p
            className="text-xs text-center text-gray-500 mt-5"
            data-reveal
          >
            Ambos os planos incluem o pacote de branding completo · Pode subir de
            plano a qualquer momento
          </p>
        </section>

        {/* Bonus de branding */}
        <section data-reveal>
          <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-3xl p-6 md:p-8 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.18),transparent_60%)] pointer-events-none" />
            <div className="absolute top-4 right-4 sparkle text-amber-300 text-xl">
              ✦
            </div>
            <div
              className="absolute top-12 right-10 sparkle text-amber-300 text-sm"
              style={{ animationDelay: "0.5s" }}
            >
              ✦
            </div>
            <div
              className="absolute top-8 right-20 sparkle text-amber-200 text-xs"
              style={{ animationDelay: "1s" }}
            >
              ✦
            </div>
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 mb-4">
                <span className="text-[10px] font-bold tracking-[0.2em] text-amber-300">
                  ✦ INCLUÍDO EM AMBOS OS PLANOS ✦
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold mb-3 tracking-tight">
                {proposal.bonus.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                {proposal.bonus.description}
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {proposal.bonus.items.map((item, i) => (
                  <li
                    key={i}
                    data-reveal
                    style={{ transitionDelay: `${i * 50}ms` }}
                    className="flex items-start gap-2 text-sm text-gray-200"
                  >
                    <span className="text-amber-300 mt-0.5 flex-shrink-0">◆</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Timeline 3 meses */}
        <section data-reveal>
          <SectionHeader
            eyebrow="CRONOGRAMA"
            title="Por que 3 meses no mínimo?"
          />
          <div className="space-y-0 relative">
            <div className="absolute left-5 top-5 bottom-5 w-px bg-gradient-to-b from-gray-300 via-gray-200 to-transparent" />
            {proposal.timeline.map((t, i) => (
              <div
                key={i}
                data-reveal
                style={{ transitionDelay: `${i * 120}ms` }}
                className="flex gap-4 pb-5 last:pb-0 relative"
              >
                <div className="flex-shrink-0 relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-900 to-gray-700 text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-[#fafaf7]">
                    M{i + 1}
                  </div>
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 mb-0.5">
                    {t.month.toUpperCase()}
                  </p>
                  <h3 className="font-semibold text-base mb-1 tracking-tight">
                    {t.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Condições */}
        <section data-reveal>
          <SectionHeader eyebrow="CONDIÇÕES" title="O que precisas saber" />
          <div className="space-y-3">
            {proposal.conditions.map((c, i) => (
              <div
                key={i}
                data-reveal
                style={{ transitionDelay: `${i * 90}ms` }}
                className="bg-white border border-gray-200 rounded-2xl p-4 md:p-5 flex gap-4 items-start section-card"
              >
                <span className="flex-shrink-0 text-2xl mt-0.5">{c.icon}</span>
                <div className="min-w-0">
                  <h3 className="font-semibold text-[15px] mb-1 tracking-tight">
                    {c.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section data-reveal>
          <SectionHeader eyebrow="FAQ" title="Dúvidas frequentes" />
          <div className="space-y-2">
            {proposal.faq.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-colors hover:border-gray-300"
                >
                  <button
                    onClick={() => {
                      haptic(6);
                      setOpenFaq(isOpen ? null : i);
                    }}
                    className="tap-scale w-full px-4 py-4 flex items-center gap-3 text-left min-h-[56px]"
                  >
                    <span className="flex-1 font-medium text-[15px] tracking-tight">
                      {item.q}
                    </span>
                    <svg
                      className={`chevron flex-shrink-0 w-4 h-4 text-gray-400 ${
                        isOpen ? "open" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div className={`section-body ${isOpen ? "open" : ""}`}>
                    <div>
                      <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">
                        {item.a}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA final */}
        <section className="text-center pt-4" data-reveal>
          <div className="inline-block mb-4">
            <span className="text-4xl">🤝</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            Bora começar?
          </h2>
          <p className="text-gray-600 text-sm md:text-base mb-6 max-w-md mx-auto leading-relaxed">
            Fechado em 24h, branding em 7 dias, primeiras publicações no ar na
            segunda semana.
          </p>
          <a
            href={proposal.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => haptic(12)}
            className="tap-scale inline-flex items-center gap-2 bg-[#25D366] text-white font-semibold px-7 py-4 rounded-2xl shadow-lg shadow-green-500/20 hover:bg-[#1ebe5d] transition-all"
          >
            <WhatsAppIcon className="w-5 h-5" />
            Fechar pelo WhatsApp
          </a>
          <p className="text-xs text-gray-400 mt-4">
            Resposta direta com o estrategista, sem atendente intermediário
          </p>
        </section>
      </div>

      {/* Floating WhatsApp button */}
      <a
        href={proposal.whatsappUrl}
        target="_blank"
        rel="noreferrer"
        onClick={() => haptic(10)}
        className={`fixed bottom-5 right-5 z-50 transition-all duration-300 ${
          showFab
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none translate-y-4"
        }`}
        aria-label="WhatsApp"
        style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 20px)" }}
      >
        <div className="relative">
          <span className="fab-pulse" />
          <span className="fab relative w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl shadow-green-500/30 ring-4 ring-white">
            <WhatsAppIcon className="w-7 h-7" />
          </span>
        </div>
      </a>
    </main>
  );
}

function PlanCard({
  plan,
  whatsappUrl,
  delay,
  onTap,
}: {
  plan: import("@/lib/proposals").Plan;
  whatsappUrl: string;
  delay: number;
  onTap: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayPrice, setDisplayPrice] = useState(0);
  const animatedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;
            const start = performance.now();
            const duration = 900;
            const from = 0;
            const to = plan.price;
            const tick = (t: number) => {
              const p = Math.min((t - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setDisplayPrice(Math.round(from + (to - from) * eased));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [plan.price]);

  return (
    <div
      ref={ref}
      data-reveal
      style={{ transitionDelay: `${delay}ms` }}
      className={`plan-card relative bg-white rounded-3xl overflow-hidden ${
        plan.popular
          ? "border-2 border-gray-900 shadow-xl shadow-gray-900/10"
          : "border border-gray-200"
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-px left-0 right-0 h-1 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300" />
      )}
      {plan.badge && (
        <div
          className={`absolute top-5 right-5 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.15em] ${
            plan.popular
              ? "bg-gray-900 text-amber-300"
              : "bg-amber-400 text-gray-900"
          }`}
        >
          {plan.badge}
        </div>
      )}
      <div className="p-6 md:p-7">
        <p className="text-xs text-gray-500 mb-1">{plan.tagline}</p>
        <h3 className="text-2xl font-semibold tracking-tight mb-1">{plan.name}</h3>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-xs text-gray-400 mt-1">R$</span>
          <span className="price-counter text-5xl md:text-6xl font-semibold tracking-tight">
            {displayPrice.toLocaleString("pt-BR")}
          </span>
          <span className="text-sm text-gray-500">/mês</span>
        </div>
        <p className="text-[11px] text-gray-400 mb-5">
          + saldo de anúncios à parte (mínimo R$ 800/mês recomendado)
        </p>
        <ul className="space-y-2.5 mb-6">
          {plan.items.map((item, i) => (
            <li
              key={i}
              className={`flex items-start gap-2.5 text-sm leading-relaxed ${
                item.highlight ? "text-gray-900 font-medium" : "text-gray-700"
              }`}
            >
              <span
                className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                  item.highlight
                    ? "bg-amber-100 text-amber-700"
                    : "bg-green-50 text-green-600"
                }`}
              >
                <svg
                  className="w-3 h-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          onClick={onTap}
          className={`tap-scale block w-full text-center py-4 rounded-xl font-semibold text-sm transition-all ${
            plan.popular
              ? "bg-gray-900 text-white hover:bg-gray-800 shadow-md"
              : "bg-gray-100 text-gray-900 hover:bg-gray-200"
          }`}
        >
          {plan.cta} →
        </a>
      </div>
    </div>
  );
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-5" data-reveal>
      <p className="text-[10px] font-bold tracking-[0.25em] text-gray-400 mb-2">
        {eyebrow}
      </p>
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
    </div>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.6 6.32A8 8 0 0 0 4.13 14.5L3 21l6.65-1.1A8 8 0 1 0 17.6 6.32Zm-5.6 12.6a6.6 6.6 0 0 1-3.34-.92l-.24-.14-3.95.65.66-3.85-.16-.25a6.6 6.6 0 1 1 7.03 4.51Zm3.62-4.95c-.2-.1-1.17-.58-1.36-.64s-.31-.1-.45.1-.51.64-.62.77-.23.15-.42.05a5.4 5.4 0 0 1-2.69-2.35c-.2-.34.2-.32.58-1.06.06-.13.03-.24-.02-.34l-.62-1.5c-.16-.4-.33-.34-.45-.34h-.39a.74.74 0 0 0-.54.25 2.24 2.24 0 0 0-.7 1.67 3.89 3.89 0 0 0 .82 2.07 8.9 8.9 0 0 0 3.4 3 11.5 11.5 0 0 0 1.14.42 2.74 2.74 0 0 0 1.25.08 2.05 2.05 0 0 0 1.34-.95 1.66 1.66 0 0 0 .12-.95c-.05-.08-.18-.13-.38-.23Z" />
    </svg>
  );
}
