"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import type { Briefing } from "@/lib/types";

type Answers = Record<string, string>;

const COLORS: Record<
  string,
  { bg: string; fg: string; bgSoft: string; ring: string }
> = {
  blue: {
    bg: "bg-blue-600",
    fg: "text-blue-700",
    bgSoft: "bg-blue-50",
    ring: "ring-blue-200",
  },
  orange: {
    bg: "bg-orange-600",
    fg: "text-orange-700",
    bgSoft: "bg-orange-50",
    ring: "ring-orange-200",
  },
  purple: {
    bg: "bg-violet-600",
    fg: "text-violet-700",
    bgSoft: "bg-violet-50",
    ring: "ring-violet-200",
  },
  teal: {
    bg: "bg-teal-600",
    fg: "text-teal-700",
    bgSoft: "bg-teal-50",
    ring: "ring-teal-200",
  },
  amber: {
    bg: "bg-amber-600",
    fg: "text-amber-700",
    bgSoft: "bg-amber-50",
    ring: "ring-amber-200",
  },
  pink: {
    bg: "bg-pink-600",
    fg: "text-pink-700",
    bgSoft: "bg-pink-50",
    ring: "ring-pink-200",
  },
  green: {
    bg: "bg-green-600",
    fg: "text-green-700",
    bgSoft: "bg-green-50",
    ring: "ring-green-200",
  },
  red: {
    bg: "bg-red-600",
    fg: "text-red-700",
    bgSoft: "bg-red-50",
    ring: "ring-red-200",
  },
};

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

  const total = briefing.sections.reduce((a, s) => a + s.questions.length, 0);
  const filled = Object.values(answers).filter((v) => v?.trim()).length;
  const progress = total > 0 ? (filled / total) * 100 : 0;

  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
          setTimeout(() => setShowSaved(false), 1200);
        } catch {}
      }, 400);
    },
    [storageKey]
  );

  const onChange = (id: string, value: string) => {
    setAnswers((prev) => {
      const next = { ...prev, [id]: value };
      saveAnswers(next);
      return next;
    });
  };

  const toggleSection = (id: string) => {
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
      // Confetti
      launchConfetti();
    } catch (e: any) {
      showToast(e.message || "Erro ao enviar. Tenta de novo.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-2xl font-medium mb-3">Briefing enviado!</h1>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            A gente já recebeu tudo. Em breve voltamos com um diagnóstico
            estratégico e os próximos passos.
          </p>
          <p className="text-xs text-gray-400">
            {briefing.clientName} · {new Date().toLocaleDateString("pt-BR")}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-32">
      {/* Hero */}
      <header className="bg-[#1a1a1a] text-white px-5 pt-10 pb-8 md:px-8 md:pt-14 md:pb-12">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-medium tracking-wider text-gray-400 mb-2">
            BRIEFING TÉCNICO
          </p>
          <h1 className="text-3xl md:text-4xl font-medium mb-2 leading-tight">
            {briefing.clientName}
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            {briefing.clientCity}
          </p>
        </div>
      </header>

      {/* Sticky progress bar */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-5 py-3 md:px-8">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span>
              <span className="font-medium text-gray-900">{filled}</span> de{" "}
              {total} respondidas · {Math.round(progress)}%
            </span>
            <span
              className={`flex items-center gap-1 text-green-600 transition-opacity ${
                showSaved ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              salvo
            </span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-900 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
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

            return (
              <section
                key={sec.id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-colors hover:border-gray-300"
              >
                <button
                  onClick={() => toggleSection(sec.id)}
                  className="w-full px-4 py-4 md:px-5 flex items-center gap-3 text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xl ${c.bgSoft}`}
                  >
                    {sec.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm md:text-base truncate">
                      {secIdx + 1}. {sec.title}
                    </h3>
                    <p className="text-xs text-gray-500 truncate">
                      {sec.subtitle}
                    </p>
                  </div>
                  <span
                    className={`flex-shrink-0 text-xs px-2.5 py-1 rounded-full font-medium ${
                      complete
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
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
                            className="question py-3 border-b border-dashed border-gray-100 last:border-b-0"
                            style={{ animationDelay: `${qi * 25}ms` }}
                          >
                            <label
                              htmlFor={id}
                              className="flex items-start gap-2 text-sm text-gray-900 mb-2 leading-relaxed"
                            >
                              <span
                                className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium transition-colors ${
                                  isFilled
                                    ? "bg-green-100 text-green-700"
                                    : `${c.bgSoft} ${c.fg}`
                                }`}
                              >
                                {qi + 1}
                              </span>
                              <span>{q}</span>
                            </label>
                            <textarea
                              id={id}
                              value={value}
                              onChange={(e) => onChange(id, e.target.value)}
                              placeholder="A tua resposta…"
                              rows={2}
                              className={`w-full px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg resize-none focus:border-gray-400 focus:ring-2 ${c.ring} transition-all`}
                              style={{ minHeight: 64 }}
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
                className="w-full px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
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
                  className="w-full px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
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
                  className="w-full px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky bottom submit bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur border-t border-gray-200">
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
            className="bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-800 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
    </main>
  );
}

function launchConfetti() {
  const colors = ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899"];
  for (let i = 0; i < 50; i++) {
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
