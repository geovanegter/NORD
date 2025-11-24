const fireEmoji = '\u{1F525}';
const alertEmoji = '\u2757';
const pinEmoji = '\u{1F4CD}';
const brainEmoji = '\u{1F9E0}';
const trophyEmoji = '\u{1F3C6}';

export const myDayStatus = {
  monthTarget: 85000,
  current: 66500,
  daysRemaining: 12,
  daysElapsed: 18,
  daysTotal: 30,
  status: 'good',
  recommendation: {
    client: 'Bela Vista Tecidos',
    message: 'Alta probabilidade de recompra e queda de 22% no mes.',
    reason: '18 dias sem compra e mix basico abaixo da media.',
  },
  quickStats: [
    { id: 'clientsWeek', label: 'Clientes na semana', value: '6/12' },
    { id: 'mix', label: 'Mix foco vendido', value: '3/5' },
    { id: 'ticket', label: 'Ticket medio', value: 'R$ 480' },
    { id: 'drop', label: 'Clientes em queda', value: '2' },
  ],
  focusToday: [
    { id: 'hot', icon: fireEmoji, label: 'Clientes de alto potencial', value: '2' },
    { id: 'down', icon: alertEmoji, label: 'Clientes com queda forte', value: '3' },
    { id: 'near', icon: pinEmoji, label: 'Cliente perto de voce', value: '1' },
  ],
  insights: [
    'Venda pecas basicas no cliente Love Kids e garanta +R$ 3.500.',
    'Clientes de Recife respondem melhor a visitas ate 12h.',
    'Atenda Planeta Kids antes de sexta e aumente 8% do forecast.',
  ],
};

export const hotClients = [
  {
    id: 'hc1',
    name: 'Bela Vista Tecidos',
    city: 'Recife',
    need: 'Reposicao basica e comfy',
    potential: 'R$ 4.500',
    status: '18 dias sem compra',
  },
  {
    id: 'hc2',
    name: 'Planeta Kids',
    city: 'Olinda',
    need: 'Linha comfy RN',
    potential: 'R$ 3.800',
    status: 'Queda de 22% no mes',
  },
  {
    id: 'hc3',
    name: 'Love Kids',
    city: 'Recife',
    need: 'Reposicao basica liberada',
    potential: 'R$ 3.200',
    status: 'Perto de voce hoje',
  },
];

export const forecastData = {
  projected: 64000,
  message: 'Projecao indica que voce pode fechar acima da meta.',
  tip: 'Mantenha o ritmo atual e reforce a linha comfy para garantir o forecast.',
};

export const strategyGuide = {
  position: 11,
  value: 32000,
  leader: { name: 'Lucas Ferreira', value: 45000 },
  nextDiff: 3000,
  nextTarget: 'Beatriz Martins',
  action: 'Venda combos comfy + festa para ganhar R$ 3.000 e subir no ranking.',
};

export const clientsSummary = [
  { id: 'hot', label: 'Clientes quentes hoje', value: 3 },
  { id: 'drop', label: 'Clientes com queda', value: 2 },
  { id: 'inactive', label: 'Inativos +30 dias', value: 4 },
  { id: 'near', label: 'Perto de voce', value: 1 },
];

