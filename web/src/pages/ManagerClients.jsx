import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext.jsx';
import { managerClients } from '@/data/mockData.js';

const filters = managerClients.filters ?? [];

export default function ManagerClientsPage() {
  const { user } = useAuth();
  if (user?.perfil !== 'gerente') {
    return <Navigate to="/" replace />;
  }

  const [activeFilter, setActiveFilter] = useState(filters[0] ?? 'Todos');
  const clients = managerClients.list ?? [];

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Clientes gerenciados</p>
            <h1 className="text-2xl font-semibold text-slate-900">Carteira regional</h1>
          </div>
          <button className="rounded-full border border-slate-200 px-4 py-1 text-xs font-semibold text-slate-600">Exportar</button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full border px-4 py-2 ${
                activeFilter === filter ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-600'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        {clients.map((client) => (
          <article
            key={client.id}
            className="flex flex-col gap-2 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <p className="text-base font-semibold text-slate-900">
                {client.name} — {client.value}
              </p>
              <p className="text-xs text-slate-500">
                Última compra: {client.lastPurchase} · Rep: {client.rep}
              </p>
              <p className="mt-1 text-sm font-semibold text-rose-500">{client.status}</p>
              <p className="text-xs text-slate-500">{client.insight}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600">
                Adicionar ao roteiro
              </button>
              <button className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600">
                Orientar representante
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
