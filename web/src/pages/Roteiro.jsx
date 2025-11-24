import { routePlan } from '@/data/mockData.js';

export default function RoutePage() {
  const buckets = [
    { id: 'today', title: 'Hoje', color: 'border-emerald-200 bg-emerald-50' },
    { id: 'week', title: 'Esta semana', color: 'border-sky-200 bg-sky-50' },
    { id: 'inactive', title: 'Inativos', color: 'border-amber-200 bg-amber-50' },
    { id: 'nearby', title: 'Proximos da regiao', color: 'border-slate-200 bg-slate-50' },
  ];
  const mapPins = routePlan.mapPins ?? [];

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Meu roteiro</p>
        <h1 className="text-3xl font-semibold text-slate-900">Planejamento inteligente</h1>
        <p className="text-sm text-slate-500">A IA organiza prioridades com base em potencial, distancia e mix.</p>
        <div className="mt-5 grid gap-4 text-sm text-slate-600">
          {routePlan.suggestions.map((tip) => (
            <div key={tip} className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
              🤖 {tip}
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold">
          <button className="rounded-2xl bg-emerald-500 px-4 py-2 text-white">Criar roteiro da semana</button>
          <button className="rounded-2xl border border-slate-200 px-4 py-2 text-slate-600">Exportar roteiro</button>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Mapa do dia</p>
        <div className="mt-4 flex flex-col gap-4 md:flex-row">
          <div className="flex-1 rounded-3xl border border-slate-100 bg-slate-900/90 p-6 text-white">
            <p className="text-sm text-slate-300">Clientes com pins automáticos</p>
            <div className="relative mt-4 h-64 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-700">
              {mapPins.map((pin, index) => (
                <div
                  key={pin.id}
                  className="absolute flex flex-col items-center text-xs font-semibold"
                  style={{
                    top: `${15 + index * 15}%`,
                    left: `${20 + index * 18}%`,
                  }}
                >
                  <span className="text-lg">📍</span>
                  <span>{pin.city}</span>
                  <span className="text-[10px] text-slate-200">{pin.client}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full max-w-sm rounded-3xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600">
            {mapPins.map((pin) => (
              <div key={pin.id} className="flex items-center justify-between border-b border-slate-200 py-3 last:border-0">
                <div>
                  <p className="text-base font-semibold text-slate-900">{pin.client}</p>
                  <p className="text-xs text-slate-500">{pin.city}</p>
                </div>
                <p className="text-xs font-semibold text-emerald-600">{pin.status}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        {buckets.map((bucket) => (
          <div key={bucket.id} className={`rounded-3xl border ${bucket.color} p-5 shadow-sm`}>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">{bucket.title}</h3>
              <span className="text-sm text-slate-500">{routePlan.buckets[bucket.id].length} clientes</span>
            </div>
            <div className="space-y-3 text-sm text-slate-600">
              {routePlan.buckets[bucket.id].map((item) => (
                <article key={item.id} className="rounded-2xl border border-white bg-white/80 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-slate-900">{item.name}</p>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                      Prioridade {item.priority}
                    </span>
                  </div>
                  <p>{item.reason}</p>
                  <div className="mt-2 flex gap-2 text-xs font-semibold text-emerald-600">
                    <button type="button">Ver cliente</button>
                    <button type="button" className="text-slate-500">
                      Remover
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