export const clientsList = [
  {
    id: 'cli1',
    name: 'Bela Vista Tecidos',
    city: 'Recife',
    cnpj: '12.345.678/0001-10',
    status: 'cliente quente',
    lastPurchase: '18 dias',
    ticket: 820,
    mixFocus: '4/6',
    flag: 'hot',
    cluster: 'Premium urbano',
    segment: 'Boutique têxtil',
    since: 'Cliente desde 2017',
    collections: [
      { id: 'c1', season: 'Verão 25', value: 'R$ 28.500' },
      { id: 'c2', season: 'Primavera 25', value: 'R$ 25.100' },
      { id: 'c3', season: 'Inverno 25', value: 'R$ 22.900' },
    ],
    insights: 'Mix jeans abaixo do normal. Ofereca SKUs 221, 328 e 711.',
    history: {
      monthValue: 'R$ 6.200',
      lastOrders: ['Pedido #1201 - R$ 3.200', 'Pedido #1189 - R$ 2.100'],
      evolution: '+12% vs. mes anterior',
    },
  },
  {
    id: 'cli2',
    name: 'Planeta Kids',
    city: 'Olinda',
    cnpj: '98.777.123/0001-55',
    status: 'queda forte',
    lastPurchase: '32 dias',
    ticket: 610,
    mixFocus: '2/6',
    flag: 'drop',
    cluster: 'Lojas multimarcas',
    segment: 'Rede infantil',
    since: 'Cliente desde 2019',
    collections: [
      { id: 'c1', season: 'Verão 25', value: 'R$ 18.900' },
      { id: 'c2', season: 'Primavera 25', value: 'R$ 21.400' },
      { id: 'c3', season: 'Inverno 25', value: 'R$ 16.200' },
    ],
    insights: 'Linha comfy zerada no ultimo pedido. Sugira combos comfy + basicos.',
    history: {
      monthValue: 'R$ 4.800',
      lastOrders: ['Pedido #1199 - R$ 2.000', 'Pedido #1170 - R$ 2.800'],
      evolution: '-22% no mes',
    },
  },
  {
    id: 'cli3',
    name: 'Mundo Baby',
    city: 'Jaboatao',
    cnpj: '45.000.456/0001-11',
    status: 'inativo',
    lastPurchase: '68 dias',
    ticket: 540,
    mixFocus: '1/6',
    flag: 'inactive',
    cluster: 'Carteira interior',
    segment: 'Loja regional',
    since: 'Cliente desde 2015',
    collections: [
      { id: 'c1', season: 'Verão 25', value: 'R$ 9.600' },
      { id: 'c2', season: 'Primavera 25', value: 'R$ 11.200' },
      { id: 'c3', season: 'Inverno 25', value: 'R$ 0' },
    ],
    insights: 'Cliente responde bem a ofertas de inverno. Ofereca kits com desconto progressivo.',
    history: {
      monthValue: 'R$ 0',
      lastOrders: ['Pedido #1123 - R$ 1.900'],
      evolution: '-100% no mes',
    },
  },
  {
    id: 'cli4',
    name: 'Love Kids',
    city: 'Recife',
    cnpj: '23.500.100/0001-05',
    status: 'perto de voce',
    lastPurchase: '9 dias',
    ticket: 990,
    mixFocus: '5/6',
    flag: 'near',
    cluster: 'Premium mix',
    segment: 'Flagship urbano',
    since: 'Cliente desde 2020',
    collections: [
      { id: 'c1', season: 'Verão 25', value: 'R$ 32.000' },
      { id: 'c2', season: 'Primavera 25', value: 'R$ 29.500' },
      { id: 'c3', season: 'Inverno 25', value: 'R$ 27.800' },
    ],
    insights: 'Reposicao basica liberada. Ticket medio acima da media.',
    history: {
      monthValue: 'R$ 8.700',
      lastOrders: ['Pedido #1205 - R$ 4.200', 'Pedido #1197 - R$ 4.500'],
      evolution: '+18% no mes',
    },
  },
];

export const routePlan = {
  suggestions: [
    'Mundo Kids - 32 dias sem compra (alta probabilidade).',
    'Bela Vista - queda de 22% no mes.',
    'Ponto Certo - perto de voce agora.',
  ],
  buckets: {
    today: [
      { id: 'r1', name: 'Bela Vista Tecidos', reason: '18 dias sem compra', priority: 'Alta' },
      { id: 'r2', name: 'Love Kids', reason: 'Reposicao basica liberada', priority: 'Media' },
    ],
    week: [
      { id: 'r3', name: 'Planeta Kids', reason: 'Queda de 22% no mes', priority: 'Alta' },
      { id: 'r4', name: 'Casa do Bebe', reason: 'Mix comfy zerado', priority: 'Media' },
    ],
    inactive: [{ id: 'r5', name: 'Mundo Baby', reason: '68 dias sem compra', priority: 'Alta' }],
    nearby: [{ id: 'r6', name: 'Ponto Certo', reason: '1.3 km de distancia', priority: 'Media' }],
  },
  mapPins: [
    { id: 'rp1', client: 'Bela Vista Tecidos', city: 'Recife', status: 'Alta probabilidade' },
    { id: 'rp2', client: 'Planeta Kids', city: 'Olinda', status: 'Queda 22%' },
    { id: 'rp3', client: 'Love Kids', city: 'Recife', status: 'Perto de voce' },
    { id: 'rp4', client: 'Mundo Baby', city: 'Jaboatao', status: 'Inativo 68 dias' },
  ],
};

