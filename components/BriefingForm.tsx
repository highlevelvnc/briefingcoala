"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import type { Briefing } from "@/lib/types";

type Answers = Record<string, string>;

const COLORS: Record<
  string,
  { fg: string; bgSoft: string; ring: string; grad: string }
> = {
  blue: {
    fg: "text-blue-700",
    bgSoft: "bg-blue-50",
    ring: "ring-blue-200",
    grad: "from-blue-100 to-blue-50",
  },
  orange: {
    fg: "text-orange-700",
    bgSoft: "bg-orange-50",
    ring: "ring-orange-200",
    grad: "from-orange-100 to-amber-50",
  },
  purple: {
    fg: "text-violet-700",
    bgSoft: "bg-violet-50",
    ring: "ring-violet-200",
    grad: "from-violet-100 to-fuchsia-50",
  },
  teal: {
    fg: "text-teal-700",
    bgSoft: "bg-teal-50",
    ring: "ring-teal-200",
    grad: "from-teal-100 to-cyan-50",
  },
  amber: {
    fg: "text-amber-700",
    bgSoft: "bg-amber-50",
    ring: "ring-amber-200",
    grad: "from-amber-100 to-yellow-50",
  },
  pink: {
    fg: "text-pink-700",
    bgSoft: "bg-pink-50",
    ring: "ring-pink-200",
    grad: "from-pink-100 to-rose-50",
  },
  green: {
    fg: "text-green-700",
    bgSoft: "bg-green-50",
    ring: "ring-green-200",
    grad: "from-green-100 to-emerald-50",
  },
  red: {
    fg: "text-red-700",
    bgSoft: "bg-red-50",
    ring: "ring-red-200",
    grad: "from-red-100 to-orange-50",
  },
};

const LEVELS = [
  { min: 0, name: "Aquecendo", emoji: "🌱", color: "text-gray-500" },
  { min: 15, name: "Pegando ritmo", emoji: "⚡", color: "text-blue-600" },
  { min: 35, name: "Voando", emoji: "🚀", color: "text-violet-600" },
  { min: 55, name: "Dominando", emoji: "🔥", color: "text-orange-600" },
  { min: 75, name: "Quase lá", emoji: "💎", color: "text-pink-600" },
  { min: 95, name: "Mestre", emoji: "👑", color: "text-amber-500" },
];

function getLevel(pct: number) {
  return [...LEVELS].reverse().find((l) => pct >= l.min) || LEVELS[0];
}

