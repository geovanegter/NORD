import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext.jsx';
import { myDayStatus, managerOverview } from '@/data/mockData.js';
import {
  Home as HomeIcon,
  Users,
  MapPinned,
  Trophy,
  UserRound,
  Route,
  Joystick,
  Bell,
  Search,
} from 'lucide-react';
import lightningBlue from '@/icons/raio-azul.png';
import notificationIcon from '@/icons/notification.png';
import fireEmoji from '@/icons/fire.png';
import sadEmoji from '@/icons/sad.png';

const managerShortcuts = [
  { id: 'home', label: 'Home', to: '/', helper: 'Pulso regional', icon: HomeIcon },
  { id: 'equipes', label: 'Representantes', to: '/gerente/representantes', helper: 'Veja desempenho e riscos', icon: Users },
  { id: 'clientes', label: 'Clientes', to: '/gerente/clientes', helper: 'Priorize contas estratégicas', icon: MapPinned },
  { id: 'roteiro', label: 'Roteiro tático', to: '/gerente/roteiro', helper: 'Planeje a semana com IA', icon: Route },
  { id: 'games', label: 'Games equipe', to: '/gerente/games', helper: 'Engaje e acompanhe desafios', icon: Joystick },
  { id: 'perfil', label: 'Perfil', to: '/perfil', helper: 'Configurações rápidas', icon: UserRound },
];

const weeklyChallenges = [
  {
    id: 'positivar',
    label: 'Positivar 5 clientes',
    current: 5,
    target: 5,
    helper: '5/5 clientes atendidos',
    type: 'count',
    color: '#10b981',
    bgColor: '#d1fae5',
  },
  {
    id: 'abrir-clientes',
    label: 'Abrir 3 clientes',
    current: 1,
    target: 3,
    helper: '1/3 clientes atendidos',
    type: 'count',
    color: '#3b82f6',
    bgColor: '#dbeafe',
  },
  {
    id: 'cidades',
    label: 'Positivar 5 cidades',
    current: 2,
    target: 5,
    helper: '2/5 cidades atendidas',
    type: 'count',
    color: '#a855f7',
    bgColor: '#f3e8ff',
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
    <div className="home-shell relative min-h-screen overflow-hidden bg-blue-900">
      <style>{HOME_STYLES}</style>
      <div className="pointer-events-none absolute inset-0">
        <div className="home-glow absolute -left-24 top-[-8rem] h-80 w-80 rounded-full bg-sky-300/35 blur-3xl" aria-hidden />
        <div className="home-glow absolute right-0 top-1/3 h-[28rem] w-[28rem] rounded-full bg-cyan-300/30 blur-[160px]" aria-hidden />
        <div className="home-glow absolute inset-x-1/3 bottom-[-6rem] h-72 w-72 rounded-full bg-blue-400/25 blur-[140px]" aria-hidden />
      </div>
      <div className="relative z-10 w-full px-4 py-10 sm:px-6 lg:px-10">{children}</div>
    </div>
  );
}

const formatCurrency = (value) => `R$ ${value.toLocaleString('pt-BR')}`;

function useLocalizedGreeting() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const info = useMemo(() => {
    const hour = now.getHours();
    const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';
    return { greeting };
  }, [now]);

  return info;
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
      ircle
        cx={center}
        cy={center}
        r={radius}
        stroke={trackColor}
        strokeWidth={strokeWidth}
        fill="transparent"
        strokeLinecap="round"
        transform={rotation}
      />
      ircle
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

function DonutChart({ size = 160, strokeWidth = 14, innerPercent = 60, outerPercent = 40 }) {
  const center = size / 2;
  const outerRadius = center - strokeWidth / 2;
  const innerRadius = outerRadius - strokeWidth - 8;

  return (
    <svg width={size} height={size}>
      <AnimatedRing size={size} radius={outerRadius} strokeWidth={strokeWidth} percent={outerPercent} color="#3b82f6" trackColor="rgba(59, 130, 246, 0.15)" delay={0} />
      <AnimatedRing size={size} radius={innerRadius} strokeWidth={strokeWidth} percent={innerPercent} color="#f97316" trackColor="rgba(249, 115, 22, 0.15)" delay={150} />
    </svg>
  );
}

