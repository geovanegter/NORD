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
  @keyframes home-panel-in {
    0% {
      opacity: 0;
      transform: translateY(24px) scale(0.98);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes home-orb {
    0% {
      transform: translateY(0) scale(1);
    }
    50% {
      transform: translateY(-15px) scale(1.02);
    }
    100% {
      transform: translateY(0) scale(1);
    }
  }

  .home-shell .home-panel {
    position: relative;
    animation: home-panel-in 0.8s ease forwards;
    animation-delay: var(--delay, 0ms);
    backdrop-filter: blur(14px);
    transition: transform 320ms ease, box-shadow 320ms ease, border-color 320ms ease, background 320ms ease;
  }

  .home-shell .home-panel:hover {
    transform: translateY(-4px);
    box-shadow: 0 25px 60px rgba(15, 23, 42, 0.35);
    border-color: rgba(16, 185, 129, 0.45);
  }

  .home-shell .home-glow {
    animation: home-orb 18s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .home-shell .home-panel {
      animation: none;
      transition: border-color 320ms ease, background 320ms ease;
    }

    .home-shell .home-glow {
      animation: none;
    }
  }
`;

function HomeLayout({ children }) {
  return (
    <div className="home-shell relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-slate-100">
      <style>{HOME_STYLES}</style>
      <div className="pointer-events-none absolute inset-0">
        <div className="home-glow absolute -left-24 top-[-8rem] h-80 w-80 rounded-full bg-sky-300/35 blur-3xl" aria-hidden />
        <div className="home-glow absolute right-0 top-1/3 h-[28rem] w-[28rem] rounded-full bg-cyan-300/30 blur-[160px]" aria-hidden />
        <div className="home-glow absolute inset-x-1/3 bottom-[-6rem] h-72 w-72 rounded-full bg-blue-400/25 blur-[140px]" aria-hidden />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">{children}</div>
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
      className="home-panel border border-white/15 bg-white/80 p-6 shadow-xl shadow-slate-900/15"
      style={style}
    >
      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
        <span className="mr-1 text-base" aria-hidden>
          📌
        </span>
        Desafios da semana
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
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
              className="rounded-3xl border border-white/25 bg-white/70 p-4 text-sm text-slate-700 shadow-sm shadow-slate-900/10 transition duration-300 hover:-translate-y-1 hover:border-emerald-200/70"
            >
              <p className="text-2xl">{challenge.icon}</p>
              <p className="mt-2 text-base font-semibold text-slate-900">{challenge.label}</p>
              <p className="text-xs font-medium text-slate-500">{valueLabel}</p>
              <div className="mt-3 h-2 rounded-full bg-white/50" role="presentation">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-sky-500 transition-all duration-500"
                  style={{ width: `${percent}%` }}
                  aria-label={`${percent}% concluído`}
                />
              </div>
              <p className="mt-2 text-xs font-semibold text-emerald-600">{percent}%</p>
              <p className="text-xs text-slate-500">{challenge.helper}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function AnimatedRing({ size, radius, strokeWidth, percent, color, trackColor = '#e2e8f0', delay = 0 }) {
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
        style={{ transition: 'stroke-dashoffset 1s ease' }}
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
      className={`home-panel rounded-3xl border border-white/15 bg-white/80 p-6 shadow-xl shadow-slate-900/20 ${className}`.trim()}
      style={style}
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
        <div className="relative mx-auto h-40 w-40">
          <StackedRings rings={rings} />
          {title ? (
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">{title}</p>
            </div>
          ) : null}
        </div>
        <div className="flex-1 space-y-2 text-sm">
          {rings.map((ring) => (
            <div key={ring.id} className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: ring.color }} />
              <p className="font-semibold text-slate-900">{ring.label}</p>
              <p className="text-slate-500">{ring.percent}%</p>
            </div>
          ))}
          {helper ? (
            <p className="pt-3 text-sm font-semibold leading-relaxed text-slate-900 whitespace-pre-line">{helper}</p>
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
      color: '#0a2f4f',
      trackColor: 'rgba(10, 47, 79, 0.2)',
    },
    {
      id: 'rep-time',
      label: 'Tempo da coleção',
      percent: Math.round(timePercent * 100),
      color: '#94a3b8',
      trackColor: 'rgba(148, 163, 184, 0.25)',
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
    <div className="space-y-6">
      <section
        className="home-panel border border-emerald-100/60 bg-gradient-to-br from-white/85 via-white/60 to-emerald-50/30 p-6 text-slate-800 shadow-xl shadow-emerald-900/15"
        style={{ '--delay': '40ms' }}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-500">{greeting}</p>
            <h1 className="mt-1 text-lg font-semibold leading-snug text-slate-800 sm:text-xl">
              {user?.name ?? 'Representante Nord'}
            </h1>
          </div>
          <div className="flex items-center justify-end">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-sky-500 text-lg font-semibold text-white">
              {avatarInitials}
            </div>
          </div>
        </div>

        <form onSubmit={handleSearch} className="relative mt-5 flex-1">
          <input
            className="ai-search-input w-full rounded-2xl border border-emerald-200/60 bg-white/75 px-4 pr-28 py-3 text-sm font-medium text-slate-900 shadow-inner shadow-white/60 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200/70 focus:ring-offset-2 focus:ring-offset-white/70"
            placeholder={placeholderText || IA_PLACEHOLDER_PROMPT}
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white shadow-lg shadow-emerald-500/40 transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
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
        className="home-panel border border-white/15 bg-white/75 p-6 shadow-xl shadow-slate-900/15"
        style={{ '--delay': '200ms' }}
      >
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
            <span className="mr-1 text-base" aria-hidden>
              🎯
            </span>
            5 principais clientes a atender
          </p>
          <Link to="/clientes" className="text-xs font-semibold text-emerald-500 transition hover:text-emerald-400">
            Ver todos
          </Link>
        </div>
        <div className="mt-4 space-y-3">
          {priorityClients.map((client) => (
            <article
              key={client.id}
              className="flex flex-col gap-2 rounded-2xl border border-white/20 bg-white/65 p-4 text-slate-700 shadow-sm shadow-slate-900/5 transition duration-300 hover:-translate-y-1 hover:border-emerald-200/70 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="text-base font-semibold text-slate-900">{client.name}</p>
                <p className="text-sm text-slate-500">
                  {client.city} · {client.status}
                </p>
                <p className="text-xs text-slate-500">{client.insight}</p>
              </div>
              <div className="text-right text-sm">
                <p className="font-semibold text-emerald-600">{client.potential}</p>
                <Link
                  to={`/clientes?search=${encodeURIComponent(client.search)}`}
                  className="text-xs font-semibold text-slate-500 underline-offset-2 transition hover:text-slate-900"
                >
                  ver cliente
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="home-panel border border-emerald-100/60 bg-gradient-to-br from-emerald-50/60 via-white/60 to-white/30 p-6 shadow-xl shadow-emerald-900/10"
        style={{ '--delay': '240ms' }}
      >
        <p className="text-xs uppercase tracking-[0.18em] text-emerald-600">
          <span className="mr-1 text-base" aria-hidden>
            🧠
          </span>
          Insights da IA
        </p>
        <p className="mt-1 text-base font-semibold text-slate-900">Para bater a meta mais rápido:</p>
        <ul className="mt-4 space-y-3 text-sm text-slate-600">
          {insights.map((tip) => (
            <li key={tip} className="rounded-2xl border border-emerald-100/70 bg-white/80 px-4 py-3 shadow-sm shadow-slate-900/5">
              {tip}
            </li>
          ))}
        </ul>
      </section>

      <section
        className="home-panel border border-amber-200/60 bg-gradient-to-r from-amber-50/70 via-white/55 to-amber-100/40 p-5 shadow-xl shadow-amber-900/15"
        style={{ '--delay': '280ms' }}
      >
        <div className="flex items-center gap-3 text-sm text-amber-900">
          <span className="text-2xl" aria-hidden>
            🎮
          </span>
          <p>
            Complete o desafio de visitas IA hoje e ganhe +150 pts nos Games. Falta {formatCurrency(remaining)} para chegar a 100%.
          </p>
        </div>
      </section>

      <section
        className="home-panel border border-white/15 bg-white/80 p-6 shadow-xl shadow-slate-900/15"
        style={{ '--delay': '320ms' }}
      >
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
          <span className="mr-1 text-base" aria-hidden>
            🏆
          </span>
          Ranking e orientação
        </p>
        <div className="mt-3 rounded-2xl border border-white/20 bg-white/70 p-5 shadow-sm shadow-slate-900/5">
          <p className="text-base font-semibold text-slate-900">
            Você está em {strategyGuide.position}º lugar com {formatCurrency(strategyGuide.value)}
          </p>
          <p className="text-sm text-slate-500">
            {strategyGuide.leader.name} lidera com {formatCurrency(strategyGuide.leader.value)}
          </p>
          <div className="mt-3 rounded-xl border border-amber-200/70 bg-gradient-to-r from-amber-50/70 via-white/50 to-amber-100/40 px-4 py-3 text-sm text-amber-800 shadow-sm">
            Diferença: faltam {formatCurrency(strategyGuide.nextDiff)} para passar {strategyGuide.nextTarget}.
          </div>
          <p className="mt-3 text-sm font-semibold text-slate-700">{strategyGuide.action}</p>
        </div>
      </section>

      <section
        className="home-panel border border-white/10 bg-white/5 p-5 shadow-xl shadow-slate-900/25"
        style={{ '--delay': '360ms' }}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {shortcutLinks.map((shortcut) => (
            <Link
              key={shortcut.id}
              to={shortcut.to}
              className="rounded-3xl border border-white/20 bg-white/80 p-5 text-left text-sm font-semibold text-slate-700 shadow-lg shadow-slate-900/10 transition duration-300 hover:-translate-y-1 hover:border-emerald-200/70 hover:bg-white/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60"
            >
              <p className="text-lg" aria-hidden>
                <shortcut.icon className="h-5 w-5 text-emerald-500" />
              </p>
              <p className="mt-2 text-base text-slate-900">{shortcut.label}</p>
              <p className="text-xs font-normal text-slate-500">{shortcut.helper}</p>
            </Link>
          ))}
        </div>
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
      color: '#0a2f4f',
      trackColor: 'rgba(10, 47, 79, 0.2)',
    },
    {
      id: 'mgr-time',
      label: 'Tempo da coleção',
      percent: Math.round(timePct),
      color: '#94a3b8',
      trackColor: 'rgba(148, 163, 184, 0.25)',
    },
  ];

  return (
    <div className="space-y-6">
      <section
        className="home-panel border border-indigo-100/60 bg-gradient-to-br from-white/85 via-white/60 to-indigo-50/30 p-6 shadow-xl shadow-indigo-900/15"
        style={{ '--delay': '40ms' }}
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
          <div className="flex-1">
            <p className="text-sm font-medium text-indigo-500">Visão tática - Região {meta.region}</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              {greeting}, {capitalizedName}!
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Meta em {metaPercent}% · faltam {formatCurrency(meta.remaining)} e {meta.daysLeft} dias para fechar.
            </p>
            <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
              <div className="rounded-2xl border border-white/20 bg-white/70 p-4 shadow-sm shadow-slate-900/5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Falta para meta</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">{formatCurrency(meta.remaining)}</p>
                <p className="text-xs text-slate-500">{meta.daysLeft} dias restantes</p>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/70 p-4 shadow-sm shadow-slate-900/5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Resultado atual</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">{formatCurrency(meta.actual)}</p>
                <p className="text-xs text-slate-500">Alvo: {formatCurrency(meta.target)}</p>
              </div>
            </div>
          </div>
          <div className="w-full rounded-3xl border border-white/20 bg-white/70 p-4 shadow-lg shadow-slate-900/10 lg:w-auto">
            <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Pulso da coleção</p>
            <div className="relative mx-auto mt-4 h-48 w-48">
              <StackedRings rings={managerRings} size={192} strokeWidth={14} />
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Região</p>
                <p className="text-2xl font-bold text-slate-900">{Math.round(metaPercent)}%</p>
                <p className="text-xs text-slate-500">Meta atingida</p>
              </div>
            </div>
            <div className="mt-4 space-y-1 text-sm">
              {managerRings.map((ring) => (
                <div key={ring.id} className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: ring.color }} />
                  <p className="font-semibold text-slate-900">{ring.label}</p>
                  <p className="text-slate-500">{ring.percent}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div
          className="home-panel border border-white/15 bg-white/80 p-6 shadow-xl shadow-slate-900/15 md:col-span-2"
          style={{ '--delay': '120ms' }}
        >
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Top reps e riscos</p>
          <div className="mt-4 space-y-3">
            {topReps.map((rep) => (
              <div
                key={rep.id}
                className="flex items-center justify-between rounded-2xl border border-white/20 bg-white/70 px-4 py-3 text-sm shadow-sm shadow-slate-900/5"
              >
                <div>
                  <p className="text-base font-semibold text-slate-900">
                    {rep.name} - {rep.percent}%
                  </p>
                  <p className="text-xs text-slate-500">{rep.note}</p>
                </div>
                <span className="text-sm font-semibold text-slate-600">{rep.status}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl border border-rose-200/70 bg-rose-50/80 px-4 py-3 text-xs font-semibold text-rose-500 shadow-sm">
            Reps em risco: {riskReps.join(', ')}
          </div>
        </div>
        <div
          className="home-panel border border-emerald-100/60 bg-gradient-to-br from-emerald-50/60 via-white/60 to-white/30 p-6 shadow-xl shadow-emerald-900/10"
          style={{ '--delay': '160ms' }}
        >
          <p className="text-xs uppercase tracking-[0.18em] text-emerald-600">Sugestão IA do dia</p>
          <p className="mt-2 text-base font-semibold text-slate-900">{iaSuggestion.highlight}</p>
          <p className="mt-3 text-sm text-slate-600">{iaSuggestion.action}</p>
          <button className="mt-4 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-slate-900 to-indigo-900 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white shadow-lg shadow-indigo-900/30 transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">
            Ver reps sugeridos
          </button>
        </div>
      </section>

      <section
        className="home-panel border border-white/15 bg-white/80 p-6 shadow-xl shadow-slate-900/15"
        style={{ '--delay': '200ms' }}
      >
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">KPIs regionais</p>
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          {regionalKPIs.map((kpi) => (
            <article
              key={kpi.id}
              className="rounded-2xl border border-white/20 bg-white/70 px-4 py-3 shadow-sm shadow-slate-900/5 transition duration-300 hover:-translate-y-1 hover:border-indigo-200/70"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{kpi.label}</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{kpi.value}</p>
              <p className="text-xs text-slate-500">{kpi.helper}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {opportunities.map((item, index) => (
          <article
            key={item.id}
            className="home-panel border border-white/15 bg-white/80 p-5 shadow-xl shadow-slate-900/10"
            style={{ '--delay': `${240 + index * 40}ms` }}
          >
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
              <span className="mr-1" aria-hidden>
                {item.icon}
              </span>
              {item.title}
            </p>
            <p className="mt-2 text-base font-semibold text-slate-900">{item.detail}</p>
          </article>
        ))}
      </section>

      <section
        className="home-panel border border-rose-100/70 bg-rose-50/70 p-6 shadow-xl shadow-rose-900/15"
        style={{ '--delay': '320ms' }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-rose-500">Clientes grandes em risco</p>
            <h3 className="text-xl font-semibold text-slate-900">Aja nos próximos 3 dias</h3>
          </div>
          <button className="rounded-full border border-rose-200/70 px-3 py-1 text-xs font-semibold text-rose-500 transition hover:border-rose-300/80">
            Ver todos
          </button>
        </div>
        <div className="mt-4 space-y-3">
          {customersInRisk.map((client) => (
            <article
              key={client.id}
              className="flex flex-col gap-2 rounded-2xl border border-rose-100/80 bg-white/80 p-4 text-sm text-slate-600 shadow-sm shadow-rose-900/5 transition duration-300 hover:-translate-y-1 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="text-base font-semibold text-slate-900">{client.name}</p>
                <p className="text-xs text-slate-500">
                  {client.value} · Última compra: {client.lastPurchase}
                </p>
                <p className="text-xs text-slate-500">Rep: {client.rep}</p>
              </div>
              <div className="text-right text-sm font-semibold text-rose-500">{client.status}</div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="home-panel border border-white/10 bg-white/5 p-5 shadow-xl shadow-slate-900/25"
        style={{ '--delay': '360ms' }}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {managerShortcuts.map((shortcut) => (
            <Link
              key={shortcut.id}
              to={shortcut.to}
              className="rounded-3xl border border-white/20 bg-white/80 p-5 text-left text-sm font-semibold text-slate-700 shadow-lg shadow-slate-900/10 transition duration-300 hover:-translate-y-1 hover:border-indigo-200/70 hover:bg-white/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/60"
            >
              <p className="text-lg" aria-hidden>
                <shortcut.icon className="h-5 w-5 text-indigo-500" />
              </p>
              <p className="mt-2 text-base text-slate-900">{shortcut.label}</p>
              <p className="text-xs font-normal text-slate-500">{shortcut.helper}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function HomePage() {
  const { user } = useAuth();
  const isManager = user?.perfil && user.perfil !== 'representante';

  return <HomeLayout>{isManager ? <ManagerHome user={user} /> : <RepresentativeHome user={user} />}</HomeLayout>;
}