export default function BriefingForm({ briefing }: { briefing: Briefing }) {
  const storageKey = `briefing:${briefing.slug}:answers`;
  const submittedKey = `briefing:${briefing.slug}:submitted`;

  const [answers, setAnswers] = useState<Answers>({});
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [showSaved, setShowSaved] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [respondentName, setRespondentName] = useState("");
  const [respondentEmail, setRespondentEmail] = useState("");
  const [respondentPhone, setRespondentPhone] = useState("");
  const [achievement, setAchievement] = useState<{ icon: string; title: string; sub: string } | null>(null);
  const [levelUp, setLevelUp] = useState(false);

  const total = briefing.sections.reduce((a, s) => a + s.questions.length, 0);
  const filled = Object.values(answers).filter((v) => v?.trim()).length;
  const progress = total > 0 ? (filled / total) * 100 : 0;
  const level = getLevel(progress);
  const levelIndex = LEVELS.findIndex((l) => l.name === level.name);
  const nextLevel = LEVELS[levelIndex + 1];

  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionCompleteRef = useRef<Record<string, boolean>>({});
  const prevLevelRef = useRef<string>(level.name);
  const mountedRef = useRef(false);

  // Track section completion + level-up
  useEffect(() => {
    if (!mountedRef.current) {
      // First mount: prime the refs, no celebrations
      briefing.sections.forEach((s) => {
        const f = s.questions.filter((_, qi) => answers[`${s.id}:${qi}`]?.trim()).length;
        sectionCompleteRef.current[s.id] = f === s.questions.length && s.questions.length > 0;
      });
      prevLevelRef.current = level.name;
      mountedRef.current = true;
      return;
    }
    // Detect newly-completed sections
    briefing.sections.forEach((s, idx) => {
      const f = s.questions.filter((_, qi) => answers[`${s.id}:${qi}`]?.trim()).length;
      const nowComplete = f === s.questions.length && s.questions.length > 0;
      if (nowComplete && !sectionCompleteRef.current[s.id]) {
        sectionCompleteRef.current[s.id] = true;
        haptic(25);
        setAchievement({
          icon: s.icon,
          title: `Secção desbloqueada!`,
          sub: `${idx + 1}. ${s.title}`,
        });
        burstConfetti(24);
        setTimeout(() => setAchievement(null), 2600);
        // Auto-open next section
        const next = briefing.sections[idx + 1];
        if (next) {
          setTimeout(() => {
            setOpenSections((prev) => ({ ...prev, [next.id]: true }));
            const el = document.getElementById(`section-${next.id}`);
            el?.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 800);
        }
      } else if (!nowComplete) {
        sectionCompleteRef.current[s.id] = false;
      }
    });
    // Level-up
    if (prevLevelRef.current !== level.name) {
      const prevIdx = LEVELS.findIndex((l) => l.name === prevLevelRef.current);
      if (levelIndex > prevIdx) {
        haptic(40);
        setLevelUp(true);
        burstConfetti(36);
        setTimeout(() => setLevelUp(false), 1600);
      }
      prevLevelRef.current = level.name;
    }
  }, [answers, briefing.sections, level.name, levelIndex]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setAnswers(JSON.parse(raw));
      const name = localStorage.getItem(`${storageKey}:name`);
      const email = localStorage.getItem(`${storageKey}:email`);
      const phone = localStorage.getItem(`${storageKey}:phone`);
      if (name) setRespondentName(name);
      if (email) setRespondentEmail(email);
      if (phone) setRespondentPhone(phone);
      if (localStorage.getItem(submittedKey) === "1") setSubmitted(true);
    } catch {}
    // Open first section by default
    setOpenSections({ [briefing.sections[0].id]: true });
  }, [storageKey, submittedKey, briefing.sections]);

  // Debounced save to localStorage
  const saveAnswers = useCallback(
    (next: Answers) => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        try {
          localStorage.setItem(storageKey, JSON.stringify(next));
          setShowSaved(true);
          setTimeout(() => setShowSaved(false), 1400);
        } catch {}
      }, 400);
    },
    [storageKey]
  );

  const haptic = (ms = 8) => {
    try {
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        (navigator as any).vibrate?.(ms);
      }
    } catch {}
  };

  const onChange = (id: string, value: string) => {
    setAnswers((prev) => {
      const next = { ...prev, [id]: value };
      saveAnswers(next);
      return next;
    });
  };

  const toggleSection = (id: string) => {
    haptic(6);
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  };

  const submit = async () => {
    if (filled === 0) {
      showToast("Preenche pelo menos uma resposta primeiro");
      return;
    }
    if (!respondentName.trim()) {
      showToast("Diz teu nome antes de enviar");
      const el = document.getElementById("respondent-name");
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      (el as HTMLInputElement | null)?.focus();
      return;
    }

    setSubmitting(true);
    try {
      // Persist contact info too
      localStorage.setItem(`${storageKey}:name`, respondentName);
      localStorage.setItem(`${storageKey}:email`, respondentEmail);
      localStorage.setItem(`${storageKey}:phone`, respondentPhone);

      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: briefing.slug,
          clientName: briefing.clientName,
          respondent: {
            name: respondentName,
            email: respondentEmail,
            phone: respondentPhone,
          },
          answers,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Erro ao enviar");
      }

      localStorage.setItem(submittedKey, "1");
      setSubmitted(true);
      haptic(40);
      launchConfetti();
    } catch (e: any) {
      showToast(e.message || "Erro ao enviar. Tenta de novo.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6 hero-bg">
        <div className="max-w-md text-center text-white">
          <div className="text-7xl mb-6 victory-bounce">🏆</div>
          <p className="text-[10px] font-bold tracking-[0.3em] text-amber-300 mb-2">
            ✦ MISSÃO COMPLETA ✦
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold mb-3 tracking-tight">
            Briefing enviado!
          </h1>
          <p className="text-gray-300 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
            A gente já recebeu tudo. Em breve voltamos com um diagnóstico
            estratégico e os próximos passos.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
            {briefing.clientName} · {new Date().toLocaleDateString("pt-BR")}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-40">
      {/* Hero */}
      <header className="hero-bg text-white px-5 pt-12 pb-10 md:px-8 md:pt-16 md:pb-14 pt-safe">
        <div className="max-w-2xl mx-auto">
          <p className="text-[10px] md:text-xs font-semibold tracking-[0.2em] text-gray-400 mb-3">
            BRIEFING TÉCNICO
          </p>
          <h1 className="text-3xl md:text-5xl font-semibold mb-2 leading-[1.05] tracking-tight">
            {briefing.clientName}
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            {briefing.clientCity}
          </p>
        </div>
      </header>

      {/* Sticky progress bar */}
      <div className="sticky top-0 z-30 bg-white/85 backdrop-blur-xl border-b border-gray-100 pt-safe">
        <div className="max-w-2xl mx-auto px-5 py-3 md:px-8">
          <div className="flex items-center justify-between text-xs mb-2 gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <span
                className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-gray-50 border border-gray-200 font-semibold text-[11px] ${level.color} transition-all duration-500 ${levelUp ? "scale-110 ring-2 ring-amber-300" : ""}`}
              >
                <span className={levelUp ? "level-bounce" : ""}>{level.emoji}</span>
                <span className="truncate">{level.name}</span>
              </span>
              <span className="text-gray-500 truncate">
                <span className="font-semibold text-gray-900 tabular-nums">{filled}</span>
                <span className="text-gray-400">/{total}</span>
                {" · "}
                <span className="tabular-nums">{Math.round(progress)}%</span>
              </span>
            </div>
            <span
              className={`flex items-center gap-1.5 text-green-600 transition-opacity duration-300 flex-shrink-0 ${
                showSaved ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="save-dot w-1.5 h-1.5 rounded-full bg-green-500"></span>
              salvo
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden relative">
            <div
              className="h-full progress-fill rounded-full transition-[width] duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
            {/* Level milestones */}
            {LEVELS.slice(1).map((l) => (
              <span
                key={l.name}
                className="absolute top-0 bottom-0 w-px bg-white/70"
                style={{ left: `${l.min}%` }}
              />
            ))}
          </div>
          {nextLevel && (
            <p className="text-[10px] text-gray-400 mt-1.5 truncate">
              Próximo: <span className="text-gray-600 font-medium">{nextLevel.emoji} {nextLevel.name}</span> em {Math.max(1, Math.ceil(((nextLevel.min - progress) / 100) * total))} respostas
            </p>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 md:px-8 py-6">
        {/* Intro card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6 mb-5">
          <h2 className="font-medium mb-2">Como preencher</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {briefing.introText}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-3">
          {briefing.sections.map((sec, secIdx) => {
            const isOpen = !!openSections[sec.id];
            const c = COLORS[sec.color] || COLORS.blue;
            const sectionFilled = sec.questions.filter((_, qi) =>
              answers[`${sec.id}:${qi}`]?.trim()
            ).length;
            const complete = sectionFilled === sec.questions.length;
            const sectionProgress = sec.questions.length
              ? (sectionFilled / sec.questions.length) * 100
              : 0;

            return (
              <section
                key={sec.id}
                id={`section-${sec.id}`}
                className={`section-card bg-white border rounded-2xl overflow-hidden scroll-mt-24 ${
                  complete
                    ? "border-green-300 ring-1 ring-green-100"
                    : "border-gray-200"
                }`}
              >
                <button
                  onClick={() => toggleSection(sec.id)}
                  className="tap-scale w-full px-4 py-4 md:px-5 flex items-center gap-3 text-left min-h-[68px]"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center text-xl bg-gradient-to-br ${c.grad} ring-1 ring-black/5 shadow-sm`}
                  >
                    {sec.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[15px] md:text-base truncate tracking-tight">
                      {secIdx + 1}. {sec.title}
                    </h3>
                    <p className="text-xs text-gray-500 truncate mt-0.5">
                      {sec.subtitle}
                    </p>
                    <div className="h-0.5 mt-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-[width] duration-500 ease-out ${
                          complete ? "bg-green-500" : "bg-gray-900"
                        }`}
                        style={{ width: `${sectionProgress}%` }}
                      />
                    </div>
                  </div>
                  <span
                    className={`flex-shrink-0 text-[11px] px-2 py-1 rounded-full font-semibold tabular-nums transition-colors flex items-center gap-1 ${
                      complete
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {complete && (
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {sectionFilled}/{sec.questions.length}
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
                    <div className="px-4 pb-5 md:px-5 border-t border-gray-100 pt-2">
                      {sec.questions.map((q, qi) => {
                        const id = `${sec.id}:${qi}`;
                        const value = answers[id] || "";
                        const isFilled = value.trim().length > 0;
                        return (
                          <div
                            key={id}
                            className="question py-3.5 border-b border-dashed border-gray-100 last:border-b-0"
                            style={{ animationDelay: `${qi * 30}ms` }}
                          >
                            <label
                              htmlFor={id}
                              className="flex items-start gap-2.5 text-[15px] text-gray-900 mb-2.5 leading-snug"
                            >
                              <span
                                className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold transition-all duration-300 ${
                                  isFilled
                                    ? "bg-green-500 text-white scale-100"
                                    : `${c.bgSoft} ${c.fg}`
                                }`}
                              >
                                {isFilled ? (
                                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                ) : (
                                  qi + 1
                                )}
                              </span>
                              <span className="pt-0.5">{q.q}</span>
                            </label>
                            {q.hint && (
                              <p className="text-xs text-gray-400 mb-2 ml-8.5 pl-0.5">
                                {q.hint}
                              </p>
                            )}
                            <textarea
                              id={id}
                              value={value}
                              onChange={(e) => onChange(id, e.target.value)}
                              placeholder={q.placeholder || "A tua resposta…"}
                              rows={2}
                              className={`w-full px-4 py-3 text-base bg-gray-50/60 border border-gray-200 rounded-xl resize-none focus:bg-white focus:border-gray-400 focus:ring-2 focus:ring-offset-0 ${c.ring} transition-all placeholder:text-gray-400`}
                              style={{ minHeight: 76 }}
                              onInput={(e) => {
                                const t = e.currentTarget;
                                t.style.height = "auto";
                                t.style.height = t.scrollHeight + 2 + "px";
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* Respondent info */}
        <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-5 md:p-6">
          <h3 className="font-medium mb-1">Pra fechar — quem está respondendo?</h3>
          <p className="text-xs text-gray-500 mb-4">
            Pra gente saber com quem falar.
          </p>
          <div className="space-y-3">
            <div>
              <label
                htmlFor="respondent-name"
                className="block text-xs text-gray-600 mb-1"
              >
                Nome *
              </label>
              <input
                id="respondent-name"
                type="text"
                value={respondentName}
                onChange={(e) => setRespondentName(e.target.value)}
                placeholder="Seu nome"
                className="w-full px-3.5 py-3 text-base bg-white border border-gray-200 rounded-xl focus:border-gray-400 focus:ring-2 focus:ring-gray-200 transition-colors min-h-[44px]"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  value={respondentEmail}
                  onChange={(e) => setRespondentEmail(e.target.value)}
                  placeholder="voce@exemplo.com"
                  className="w-full px-3.5 py-3 text-base bg-white border border-gray-200 rounded-xl focus:border-gray-400 focus:ring-2 focus:ring-gray-200 transition-colors min-h-[44px]"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  WhatsApp
                </label>
                <input
                  type="tel"
                  value={respondentPhone}
                  onChange={(e) => setRespondentPhone(e.target.value)}
                  placeholder="(21) 90000-0000"
                  className="w-full px-3.5 py-3 text-base bg-white border border-gray-200 rounded-xl focus:border-gray-400 focus:ring-2 focus:ring-gray-200 transition-colors min-h-[44px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky bottom submit bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-t border-gray-200 pb-safe">
        <div className="max-w-2xl mx-auto px-5 py-3 md:px-8 flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 truncate">
              {filled === total
                ? "Tudo respondido — bora enviar!"
                : `Faltam ${total - filled} respostas`}
            </p>
          </div>
          <button
            onClick={submit}
            disabled={submitting}
            className="tap-scale bg-gray-900 text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-h-[44px] shadow-sm"
          >
            {submitting ? (
              <>
                <svg
                  className="animate-spin w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="opacity-25"
                  />
                  <path
                    fill="currentColor"
                    className="opacity-75"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Enviando…
              </>
            ) : (
              <>
                Enviar briefing
                <span aria-hidden>→</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="toast fixed bottom-24 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm px-4 py-2.5 rounded-lg shadow-lg z-50">
          {toast}
        </div>
      )}

      {/* Achievement card */}
      {achievement && (
        <div className="achievement fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl shadow-2xl px-4 py-3 flex items-center gap-3 min-w-[280px] max-w-[90vw] border border-white/10">
          <span className="text-3xl achievement-icon">{achievement.icon}</span>
          <div className="min-w-0">
            <p className="text-[10px] font-bold tracking-[0.2em] text-amber-300">
              ✦ {achievement.title.toUpperCase()}
            </p>
            <p className="text-sm font-semibold truncate">{achievement.sub}</p>
          </div>
        </div>
      )}
    </main>
  );
}

function burstConfetti(count = 20) {
  const colors = ["#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899"];
  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    el.className = "confetti";
    el.style.left = 45 + Math.random() * 10 + "%";
    el.style.top = "20%";
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    document.body.appendChild(el);
    const angle = Math.random() * Math.PI * 2;
    const velocity = 80 + Math.random() * 140;
    const dx = Math.cos(angle) * velocity;
    const dy = Math.sin(angle) * velocity - 20;
    el.animate(
      [
        { transform: `translate(0,0) rotate(0deg)`, opacity: 1 },
        {
          transform: `translate(${dx}px, ${dy + 200}px) rotate(${Math.random() * 720}deg)`,
          opacity: 0,
        },
      ],
      { duration: 900 + Math.random() * 600, easing: "cubic-bezier(0.2, 0.6, 0.3, 1)" }
    ).onfinish = () => el.remove();
  }
}

function launchConfetti() {
  const colors = ["#1a1a1a", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899", "#ffffff"];
  for (let i = 0; i < 64; i++) {
    const el = document.createElement("div");
    el.className = "confetti";
    el.style.left = Math.random() * 100 + "%";
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(el);
    const duration = 1500 + Math.random() * 1500;
    el.animate(
      [
        { transform: el.style.transform, top: "-10px", opacity: 1 },
        {
          transform: `translateY(110vh) rotate(${Math.random() * 720}deg)`,
          opacity: 0,
        },
      ],
      { duration, easing: "cubic-bezier(0.2, 0.6, 0.3, 1)" }
    ).onfinish = () => el.remove();
  }
}
