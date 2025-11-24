import { rankingData } from '@/data/mockData.js';

export default function RankingPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Ranking mensal</p>
        <ol className="mt-4 space-y-3">
          {rankingData.leaderboard.map((rep, index) => (
            <li
              key={rep.id}
              className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold ${
                rep.id === 'current'
                  ? 'border-nord-accent bg-nord-accent/10 text-slate-900'
                  : 'border-slate-100 bg-slate-50 text-slate-600'
              }`}
            >
              <span>
                #{index + 1} {rep.name}
              </span>
              <span>{rep.value}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Badges</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {rankingData.badges.map((badge) => (
            <div
              key={badge.id}
              className={`rounded-2xl border px-4 py-3 text-sm ${
                badge.earned
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-600'
                  : 'border-slate-200 bg-slate-100 text-slate-400'
              }`}
            >
              {badge.label}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Destaques da semana</p>
        <ul className="mt-4 space-y-3 text-sm text-slate-600">
          {rankingData.weeklyHighlights.map((item) => (
            <li key={item} className="rounded-2xl bg-slate-50 px-4 py-3">
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