export const gamesData = {
  ranking: [
    { id: 'g1', name: 'Ana Paula', value: '112%' },
    { id: 'g2', name: 'Lucas Silva', value: '98%' },
    { id: 'current', name: 'Voce', value: '87%' },
  ],
  badges: [
    { id: 'b1', label: 'Visitou 10 clientes no mes', earned: true },
    { id: 'b2', label: '5 clientes recuperados', earned: false },
    { id: 'b3', label: 'Mix foco completo', earned: false },
    { id: 'b4', label: 'Maior crescimento da semana', earned: false },
  ],
  challenges: [
    { id: 'ch1', label: 'Atender 10 clientes', done: 6 },
    { id: 'ch2', label: 'Recuperar 1 cliente inativo', done: 0 },
    { id: 'ch3', label: 'Vender 3 itens foco', done: 2 },
    { id: 'ch4', label: 'Visitar cliente sugerido pela IA', done: 1 },
  ],
  points: { total: 620, weekly: 180 },
  rewards: [
    { id: 'rw1', label: '500 pts - destaque no ranking' },
    { id: 'rw2', label: '1000 pts - badge especial' },
    { id: 'rw3', label: '5000 pts - categoria ouro' },
  ],
};

export const trainingsContent = {
  videos: [
    {
      id: 'vid1',
      title: 'Pitch da coleÃ§Ã£o cÃ¡psula bÃ¡sica',
      duration: '4 min',
      tag: 'ColeÃ§Ã£o AW25',
      description: 'Aprenda a apresentar o mix bÃ¡sico em 3 passos e destrave o combo comfy.',
      reward: '+80 XP',
      action: 'Assistir agora',
    },
    {
      id: 'vid2',
      title: 'Como ativar clientes inativos com IA',
      duration: '6 min',
      tag: 'IA na rotina',
      description: 'Use o roteirizador e personalize ofertas para quem estÃ¡ hÃ¡ +30 dias sem comprar.',
      reward: '+120 XP',
      action: 'Rever aula',
    },
    {
      id: 'vid3',
      title: 'Storytelling para vender kits festa',
      duration: '5 min',
      tag: 'ExperiÃªncia',
      description: 'Transforme o catÃ¡logo em histÃ³rias rÃ¡pidas e aumente o ticket mÃ©dio.',
      reward: '+95 XP',
      action: 'Continuar de onde parei',
    },
  ],
  challenges: [
    {
      id: 'trg1',
      title: 'Quiz mix bÃ¡sico',
      description: 'Acerte 5 perguntas sobre o curso e ganhe badge especialista.',
      reward: '+50 pts em Games',
      status: 'DisponÃ­vel hoje',
    },
    {
      id: 'trg2',
      title: 'SimulaÃ§Ã£o IA',
      description: 'Monte uma rota IA ideal apÃ³s assistir a aula de clientes inativos.',
      reward: '+1 badge EstratÃ©gia',
      status: 'Desafio semanal',
    },
    {
      id: 'trg3',
      title: 'Compartilhe um vÃ­deo',
      description: 'Envie o resumo da aula para outro representante e some pontos extra.',
      reward: '+30 pts + 5 XP',
      status: 'BÃ´nus rÃ¡pido',
    },
  ],
};

export const managerOverview = {
  meta: {
    region: 'Nordeste',
    target: 540000,
    actual: 421000,
    percent: 78,
    remaining: 119000,
    daysLeft: 11,
  },
  timePercent: 64,
  iaSuggestion: {
    highlight: 'Concentre-se no Lucas — queda de 18% e mix premium em baixa.',
    action: 'Planeje rota conjunta na quarta-feira.',
  },
  topReps: [
    { id: 'rep1', name: 'Ana', percent: 112, status: '🔥 Crescendo', note: '+8% na semana' },
    { id: 'rep2', name: 'Marcos', percent: 97, status: '🟡 Oscilando', note: 'Mix comfy em 62%' },
    { id: 'rep3', name: 'Lucas', percent: 62, status: '🔴 Risco', note: 'Clientes premium em queda' },
  ],
  regionalKPIs: [
    { id: 'clients', label: 'Clientes atendidos', value: '184', helper: 'Meta 220' },
    { id: 'ticket', label: 'Ticket medio', value: 'R$ 1.180', helper: '+12% vs. mes anterior' },
    { id: 'mix', label: 'Mix foco', value: '72%', helper: 'Objetivo 85%' },
    { id: 'inactive', label: 'Inativos +30 dias', value: '34', helper: '-6 vs. semana passada' },
  ],
  opportunities: [
    { id: 'opp1', icon: '🔥', title: 'Grandes clientes em risco', detail: 'Solaris Kids, Bella Moda, Planeta Baby' },
    { id: 'opp2', icon: '📉', title: 'Regioes com queda', detail: 'Zona Norte (-18%), Interior Sul (-11%)' },
    { id: 'opp3', icon: '🎯', title: 'Clientes com potencial', detail: 'Love Kids, Universo Baby, Boutique Luz' },
  ],
  riskReps: ['Lucas', 'Pablo', 'Renata'],
  customersInRisk: [
    { id: 'cr1', name: 'Solaris Kids', rep: 'Lucas', value: 'R$ 82K/mes', lastPurchase: '12 dias', status: '📉 queda 18%' },
    { id: 'cr2', name: 'Bella Moda', rep: 'Ana', value: 'R$ 75K/mes', lastPurchase: '9 dias', status: '🔥 foco mix festa' },
  ],
};

