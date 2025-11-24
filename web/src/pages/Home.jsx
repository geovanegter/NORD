import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext.jsx';
import { myDayStatus, strategyGuide, managerOverview } from '@/data/mockData.js';

const shortcutLinks = [
  { id: 'clientes', label: 'Clientes', to: '/clientes', helper: 'IA sugere quem visitar', icon: '📇' },
  { id: 'roteiro', label: 'Roteiro', to: '/roteiro', helper: 'Monte o plano da semana', icon: '🧭' },
  { id: 'games', label: 'Games', to: '/games', helper: '+150 pts hoje', icon: '🏅' },
  { id: 'treinamentos', label: 'Treinamentos', to: '/treinamentos', helper: 'Cursos rápidos + desafios', icon: '🎥' },
];

const managerShortcuts = [
  { id: 'equipes', label: 'Representantes', to: '/gerente/representantes', helper: 'Veja desempenho e riscos', icon: '👥' },
  { id: 'clientes', label: 'Clientes', to: '/gerente/clientes', helper: 'Priorize contas estratégicas', icon: '🏢' },
  { id: 'roteiro', label: 'Roteiro tático', to: '/gerente/roteiro', helper: 'Planeje a semana com IA', icon: '🗺️' },
  { id: 'games', label: 'Games equipe', to: '/gerente/games', helper: 'Engaje e acompanhe desafios', icon: '🏆' },
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

const formatCurrency = (value) => `R$ ${value.toLocaleString('pt-BR')}`;

function WeeklyChallengesSection() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
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
            <div key={challenge.id} className="rounded-3xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-700">
              <p className="text-2xl">{challenge.icon}</p>
              <p className="mt-2 text-base font-semibold text-slate-900">{challenge.label}</p>
              <p className="text-xs font-medium text-slate-500">{valueLabel}</p>
              <div className="mt-3 h-2 rounded-full bg-slate-200" role="presentation">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all"
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

function StackedRingsCard({ title, helper, rings }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
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
      color: '#f97316',
      trackColor: 'rgba(249, 115, 22, 0.15)',
    },
    {
      id: 'rep-time',
      label: 'Tempo da coleção',
      percent: Math.round(timePercent * 100),
      color: '#0ea5e9',
      trackColor: 'rgba(14, 165, 233, 0.2)',
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
      <section className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Bom dia, {user?.name?.split(' ')[0] ?? 'representante'}!</h1>
        <p className="mt-2 text-sm text-slate-500">
          Faltam {formatCurrency(remaining)} e {daysRemaining} dias para bater a meta desta coleção. Sua meta diária está em{' '}
          {formatCurrency(Math.max(dailyGoal, 0))}.
        </p>

        <form onSubmit={handleSearch} className="mt-6 relative flex-1">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400" aria-hidden>
            🔍
          </span>
          <input
            className="w-full rounded-2xl border border-emerald-200 bg-white px-12 py-3 text-sm text-slate-900 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200"
            placeholder="Busque cliente, produto ou ação com IA..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <span className="pointer-events-none absolute right-14 top-1/2 -translate-y-1/2 text-base text-emerald-500" aria-hidden>
            🤖
          </span>
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-emerald-500 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white shadow"
          >
            IA
          </button>
        </form>
      </section>

      <section>
        <StackedRingsCard
          title=""
          helper={`Faltam ${formatCurrency(remaining)} em ${daysRemaining} dias\nMeta faltante por dia: ${formatCurrency(
            Math.max(dailyGoal, 0),
          )}`}
          rings={stackedRings}
        />
      </section>
      <WeeklyChallengesSection />

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
            <span className="mr-1 text-base" aria-hidden>
              🎯
            </span>
            5 principais clientes a atender
          </p>
          <Link to="/clientes" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700">
            Ver todos
          </Link>
        </div>
        <div className="mt-4 space-y-3">
          {priorityClients.map((client) => (
            <article
              key={client.id}
              className="flex flex-col gap-2 rounded-2xl border border-slate-100 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between"
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
                  className="text-xs font-semibold text-slate-500 underline-offset-2 hover:text-slate-900"
                >
                  ver cliente
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-white p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.18em] text-emerald-600">
          <span className="mr-1 text-base" aria-hidden>
            🧠
          </span>
          Insights da IA
        </p>
        <p className="mt-1 text-base font-semibold text-slate-900">Para bater a meta mais rápido:</p>
        <ul className="mt-4 space-y-3 text-sm text-slate-600">
          {insights.map((tip) => (
            <li key={tip} className="rounded-2xl border border-emerald-100 bg-white px-4 py-3 shadow-sm">
              {tip}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-3xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
        <div className="flex items-center gap-3 text-sm text-amber-900">
          <span className="text-2xl" aria-hidden>
            🎮
          </span>
          <p>
            Complete o desafio de visitas IA hoje e ganhe +150 pts nos Games. Falta {formatCurrency(remaining)} para chegar a 100%.
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
          <span className="mr-1 text-base" aria-hidden>
            🏆
          </span>
          Ranking e orientação
        </p>
        <div className="mt-3 rounded-2xl bg-slate-50 p-5">
          <p className="text-base font-semibold text-slate-900">
            Você está em {strategyGuide.position}º lugar com {formatCurrency(strategyGuide.value)}
          </p>
          <p className="text-sm text-slate-500">
            {strategyGuide.leader.name} lidera com {formatCurrency(strategyGuide.leader.value)}
          </p>
          <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Diferença: faltam {formatCurrency(strategyGuide.nextDiff)} para passar {strategyGuide.nextTarget}.
          </div>
          <p className="mt-3 text-sm font-semibold text-slate-700">{strategyGuide.action}</p>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {shortcutLinks.map((shortcut) => (
          <Link
            key={shortcut.id}
            to={shortcut.to}
            className="rounded-3xl border border-slate-100 bg-white p-5 text-left text-sm font-semibold text-slate-700 shadow hover:border-emerald-200 hover:bg-emerald-50"
          >
            <p className="text-lg" aria-hidden>
              {shortcut.icon}
            </p>
            <p className="mt-2 text-base text-slate-900">{shortcut.label}</p>
            <p className="text-xs font-normal text-slate-500">{shortcut.helper}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}

function ManagerHome({ user }) {
  const { meta, timePercent, iaSuggestion, topReps, regionalKPIs, opportunities, riskReps, customersInRisk } = managerOverview;
  const capitalizedName = user?.name?.split(' ')[0] ?? 'gestor';
  const metaPercent = meta?.percent ?? 0;
  const timePct = timePercent ?? 0;
  const managerRings = [
    {
      id: 'mgr-meta',
      label: 'Meta da região',
      percent: Math.round(metaPercent),
      color: '#f43f5e',
      trackColor: 'rgba(244, 63, 94, 0.2)',
    },
    {
      id: 'mgr-time',
      label: 'Tempo da coleção',
      percent: Math.round(timePct),
      color: '#6366f1',
      trackColor: 'rgba(99, 102, 241, 0.2)',
    },
  ];

  return (
    <div className="space-y-6">
            <section className="rounded-3xl border border-indigo-100 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
          <div className="flex-1">
            <p className="text-sm font-medium text-indigo-500">Visão tática - Região {meta.region}</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Bom dia, {capitalizedName}!</h1>
            <p className="mt-2 text-sm text-slate-500">
              Meta em {metaPercent}% · faltam {formatCurrency(meta.remaining)} e {meta.daysLeft} dias para fechar.
            </p>
            <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Falta para meta</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">{formatCurrency(meta.remaining)}</p>
                <p className="text-xs text-slate-500">{meta.daysLeft} dias restantes</p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Resultado atual</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">{formatCurrency(meta.actual)}</p>
                <p className="text-xs text-slate-500">Alvo: {formatCurrency(meta.target)}</p>
              </div>
            </div>
          </div>
          <div className="w-full rounded-3xl border border-slate-100 bg-slate-50 p-4 lg:w-auto">
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
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:col-span-2">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Top reps e riscos</p>
          <div className="mt-4 space-y-3">
            {topReps.map((rep) => (
              <div
                key={rep.id}
                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm"
              >
                <div>
                  <p className="text-base font-semibold text-slate-900">
                    {rep.name} — {rep.percent}%
                  </p>
                  <p className="text-xs text-slate-500">{rep.note}</p>
                </div>
                <span className="text-sm font-semibold">{rep.status}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-500">
            Reps em risco: {riskReps.join(', ')}
          </div>
        </div>
        <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.18em] text-emerald-600">Sugestão IA do dia</p>
          <p className="mt-2 text-base font-semibold text-slate-900">{iaSuggestion.highlight}</p>
          <p className="mt-3 text-sm text-slate-600">{iaSuggestion.action}</p>
          <button className="mt-4 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white">
            Ver reps sugeridos
          </button>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">KPIs regionais</p>
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          {regionalKPIs.map((kpi) => (
            <article key={kpi.id} className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{kpi.label}</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{kpi.value}</p>
              <p className="text-xs text-slate-500">{kpi.helper}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {opportunities.map((item) => (
          <article key={item.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
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

      <section className="rounded-3xl border border-rose-100 bg-rose-50/70 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-rose-500">Clientes grandes em risco</p>
            <h3 className="text-xl font-semibold text-slate-900">Aja nos próximos 3 dias</h3>
          </div>
          <button className="rounded-full border border-rose-200 px-3 py-1 text-xs font-semibold text-rose-500">Ver todos</button>
        </div>
        <div className="mt-4 space-y-3">
          {customersInRisk.map((client) => (
            <article
              key={client.id}
              className="flex flex-col gap-2 rounded-2xl border border-rose-100 bg-white p-4 text-sm text-slate-600 md:flex-row md:items-center md:justify-between"
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

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {managerShortcuts.map((shortcut) => (
          <Link
            key={shortcut.id}
            to={shortcut.to}
            className="rounded-3xl border border-slate-100 bg-white p-5 text-left text-sm font-semibold text-slate-700 shadow hover:border-indigo-200 hover:bg-indigo-50"
          >
            <p className="text-lg" aria-hidden>
              {shortcut.icon}
            </p>
            <p className="mt-2 text-base text-slate-900">{shortcut.label}</p>
            <p className="text-xs font-normal text-slate-500">{shortcut.helper}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}

export default function HomePage() {
  const { user } = useAuth();
  if (user?.perfil && user.perfil !== 'representante') {
    return <ManagerHome user={user} />;
  }
  return <RepresentativeHome user={user} />;
}
