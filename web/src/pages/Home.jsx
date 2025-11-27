import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext.jsx';
import { myDayStatus, strategyGuide, managerOverview } from '@/data/mockData.js';
import {
  Home as HomeIcon,
  Users,
  MapPinned,
  GraduationCap,
  Trophy,
  UserRound,
  Route,
  Joystick,
} from 'lucide-react';

const shortcutLinks = [
  { id: 'home', label: 'Home', to: '/', helper: 'Visão geral do dia', icon: HomeIcon },
  { id: 'clientes', label: 'Clientes', to: '/clientes', helper: 'IA sugere quem visitar', icon: Users },
  { id: 'roteiro', label: 'Roteiro', to: '/roteiro', helper: 'Monte o plano da semana', icon: MapPinned },
  { id: 'treinamentos', label: 'Treinamentos', to: '/treinamentos', helper: 'Cursos rápidos + desafios', icon: GraduationCap },
  { id: 'games', label: 'Games', to: '/games', helper: '+150 pts hoje', icon: Trophy },
  { id: 'perfil', label: 'Perfil', to: '/perfil', helper: 'Atualize seu status', icon: UserRound },
];

const managerShortcuts = [
  { id: 'home', label: 'Home', to: '/', helper: 'Pulso regional', icon: HomeIcon },
  { id: 'equipes', label: 'Representantes', to: '/gerente/representantes', helper: 'Veja desempenho e riscos', icon: Users },
  { id: 'clientes', label: 'Clientes', to: '/gerente/clientes', helper: 'Priorize contas estratégicas', icon: MapPinned },
  { id: 'roteiro', label: 'Roteiro tático', to: '/gerente/roteiro', helper: 'Planeje a semana com IA', icon: Route },
  { id: 'games', label: 'Games equipe', to: '/gerente/games', helper: 'Engaje e acompanhe desafios', icon: Joystick },
  { id: 'perfil', label: 'Perfil', to: '/perfil', helper: 'Configurações rápidas', icon: UserRound },
];

const priorityClients = [
  {
    id: 'pc1',
    name: 'Loja da Maria',
    city: 'Recife',
    status: '🔥 Alta probabilidade',
    insight: 'Cliente comprou nesta mesma data no ano passado.',
    potential: 'R$ 5.200',
    search: 'Loja da Maria',
  },
  {
    id: 'pc2',
    name: 'Planeta Kids',
    city: 'Olinda',
    status: '⚠️ Queda de 22%',
    insight: 'Mix comfy zerado, ofereça combos comfy + básicos.',
    potential: 'R$ 4.000',
    search: 'Planeta Kids',
  },
  {
    id: 'pc3',
    name: 'Bela Vista Tecidos',
    city: 'Recife',
    status: '🔥 Cliente quente',
    insight: 'Reposição básica liberada e ticket alto.',
    potential: 'R$ 4.500',
    search: 'Bela Vista Tecidos',
  },
  {
    id: 'pc4',
    name: 'Mundo Kids',
    city: 'Jaboatão',
    status: '🧊 Inativo há 60 dias',
    insight: 'Ative com kits inverno + desconto progressivo.',
    potential: 'R$ 3.600',
    search: 'Mundo Kids',
  },
  {
    id: 'pc5',
    name: 'Casa do Bebê',
    city: 'Paulista',
    status: '📍 Próximo de você',
    insight: 'Linha casual em falta, leve novidades da coleção.',
    potential: 'R$ 3.100',
    search: 'Casa do Bebê',
  },
];

const weeklyChallenges = [
  {
    id: 'positivar',
    icon: '✅',
    label: 'Positivar 5 clientes',
    current: 3,
    target: 5,
    helper: 'Faltam 2 clientes para concluir.',
    type: 'count',
  },
  {
    id: 'weekly-sales',
    icon: '💰',
    label: 'Venda semanal',
    current: 18500,
    target: 30000,
    helper: 'Acelere combos comfy e ganhe +2% da campanha.',
    type: 'currency',
  },
  {
    id: 'new-clients',
    icon: '🆕',
    label: 'Abrir novos clientes',
    current: 1,
    target: 3,
    helper: 'Use leads IA para ativar novos pontos.',
    type: 'count',
  },
];