export const managerTeam = {
  summary: [
    { id: 'active', label: 'Reps ativos', value: '18', helper: '3 em risco' },
    { id: 'premium', label: 'Carteira premium', value: 'R$ 310K', helper: '+9% vs. mês anterior' },
    { id: 'visits', label: 'Visitas médias', value: '12/dia', helper: 'IA recomenda 14' },
  ],
  reps: [
    {
      id: 'ana',
      name: 'Ana Paula',
      percent: 112,
      status: '🔥 Crescendo',
      ticket: 'R$ 1.320',
      clientsAttended: 42,
      mixFocus: '84%',
      insights: ['Carteira premium com queda leve', 'Adicionar Solaris Kids no roteiro de quinta'],
      topClients: ['Solaris Kids', 'Planeta Baby', 'Bela Moda'],
      actions: ['Adicionar cliente ao roteiro', 'Sugerir foco comfy'],
    },
    {
      id: 'marcos',
      name: 'Marcos Vieira',
      percent: 97,
      status: '🟡 Oscilando',
      ticket: 'R$ 1.080',
      clientsAttended: 36,
      mixFocus: '69%',
      insights: ['Mix comfy em 62% — reforçar kits básicos', 'Cliente Universo Baby sem visita há 20 dias'],
      topClients: ['Universo Baby', 'Casa do Bebê', 'Mundo Infantil'],
      actions: ['Revisar carteira', 'Sugerir foco do dia'],
    },
    {
      id: 'lucas',
      name: 'Lucas Andrade',
      percent: 62,
      status: '🔴 Risco',
      ticket: 'R$ 890',
      clientsAttended: 21,
      mixFocus: '54%',
      insights: ['Carteira premium com queda', 'Rever estratégia nos clientes Solaris e Bella Moda'],
      topClients: ['Solaris Kids', 'Bella Moda', 'Planeta Baby'],
      actions: ['Adicionar clientes ao roteiro', 'Planejar visita conjunta'],
    },
    {
      id: 'renata',
      name: 'Renata Lima',
      percent: 85,
      status: '🟡 Oscilando',
      ticket: 'R$ 1.040',
      clientsAttended: 31,
      mixFocus: '71%',
      insights: ['IA sugere reforçar mix festa no litoral norte', 'Clientes inativos em Paulista'],
      topClients: ['Boutique Luz', 'Love Kids', 'Casa Azul'],
      actions: ['Revisar carteira', 'Sugerir foco do dia'],
    },
  ],
};

export const managerClients = {
  filters: ['Todos', 'Grandes', 'Em queda', 'Potencial', 'Inativos', 'Proximos'],
  list: [
    {
      id: 'mgr-cli1',
      name: 'Solaris Kids',
      value: 'R$ 82K/mes',
      lastPurchase: '12 dias',
      rep: 'Lucas',
      status: '📉 queda 18%',
      insight: 'Mix premium fora do ideal. Precisa de visita conjunta.',
    },
    {
      id: 'mgr-cli2',
      name: 'Bella Moda',
      value: 'R$ 75K/mes',
      lastPurchase: '9 dias',
      rep: 'Ana',
      status: '🔥 foco mix festa',
      insight: 'Campanha festa abriu oportunidade de +R$ 15K.',
    },
    {
      id: 'mgr-cli3',
      name: 'Planeta Baby',
      value: 'R$ 54K/mes',
      lastPurchase: '21 dias',
      rep: 'Marcos',
      status: '🟡 potencial alto',
      insight: 'Ticket médio pode subir 12% com combos comfy.',
    },
    {
      id: 'mgr-cli4',
      name: 'Love Kids',
      value: 'R$ 49K/mes',
      lastPurchase: '6 dias',
      rep: 'Renata',
      status: '📈 retomando',
      insight: 'Pronta para mix festa + comfy. IA sugere visita antes de sexta.',
    },
  ],
};

