import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext.jsx';
import { managerTeam } from '@/data/mockData.js';

export default function ManagerRepresentativesPage() {
  const { user } = useAuth();
  if (user?.perfil !== 'gerente') {
    return <Navigate to="/" replace />;
  }

  const reps = managerTeam.reps ?? [];
  const summary = managerTeam.summary ?? [];
  const [selectedId, setSelectedId] = useState(reps[0]?.id);
  const selectedRep = reps.find((rep) => rep.id === selectedId) ?? reps[0];

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Equipe regional</p>
            <h1 className="text-2xl font-semibold text-slate-900">Representantes</h1>
          </div>
          <div className="rounded-full border border-emerald-200 px-4 py-1 text-xs font-semibold text-emerald-600">
            {reps.length} reps ativos
          </div>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {summary.map((card) => (
            <article key={card.id} className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{card.label}</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{card.value}</p>
              <p className="text-xs text-slate-500">{card.helper}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-[320px,1fr]">
        <div className="space-y-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Equipe</p>
          {reps.map((rep) => (
            <button
              key={rep.id}
              type="button"
              onClick={() => setSelectedId(rep.id)}
              className={`w-full rounded-2xl border px-4 py-3 text-left ${
                rep.id === selectedRep?.id
                  ? 'border-emerald-500 bg-emerald-50 text-slate-900'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              <p className="text-base font-semibold text-slate-900">
                {rep.name} — {rep.percent}%
              </p>
              <p className="text-sm">{rep.status}</p>
            </button>
          ))}
        </div>

        {selectedRep ? (
          <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Resumo</p>
                <h2 className="text-2xl font-semibold text-slate-900">{selectedRep.name}</h2>
                <p className="text-sm text-slate-500">{selectedRep.status}</p>
              </div>
              <div className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                {selectedRep.percent}% da meta
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <article className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Ticket médio</p>
                <p className="text-xl font-semibold text-slate-900">{selectedRep.ticket}</p>
              </article>
              <article className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Clientes atendidos</p>
                <p className="text-xl font-semibold text-slate-900">{selectedRep.clientsAttended}</p>
              </article>
              <article className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Mix foco</p>
                <p className="text-xl font-semibold text-slate-900">{selectedRep.mixFocus}</p>
              </article>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Top clientes</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedRep.topClients?.map((client) => (
                  <span key={client} className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600">
                    {client}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Insights IA</p>
              <ul className="mt-2 space-y-2 text-sm text-slate-600">
                {selectedRep.insights?.map((insight) => (
                  <li key={insight} className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3">
                    {insight}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-3">
              {selectedRep.actions?.map((action) => (
                <button
                  key={action}
                  className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:border-slate-400"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}
