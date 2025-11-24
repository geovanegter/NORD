import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext.jsx';
import { managerRoutePlan } from '@/data/mockData.js';

const columnsOrder = ['segunda', 'terca', 'quarta', 'quinta', 'sexta'];
const columnLabels = {
  segunda: 'Segunda',
  terca: 'Terça',
  quarta: 'Quarta',
  quinta: 'Quinta',
  sexta: 'Sexta',
};

export default function ManagerRoutePage() {
  const { user } = useAuth();
  if (user?.perfil !== 'gerente') {
    return <Navigate to="/" replace />;
  }

  const priorities = managerRoutePlan.priorities ?? [];
  const kanban = managerRoutePlan.kanban ?? {};
  const mapPins = managerRoutePlan.mapPins ?? [];

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Roteiro tático</p>
        <h1 className="text-2xl font-semibold text-slate-900">Planner da semana</h1>
        <p className="mt-2 text-sm text-slate-500">Prioridades definidas pela IA + plano manual do gerente.</p>
        <ul className="mt-4 space-y-2 text-sm text-slate-600">
          {priorities.map((priority) => (
            <li key={priority} className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3">
              {priority}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Mapa tático</p>
        <div className="mt-4 flex flex-col gap-4 md:flex-row">
          <div className="flex-1 rounded-3xl border border-slate-100 bg-slate-900/90 p-6 text-white">
            <p className="text-sm text-slate-300">Mapa IA — pins por cidade</p>
            <div className="relative mt-4 h-64 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-700">
              {mapPins.map((pin, index) => (
                <div
                  key={pin.id}
                  className="absolute flex flex-col items-center text-xs font-semibold"
                  style={{
                    top: `${20 + index * 15}%`,
                    left: `${15 + index * 18}%`,
                  }}
                >
                  <span className="text-lg">📍</span>
                  <span>{pin.city}</span>
                  <span className="text-[10px] text-slate-200">{pin.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full max-w-sm rounded-3xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600">
            {mapPins.map((pin) => (
              <div key={pin.id} className="flex items-center justify-between border-b border-slate-200 py-3 last:border-0">
                <div>
                  <p className="text-base font-semibold text-slate-900">{pin.city}</p>
                  <p className="text-xs text-slate-500">Reps: {pin.reps.join(', ')}</p>
                </div>
                <p className="text-xs font-semibold text-slate-500">{pin.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-5">
        {columnsOrder.map((col) => (
          <div key={col} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{columnLabels[col]}</p>
            <div className="mt-3 space-y-3 text-sm text-slate-600">
              {(kanban[col] ?? []).map((card) => (
                <article key={card.id} className="rounded-2xl border border-slate-100 bg-slate-50 px-3 py-3">
                  <p className="text-base font-semibold text-slate-900">{card.title}</p>
                  <p className="text-xs text-slate-500">{card.tag}</p>
                  <p className="mt-2 rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">
                    {card.action}
                  </p>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
