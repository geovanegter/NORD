import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext.jsx';
import { managerGames } from '@/data/mockData.js';

export default function ManagerGamesPage() {
  const { user } = useAuth();
  if (user?.perfil !== 'gerente') {
    return <Navigate to="/" replace />;
  }

  const ranking = managerGames.teamRanking ?? [];
  const badges = managerGames.badges ?? [];
  const challenges = managerGames.challenges ?? [];
  const points = managerGames.points ?? {};
  const featuredBadge = badges.find((badge) => badge.earned) ?? badges[0];
  const featuredIcon = featuredBadge?.icon ?? '🏅';

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Games — equipe</p>
        <h1 className="text-2xl font-semibold text-slate-900">Motivação e desafios</h1>
        <p className="mt-2 text-sm text-slate-500">Acompanhe ranking, badges coletivas e progresso da squad.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.18em] text-emerald-600">Badge destaque</p>
          {featuredBadge ? (
            <>
              <p className="mt-3 text-3xl">{featuredIcon}</p>
              <p className="mt-2 text-base font-semibold text-slate-900">{featuredBadge.label}</p>
              <p className="text-sm text-slate-600">{featuredBadge.detail}</p>
              <p className="mt-2 text-xs font-semibold text-slate-500">Representante: {featuredBadge.rep}</p>
            </>
          ) : (
            <p className="mt-2 text-sm text-slate-500">Nenhuma badge conquistada ainda.</p>
          )}
        </div>
        <div className="md:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Ranking da equipe</p>
          <ul className="mt-3 space-y-2 text-sm">
            {ranking.map((rep, index) => (
              <li
                key={rep.id}
                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-slate-500">{index + 1}º</span>
                  <p className="text-base font-semibold text-slate-900">
                    {rep.name} — {rep.value}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Badges coletivas</p>
        <div className="mt-3 grid gap-4 md:grid-cols-3 text-sm text-slate-600">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`rounded-2xl border px-4 py-3 ${
                badge.earned ? 'border-emerald-200 bg-emerald-50' : 'border-slate-100 bg-slate-50'
              }`}
            >
              <p className="text-lg" aria-hidden>
                {badge.icon ?? '🏅'}
              </p>
              <p className="text-base font-semibold text-slate-900">{badge.label}</p>
              <p className="text-xs text-slate-500">Representante: {badge.rep}</p>
              <p className="text-xs text-slate-500">{badge.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Desafios da semana</p>
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          {challenges.map((challenge) => {
            const percent = Math.min(100, Math.round((challenge.progress / challenge.target) * 100));
            return (
              <article key={challenge.id} className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm">
                <p className="text-base font-semibold text-slate-900">{challenge.label}</p>
                <p className="text-xs text-slate-500">
                  {challenge.progress} / {challenge.target}
                </p>
                <div className="mt-3 h-2 rounded-full bg-white">
                  <div className="h-full rounded-full bg-emerald-500" style={{ width: `${percent}%` }} />
                </div>
                <p className="mt-1 text-xs font-semibold text-emerald-600">{percent}%</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Pontuação por pilar</p>
        <div className="mt-3 grid gap-4 md:grid-cols-4 text-sm">
          {Object.entries(points).map(([key, value]) => (
            <article key={key} className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{key}</p>
              <p className="mt-2 text-xl font-semibold text-slate-900">{value}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