export const managerRoutePlan = {
  priorities: [
    '1. Solaris Kids — queda 28% (Lucas)',
    '2. Bella Moda — +18% potencial (Ana)',
    '3. Lucas — baixa atividade na Zona Leste',
  ],
  kanban: {
    segunda: [
      { id: 'mon1', title: 'Revisitar Solaris com Lucas', tag: 'Cliente grande', action: 'Planejar visita conjunta' },
      { id: 'mon2', title: 'Roteiro IA Recife', tag: 'Roteiro', action: 'Gerar roteiro automático' },
    ],
    terca: [
      { id: 'tue1', title: 'Check-in com Renata', tag: 'Rep', action: 'Enviar foco diário' },
      { id: 'tue2', title: 'Adicionar Universo Baby', tag: 'Cliente', action: 'Inserir no roteiro do Marcos' },
    ],
    quarta: [
      { id: 'wed1', title: 'Visita conjunta Lucas', tag: 'Rep em risco', action: 'Confirmar agenda' },
      { id: 'wed2', title: 'Revisar carteira premium', tag: 'Analise', action: 'Abrir painel de carteira' },
    ],
    quinta: [
      { id: 'thu1', title: 'Campanha mix festa', tag: 'Campanha', action: 'Enviar orientação aos reps' },
    ],
    sexta: [
      { id: 'fri1', title: 'Follow IA clientes inativos', tag: 'IA', action: 'Executar lote IA' },
    ],
  },
  mapPins: [
    { id: 'pin1', city: 'Recife', value: 'R$ 210K', reps: ['Ana', 'Lucas'] },
    { id: 'pin2', city: 'Olinda', value: 'R$ 95K', reps: ['Marcos'] },
    { id: 'pin3', city: 'Paulista', value: 'R$ 64K', reps: ['Renata'] },
    { id: 'pin4', city: 'Caruaru', value: 'R$ 48K', reps: ['Pablo'] },
  ],
};

export const managerGames = {
  teamRanking: [
    { id: 'mgr-r1', name: 'Ana', value: '112%' },
    { id: 'mgr-r2', name: 'Marcos', value: '97%' },
    { id: 'mgr-r3', name: 'Renata', value: '85%' },
    { id: 'mgr-r4', name: 'Lucas', value: '62%' },
  ],
  badges: [
    {
      id: 'mgr-b1',
      icon: '🏙️',
      label: 'Descobridor de cidades',
      rep: 'Ana',
      detail: 'Abriu 2 clientes em Paulista',
      earned: true,
    },
    {
      id: 'mgr-b2',
      icon: '🎯',
      label: 'Força do mix',
      rep: 'Marcos',
      detail: 'Mix comfy > 75%',
      earned: false,
    },
    {
      id: 'mgr-b3',
      icon: '💎',
      label: 'Resgate premium',
      rep: 'Lucas',
      detail: 'Recuperou 1 cliente grande',
      earned: false,
    },
  ],
  challenges: [
    { id: 'mgr-ch1', label: 'Crescimento regional', progress: 78, target: 100 },
    { id: 'mgr-ch2', label: 'Mix comfy', progress: 72, target: 85 },
    { id: 'mgr-ch3', label: 'Recuperar clientes', progress: 2, target: 5 },
    { id: 'mgr-ch4', label: 'Engajamento nos treinos', progress: 68, target: 90 },
  ],
  points: { growth: 320, mix: 210, recovery: 180, engagement: 140 },
};

export const managerProfile = {
  name: 'Clara Monteiro',
  region: 'Nordeste',
  squads: ['Recife', 'Interior', 'Zona Norte'],
  reps: ['Ana', 'Marcos', 'Lucas', 'Renata', 'Pablo', 'Tiago'],
  permissions: ['Aprovar roteiros IA', 'Editar carteira de clientes', 'Acessar BI de campanhas'],
  policies: ['Política comercial 2025', 'Manual de privacidade', 'Programa de incentivo'],
};

export const profileInfo = {
  name: 'Geovane Nunes',
  code: 'RC-2041',
  region: 'Recife e litoral norte',
  companies: ['Bela Vista Tecidos', 'Planeta Kids', 'Love Kids'],
  permissions: ['GPS ativo', 'Assistente IA habilitado'],
};

export const brainIcon = brainEmoji;
export const trophyIcon = trophyEmoji;