const HOME_STYLES = `
  @keyframes fitness-fade-in {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fitness-glow {
    0%, 100% {
      opacity: 0.4;
      transform: scale(1) translateY(0);
    }
    50% {
      opacity: 0.6;
      transform: scale(1.1) translateY(-10px);
    }
  }

  .fitness-shell .fitness-panel {
    animation: fitness-fade-in 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    animation-delay: var(--delay, 0ms);
    opacity: 0;
  }

  .fitness-shell .fitness-glow {
    animation: fitness-glow 20s ease-in-out infinite;
    will-change: transform, opacity;
  }

  @media (prefers-reduced-motion: reduce) {
    .fitness-shell .fitness-panel {
      animation: none;
      opacity: 1;
    }

    .fitness-shell .fitness-glow {
      animation: none;
    }
  }
`;

function HomeLayout({ children }) {
  return (
    <div className="fitness-shell relative min-h-screen overflow-hidden" style={{ backgroundColor: '#000000' }}>
      <style>{HOME_STYLES}</style>
      <div className="pointer-events-none absolute inset-0">
        <div className="fitness-glow absolute left-[10%] top-[15%] h-[500px] w-[500px] rounded-full opacity-40" style={{ background: 'radial-gradient(circle, rgba(250, 17, 79, 0.25) 0%, transparent 70%)' }} aria-hidden />
        <div className="fitness-glow absolute right-[15%] top-[40%] h-[600px] w-[600px] rounded-full opacity-30" style={{ background: 'radial-gradient(circle, rgba(0, 199, 190, 0.2) 0%, transparent 70%)', animationDelay: '7s' }} aria-hidden />
        <div className="fitness-glow absolute left-[40%] bottom-[10%] h-[400px] w-[400px] rounded-full opacity-35" style={{ background: 'radial-gradient(circle, rgba(146, 232, 42, 0.18) 0%, transparent 70%)', animationDelay: '14s' }} aria-hidden />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-10">{children}</div>
    </div>
  );
}

const formatCurrency = (value) => `R$ ${value.toLocaleString('pt-BR')}`;
const IA_PLACEHOLDER_PROMPT = 'Como posso te ajudar a vender mais?';

function useLocalizedGreeting() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const info = useMemo(() => {
    const hour = now.getHours();
    const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';
    const localeTime = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const tzRaw = Intl.DateTimeFormat().resolvedOptions().timeZone ?? '';
    const timeZone = tzRaw.replace('_', ' ');
    return { greeting, localeTime, timeZone };
  }, [now]);

  return info;
}

