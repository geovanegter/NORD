import { gamesData } from '@/data/mockData.js';

export default function GamesPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Ranking do mes</p>
        <ol className="mt-4 space-y-3">
          {gamesData.ranking.map((player, index) => (
            <li
              key={player.id}
              className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold ${
                player.id === 'current' ? 'border-emerald-200 bg-emerald-50 text-slate-900' : 'border-slate-100 bg-slate-50 text-slate-600'
              }`}
            >
              <span>
                #{index + 1} {player.name}
              </span>
              <span>{player.value}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Badges</p>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          {gamesData.badges.map((badge) => (
            <div
              key={badge.id}
              className={`rounded-2xl border px-4 py-3 text-sm ${
                badge.earned ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-slate-200 bg-slate-50 text-slate-400'
              }`}
            >
              {badge.label}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Mini desafios</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {gamesData.challenges.map((challenge) => (
            <div key={challenge.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm">
              <p className="font-semibold text-slate-900">{challenge.label}</p>
              <p className="text-slate-500">Progresso: {challenge.done}</p>
              <div className="mt-2 h-2 rounded-full bg-white">
                <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${Math.min(100, (challenge.done / 10) * 100)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Pontuacao</p>
          <h3 className="mt-2 text-3xl font-semibold text-slate-900">{gamesData.points.total} pts</h3>
          <p className="text-sm text-slate-500">Esta semana: {gamesData.points.weekly} pts</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Recompensas</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            {gamesData.rewards.map((reward) => (
              <li key={reward.id} className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                {reward.label}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
