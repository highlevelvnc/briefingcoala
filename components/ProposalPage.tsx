"use client";

import { useState } from "react";
import type { Proposal } from "@/lib/proposals";

export default function ProposalPage({ proposal }: { proposal: Proposal }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen pb-40 bg-[#fafaf7]">
      {/* Hero */}
      <header className="hero-bg text-white px-5 pt-14 pb-12 md:px-8 md:pt-20 md:pb-16 pt-safe relative overflow-hidden">
        <div className="max-w-2xl mx-auto relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <p className="text-[10px] font-semibold tracking-[0.2em] text-gray-200">
              PROPOSTA COMERCIAL
            </p>
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold mb-3 leading-[1.02] tracking-tight">
            Marketing 360°
            <br />
            <span className="text-amber-300">para a {proposal.clientName}</span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg mb-6 leading-relaxed">
            {proposal.intro}
          </p>
          <p className="text-xs text-gray-400">
            {proposal.clientCity} · Preparado por {proposal.agencyName}
          </p>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-5 md:px-8 py-10 space-y-12">
        {/* Diagnóstico */}
        <section className="scroll-reveal">
          <SectionHeader eyebrow="DIAGNÓSTICO" title={proposal.diagnostic.title} />
          <div className="space-y-3">
            {proposal.diagnostic.points.map((p, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-2xl p-4 md:p-5 flex gap-4 items-start section-card"
              >
                <span className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-100 to-white flex items-center justify-center text-2xl ring-1 ring-black/5">
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
        <section>
          <SectionHeader eyebrow="OBJETIVO" title="3 frentes em paralelo" />
          <div className="grid grid-cols-1 gap-3">
            {proposal.goals.map((g, i) => (
              <div
                key={i}
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
        <section>
          <SectionHeader eyebrow="INVESTIMENTO" title="Escolhe o plano" />
          <div className="space-y-4">
            {proposal.plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl overflow-hidden section-card ${
                  plan.popular
                    ? "border-2 border-gray-900 shadow-xl"
                    : "border border-gray-200"
                }`}
              >
                {plan.badge && (
                  <div
                    className={`absolute top-0 right-5 -translate-y-1/2 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.15em] ${
                      plan.popular
                        ? "bg-gray-900 text-amber-300"
                        : "bg-amber-400 text-gray-900"
                    }`}
                  >
                    {plan.badge}
                  </div>
                )}
                <div className="p-5 md:p-6 pt-7">
                  <p className="text-xs text-gray-500 mb-1">{plan.tagline}</p>
                  <h3 className="text-2xl font-semibold tracking-tight mb-1">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-5">
                    <span className="text-4xl md:text-5xl font-semibold tracking-tight">
                      {plan.priceLabel}
                    </span>
                    <span className="text-sm text-gray-500">/mês</span>
                  </div>
                  <ul className="space-y-2.5 mb-5">
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
                              : "bg-gray-100 text-gray-500"
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
                    href={proposal.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`tap-scale block w-full text-center py-3.5 rounded-xl font-semibold text-sm transition-all ${
                      plan.popular
                        ? "bg-gray-900 text-white hover:bg-gray-800"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    {plan.cta} →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bonus de branding */}
        <section>
          <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-3xl p-6 md:p-8 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.15),transparent_60%)] pointer-events-none" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 mb-4">
                <span className="text-[10px] font-bold tracking-[0.2em] text-amber-300">
                  ✦ INCLUÍDO EM AMBOS OS PLANOS ✦
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold mb-3 tracking-tight">
                {proposal.bonus.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-5">
                {proposal.bonus.description}
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {proposal.bonus.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-200"
                  >
                    <span className="text-amber-300 mt-0.5">◆</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Timeline 3 meses */}
        <section>
          <SectionHeader
            eyebrow="CRONOGRAMA"
            title="Por que 3 meses no mínimo?"
          />
          <div className="space-y-3">
            {proposal.timeline.map((t, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold">
                    M{i + 1}
                  </div>
                  {i < proposal.timeline.length - 1 && (
                    <div className="w-px flex-1 bg-gradient-to-b from-gray-300 to-gray-200 my-2" />
                  )}
                </div>
                <div className="pb-4 flex-1 min-w-0">
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
        <section>
          <SectionHeader eyebrow="CONDIÇÕES" title="O que precisas saber" />
          <div className="space-y-3">
            {proposal.conditions.map((c, i) => (
              <div
                key={i}
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
        <section>
          <SectionHeader eyebrow="FAQ" title="Dúvidas frequentes" />
          <div className="space-y-2">
            {proposal.faq.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="tap-scale w-full px-4 py-4 flex items-center gap-3 text-left"
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
        <section className="text-center pt-4">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            Bora começar?
          </h2>
          <p className="text-gray-600 text-sm md:text-base mb-6 max-w-md mx-auto">
            Fechado em 24h, branding em 7 dias, primeiras publicações no ar na segunda semana.
          </p>
          <a
            href={proposal.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="tap-scale inline-flex items-center gap-2 bg-[#25D366] text-white font-semibold px-7 py-4 rounded-2xl shadow-lg shadow-green-500/20 hover:bg-[#1ebe5d] transition-all"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M17.6 6.32A8 8 0 0 0 4.13 14.5L3 21l6.65-1.1A8 8 0 1 0 17.6 6.32Zm-5.6 12.6a6.6 6.6 0 0 1-3.34-.92l-.24-.14-3.95.65.66-3.85-.16-.25a6.6 6.6 0 1 1 7.03 4.51Zm3.62-4.95c-.2-.1-1.17-.58-1.36-.64s-.31-.1-.45.1-.51.64-.62.77-.23.15-.42.05a5.4 5.4 0 0 1-2.69-2.35c-.2-.34.2-.32.58-1.06.06-.13.03-.24-.02-.34l-.62-1.5c-.16-.4-.33-.34-.45-.34h-.39a.74.74 0 0 0-.54.25 2.24 2.24 0 0 0-.7 1.67 3.89 3.89 0 0 0 .82 2.07 8.9 8.9 0 0 0 3.4 3 11.5 11.5 0 0 0 1.14.42 2.74 2.74 0 0 0 1.25.08 2.05 2.05 0 0 0 1.34-.95 1.66 1.66 0 0 0 .12-.95c-.05-.08-.18-.13-.38-.23Z" />
            </svg>
            Fechar pelo WhatsApp
          </a>
          <p className="text-xs text-gray-400 mt-4">
            Resposta direta com o estrategista, sem atendente intermediário
          </p>
        </section>
      </div>
    </main>
  );
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-5">
      <p className="text-[10px] font-bold tracking-[0.25em] text-gray-400 mb-2">
        {eyebrow}
      </p>
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
    </div>
  );
}