function WeeklyChallengesSection({ style }) {
  return (
    <section
      className="fitness-panel fitness-card rounded-3xl p-6"
      style={style}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400">
        Desafios da semana
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {weeklyChallenges.map((challenge) => {
          const progress = challenge.target ? Math.min(1, challenge.current / challenge.target) : 0;
          const percent = Math.round(progress * 100);
          const valueLabel =
            challenge.type === 'currency'
              ? `${formatCurrency(challenge.current)} / ${formatCurrency(challenge.target)}`
              : `${challenge.current}/${challenge.target}`;

          return (
            <div
              key={challenge.id}
              className="fitness-card rounded-2xl p-5"
            >
              <p className="text-3xl">{challenge.icon}</p>
              <p className="mt-3 text-lg font-semibold text-white">{challenge.label}</p>
              <p className="mt-1 text-sm font-medium text-gray-400">{valueLabel}</p>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }} role="presentation">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${percent}%`, background: 'linear-gradient(90deg, #fa114f 0%, #92e82a 100%)' }}
                  aria-label={`${percent}% concluído`}
                />
              </div>
              <p className="mt-2 text-sm font-bold text-white">{percent}%</p>
              <p className="mt-1 text-xs text-gray-400">{challenge.helper}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function AnimatedRing({ size, radius, strokeWidth, percent, color, trackColor = 'rgba(255, 255, 255, 0.15)', delay = 0 }) {
  const circumference = 2 * Math.PI * radius;
  const [progress, setProgress] = useState(0);
  const center = size / 2;

  useEffect(() => {
    const timeout = setTimeout(() => setProgress(percent ?? 0), delay);
    return () => clearTimeout(timeout);
  }, [percent, delay]);

  const offset = circumference * (1 - Math.max(0, Math.min(progress, 100)) / 100);
  const rotation = `rotate(-90 ${center} ${center})`;

  return (
    <>
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke={trackColor}
        strokeWidth={strokeWidth}
        fill="transparent"
        strokeLinecap="round"
        transform={rotation}
      />
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="transparent"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={rotation}
        className="fitness-ring"
        style={{
          transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
          color: color
        }}
      />
    </>
  );
}

function StackedRings({ rings, size = 160, strokeWidth = 12 }) {
  const center = size / 2;
  return (
    <svg width={size} height={size}>
      {rings.map((ring, index) => {
        const radius = center - strokeWidth / 2 - index * (strokeWidth + 8);
        return (
          <AnimatedRing
            key={ring.id}
            size={size}
            radius={radius}
            strokeWidth={strokeWidth}
            percent={ring.percent}
            color={ring.color}
            trackColor={ring.trackColor}
            delay={index * 150}
          />
        );
      })}
    </svg>
  );
}

function FitnessRingCard({ title, percent, helper, accent = '#10b981', track = '#e2e8f0' }) {
  const clamped = Math.max(0, Math.min(percent ?? 0, 100));
  const deg = (clamped / 100) * 360;
  const gradient = `conic-gradient(${accent} ${deg}deg, ${track} ${deg}deg 360deg)`;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{title}</p>
      <div className="mt-4 flex items-center gap-4">
        <div className="relative h-28 w-28">
          <div className="absolute inset-0 rounded-full" style={{ background: gradient }} />
          <div className="absolute inset-2 rounded-full bg-white" />
          <div className="absolute inset-4 flex flex-col items-center justify-center rounded-full bg-white text-center">
            <p className="text-2xl font-bold text-slate-900">{Math.round(clamped)}%</p>
            <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">meta</p>
          </div>
        </div>
        <p className="text-sm font-semibold text-slate-600">{helper}</p>
      </div>
    </div>
  );
}

function StackedRingsCard({ title, helper, rings, className = '', style }) {
  return (
    <div
      className={`fitness-panel fitness-card rounded-3xl p-6 ${className}`.trim()}
      style={style}
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
        <div className="relative mx-auto h-52 w-52">
          <StackedRings rings={rings} size={208} strokeWidth={16} />
          {title ? (
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400">{title}</p>
            </div>
          ) : null}
        </div>
        <div className="flex-1 space-y-3 text-sm">
          {rings.map((ring) => (
            <div key={ring.id} className="flex items-center gap-3">
              <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: ring.color, boxShadow: `0 0 12px ${ring.color}` }} />
              <p className="flex-1 font-semibold text-white">{ring.label}</p>
              <p className="metric-value text-xl font-bold text-white">{ring.percent}%</p>
            </div>
          ))}
          {helper ? (
            <p className="pt-4 text-sm font-medium leading-relaxed text-gray-300 whitespace-pre-line">{helper}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function RepresentativeHome({ user }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { greeting } = useLocalizedGreeting();
  const [placeholderText, setPlaceholderText] = useState('');
  const avatarInitials = user?.name
    ? user.name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join('')
    : 'NR';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      if (index <= IA_PLACEHOLDER_PROMPT.length) {
        setPlaceholderText(IA_PLACEHOLDER_PROMPT.slice(0, index));
      } else {
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  const monthTarget = myDayStatus?.monthTarget ?? 0;
  const currentValue = myDayStatus?.current ?? 0;
  const daysElapsed = myDayStatus?.daysElapsed ?? 0;
  const daysTotal = myDayStatus?.daysTotal ?? 1;
  const daysRemaining = myDayStatus?.daysRemaining ?? 0;
  const baseInsights = myDayStatus?.insights ?? [];

  const monthPercent = monthTarget ? Math.min(1, currentValue / monthTarget) : 0;
  const timePercent = daysTotal ? Math.min(1, daysElapsed / daysTotal) : 0;
  const remaining = Math.max(0, monthTarget - currentValue);
  const dailyGoal = daysRemaining > 0 ? Math.ceil(remaining / daysRemaining) : monthTarget / (daysTotal || 1);

  const stackedRings = [
    {
      id: 'rep-meta',
      label: 'Meta da coleção',
      percent: Math.round(monthPercent * 100),
      color: '#fa114f',
      trackColor: 'rgba(250, 17, 79, 0.2)',
    },
    {
      id: 'rep-time',
      label: 'Tempo da coleção',
      percent: Math.round(timePercent * 100),
      color: '#00c7be',
      trackColor: 'rgba(0, 199, 190, 0.2)',
    },
  ];

  const insights = [
    'Restam 7 dias para finalizar a campanha de aceleração. Aproveite +2% de comissão e +150 pts nos Games cumprindo a rota IA.',
    ...baseInsights,
  ];

  const handleSearch = (event) => {
    event.preventDefault();
    const term = searchTerm.trim();
    if (!term) return;
    navigate(`/clientes?search=${encodeURIComponent(term)}`);
  };

  return (
    <div className="space-y-5">
      <section
        className="fitness-panel fitness-card rounded-3xl p-6"
        style={{ '--delay': '40ms' }}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-gray-400">{greeting}</p>
            <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              {user?.name ?? 'Representante Nord'}
            </h1>
          </div>
          <div className="flex items-center justify-end">
            <div className="flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold text-white" style={{ background: 'linear-gradient(135deg, #fa114f 0%, #92e82a 100%)' }}>
              {avatarInitials}
            </div>
          </div>
        </div>

        <form onSubmit={handleSearch} className="relative mt-6 flex-1">
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 pr-28 py-4 text-sm font-medium text-white placeholder-gray-400 outline-none backdrop-blur-xl transition focus:border-white/20 focus:bg-white/10 focus:ring-2 focus:ring-white/20"
            placeholder={placeholderText || IA_PLACEHOLDER_PROMPT}
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white px-5 py-2 text-xs font-bold uppercase tracking-widest text-black transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            IA
          </button>
        </form>
      </section>

      <StackedRingsCard
        title=""
        helper={`Faltam ${formatCurrency(remaining)} em ${daysRemaining} dias\nMeta faltante por dia: ${formatCurrency(
          Math.max(dailyGoal, 0),
        )}`}
        rings={stackedRings}
        style={{ '--delay': '120ms' }}
      />
      <WeeklyChallengesSection style={{ '--delay': '160ms' }} />

      <section
        className="fitness-panel fitness-card rounded-3xl p-6"
        style={{ '--delay': '200ms' }}
      >
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400">
            5 principais clientes a atender
          </p>
          <Link to="/clientes" className="text-xs font-semibold text-white transition hover:text-gray-300">
            Ver todos
          </Link>
        </div>
        <div className="mt-5 space-y-3">
          {priorityClients.map((client) => (
            <article
              key={client.id}
              className="fitness-card rounded-2xl p-4 md:flex md:items-center md:justify-between md:gap-4"
            >
              <div className="flex-1">
                <p className="text-base font-semibold text-white">{client.name}</p>
                <p className="mt-1 text-sm text-gray-300">
                  {client.city} · {client.status}
                </p>
                <p className="mt-1 text-xs text-gray-400">{client.insight}</p>
              </div>
              <div className="mt-3 text-left md:mt-0 md:text-right">
                <p className="text-lg font-bold" style={{ color: '#92e82a' }}>{client.potential}</p>
                <Link
                  to={`/clientes?search=${encodeURIComponent(client.search)}`}
                  className="text-xs font-semibold text-gray-400 transition hover:text-white"
                >
                  ver cliente
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="fitness-panel fitness-card rounded-3xl p-6"
        style={{ '--delay': '240ms' }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em]" style={{ color: '#92e82a' }}>
          Insights da IA
        </p>
        <p className="mt-2 text-lg font-semibold text-white">Para bater a meta mais rápido:</p>
        <ul className="mt-4 space-y-3 text-sm text-gray-300">
          {insights.map((tip) => (
            <li key={tip} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
              {tip}
            </li>
          ))}
        </ul>
      </section>

      <section
        className="fitness-panel fitness-card rounded-3xl p-5"
        style={{ '--delay': '280ms' }}
      >
        <div className="flex items-center gap-3 text-sm">
          <span className="text-3xl" aria-hidden>
            🎮
          </span>
          <p className="text-gray-300">
            Complete o desafio de visitas IA hoje e ganhe +150 pts nos Games. Falta {formatCurrency(remaining)} para chegar a 100%.
          </p>
        </div>
      </section>

      <section
        className="fitness-panel fitness-card rounded-3xl p-6"
        style={{ '--delay': '320ms' }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400">
          Ranking e orientação
        </p>
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
          <p className="text-base font-semibold text-white">
            Você está em {strategyGuide.position}º lugar com {formatCurrency(strategyGuide.value)}
          </p>
          <p className="mt-2 text-sm text-gray-300">
            {strategyGuide.leader.name} lidera com {formatCurrency(strategyGuide.leader.value)}
          </p>
          <div className="mt-4 rounded-xl border border-white/10 px-4 py-3 text-sm" style={{ backgroundColor: 'rgba(250, 17, 79, 0.15)', color: '#fa114f' }}>
            Diferença: faltam {formatCurrency(strategyGuide.nextDiff)} para passar {strategyGuide.nextTarget}.
          </div>
          <p className="mt-3 text-sm font-semibold text-gray-300">{strategyGuide.action}</p>
        </div>
      </section>

      <section
        className="fitness-panel grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        style={{ '--delay': '360ms' }}
      >
        {shortcutLinks.map((shortcut) => (
          <Link
            key={shortcut.id}
            to={shortcut.to}
            className="fitness-card rounded-3xl p-5 text-left transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            <shortcut.icon className="h-6 w-6" style={{ color: '#92e82a' }} />
            <p className="mt-3 text-base font-semibold text-white">{shortcut.label}</p>
            <p className="mt-1 text-xs font-normal text-gray-400">{shortcut.helper}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}

function ManagerHome({ user }) {
  const { meta, timePercent, iaSuggestion, topReps, regionalKPIs, opportunities, riskReps, customersInRisk } = managerOverview;
  const capitalizedName = user?.name?.split(' ')[0] ?? 'gestor';
  const { greeting } = useLocalizedGreeting();
  const metaPercent = meta?.percent ?? 0;
  const timePct = timePercent ?? 0;
  const managerRings = [
    {
      id: 'mgr-meta',
      label: 'Meta da região',
      percent: Math.round(metaPercent),
      color: '#fa114f',
      trackColor: 'rgba(250, 17, 79, 0.2)',
    },
    {
      id: 'mgr-time',
      label: 'Tempo da coleção',
      percent: Math.round(timePct),
      color: '#00c7be',
      trackColor: 'rgba(0, 199, 190, 0.2)',
    },
  ];

  return (
    <div className="space-y-5">
      <section
        className="fitness-panel fitness-card rounded-3xl p-6"
        style={{ '--delay': '40ms' }}
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
          <div className="flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em]" style={{ color: '#fa114f' }}>Visão tática - Região {meta.region}</p>
            <h1 className="mt-2 text-3xl font-bold text-white">
              {greeting}, {capitalizedName}!
            </h1>
            <p className="mt-2 text-sm text-gray-300">
              Meta em {metaPercent}% · faltam {formatCurrency(meta.remaining)} e {meta.daysLeft} dias para fechar.
            </p>
            <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">Falta para meta</p>
                <p className="mt-1 text-2xl font-semibold text-white">{formatCurrency(meta.remaining)}</p>
                <p className="text-xs text-gray-400">{meta.daysLeft} dias restantes</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">Resultado atual</p>
                <p className="mt-1 text-2xl font-semibold text-white">{formatCurrency(meta.actual)}</p>
                <p className="text-xs text-gray-400">Alvo: {formatCurrency(meta.target)}</p>
              </div>
            </div>
          </div>
          <div className="w-full fitness-card rounded-3xl p-5 lg:w-auto">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400">Pulso da coleção</p>
            <div className="relative mx-auto mt-4 h-52 w-52">
              <StackedRings rings={managerRings} size={208} strokeWidth={16} />
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">Região</p>
                <p className="text-3xl font-bold text-white">{Math.round(metaPercent)}%</p>
                <p className="text-xs text-gray-400">Meta atingida</p>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              {managerRings.map((ring) => (
                <div key={ring.id} className="flex items-center gap-3">
                  <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: ring.color, boxShadow: `0 0 12px ${ring.color}` }} />
                  <p className="flex-1 font-semibold text-white">{ring.label}</p>
                  <p className="text-lg font-bold text-white">{ring.percent}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div
          className="fitness-panel fitness-card rounded-3xl p-6 md:col-span-2"
          style={{ '--delay': '120ms' }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400">Top reps e riscos</p>
          <div className="mt-5 space-y-3">
            {topReps.map((rep) => (
              <div
                key={rep.id}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm backdrop-blur-sm"
              >
                <div>
                  <p className="text-base font-semibold text-white">
                    {rep.name} - {rep.percent}%
                  </p>
                  <p className="text-xs text-gray-400">{rep.note}</p>
                </div>
                <span className="text-sm font-semibold text-gray-300">{rep.status}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl border border-white/10 px-4 py-3 text-xs font-semibold" style={{ backgroundColor: 'rgba(250, 17, 79, 0.15)', color: '#fa114f' }}>
            Reps em risco: {riskReps.join(', ')}
          </div>
        </div>
        <div
          className="fitness-panel fitness-card rounded-3xl p-6"
          style={{ '--delay': '160ms' }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em]" style={{ color: '#92e82a' }}>Sugestão IA do dia</p>
          <p className="mt-3 text-base font-semibold text-white">{iaSuggestion.highlight}</p>
          <p className="mt-3 text-sm text-gray-300">{iaSuggestion.action}</p>
          <button className="mt-5 inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-black transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">
            Ver reps sugeridos
          </button>
        </div>
      </section>

      <section
        className="fitness-panel fitness-card rounded-3xl p-6"
        style={{ '--delay': '200ms' }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400">KPIs regionais</p>
        <div className="mt-5 grid gap-4 md:grid-cols-4">
          {regionalKPIs.map((kpi) => (
            <article
              key={kpi.id}
              className="fitness-card rounded-2xl px-4 py-4"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">{kpi.label}</p>
              <p className="metric-value mt-2 text-2xl font-bold text-white">{kpi.value}</p>
              <p className="text-xs text-gray-400">{kpi.helper}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {opportunities.map((item, index) => (
          <article
            key={item.id}
            className="fitness-panel fitness-card rounded-3xl p-5"
            style={{ '--delay': `${240 + index * 40}ms` }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400">
              <span className="mr-1 text-base" aria-hidden>
                {item.icon}
              </span>
              {item.title}
            </p>
            <p className="mt-3 text-base font-semibold text-white">{item.detail}</p>
          </article>
        ))}
      </section>

      <section
        className="fitness-panel fitness-card rounded-3xl p-6"
        style={{ '--delay': '320ms', backgroundColor: 'rgba(250, 17, 79, 0.08)' }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em]" style={{ color: '#fa114f' }}>Clientes grandes em risco</p>
            <h3 className="mt-1 text-xl font-semibold text-white">Aja nos próximos 3 dias</h3>
          </div>
          <button className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white/10">
            Ver todos
          </button>
        </div>
        <div className="mt-5 space-y-3">
          {customersInRisk.map((client) => (
            <article
              key={client.id}
              className="fitness-card rounded-2xl p-4 md:flex md:items-center md:justify-between md:gap-4"
            >
              <div className="flex-1">
                <p className="text-base font-semibold text-white">{client.name}</p>
                <p className="mt-1 text-xs text-gray-300">
                  {client.value} · Última compra: {client.lastPurchase}
                </p>
                <p className="text-xs text-gray-400">Rep: {client.rep}</p>
              </div>
              <div className="mt-2 text-left text-sm font-semibold md:mt-0 md:text-right" style={{ color: '#fa114f' }}>{client.status}</div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="fitness-panel grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        style={{ '--delay': '360ms' }}
      >
        {managerShortcuts.map((shortcut) => (
          <Link
            key={shortcut.id}
            to={shortcut.to}
            className="fitness-card rounded-3xl p-5 text-left transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            <shortcut.icon className="h-6 w-6" style={{ color: '#fa114f' }} />
            <p className="mt-3 text-base font-semibold text-white">{shortcut.label}</p>
            <p className="mt-1 text-xs font-normal text-gray-400">{shortcut.helper}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}

export default function HomePage() {
  const { user } = useAuth();
  const isManager = user?.perfil && user.perfil !== 'representante';

  return <HomeLayout>{isManager ? <ManagerHome user={user} /> : <RepresentativeHome user={user} />}</HomeLayout>;
}


