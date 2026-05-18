export type PlanItem = {
  text: string;
  highlight?: boolean;
};

export type Plan = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  priceLabel: string;
  badge?: string;
  popular?: boolean;
  items: PlanItem[];
  cta: string;
};

export type Proposal = {
  slug: string;
  clientName: string;
  clientCity: string;
  agencyName: string;
  whatsappUrl: string;
  intro: string;
  diagnostic: {
    title: string;
    points: { icon: string; title: string; text: string }[];
  };
  goals: { icon: string; title: string; text: string }[];
  plans: Plan[];
  bonus: {
    title: string;
    description: string;
    items: string[];
  };
  conditions: { icon: string; title: string; text: string }[];
  timeline: { month: string; title: string; text: string }[];
  faq: { q: string; a: string }[];
};

export const proposals: Record<string, Proposal> = {
  koala: {
    slug: "koala",
    clientName: "Koala Conveniência",
    clientCity: "Botafogo · Rio de Janeiro",
    agencyName: "Sua Agência",
    whatsappUrl:
      "https://wa.me/5522992812656?text=Ol%C3%A1!%20Vi%20a%20proposta%20da%20Koala%20e%20quero%20fechar.",
    intro:
      "Uma estratégia de marketing 360° para a Koala virar referência regional em Botafogo, dominar o delivery na Zona Sul e abrir portas para contratos B2B com bares, condomínios e empresas.",
    diagnostic: {
      title: "Onde a Koala está hoje",
      points: [
        {
          icon: "📦",
          title: "Operação pronta para escalar",
          text: "Estrutura de loja + logística já permite crescer no delivery sem reformular o operacional.",
        },
        {
          icon: "📉",
          title: "Marca subaproveitada",
          text: "Instagram parado, sem identidade visual coesa, sem presença no Google. Concorrentes da região dominam o top-of-mind.",
        },
        {
          icon: "🎯",
          title: "Oportunidade clara",
          text: "Botafogo + Zona Sul têm demanda forte por gelo, bebida e conveniência rápida. Faltam marcas com posicionamento.",
        },
      ],
    },
    goals: [
      {
        icon: "🚀",
        title: "Crescer no delivery",
        text: "iFood + WhatsApp como canais principais de venda recorrente, com ticket médio acima de R$ 65.",
      },
      {
        icon: "🏙️",
        title: "Dominar Botafogo",
        text: "Virar a conveniência mais lembrada da região com 6-9 meses de estratégia consistente.",
      },
      {
        icon: "🤝",
        title: "Abrir o B2B",
        text: "Usar a reputação local para fechar contratos fixos com bares, produtoras e condomínios da Zona Sul.",
      },
    ],
    plans: [
      {
        id: "essencial",
        name: "Plano Essencial",
        tagline: "Para começar com força",
        price: 650,
        priceLabel: "R$ 650",
        badge: "RECOMENDADO PARA COMEÇAR",
        items: [
          { text: "4 a 5 publicações por semana (16-20/mês)", highlight: true },
          { text: "Estratégia de tráfego pago personalizada (Meta Ads + Google Ads)" },
          { text: "Gestão e otimização contínua das campanhas" },
          { text: "Copywriting estratégico em todas as peças" },
          { text: "Calendário editorial mensal com aprovação prévia" },
          { text: "Stories diários estratégicos (3-5/dia)" },
          { text: "Relatório mensal de performance" },
          { text: "Atendimento direto via WhatsApp" },
          {
            text: "✨ BÔNUS: Pacote de branding completo (cortesia)",
            highlight: true,
          },
        ],
        cta: "Quero o Essencial",
      },
      {
        id: "completo",
        name: "Plano Completo",
        tagline: "Marketing 360° de verdade",
        price: 1000,
        priceLabel: "R$ 1.000",
        popular: true,
        badge: "MAIS COMPLETO",
        items: [
          { text: "Tudo do Plano Essencial", highlight: true },
          { text: "Site/landing page de conversão otimizada", highlight: true },
          { text: "Direção de 4 vídeos por mês (Reels/TikTok)", highlight: true },
          { text: "Google Meu Negócio otimizado para busca local" },
          { text: "WhatsApp Business com catálogo e respostas rápidas" },
          { text: "SEO local — “gelo Botafogo”, “bebida delivery Zona Sul”" },
          { text: "Otimização do iFood (fotos, descrições, combos)" },
          { text: "Estratégia de captação B2B (bares, condomínios)" },
          { text: "Relatório quinzenal de performance" },
          {
            text: "✨ BÔNUS: Pacote de branding completo (cortesia)",
            highlight: true,
          },
        ],
        cta: "Quero o Completo",
      },
    ],
    bonus: {
      title: "🎁 Pacote de Branding — Cortesia",
      description:
        "Independente do plano que escolher, refaço toda a direção visual da Koala como brinde. Sem custo extra, sem pegadinha. É a base para qualquer estratégia de marketing funcionar — não faz sentido cobrar pelo que é fundamento.",
      items: [
        "Refresh do logo (ou reconstrução completa)",
        "Paleta de cores oficial + variações",
        "Tipografia primária e secundária",
        "Templates de Instagram (feed + stories + reels capa)",
        "Identidade para fachada, sacola, uniforme e adesivos",
        "Manual de marca em PDF (entregue no início do contrato)",
        "Direção criativa para todas as peças do mês",
      ],
    },
    conditions: [
      {
        icon: "📅",
        title: "Contrato mínimo: 3 meses",
        text: "Branding e tráfego pago precisam de tempo para performar. O primeiro mês é setup e aprendizado dos algoritmos; o segundo é otimização; o terceiro é quando a máquina engata. Menos que isso é desperdício.",
      },
      {
        icon: "💸",
        title: "Saldo de anúncios à parte",
        text: "A verba paga ao Meta/Google é separada do honorário. Recomendo mínimo de R$ 800-1.000/mês de saldo de anúncio para Botafogo — abaixo disso o algoritmo não tem volume para otimizar bem.",
      },
      {
        icon: "🔁",
        title: "Renovação mensal após 3 meses",
        text: "Depois dos 3 meses iniciais o contrato é mensal e podes cancelar com 30 dias de aviso. Sem multa, sem letra miúda.",
      },
    ],
    timeline: [
      {
        month: "Mês 1",
        title: "Fundação",
        text: "Branding completo entregue, primeiras publicações no ar, setup de campanhas, aprendizado dos algoritmos.",
      },
      {
        month: "Mês 2",
        title: "Otimização",
        text: "Ajuste fino das campanhas com base nos dados do primeiro mês, escala dos criativos vencedores, primeiros resultados em volume.",
      },
      {
        month: "Mês 3",
        title: "Aceleração",
        text: "Máquina engatada: campanhas otimizadas, audiência aquecida, reconhecimento de marca local começando a aparecer.",
      },
    ],
    faq: [
      {
        q: "Por que mínimo de 3 meses?",
        a: "Algoritmos de Meta e Google precisam de 14-21 dias para sair da fase de aprendizado. Branding precisa de repetição para fixar na cabeça do público. Em menos de 3 meses, qualquer agência séria diria que não dá para medir resultado.",
      },
      {
        q: "Posso ficar só com o Essencial e depois subir para o Completo?",
        a: "Sim. Muita gente começa no Essencial para validar o trabalho e sobe para o Completo no 2º ou 3º mês quando vê o retorno.",
      },
      {
        q: "Quanto investir em anúncio por fora?",
        a: "Mínimo R$ 800/mês para Botafogo + um bairro vizinho. Ideal R$ 1.500-2.000/mês se quiser cobrir Zona Sul. Quanto mais saldo, mais dados o algoritmo tem para otimizar.",
      },
      {
        q: "O branding entregue é meu?",
        a: "Tudo seu. Logo, arquivos editáveis, manual de marca — tudo entregue em PDF e nas extensões originais (AI/Figma). Mesmo se cancelar o contrato, fica com tudo.",
      },
      {
        q: "Quando começam as publicações?",
        a: "Primeira semana do contrato: planeamento + branding. Segunda semana: primeiras publicações no ar.",
      },
    ],
  },
};

export function getProposal(slug: string) {
  return proposals[slug];
}