function RepresentativeHome({ user }) {
  const { greeting } = useLocalizedGreeting();
  const [searchQuery, setSearchQuery] = useState('');

  const avatarInitials = user?.name ? user.name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('') : 'NR';

  const monthTarget = myDayStatus?.monthTarget ?? 500000;
  const currentValue = myDayStatus?.current ?? 200000;
  const daysElapsed = myDayStatus?.daysElapsed ?? 30;
  const daysTotal = myDayStatus?.daysTotal ?? 90;
  const daysRemaining = myDayStatus?.daysRemaining ?? 60;

  const metaPercent = monthTarget ? Math.min(100, (currentValue / monthTarget) * 100) : 0;
  const remaining = Math.max(0, monthTarget - currentValue);
  const dailyGoal = daysRemaining > 0 ? Math.ceil(remaining / daysRemaining) : monthTarget / (daysTotal || 1);

  const streakDays = myDayStatus?.streakDays ?? 46;
  const weekLabels = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'];
  const todayIndex = (() => {
    const jsDay = new Date().getDay();
    return jsDay === 0 ? 6 : jsDay - 1;
  })();

  const navLinks = [
    { id: 'home', label: 'Home', to: '/', icon: HomeIcon },
    { id: 'clientes', label: 'Clientes', to: '/clientes', icon: Users },
    { id: 'rotas', label: 'Rotas', to: '/roteiro', icon: Route },
    { id: 'progresso', label: 'Progresso', to: '/games', icon: Trophy },
    { id: 'perfil', label: 'Perfil', to: '/perfil', icon: UserRound },
  ];

  const firstName = user?.name?.split(' ')[0] ?? 'Representante';

  return (
    <div className="mx-auto flex w-full max-w-[640px] sm:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1200px] flex-col gap-5 px-4 pb-28 pt-6 text-slate-800">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-lg font-semibold text-[#4D8BFF] shadow">{avatarInitials}</div>
          <div>
            <p className="text-sm text-slate-500">{greeting}</p>
            <p className="text-xl font-semibold text-slate-900">{firstName}</p>
          </div>
        </div>
        <button type="button" className="rounded-full border border-white/70 bg-white/80 p-2 text-slate-500 shadow hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4D8BFF]/40" aria-label="Notificações">
          <img src={notificationIcon} alt="Notificações" className="h-5 w-5 object-contain" />
        </button>
      </header>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="O que você gostaria de saber..."
          className="w-full rounded-full border border-slate-200 bg-white/80 py-3 pl-12 pr-4 text-sm text-slate-700 placeholder-slate-400 shadow-sm focus:border-[#4D8BFF] focus:outline-none focus:ring-2 focus:ring-[#4D8BFF]/20"
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-2 items-stretch">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative h-40 w-40 mx-auto md:mx-0">
              <DonutChart size={160} strokeWidth={14} innerPercent={60} outerPercent={metaPercent} />
            </div>

            <div className="flex-1 space-y-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#2563EB]">Tempo de vendas</p>
                <p className="text-sm font-semibold text-[#2563EB]">
                  {daysElapsed}/{daysTotal} dias
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#F97316]">Vendas realizadas</p>
                <p className="text-sm font-semibold text-slate-900">
                  {formatCurrency(currentValue)} / {formatCurrency(monthTarget)}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Necessidade diária</p>
                <p className="text-sm font-semibold text-slate-900">{formatCurrency(Math.max(dailyGoal, 0))}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/10">
          <p className="text-lg font-semibold text-slate-900 mb-4">Streak</p>

          <div className="flex items-center gap-4 mb-2">
            <img src={lightningBlue} alt="Streak icon" className="h-12 w-12 object-contain" />
            <p className="text-3xl font-bold text-slate-900">{streakDays}</p>
          </div>

          <p className="text-sm text-slate-500 mb-4">dias seguidos</p>

          <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
            {weekLabels.map((label, index) => {
              const hasSale = index < streakDays % 7;
              const isToday = index === todayIndex;
              const emojiSrc = hasSale ? fireEmoji : sadEmoji;

              return (
                <div key={label} className="flex flex-col items-center gap-1 w-[13%] sm:w-auto">
                  <span
                    className={`flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full ${
                      hasSale ? 'bg-blue-100' : 'bg-gray-100'
                    } ${isToday ? 'ring-2 ring-[#4D8BFF]' : ''}`}
                  >
                    <img src={emojiSrc} alt={hasSale ? 'dia com venda' : 'dia sem venda'} className="h-5 w-5 sm:h-6 sm:w-6 object-contain" />
                  </span>
                  <p className="text-[9px] sm:text-[10px] font-semibold uppercase text-slate-500">{label}</p>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/10">
        <p className="text-sm font-semibold text-slate-700 mb-4">Desafios da semana</p>

        <div className="space-y-4">
          {weeklyChallenges.map((challenge) => {
            const progress = challenge.target ? Math.min(100, (challenge.current / challenge.target) * 100) : 0;

            return (
              <div key={challenge.id} className="flex items-start gap-3">
                <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center mt-1" style={{ backgroundColor: challenge.bgColor }}>
                  <div className="h-6 w-6 rounded-full" style={{ backgroundColor: challenge.color }} />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{challenge.label}</p>
                      <p className="text-xs text-slate-500">{challenge.helper}</p>
                    </div>
                  </div>

                  <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, backgroundColor: challenge.color }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <nav className="fixed bottom-4 left-1/2 z-20 w-[calc(100%-32px)] max-w-[520px] -translate-x-1/2 rounded-[22px] border border-white/80 bg-white/95 px-4 py-3 shadow-2xl shadow-slate-900/30 md:hidden">
        <ul className="flex items-center justify-between text-xs font-semibold">
          {navLinks.map((nav) => {
            const isActive = nav.id === 'home';
            return (
              <li key={nav.id}>
                <Link to={nav.to} className={`flex flex-col items-center gap-1 transition ${isActive ? 'text-[#4D8BFF]' : 'text-slate-500 hover:text-slate-700'}`}>
                  <nav.icon className="h-5 w-5" />
                  <span className="text-[11px]">{nav.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
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
      <section className="home-panel border border-indigo-100/60 bg-gradient-to-br from-white/85 via-white/60 to-indigo-50/30 p-6 shadow-xl shadow-indigo-900/15" style={{ '--delay': '40ms' }}>
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
              <svg width={192} height={192}>
                <AnimatedRing size={192} radius={192 / 2 - 7} strokeWidth={14} percent={Math.round(metaPercent)} color="#0a2f4f" trackColor="rgba(10, 47, 79, 0.2)" delay={0} />
                <AnimatedRing size={192} radius={192 / 2 - 7 - 22} strokeWidth={14} percent={Math.round(timePct)} color="#94a3b8" trackColor="rgba(148, 163, 184, 0.25)" delay={150} />
              </svg>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Região</p>
                <p className="text-2xl font-bold text-slate-900">{Math.round(metaPercent)}</p>
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
        <div className="home-panel border border-white/15 bg-white/80 p-6 shadow-xl shadow-slate-900/15 md:col-span-2" style={{ '--delay': '120ms' }}>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Top reps e riscos</p>
          <div className="mt-4 space-y-3">
            {topReps.map((rep) => (
              <div key={rep.id} className="flex items-center justify-between rounded-2xl border border-white/20 bg-white/70 px-4 py-3 text-sm shadow-sm shadow-slate-900/5">
                <div>
                  <p className="text-base font-semibold text-slate-900">{rep.name} - {rep.percent}%</p>
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
        <div className="home-panel border border-emerald-100/60 bg-gradient-to-br from-emerald-50/60 via-white/60 to-white/30 p-6 shadow-xl shadow-emerald-900/10" style={{ '--delay': '160ms' }}>
          <p className="text-xs uppercase tracking-[0.18em] text-emerald-600">Sugestão IA do dia</p>
          <p className="mt-2 text-base font-semibold text-slate-900">{iaSuggestion.highlight}</p>
          <p className="mt-3 text-sm text-slate-600">{iaSuggestion.action}</p>
          <button className="mt-4 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-slate-900 to-indigo-900 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white shadow-lg shadow-indigo-900/30 transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">
            Ver reps sugeridos
          </button>
        </div>
      </section>

      <section className="home-panel border border-white/15 bg-white/80 p-6 shadow-xl shadow-slate-900/15" style={{ '--delay': '200ms' }}>
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">KPIs regionais</p>
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          {regionalKPIs.map((kpi) => (
            <article key={kpi.id} className="rounded-2xl border border-white/20 bg-white/70 px-4 py-3 shadow-sm shadow-slate-900/5 transition duration-300 hover:-translate-y-1 hover:border-indigo-200/70">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{kpi.label}</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{kpi.value}</p>
              <p className="text-xs text-slate-500">{kpi.helper}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {opportunities.map((item, index) => (
          <article key={item.id} className="home-panel border border-white/15 bg-white/80 p-5 shadow-xl shadow-slate-900/10" style={{ '--delay': `${240 + index * 40}ms` }}>
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

      <section className="home-panel border border-rose-100/70 bg-rose-50/70 p-6 shadow-xl shadow-rose-900/15" style={{ '--delay': '320ms' }}>
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
            <article key={client.id} className="flex flex-col gap-2 rounded-2xl border border-rose-100/80 bg-white/80 p-4 text-sm text-slate-600 shadow-sm shadow-rose-900/5 transition duration-300 hover:-translate-y-1 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-base font-semibold text-slate-900">{client.name}</p>
                <p className="text-xs text-slate-500">{client.value} · Última compra: {client.lastPurchase}</p>
                <p className="text-xs text-slate-500">Rep: {client.rep}</p>
              </div>
              <div className="text-right text-sm font-semibold text-rose-500">{client.status}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-panel border border-white/10 bg-white/5 p-5 shadow-xl shadow-slate-900/25" style={{ '--delay': '360ms' }}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {managerShortcuts.map((shortcut) => (
            <Link key={shortcut.id} to={shortcut.to} className="rounded-3xl border border-white/20 bg-white/80 p-5 text-left text-sm font-semibold text-slate-700 shadow-lg shadow-slate-900/10 transition duration-300 hover:-translate-y-1 hover:border-indigo-200/70 hover:bg-white/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/60">
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


  return (
    <div className="space-y-6">
      <section className="home-panel border border-indigo-100/60 bg-gradient-to-br from-white/85 via-white/60 to-indigo-50/30 p-6 shadow-xl shadow-indigo-900/15" style={{ '--delay': '40ms' }}>
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
              <svg width={192} height={192}>
                <AnimatedRing size={192} radius={192 / 2 - 7} strokeWidth={14} percent={Math.round(metaPercent)} color="#0a2f4f" trackColor="rgba(10, 47, 79, 0.2)" delay={0} />
                <AnimatedRing size={192} radius={192 / 2 - 7 - 22} strokeWidth={14} percent={Math.round(timePct)} color="#94a3b8" trackColor="rgba(148, 163, 184, 0.25)" delay={150} />
              </svg>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Região</p>
                <p className="text-2xl font-bold text-slate-900">{Math.round(metaPercent)}</p>
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
        <div className="home-panel border border-white/15 bg-white/80 p-6 shadow-xl shadow-slate-900/15 md:col-span-2" style={{ '--delay': '120ms' }}>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Top reps e riscos</p>
          <div className="mt-4 space-y-3">
            {topReps.map((rep) => (
              <div key={rep.id} className="flex items-center justify-between rounded-2xl border border-white/20 bg-white/70 px-4 py-3 text-sm shadow-sm shadow-slate-900/5">
                <div>
                  <p className="text-base font-semibold text-slate-900">{rep.name} - {rep.percent}%</p>
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
        <div className="home-panel border border-emerald-100/60 bg-gradient-to-br from-emerald-50/60 via-white/60 to-white/30 p-6 shadow-xl shadow-emerald-900/10" style={{ '--delay': '160ms' }}>
          <p className="text-xs uppercase tracking-[0.18em] text-emerald-600">Sugestão IA do dia</p>
          <p className="mt-2 text-base font-semibold text-slate-900">{iaSuggestion.highlight}</p>
          <p className="mt-3 text-sm text-slate-600">{iaSuggestion.action}</p>
          <button className="mt-4 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-slate-900 to-indigo-900 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white shadow-lg shadow-indigo-900/30 transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">
            Ver reps sugeridos
          </button>
        </div>
      </section>

      <section className="home-panel border border-white/15 bg-white/80 p-6 shadow-xl shadow-slate-900/15" style={{ '--delay': '200ms' }}>
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">KPIs regionais</p>
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          {regionalKPIs.map((kpi) => (
            <article key={kpi.id} className="rounded-2xl border border-white/20 bg-white/70 px-4 py-3 shadow-sm shadow-slate-900/5 transition duration-300 hover:-translate-y-1 hover:border-indigo-200/70">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{kpi.label}</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{kpi.value}</p>
              <p className="text-xs text-slate-500">{kpi.helper}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {opportunities.map((item, index) => (
          <article key={item.id} className="home-panel border border-white/15 bg-white/80 p-5 shadow-xl shadow-slate-900/10" style={{ '--delay': `${240 + index * 40}ms` }}>
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

      <section className="home-panel border border-rose-100/70 bg-rose-50/70 p-6 shadow-xl shadow-rose-900/15" style={{ '--delay': '320ms' }}>
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
            <article key={client.id} className="flex flex-col gap-2 rounded-2xl border border-rose-100/80 bg-white/80 p-4 text-sm text-slate-600 shadow-sm shadow-rose-900/5 transition duration-300 hover:-translate-y-1 md:flex-row md:items-center md:justify-between">
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

      <section className="home-panel border border-white/10 bg-white/5 p-5 shadow-xl shadow-slate-900/25" style={{ '--delay': '360ms' }}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {managerShortcuts.map((shortcut) => (
            <Link key={shortcut.id} to={shortcut.to} className="rounded-3xl border border-white/20 bg-white/80 p-5 text-left text-sm font-semibold text-slate-700 shadow-lg shadow-slate-900/10 transition duration-300 hover:-translate-y-1 hover:border-indigo-200/70 hover:bg-white/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/60">
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

  return (
    <HomeLayout>
      {isManager ? <ManagerHome user={user} /> : <RepresentativeHome user={user} />}
    </HomeLayout>
  );
}
