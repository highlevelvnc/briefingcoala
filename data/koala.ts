import type { Briefing } from "@/lib/types";

export const koala: Briefing = {
  slug: "koala",
  clientName: "Koala Conveniência",
  clientCity: "Botafogo · Rio de Janeiro",
  agencyName: "Sua Agência",
  introTitle: "Briefing técnico",
  introText:
    "Preenche no teu ritmo — o documento salva automaticamente neste navegador. O objectivo deste briefing é alinhar três frentes: vender mais no delivery (iFood/WhatsApp), dominar o branding regional em Botafogo para virar referência junto do cliente final, e usar essa reputação para fechar contratos B2B com empresas, bares e condomínios da Zona Sul.",
  sections: [
    {
      id: "s1",
      title: "Informações gerais da loja",
      subtitle: "Dados básicos, horário, canais ativos",
      icon: "🏪",
      color: "blue",
      questions: [
        {
          q: "Qual é o nome oficial da loja e o nome que vocês querem usar na comunicação?",
          placeholder: "Ex.: razão social “Koala Conveniência Ltda”, nome de comunicação “Koala”",
        },
        {
          q: "Qual é o endereço completo da loja em Botafogo?",
          placeholder: "Rua, número, complemento, CEP",
        },
        {
          q: "Qual o horário de funcionamento (dias e horas)?",
          placeholder: "Ex.: Seg-Sex 10h-02h · Sáb-Dom 12h-04h",
        },
        {
          q: "Vocês atendem só presencial ou também fazem delivery próprio?",
          placeholder: "Ex.: presencial + delivery próprio via WhatsApp em raio de 1km",
        },
        {
          q: "Hoje a loja tem Instagram, WhatsApp comercial, Google Meu Negócio ou iFood ativo?",
          placeholder: "Ex.: @koala.botafogo (3k seg.), WhatsApp Business, GMN sem reviews, iFood pausado",
        },
        {
          q: "Qual é o principal objetivo agora: vender mais no delivery, fortalecer a marca, atrair clientes locais ou organizar tudo?",
          placeholder: "Ex.: prioridade 1 é delivery, depois marca regional, depois B2B",
        },
      ],
    },
    {
      id: "s2",
      title: "Operação no iFood e delivery",
      subtitle: "Histórico, capacidade e logística",
      icon: "🛵",
      color: "orange",
      questions: [
        {
          q: "Vocês já venderam pelo iFood antes? Por que pararam?",
          placeholder: "Ex.: vendemos 6 meses em 2023, paramos por falta de gestão e taxas altas",
        },
        {
          q: "A conta do iFood ainda existe ou precisa criar uma nova?",
          placeholder: "Ex.: conta existe mas inativa há 4 meses",
        },
        {
          q: "Quais produtos vocês querem vender no iFood?",
          placeholder: "Ex.: gelo, cerveja, energético, destilados, snacks, carvão, combos",
        },
        {
          q: "Quais produtos têm melhor margem para delivery?",
          placeholder: "Ex.: gelo (margem 70%), combos prontos, destilados",
        },
        {
          q: "Vocês têm entregador próprio ou pretendem usar entrega do iFood?",
          placeholder: "Ex.: 2 motoboys próprios à noite + iFood Entrega no resto",
        },
        {
          q: "Qual raio de entrega ideal? Só Botafogo ou também Flamengo, Humaitá, Urca, Copacabana, Laranjeiras?",
          placeholder: "Ex.: Botafogo + Humaitá + Flamengo + Urca (até 3km)",
        },
        {
          q: "Qual tempo médio que conseguem separar um pedido?",
          placeholder: "Ex.: 5 min em horário normal, 12 min no pico de sexta",
        },
        {
          q: "Vocês têm estrutura para receber muitos pedidos em horário de pico?",
          placeholder: "Ex.: 2 pessoas no balcão, conseguem até 20 pedidos/hora",
        },
        {
          q: "Quais horários vendem mais: manhã, tarde, noite ou madrugada?",
          placeholder: "Ex.: pico das 20h-02h sexta a domingo",
        },
        {
          q: "Hoje vocês têm fotos boas dos produtos para cadastrar no iFood?",
          placeholder: "Ex.: temos só fotos de celular, precisamos refazer",
        },
      ],
    },
    {
      id: "s3",
      title: "Identidade visual e posicionamento",
      subtitle: "Marca, estilo, percepção",
      icon: "🎨",
      color: "purple",
      questions: [
        {
          q: "Vocês já têm logo em alta qualidade?",
          placeholder: "Ex.: temos PNG sem fundo + AI editável feito em 2022",
        },
        {
          q: "Gostam da identidade visual atual ou querem refazer tudo?",
          placeholder: "Ex.: gostamos do logo, mas o resto está bagunçado",
        },
        {
          q: "A marca deve parecer mais divertida, moderna, premium, popular ou prática?",
          placeholder: "Ex.: divertida + prática, com toque jovem (público 22-35)",
        },
        {
          q: "Quais cores vocês querem manter ou evitar?",
          placeholder: "Ex.: manter azul e amarelo do logo, evitar vermelho",
        },
        {
          q: "Existe algum estilo de loja/marca que vocês acham bonito?",
          placeholder: "Ex.: Oxxo, 7-Eleven Tóquio, Rappi visual",
        },
        {
          q: "Vocês querem uma comunicação mais jovem e descontraída ou mais direta e comercial?",
          placeholder: "Ex.: jovem e descontraída, mas sem perder credibilidade",
        },
        {
          q: "Precisam de materiais para fachada, cardápio, Instagram, iFood, sacola, adesivo ou uniforme?",
          placeholder: "Ex.: fachada nova + sacolas + uniforme + templates de Instagram",
        },
        {
          q: "Qual percepção vocês querem passar para o cliente? (ex.: “a conveniência mais rápida de Botafogo”, “gelou, pediu, chegou”)",
          placeholder: "Ex.: “a conveniência da Zona Sul que nunca falha”",
        },
      ],
    },
    {
      id: "s4",
      title: "Público-alvo em Botafogo",
      subtitle: "Quem compra, onde mora, o que busca",
      icon: "👥",
      color: "teal",
      questions: [
        {
          q: "Quem mais compra hoje na loja?",
          placeholder: "Ex.: 60% moradores 25-40, 30% galera de bar, 10% turistas",
        },
        {
          q: "O público é mais morador, estudante, trabalhador, turista ou galera de bar/festa?",
          placeholder: "Ex.: morador + galera de bar à noite",
        },
        {
          q: "Qual faixa etária compra mais?",
          placeholder: "Ex.: 22-38 anos",
        },
        {
          q: "O cliente costuma comprar mais gelo, bebida, cigarro, snack, doce, energético, itens de emergência?",
          placeholder: "Ex.: gelo + cerveja = 50% do volume",
        },
        {
          q: "Vocês vendem mais para consumo imediato ou compra para casa/festa?",
          placeholder: "Ex.: 70% para festa/resenha, 30% imediato",
        },
        {
          q: "Tem muitos condomínios, bares, empresas ou repúblicas perto?",
          placeholder: "Ex.: 5 condomínios grandes, 12 bares e Champanharia na rua",
        },
        {
          q: "Quais bairros próximos vocês querem atacar no delivery?",
          placeholder: "Ex.: Humaitá, Flamengo, Urca, parte do Cosme Velho",
        },
        {
          q: "Que tipo de cliente vocês querem atrair mais?",
          placeholder: "Ex.: morador recorrente (pede 2x semana) + bares parceiros",
        },
        {
          q: "Vocês têm clientes recorrentes?",
          placeholder: "Ex.: uns 80 clientes pedem toda semana pelo WhatsApp",
        },
        {
          q: "O público costuma pedir pelo WhatsApp ou prefere aplicativo?",
          placeholder: "Ex.: 70% WhatsApp, 30% pediria iFood se tivesse",
        },
      ],
    },
    {
      id: "s5",
      title: "Produtos, ticket médio e margem",
      subtitle: "Mix, volumes e rentabilidade",
      icon: "💰",
      color: "amber",
      questions: [
        {
          q: "Quais são os 10 produtos que mais vendem hoje?",
          placeholder: "Lista por volume: 1) gelo 5kg, 2) Heineken long neck, 3) Red Bull...",
        },
        {
          q: "O gelo é o produto principal? Qual volume vende por dia/semana?",
          placeholder: "Ex.: sim — 200kg/dia, 1.500kg/semana, sobe pra 350kg em dia de calor",
        },
        {
          q: "Quais bebidas vendem mais?",
          placeholder: "Ex.: Heineken, Brahma, Smirnoff Ice, Jack Daniel's, água com gás",
        },
        {
          q: "Qual é o ticket médio presencial?",
          placeholder: "Ex.: R$ 28",
        },
        {
          q: "Qual ticket médio vocês gostariam de ter no delivery?",
          placeholder: "Ex.: R$ 65-80 (com combo + taxa)",
        },
        {
          q: "Quais produtos têm maior margem de lucro?",
          placeholder: "Ex.: gelo (70%), destilados (45%), combos (50%)",
        },
        {
          q: "Quais produtos vendem muito, mas têm margem baixa?",
          placeholder: "Ex.: Heineken (18%), cigarro (12%)",
        },
        {
          q: "Vocês conseguem criar combos? (ex.: gelo + cerveja + carvão; gelo + energético + destilado)",
          placeholder: "Ex.: sim — já temos 4 combos prontos no balcão, precisa só formatar",
        },
        {
          q: "Existem produtos sazonais ou que vendem mais no fim de semana?",
          placeholder: "Ex.: gelo e carvão triplicam sex-dom; vinho aumenta no inverno",
        },
      ],
    },
    {
      id: "s6",
      title: "Instagram, Google, WhatsApp e tráfego pago",
      subtitle: "Presença digital e mídia",
      icon: "📱",
      color: "pink",
      questions: [
        {
          q: "O Instagram atual traz clientes ou está parado?",
          placeholder: "Ex.: parado há 6 meses, 3k seg. mas engajamento zero",
        },
        {
          q: "Vocês têm frequência de postagem?",
          placeholder: "Ex.: 1 post quando lembramos; ideal seria 3-4 por semana",
        },
        {
          q: "Já fizeram tráfego pago antes?",
          placeholder: "Ex.: 1 campanha de R$ 200 no boost de post, sem resultado",
        },
        {
          q: "O WhatsApp recebe pedidos ou dúvidas?",
          placeholder: "Ex.: ~40 pedidos/dia + dúvidas de horário/preço",
        },
        {
          q: "A loja aparece bem no Google quando pesquisam “conveniência em Botafogo”, “gelo Botafogo” ou “bebida delivery Botafogo”?",
          placeholder: "Ex.: aparecemos em 5º na busca por “gelo Botafogo”, sumidos no resto",
        },
        {
          q: "Vocês têm avaliações no Google?",
          placeholder: "Ex.: 12 avaliações, média 4.6",
        },
        {
          q: "Querem investir em anúncios para Instagram, WhatsApp, Google ou iFood?",
          placeholder: "Ex.: sim — todos, priorizando Meta Ads para WhatsApp",
        },
        {
          q: "Qual verba inicial pensam em colocar em tráfego por mês?",
          placeholder: "Ex.: R$ 1.500/mês nos primeiros 90 dias, escalar depois",
        },
        {
          q: "Vocês querem campanhas mais focadas em delivery, retirada na loja ou reconhecimento da marca?",
          placeholder: "Ex.: 60% delivery, 30% marca regional, 10% retirada",
        },
      ],
    },
    {
      id: "s7",
      title: "Diferenciais da loja",
      subtitle: "O que torna a Koala única",
      icon: "🏆",
      color: "green",
      questions: [
        {
          q: "Por que alguém deve comprar na Koala e não em outra conveniência?",
          placeholder: "Ex.: temos o gelo mais barato de Botafogo, abre até 04h e entrega em 15min",
        },
        {
          q: "Vocês têm preço competitivo?",
          placeholder: "Ex.: gelo 10% abaixo do Hortifruti, cerveja na média",
        },
        {
          q: "O gelo é mais barato, melhor ou sempre disponível?",
          placeholder: "Ex.: nunca falta, temos câmara fria própria",
        },
        {
          q: "A loja fica em ponto estratégico?",
          placeholder: "Ex.: esquina movimentada, 50m do metrô, ao lado de 3 bares",
        },
        {
          q: "Vocês têm variedade maior que os concorrentes?",
          placeholder: "Ex.: 8 tipos de destilado vs 3 do concorrente",
        },
        {
          q: "Conseguem montar pedidos personalizados para festas, churrascos ou eventos?",
          placeholder: "Ex.: sim — fazemos kits sob medida com 24h de antecedência",
        },
        {
          q: "Existe algum produto exclusivo ou muito procurado?",
          placeholder: "Ex.: distribuímos cerveja artesanal local que ninguém mais tem",
        },
      ],
    },
    {
      id: "s8",
      title: "Marca regional & B2B Zona Sul",
      subtitle: "Dominar Botafogo para conquistar empresas, bares e condomínios",
      icon: "🏙️",
      color: "purple",
      questions: [
        {
          q: "Em quanto tempo vocês querem ser reconhecidos como “a conveniência de Botafogo” na cabeça do morador?",
          placeholder: "Ex.: 6-9 meses para virar top-of-mind regional",
        },
        {
          q: "Quais bairros da Zona Sul são prioridade para expansão B2B depois de dominar Botafogo? (Flamengo, Humaitá, Urca, Copacabana, Leblon, Ipanema, Laranjeiras...)",
          placeholder: "Ex.: 1) Humaitá e Flamengo (curto prazo), 2) Copacabana e Leblon (médio)",
        },
        {
          q: "Vocês já fornecem para bares, restaurantes, condomínios, empresas ou eventos hoje?",
          placeholder: "Ex.: 2 bares parceiros (gelo semanal) e 1 produtora de evento",
        },
        {
          q: "Têm capacidade logística (estoque, entregador, prazo) para atender pedidos B2B recorrentes maiores?",
          placeholder: "Ex.: até 5 contratos fixos sem mexer na operação; mais que isso precisa contratar",
        },
        {
          q: "Conseguem oferecer condições especiais para contratos fixos? (preço, prazo de pagamento, entrega agendada)",
          placeholder: "Ex.: desconto 10-15% acima de R$ 2k/mês, faturamento mensal",
        },
        {
          q: "Que tipo de cliente B2B faz mais sentido: bares de Botafogo, condomínios residenciais, empresas/coworkings, produtoras de evento, hostels/hotéis?",
          placeholder: "Ex.: bares (já temos pé) + produtoras de evento (ticket alto)",
        },
        {
          q: "Vocês querem que a marca seja vista como popular e acessível, ou como confiável e profissional (mais corporativa) para abrir portas no B2B?",
          placeholder: "Ex.: popular para B2C, e linha “Koala para Empresas” mais corporativa",
        },
        {
          q: "Têm interesse em parcerias locais? (bares, lojas, academias, condomínios — co-marketing, descontos cruzados, fornecimento)",
          placeholder: "Ex.: sim — já conversamos com 2 bares e 1 academia",
        },
        {
          q: "Topam aparecer publicamente (entrevista local, conteúdo de bastidor, fundadores no Instagram) para construir autoridade de marca regional?",
          placeholder: "Ex.: sim, sócio principal topa gravar 2-3x por mês",
        },
        {
          q: "Existe algum case ou cliente B2B que já fecharam que dá para usar como prova social?",
          placeholder: "Ex.: Bar X há 8 meses pedindo gelo semanal, depoimento liberado",
        },
      ],
    },
    {
      id: "s9",
      title: "Campanhas e oportunidades comerciais",
      subtitle: "Hipóteses de campanha e sazonalidade",
      icon: "🚀",
      color: "red",
      questions: [
        {
          q: "Vocês conseguem vender combos para churrasco, festa, resenha e praia?",
          placeholder: "Ex.: sim — combos prontos: “Churrasco para 6”, “Resenha de sexta”, “Kit praia”",
        },
        {
          q: "Quais dias vendem mais gelo e bebida?",
          placeholder: "Ex.: sexta, sábado e véspera de feriado",
        },
        {
          q: "Em dias de calor, a venda aumenta muito?",
          placeholder: "Ex.: acima de 32°C dobra o volume de gelo",
        },
        {
          q: "Vocês conseguem fazer promoções rápidas tipo “combo da resenha”?",
          placeholder: "Ex.: sim — conseguimos rodar promo de fim de semana com 1 dia de antecedência",
        },
        {
          q: "Querem trabalhar com campanhas de urgência? (ex.: “acabou o gelo? chama a Koala”)",
          placeholder: "Ex.: sim, faz total sentido com o nosso prazo de 15min",
        },
        {
          q: "Existe demanda para entrega em condomínios e prédios comerciais?",
          placeholder: "Ex.: muita — moradores pedem todo fim de semana, alguns prédios pedem para reunião",
        },
        {
          q: "Vocês querem captar clientes pelo WhatsApp também, além do iFood?",
          placeholder: "Ex.: sim, WhatsApp é prioridade porque margem é maior (sem taxa do iFood)",
        },
      ],
    },
  ],
};
